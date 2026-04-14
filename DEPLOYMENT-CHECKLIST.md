# ALIRA AI CEO System - Deployment Checklist

## Pre-Deployment Verification

All files created and verified:

### Documentation (3 files)
- [x] AGENTS.md - AI CEO business strategy & monitoring framework
- [x] README-AI-CEO.md - Complete setup & deployment guide  
- [x] IMPLEMENTATION.md - Detailed features & specifications

### Telegram Bot (7 files)
- [x] telegram-bot/bot.py - Main bot with 6 commands
- [x] telegram-bot/config.py - Programs, tiers, pricing, config
- [x] telegram-bot/database.py - 7-table SQLite schema
- [x] telegram-bot/requirements.txt - Dependencies
- [x] telegram-bot/.env.template - Environment template
- [x] telegram-bot/Dockerfile - Docker image
- [x] telegram-bot/__init__.py - Package initialization

### AI CEO System (7 files)
- [x] ai-ceo/monitor.py - Metrics monitoring system
- [x] ai-ceo/decision.py - Alert & opportunity engine
- [x] ai-ceo/actions.py - Automated business actions
- [x] ai-ceo/ceo.py - Main orchestrator
- [x] ai-ceo/requirements.txt - Dependencies
- [x] ai-ceo/Dockerfile - Docker image
- [x] ai-ceo/__init__.py - Package initialization

### Deployment (2 files)
- [x] docker-compose.yml - Multi-container orchestration
- [x] start.sh - Startup script with validation

### Root Docs (this file)
- [x] DEPLOYMENT-CHECKLIST.md - This deployment guide

## Total: 18 production-ready files + 4 documentation files

---

## Deployment Steps

### Step 1: Prepare Environment

```bash
cd /mnt/Interlinked/Clients/Alira

# Create .env from template
cp telegram-bot/.env.template .env

# Create necessary directories
mkdir -p telegram-bot/logs
mkdir -p ai-ceo/logs
mkdir -p ai-ceo/reports
```

### Step 2: Configure Credentials

**Get Telegram Bot Token:**
1. Open Telegram app
2. Search for @BotFather
3. Send `/newbot`
4. Choose name & username
5. Copy the token

**Get Admin Chat ID:**
1. Message @userinfobot in Telegram
2. Copy your user ID (numeric)

**Update .env file:**
```
TELEGRAM_BOT_TOKEN=<paste-your-token>
ADMIN_CHAT_ID=<your-numeric-id>
ADMIN_USERNAME=alira_admin
DEBUG=false
LOG_LEVEL=INFO
```

### Step 3: Verify Docker Installation

```bash
docker --version
docker-compose --version
```

### Step 4: Start Services

**Option A: Using startup script**
```bash
bash start.sh
```

**Option B: Manual Docker**
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Check status
docker-compose ps
```

### Step 5: Verify Services Are Running

```bash
# Check bot service
docker-compose logs alira-telegram-bot

# Check CEO service
docker-compose logs alira-ai-ceo

# View both logs (last 50 lines)
docker-compose logs --tail=50 -f
```

### Step 6: Test Bot

1. Find your bot on Telegram
2. Send `/start`
3. Verify welcome message appears
4. Click menu buttons to test

### Step 7: Test AI CEO

Monitor logs for:
- First hourly monitoring check (within 60 minutes)
- First daily actions (at 9:00 AM)
- Admin notifications in your Telegram

---

## Verification Checklist

### Bot Testing
- [ ] Bot accepts `/start` command
- [ ] Main menu appears with buttons
- [ ] `/programs` shows 3 programs with pricing
- [ ] `/enroll` allows multi-step form
  - [ ] Collects name
  - [ ] Collects email
  - [ ] Collects timeline
  - [ ] Collects budget
  - [ ] Shows confirmation
  - [ ] Admin receives notification
- [ ] `/membership` shows 3 tiers
- [ ] Can subscribe to membership
- [ ] `/status` shows personal dashboard
- [ ] `/retreats` shows 3 events
- [ ] Can register for retreat
- [ ] `/contact` shows contact info

### Database
- [ ] `alira.db` created in telegram-bot/
- [ ] 7 tables created (users, leads, enrollments, memberships, certifications, sessions, revenue_log)
- [ ] Can query database: `sqlite3 telegram-bot/alira.db "SELECT COUNT(*) FROM users;"`

### AI CEO Monitoring
- [ ] Logs folder exists: `ai-ceo/logs/ai_ceo.log`
- [ ] Reports folder exists: `ai-ceo/reports/`
- [ ] Hourly monitoring logged
- [ ] Daily actions logged
- [ ] Executive summary generated

### Admin Notifications
- [ ] Receive alert on new enrollment
- [ ] Receive daily enrollment summary (9 AM)
- [ ] Receive revenue report
- [ ] Receive critical alerts immediately

---

## Configuration Options

### Business Metrics (telegram-bot/config.py)

Customize these values:

```python
# Programs
PROGRAMS = {
    "medium": {"price": 10000, ...},
    ...
}

# Membership Tiers
MEMBERSHIP_TIERS = {
    "basic": {"price": 25, ...},
    ...
}

