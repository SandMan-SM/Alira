import logging
import asyncio
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, MessageHandler, filters, ContextTypes
from telegram.constants import ParseMode
from config import TELEGRAM_BOT_TOKEN, ADMIN_CHAT_ID, validate_config, PROGRAMS, MEMBERSHIP_TIERS, RETREAT_EVENTS, SESSION_PRICING
from database import Database

logger = logging.getLogger(__name__)
db = Database()


def get_main_menu_keyboard():
    """Main menu keyboard"""
    buttons = [
        [InlineKeyboardButton("📚 View Programs", callback_data="programs")],
        [InlineKeyboardButton("🎓 Enrollment", callback_data="enroll")],
        [InlineKeyboardButton("💎 Membership Tiers", callback_data="membership")],
        [InlineKeyboardButton("📅 Retreats & Events", callback_data="retreats")],
        [InlineKeyboardButton("🎯 My Status", callback_data="status")],
        [InlineKeyboardButton("👥 Contact Admin", callback_data="contact_admin")]
    ]
    return InlineKeyboardMarkup(buttons)


async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /start command"""
    user = update.effective_user
    db.register_user(user.id, user.username, user.first_name or "", user.last_name or "")

    text = f"""
🌟 Welcome to ALIRA 🌟

*Spiritual Leadership & Consciousness Institute*

Hello {user.first_name}! We are honored to welcome you on your spiritual journey.

ALIRA offers:
🎓 Certification Programs in Spiritual Mediumship
💎 Premium Membership to our Circle Community
📅 Transformational Retreats & Events
🎯 One-on-One Guidance Sessions
📚 Advanced Teachings & Historical Research

Select an option below to explore:
"""

    await update.message.reply_text(text, reply_markup=get_main_menu_keyboard(), parse_mode=ParseMode.MARKDOWN)


async def programs_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Show available programs"""
    query = update.callback_query
    await query.answer()

    text = "*🎓 ALIRA Certification & Training Programs*\n\n"

    for key, prog in PROGRAMS.items():
        text += f"*{prog['name']}*\n"
        text += f"💰 ${prog['price']:,}\n"
        text += f"⏱️  {prog['duration']}\n"
        text += f"📝 {prog['description']}\n\n"

    buttons = [
        [InlineKeyboardButton("📝 Enroll in Program", callback_data="enroll")],
        [InlineKeyboardButton("❓ Questions?", callback_data="contact_admin")],
        [InlineKeyboardButton("« Back", callback_data="main_menu")]
    ]

    await query.edit_message_text(text, reply_markup=InlineKeyboardMarkup(buttons), parse_mode=ParseMode.MARKDOWN)


async def enroll_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Start enrollment process"""
    query = update.callback_query
    await query.answer()

    text = "*🎯 Enrollment Application*\n\n"
    text += "Which program interests you?\n\n"

    buttons = [
        [InlineKeyboardButton("🏆 Medium Certification ($10,000)", callback_data="enroll_medium")],
        [InlineKeyboardButton("📚 Practitioner Training ($3,500)", callback_data="enroll_practitioner")],
        [InlineKeyboardButton("🌱 Spiritual Foundations ($600)", callback_data="enroll_foundations")],
        [InlineKeyboardButton("« Back", callback_data="main_menu")]
    ]

    await query.edit_message_text(text, reply_markup=InlineKeyboardMarkup(buttons), parse_mode=ParseMode.MARKDOWN)


async def enroll_program_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle program selection in enrollment"""
    query = update.callback_query
    program_key = query.data.split("_", 1)[1]

    await query.answer()

    context.user_data['enrolling_program'] = program_key
    program = PROGRAMS[program_key]

    text = f"*{program['name']} - Enrollment Form*\n\n"
    text += f"Price: ${program['price']:,}\n"
    text += f"Duration: {program['duration']}\n\n"
    text += "Please provide your details:\n\n"
    text += "1️⃣ What is your full name?"

    await query.edit_message_text(text)
    context.user_data['enrollment_step'] = 'name'


