# ALIRA AI CEO System

## Business Context

ALIRA is a Spiritual Leadership & Consciousness Institute offering global spiritual guidance, consciousness education, and alternative historical interpretation.

### Key Business Metrics
- **Revenue Model**: Certification programs ($10,000 Medium Cert, 6-12 months), membership tiers, retreats, individual sessions
- **Primary KPIs**: Enrollment conversions, membership upgrades, retreat fill rates, certification completions
- **Customer Lifecycle**: Lead → Inquiry → Enrollment → Certification Progress → Graduation → Membership → Sessions

### Program Catalog

**Certification Programs:**
- Medium Certification: $10,000 (6-12 months) - Main revenue driver
- Practitioner Training: $2,000-$4,000
- Spiritual Foundations: $300-$800

**Membership Tiers:**
- ALIRA Circle Membership: $25-$75/month
  - Live teachings, group meditations, community discussions, history research access
  - Target: 5,000 members = $250,000/month potential

**Additional Revenue:**
- One-on-one Sessions: $100-$200 per session (Platform takes 20-40%)
- Retreats: $2,000-$5,000 per person
- Annual ALIRA Summit: 500-2,000 attendees

## AI CEO Responsibilities

### 1. Monitoring Layer (monitor.py)
Continuously tracks business health metrics:

**Enrollment Pipeline**
- New inquiry count (daily)
- Enrollment conversion rate (inquiries → enrollments)
- Pipeline value at each stage
- Time to enrollment (inquiry → paid enrollment)

**Membership Revenue**
- Active subscriptions by tier
- Monthly churn rate
- Lifetime value per member
- Renewal rates

**Certification Progress**
- Active students per cohort
- Completion rates by program
- Time-to-completion metrics
- Dropout risk signals

**Lead Conversion**
- Lead source effectiveness
- Lead quality scoring (intent signals)
- Re-engagement opportunity tracking

### 2. Decision Layer (decision.py)
Analyzes monitoring data and flags critical business issues:

**Slow Enrollment Periods**
- < 2 enrollments per week triggers alert
- Compare to historical baseline
- Identify drop-off triggers (seasonal, marketing gaps, etc.)

**Membership Churn Signals**
- Inactive members (no activity for 14+ days)
- Cancellation risk signals (low engagement)
- Downgrade patterns

**High-Value Lead Inactivity**
- Leads with high qualification signals dormant > 7 days
- Certification inquiries stalled in pipeline

**Revenue At-Risk**
- Declining membership renewals
- Low certification cohort enrollment
- Retreat bookings below target

**Opportunity Signals**
- Members ready for upgrade to certification
- Graduates ready for sessions offering
- Leads showing buying intent patterns

### 3. Actions Layer (actions.py)
Takes data-driven actions based on decision flags:

**Enrollment Alerts**
- Flag new qualified inquiry to admin
- Trigger re-engagement to stalled leads
- Recommend follow-up messaging

**Re-engagement Nudges**
- Remind inactive members of upcoming events
- Share relevant content based on member tier
- Offer special promotions for upgrade opportunities

**Revenue Summaries**
- Daily enrollment report
- Weekly membership health report
- Monthly revenue forecast
- Cohort completion tracking

## Telegram Bot Integration

**User Commands:**
- `/start` - Welcome & menu
- `/programs` - View certification programs & pricing
- `/enroll` - Submit enrollment inquiry
- `/membership` - Membership tier details & benefits
- `/status` - Check enrollment or membership status
- `/sessions` - Book 1-on-1 session (post-graduation)
- `/retreats` - View upcoming retreats
- `/contact` - Contact admin

**Admin Commands:**
- `/admin_leads` - View all leads & inquiries
- `/admin_revenue` - Revenue dashboard
- `/admin_cohorts` - Monitor certification cohorts
- `/admin_alerts` - See AI CEO flagged issues

## Database Schema

**users** - Telegram users
- user_id, username, first_name, phone_number, email
- join_date, last_activity_date, utm_source

**leads** - Inquiry forms
- lead_id, user_id, program_interest, timeline, budget
- quality_score (0-100), status (new, contacted, qualified, lost)
- created_at, contacted_at, converted_at

**enrollments** - Paid program enrollments
- enrollment_id, user_id, program_name, price, status
- enrollment_date, expected_completion, actual_completion
- revenue_amount, currency, payment_method

**memberships** - Active subscriptions
- membership_id, user_id, tier (basic/standard/premium), price
- start_date, renewal_date, status (active/paused/cancelled)
- last_activity_date, engagement_score

**certifications** - Certification tracking
- cert_id, enrollment_id, current_module, progress_percentage
- cohort_id, start_date, expected_completion, status
- completion_date, graduate_status

**sessions** - One-on-one service sessions
- session_id, provider_id, user_id, duration, price
- scheduled_date, completed_date, notes

**revenue_log** - All financial transactions
- log_id, user_id, source (enrollment/membership/session/retreat)
- amount, currency, date, status (pending/completed)

## AI CEO Frequency

**Monitoring:** Every 1 hour (check for critical issues)
**Decision Making:** Every 4 hours (analyze trends, flag opportunities)
**Actions:** Real-time when alerts triggered, Daily summary at 9am

## Success Metrics

- Enrollment conversion rate: Target > 15% (inquiries to paid)
- Membership retention: Target > 85% monthly
- Certification completion: Target > 75%
- Average revenue per user: Track trends
- Time to first enrollment: Target < 7 days
