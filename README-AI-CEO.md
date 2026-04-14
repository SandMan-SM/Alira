# ALIRA Agentic AI CEO System

Complete production-grade AI CEO system for ALIRA - Spiritual Leadership & Consciousness Institute.

Includes:
- Telegram bot for customer engagement
- SQLite database with complete schema
- AI CEO monitoring system
- Decision engine for alerts and opportunities
- Automated actions system

## Architecture

### Components

1. **Telegram Bot** (`telegram-bot/`)
   - User commands: /start, /programs, /enroll, /membership, /status, /retreats
   - Enrollment form processing
   - Membership tier management
   - Admin notifications

2. **AI CEO System** (`ai-ceo/`)
   - **monitor.py**: Tracks all business metrics
   - **decision.py**: Analyzes metrics and flags issues/opportunities
   - **actions.py**: Executes automated business actions
   - **ceo.py**: Main orchestrator with scheduled tasks

### Database Schema

**users**
- User profiles with contact info and engagement tracking

**leads**
- Inquiry forms with quality scoring and status tracking

**enrollments**
- Program registrations with revenue tracking

**memberships**
- Active subscriptions with tier management

**certifications**
- Student progress tracking and completion status

**sessions**
- One-on-one service bookings

**revenue_log**
- All financial transactions

## Setup

### Prerequisites

- Docker & Docker Compose
- Python 3.11+
- Telegram Bot Token (from @BotFather)

### Installation

1. Clone the repository:
```bash
cd /path/to/Alira
```

2. Create environment file:
```bash
cp telegram-bot/.env.template .env
```

3. Get your bot token:
   - Open Telegram and message @BotFather
   - Send `/newbot`
   - Follow prompts to create bot
   - Copy the token to .env

4. Get your admin chat ID:
   - Message @userinfobot in Telegram
   - Copy your user ID to .env as ADMIN_CHAT_ID

5. Start the system:
```bash
bash start.sh
```