async def handle_enrollment_input(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle enrollment form input"""
    if 'enrolling_program' not in context.user_data:
        return

    step = context.user_data.get('enrollment_step')
    user_text = update.message.text

    if step == 'name':
        context.user_data['enrollment_name'] = user_text
        context.user_data['enrollment_step'] = 'email'
        await update.message.reply_text("2️⃣ What is your email address?")

    elif step == 'email':
        context.user_data['enrollment_email'] = user_text
        db.update_user_email(update.effective_user.id, user_text)
        context.user_data['enrollment_step'] = 'timeline'
        await update.message.reply_text("3️⃣ What is your timeline? (e.g., 'Start immediately', 'In 3 months', etc.)")

    elif step == 'timeline':
        context.user_data['enrollment_timeline'] = user_text
        context.user_data['enrollment_step'] = 'budget'
        await update.message.reply_text("4️⃣ What is your budget range? (Just let us know what works for you)")

    elif step == 'budget':
        context.user_data['enrollment_budget'] = user_text
        context.user_data['enrollment_step'] = 'complete'

        program_key = context.user_data['enrolling_program']
        program = PROGRAMS[program_key]

        lead_id = db.create_lead(
            user_id=update.effective_user.id,
            program_interest=program['name'],
            timeline=context.user_data['enrollment_timeline'],
            budget=context.user_data.get('enrollment_budget', ''),
            notes=f"Name: {context.user_data['enrollment_name']}\nEmail: {context.user_data['enrollment_email']}"
        )

        confirmation = f"""
✅ *Enrollment Application Submitted!*

Thank you {context.user_data['enrollment_name']}!

*Program:* {program['name']}
*Investment:* ${program['price']:,}
*Duration:* {program['duration']}

Our team will review your application and contact you at:
📧 {context.user_data['enrollment_email']}

We're excited to support your spiritual journey!

*Next Steps:*
We'll be in touch within 24-48 hours to discuss your program start date and payment options.

In the meantime, feel free to explore our membership options or ask questions.
"""

        await update.message.reply_text(confirmation, reply_markup=get_main_menu_keyboard(), parse_mode=ParseMode.MARKDOWN)

        admin_notification = f"""
🚀 *NEW ENROLLMENT INQUIRY*

User: {update.effective_user.first_name} (@{update.effective_user.username})
Lead ID: {lead_id}
Program: {program['name']} (${program['price']:,})
Name: {context.user_data['enrollment_name']}
Email: {context.user_data['enrollment_email']}
Timeline: {context.user_data['enrollment_timeline']}
Budget: {context.user_data.get('enrollment_budget', 'Not specified')}

Quality Score: 65 (auto-calculated)
Status: NEW - Ready for follow-up

/admin_leads to manage leads
"""

        if ADMIN_CHAT_ID:
            try:
                await context.bot.send_message(
                    chat_id=ADMIN_CHAT_ID,
                    text=admin_notification,
                    parse_mode=ParseMode.MARKDOWN
                )
            except Exception as e:
                logger.error(f"Failed to send admin notification: {e}")

        context.user_data.clear()


async def membership_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Show membership tiers"""
    query = update.callback_query
    await query.answer()

    text = "*💎 ALIRA Circle Membership*\n\n"

    for key, tier in MEMBERSHIP_TIERS.items():
        text += f"*{tier['name']}*\n"
        text += f"💰 ${tier['price']}/{tier['frequency']}\n"
        text += f"✨ {', '.join(tier['benefits'][:2])}\n\n"

    buttons = [
        [InlineKeyboardButton("📧 Compare All Tiers", callback_data="membership_compare")],
        [InlineKeyboardButton("✅ Subscribe Now", callback_data="membership_subscribe")],
        [InlineKeyboardButton("« Back", callback_data="main_menu")]
    ]

    await query.edit_message_text(text, reply_markup=InlineKeyboardMarkup(buttons), parse_mode=ParseMode.MARKDOWN)


async def membership_compare_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Show detailed membership comparison"""
    query = update.callback_query
    await query.answer()

    text = "*ALIRA Circle Membership Comparison*\n\n"

    for key, tier in MEMBERSHIP_TIERS.items():
        text += f"*{tier['name']}* - ${tier['price']}/{tier['frequency']}\n"
        for benefit in tier['benefits']:
            text += f"✅ {benefit}\n"
        text += "\n"

    buttons = [
        [InlineKeyboardButton("✅ Subscribe Now", callback_data="membership_subscribe")],
        [InlineKeyboardButton("« Back", callback_data="membership")]
    ]

    await query.edit_message_text(text, reply_markup=InlineKeyboardMarkup(buttons), parse_mode=ParseMode.MARKDOWN)


async def membership_subscribe_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Show tier selection for subscription"""
    query = update.callback_query
    await query.answer()

    text = "*Choose Your ALIRA Circle Tier*\n\n"

    buttons = [
        [InlineKeyboardButton("🌱 Basic - $25/month", callback_data="sub_basic")],
        [InlineKeyboardButton("⭐ Standard - $50/month", callback_data="sub_standard")],
        [InlineKeyboardButton("👑 Premium - $75/month", callback_data="sub_premium")],
        [InlineKeyboardButton("« Back", callback_data="membership")]
    ]

    await query.edit_message_text(text, reply_markup=InlineKeyboardMarkup(buttons), parse_mode=ParseMode.MARKDOWN)


async def subscribe_tier_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle subscription to tier"""
    query = update.callback_query
    tier_key = query.data.split("_")[1]

    await query.answer()

    tier = MEMBERSHIP_TIERS[tier_key]
    membership_id = db.create_membership(update.effective_user.id, tier_key, tier['price'])

    db.log_revenue(
        user_id=update.effective_user.id,
        source='membership',
        amount=tier['price'],
        metadata={'tier': tier_key, 'membership_id': membership_id}
    )

    text = f"""
✅ *Welcome to {tier['name']}!*

You are now an ALIRA Circle member!

*Your Benefits:*
"""
    for benefit in tier['benefits']:
        text += f"✨ {benefit}\n"

    text += f"""
💳 *Subscription Details:*
Price: ${tier['price']}/{tier['frequency']}
Auto-renewal: Every {tier['frequency'].capitalize()}

You'll receive access details via email shortly.

Thank you for joining ALIRA Circle!
"""

    buttons = [[InlineKeyboardButton("« Back to Menu", callback_data="main_menu")]]

    await query.edit_message_text(text, reply_markup=InlineKeyboardMarkup(buttons), parse_mode=ParseMode.MARKDOWN)


async def retreats_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Show retreats and events"""
    query = update.callback_query
    await query.answer()

    text = "*📅 ALIRA Retreats & Events*\n\n"

    for key, event in RETREAT_EVENTS.items():
        text += f"*{event['name']}*\n"
        text += f"📍 {event['location']}\n"
        text += f"📅 {event['dates']}\n"
        text += f"💰 ${event['price']}\n"
        text += f"👥 Limited to {event['capacity']} participants\n"
        text += f"📝 {event['description']}\n\n"

    buttons = [
        [InlineKeyboardButton("🎫 Register for Retreat", callback_data="register_retreat")],
        [InlineKeyboardButton("« Back", callback_data="main_menu")]
    ]

    await query.edit_message_text(text, reply_markup=InlineKeyboardMarkup(buttons), parse_mode=ParseMode.MARKDOWN)


async def register_retreat_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Register for retreat"""
    query = update.callback_query
    await query.answer()

    text = "*Select Retreat to Register*\n\n"

    buttons = [
        [InlineKeyboardButton("🌴 Spring Spiritual Retreat", callback_data="register_spring")],
        [InlineKeyboardButton("☀️ Summer Leadership Summit", callback_data="register_summer")],
        [InlineKeyboardButton("🎪 Annual ALIRA Summit", callback_data="register_annual")],
        [InlineKeyboardButton("« Back", callback_data="retreats")]
    ]

    await query.edit_message_text(text, reply_markup=InlineKeyboardMarkup(buttons), parse_mode=ParseMode.MARKDOWN)


async def register_event_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle retreat registration"""
    query = update.callback_query
    event_key = query.data.split("_")[1]

    await query.answer()

    event = RETREAT_EVENTS[event_key]

    text = f"""
✅ *Registered for {event['name']}!*

📍 *Location:* {event['location']}
📅 *Dates:* {event['dates']}
💰 *Investment:* ${event['price']}
👥 *Capacity:* {event['capacity']} participants

*Next Steps:*
1. You'll receive a confirmation email with payment details
2. Full retreat itinerary will be sent within 24 hours
3. Join our private retreat WhatsApp group

We're honored to welcome you to this transformational experience!
"""

    buttons = [[InlineKeyboardButton("« Back to Menu", callback_data="main_menu")]]

    await query.edit_message_text(text, reply_markup=InlineKeyboardMarkup(buttons), parse_mode=ParseMode.MARKDOWN)


async def status_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Show user status"""
    query = update.callback_query
    await query.answer()

    user = update.effective_user
    enrollments = db.get_user_enrollments(user.id)
    membership = db.get_user_membership(user.id)
    leads = db.get_user_leads(user.id)

    text = "*🎯 Your ALIRA Status*\n\n"

    if enrollments:
        text += "*🎓 Active Enrollments:*\n"
        for enr in enrollments:
            if enr['status'] == 'active':
                text += f"✅ {enr['program_name']}\n"
                text += f"   Enrolled: {enr['enrollment_date'][:10]}\n"
                cert = db.get_certification_by_enrollment(enr['enrollment_id'])
                if cert:
                    text += f"   Progress: {cert['progress_percentage']}%\n"
    else:
        text += "No active enrollments yet.\n"

    text += "\n"

    if membership:
        text += f"*💎 ALIRA Circle Member:*\n"
        text += f"Tier: {membership['tier'].upper()}\n"
        text += f"Status: {membership['status']}\n"
    else:
        text += "Not a member yet. Join ALIRA Circle for exclusive benefits!\n"

    text += "\n"

    if leads:
        active_leads = [l for l in leads if l['status'] != 'converted']
        if active_leads:
            text += f"*📊 Active Inquiries:* {len(active_leads)}\n"

    buttons = [
        [InlineKeyboardButton("📚 Explore Programs", callback_data="programs")],
        [InlineKeyboardButton("💎 Join ALIRA Circle", callback_data="membership")],
        [InlineKeyboardButton("« Back", callback_data="main_menu")]
    ]

    await query.edit_message_text(text, reply_markup=InlineKeyboardMarkup(buttons), parse_mode=ParseMode.MARKDOWN)


async def contact_admin_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Contact admin"""
    query = update.callback_query
    await query.answer()

    text = "*📧 Contact ALIRA*\n\n"
    text += "Have questions or need support?\n\n"
    text += "📧 Email: support@alira.com\n"
    text += "💬 WhatsApp: +1-XXX-XXX-XXXX\n"
    text += "🌐 Website: www.alira.com\n"
    text += "📱 Telegram: @alira_support\n\n"
    text += "Our team responds within 24 hours!"

    buttons = [[InlineKeyboardButton("« Back", callback_data="main_menu")]]

    await query.edit_message_text(text, reply_markup=InlineKeyboardMarkup(buttons), parse_mode=ParseMode.MARKDOWN)


async def main_menu_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Return to main menu"""
    query = update.callback_query
    await query.answer()

    text = """
🌟 *ALIRA - Spiritual Leadership & Consciousness Institute* 🌟

Select an option below to explore:
"""

    await query.edit_message_text(text, reply_markup=get_main_menu_keyboard(), parse_mode=ParseMode.MARKDOWN)


async def handle_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Route callbacks"""
    query = update.callback_query
    data = query.data

    routes = {
        "programs": programs_callback,
        "enroll": enroll_callback,
        "membership": membership_callback,
        "membership_compare": membership_compare_callback,
        "membership_subscribe": membership_subscribe_callback,
        "retreats": retreats_callback,
        "register_retreat": register_retreat_callback,
        "status": status_callback,
        "contact_admin": contact_admin_callback,
        "main_menu": main_menu_callback,
    }

    for prefix, handler in routes.items():
        if data == prefix or data.startswith(prefix + "_"):
            return await handler(update, context)

    logger.warning(f"Unknown callback: {data}")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle regular messages (enrollment form input)"""
    if 'enrollment_step' in context.user_data and context.user_data.get('enrollment_step') != 'complete':
        await handle_enrollment_input(update, context)


def main():
    validate_config()

    application = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CallbackQueryHandler(handle_callback))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    logger.info("ALIRA Bot starting...")
    application.run_polling()


if __name__ == "__main__":
    main()
