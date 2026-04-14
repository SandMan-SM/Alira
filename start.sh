#!/bin/bash

# ALIRA Telegram Bot & AI CEO System Startup Script

echo "🌟 Starting ALIRA Telegram Bot & AI CEO System..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from template..."
    if [ -f .env.template ]; then
        cp .env.template .env
        print_warning "Please update .env with your credentials, then run this script again"
        exit 1
    else
        print_error ".env.template not found"
        exit 1
    fi
fi

# Verify required environment variables
if grep -q "ALIRA_TELEGRAM_BOT_TOKEN" .env; then
    print_error ".env still contains placeholder values. Please update with your actual credentials."
    exit 1
fi

# Create necessary directories
mkdir -p telegram-bot/logs
mkdir -p ai-ceo/logs
mkdir -p ai-ceo/reports

print_status "Created log and report directories"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

print_status "Starting Docker services..."
docker-compose up -d

# Wait for services to be ready
print_status "Waiting 10 seconds for services to initialize..."
sleep 10

# Check status
print_status "Checking service status..."
docker-compose ps

echo ""
print_status "ALIRA System started successfully!"
echo ""
echo "Services:"
echo "  - Telegram Bot: Running"
echo "  - AI CEO Monitor: Running"
echo ""
echo "Database:"
echo "  - SQLite: ./telegram-bot/alira.db"
echo ""
echo "Logs:"
echo "  - Bot Logs: ./telegram-bot/logs/"
echo "  - CEO Logs: ./ai-ceo/logs/"
echo "  - CEO Reports: ./ai-ceo/reports/"
echo ""
echo "Next steps:"
echo "  1. Start Telegram and find @BotFather"
echo "  2. Get your bot token and update .env"
echo "  3. Message your bot with /start"
echo "  4. Check logs with: docker-compose logs -f alira-telegram-bot"
echo ""