### Manual Docker Setup

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f alira-telegram-bot
docker-compose logs -f alira-ai-ceo
```

## Configuration

### .env Variables

```
TELEGRAM_BOT_TOKEN=<your-bot-token>
ADMIN_CHAT_ID=<your-telegram-id>
ADMIN_USERNAME=alira_admin
DEBUG=false
LOG_LEVEL=INFO
```

### Customization

Edit `telegram-bot/config.py` to customize:
- Programs and pricing
- Membership tiers
- Retreat events
- Session pricing
- Business thresholds

## Running Locally

Without Docker:

```bash
cd telegram-bot
pip install -r requirements.txt
python bot.py
```

In another terminal:

```bash
cd ai-ceo
pip install -r requirements.txt
python ceo.py
```

## AI CEO Features

### Monitoring (Hourly)

Tracks:
- Enrollment pipeline metrics
- Membership revenue and churn
- Certification progress
- Lead conversion rates
- Revenue by source

### Decision Making (4-hourly)

Flags:
- **Slow Enrollment** (< 2/week)
- **High Churn** (> 15% monthly)
- **Inactive Members** (> 14 days)
- **Stale High-Value Leads** (qualified but inactive > 7 days)
- **Revenue Issues**

Identifies opportunities:
- High conversion rates
- Quality lead pools
- Top program momentum
- Graduation conversions
- Churn prevention value

### Actions (Daily)

Executes:
- Admin alert summaries
- Enrollment daily reports
- Member re-engagement messages
- Revenue summaries
- Cohort status reports

## Telegram Bot Commands

### User Commands

- `/start` - Welcome and main menu
- `/programs` - View certification programs
- `/enroll` - Submit enrollment inquiry
- `/membership` - View membership tiers
- `/status` - Check your status
- `/retreats` - View retreats and events
- `/contact` - Contact admin

### Navigation

All features accessible via inline keyboard buttons from main menu.

## Admin Features

Admin receives notifications for:
- New enrollment inquiries
- Critical business alerts
- Daily enrollment summary
- Revenue reports
- Cohort status updates

View logs:
```bash
docker-compose logs -f alira-telegram-bot
docker-compose logs -f alira-ai-ceo
```

## Key Metrics Tracked

### Enrollment Pipeline
- New leads per week
- Qualified leads
- Conversion rate (target: >15%)
- Time to conversion (target: <7 days)

### Membership Health
- Active members
- Members by tier
- Monthly recurring revenue (MRR)
- Monthly churn rate (target: <10%)
- Member engagement scores

### Certification Program
- Students in progress
- Graduates
- Completion rate (target: >75%)
- Avg time to completion
- Stalled students (early warning)

### Revenue
- Total revenue by source
- Monthly run rate
- Average revenue per customer
- Active enrollment value

## Business Logic

### Lead Quality Scoring

Calculated on:
- Program interest (Medium Cert = +15 points)
- Budget (>$5K = +20 points)
- Contact info provided (+10 points)
- Default: 50 points

### Enrollment Pipeline

1. **New**: Initial inquiry received
2. **Qualified**: Quality score >50, ready for follow-up
3. **Converted**: Paid enrollment
4. **Lost**: Did not convert

### Membership Tiers

- **Basic** ($25/month): Community & basic content
- **Standard** ($50/month): Full features + expert Q&A
- **Premium** ($75/month): VIP with exclusive access

### Alert Thresholds

Configure in `telegram-bot/config.py`:
- `ENROLLMENT_ALERT_THRESHOLD`: 2 enrollments/week
- `MEMBERSHIP_CHURN_DAYS`: 14 days of inactivity
- `LEAD_INACTIVITY_DAYS`: 7 days for high-value leads
- `QUALITY_SCORE_THRESHOLDS`: high(75), medium(50), low(25)

## Logs and Reports

### Log Files
- `telegram-bot/logs/` - Bot activity logs
- `ai-ceo/logs/ai_ceo.log` - CEO system logs

### Reports
- `ai-ceo/reports/daily_*.log` - Daily action logs
- `ai-ceo/reports/analysis_*.json` - Hourly analysis reports

## Integration with Next.js Web App

The Telegram bot and AI CEO system are independent of the Next.js web app.

**Shared Database**: Both can read from the same SQLite database if needed.

**Webhook Integration** (Future): Set up webhooks to sync enrollments between bot and web app.

## Deployment

### Docker Hub Deployment

```bash
# Build images
docker-compose build

# Tag images
docker tag alira-telegram-bot:latest <your-repo>/alira-telegram-bot:latest
docker tag alira-ai-ceo:latest <your-repo>/alira-ai-ceo:latest

# Push to registry
docker push <your-repo>/alira-telegram-bot:latest
docker push <your-repo>/alira-ai-ceo:latest
```

### Cloud Deployment (Railway, Render, etc.)

Use the provided Dockerfile files and docker-compose.yml as reference.

Set environment variables in your cloud platform's dashboard.

## Troubleshooting

### Bot Not Responding

```bash
# Check bot is running
docker-compose ps alira-telegram-bot

# View logs
docker-compose logs alira-telegram-bot

# Restart service
docker-compose restart alira-telegram-bot
```

### AI CEO Not Running

```bash
# Check service
docker-compose ps alira-ai-ceo

# View logs
docker-compose logs alira-ai-ceo

# Verify database connection
docker-compose exec alira-ai-ceo python -c "import sqlite3; sqlite3.connect('/app/alira.db')"
```

### Admin Not Receiving Messages

1. Verify ADMIN_CHAT_ID in .env
2. Check bot is in admin's contact list
3. View bot logs for Telegram API errors
4. Ensure TELEGRAM_BOT_TOKEN is correct

## Support

For issues or questions:
- Check logs: `docker-compose logs -f`
- Verify .env configuration
- Ensure bot token is valid
- Check admin chat ID format (should be numeric)

## License

Proprietary - ALIRA Spiritual Leadership Institute

## Future Enhancements

- [ ] Payment processing integration (Stripe)
- [ ] Email sequence automation
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Advanced lead scoring with ML
- [ ] Integration with web app webhooks
- [ ] Session scheduling system
- [ ] Retreat booking management
- [ ] Certificate generation and tracking
- [ ] Community discussion features