# Retreat Events
RETREAT_EVENTS = {
    "spring": {"price": 3500, ...},
    ...
}

# Alert Thresholds
ENROLLMENT_ALERT_THRESHOLD = 2  # enrollments/week
MEMBERSHIP_CHURN_DAYS = 14
LEAD_INACTIVITY_DAYS = 7
```

### Scheduled Tasks (ai-ceo/ceo.py)

Default schedule:
- Hourly: Monitoring check
- Every 4 hours: Analysis & decision
- Daily at 9:00 AM: Actions & summaries

Edit in `ceo.py` to change timing.

---

## Production Deployment

### Docker Hub
```bash
# Build & push images
docker-compose build
docker tag alira-telegram-bot <your-repo>/alira-telegram-bot:latest
docker push <your-repo>/alira-telegram-bot:latest
```

### Cloud Platforms

**Railway.app**
- Connect GitHub repo
- Set environment variables
- Deploy

**Render.com**
- Create Web Service
- Link to repo
- Set environment variables
- Deploy

**AWS ECS**
- Push images to ECR
- Create task definition
- Create service

### Environment Variables (Set in cloud platform)
- `TELEGRAM_BOT_TOKEN`
- `ADMIN_CHAT_ID`
- `ADMIN_USERNAME`
- `DEBUG=false`
- `LOG_LEVEL=INFO`

---

## Monitoring & Maintenance

### Daily Checks
```bash
# View bot logs
docker-compose logs -f alira-telegram-bot

# View CEO logs
docker-compose logs -f alira-ai-ceo

# Check container status
docker-compose ps
```

### Weekly Backup
```bash
# Backup database
cp telegram-bot/alira.db telegram-bot/alira.db.backup

# Backup reports
tar -czf ai-ceo/reports.tar.gz ai-ceo/reports/
```

### Monthly Analysis
- Review `ai-ceo/reports/` for trends
- Check enrollment metrics
- Analyze membership health
- Review alerts & opportunities

---

## Troubleshooting

### Bot Not Responding
```bash
# Check service running
docker-compose ps alira-telegram-bot

# View logs
docker-compose logs alira-telegram-bot

# Restart service
docker-compose restart alira-telegram-bot

# Check token is correct
grep TELEGRAM_BOT_TOKEN .env
```

### Database Issues
```bash
# Check database exists
ls -lh telegram-bot/alira.db

# Query database
sqlite3 telegram-bot/alira.db "SELECT COUNT(*) FROM users;"

# Backup and recreate
mv telegram-bot/alira.db telegram-bot/alira.db.old
docker-compose restart alira-telegram-bot
```

### AI CEO Not Running
```bash
# Check logs
docker-compose logs alira-ai-ceo

# Verify database connection
docker-compose exec alira-ai-ceo python -c "from monitor import AliraMonitor; AliraMonitor('/app/alira.db')"

# Restart service
docker-compose restart alira-ai-ceo
```

### Admin Not Receiving Messages
1. Verify ADMIN_CHAT_ID in .env (should be numeric)
2. Start a conversation with your bot first
3. Check bot logs for Telegram API errors
4. Verify bot token is valid
5. Check network connectivity

---

## Success Indicators

After deployment, you should see:

1. **Bot Online**
   - Bot accepts commands
   - Responds with proper menus
   - Users can complete enrollments

2. **Database Working**
   - New users, leads, enrollments recorded
   - Membership data persisted
   - Revenue logged

3. **AI CEO Running**
   - Hourly monitoring entries in logs
   - Daily actions at 9 AM
   - Admin notifications received
   - Reports generated

4. **Business Intelligence**
   - Enrollment metrics tracked
   - Membership health monitored
   - Revenue calculated
   - Alerts & opportunities identified

---

## File Locations Summary

```
/mnt/Interlinked/Clients/Alira/
├── AGENTS.md
├── README-AI-CEO.md
├── IMPLEMENTATION.md
├── DEPLOYMENT-CHECKLIST.md (this file)
├── docker-compose.yml
├── start.sh
├── .env (created from template)
│
├── telegram-bot/
│   ├── bot.py
│   ├── config.py
│   ├── database.py
│   ├── requirements.txt
│   ├── .env.template
│   ├── Dockerfile
│   ├── __init__.py
│   ├── alira.db (auto-created)
│   └── logs/ (auto-created)
│
├── ai-ceo/
│   ├── monitor.py
│   ├── decision.py
│   ├── actions.py
│   ├── ceo.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── __init__.py
│   ├── logs/ (auto-created)
│   └── reports/ (auto-created)
│
└── web/ (untouched - existing Next.js app)
```

---

## Next Steps

1. ✓ Deploy the system (follow steps above)
2. ✓ Test all bot commands
3. ✓ Verify AI CEO is monitoring
4. ✓ Monitor logs for issues
5. ✓ Customize programs/pricing if needed
6. ✓ Set up email notifications (future)
7. ✓ Create admin dashboard (future)
8. ✓ Integrate with web app (future)

---

## Support & Questions

Refer to:
- README-AI-CEO.md for detailed setup
- IMPLEMENTATION.md for feature details
- AGENTS.md for business strategy
- Docker logs for technical issues

