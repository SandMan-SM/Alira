"""
ALIRA AI CEO Main Orchestration

Runs scheduled tasks for monitoring, decision-making, and actions.
Integrates with Telegram bot for notifications.
"""

import asyncio
import logging
import os
import schedule
import time
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
from telegram import Bot
from telegram.error import TelegramError

from monitor import AliraMonitor
from decision import AliradDecisionEngine
from actions import AliraActions

load_dotenv()

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
    handlers=[
        logging.FileHandler("logs/ai_ceo.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
ADMIN_CHAT_ID = os.getenv("ADMIN_CHAT_ID", "")
DB_PATH = "/app/alira.db"


class TelegramBotWrapper:
    """Wrapper to send messages via Telegram bot"""

    def __init__(self, token: str, admin_chat_id: str):
        self.token = token
        self.admin_chat_id = admin_chat_id
        self.bot = Bot(token=token) if token else None

    async def send_admin_message(self, message: str) -> None:
        """Send message to admin"""
        if not self.bot or not self.admin_chat_id:
            logger.warning("Telegram bot not configured")
            return

        try:
            await self.bot.send_message(
                chat_id=int(self.admin_chat_id),
                text=message,
                parse_mode='Markdown'
            )
        except TelegramError as e:
            logger.error(f"Failed to send Telegram message: {e}")

    async def send_reengagement_message(self, user_id: int, tier: str) -> None:
        """Send re-engagement message to user"""
        if not self.bot:
            return

        messages = {
            'basic': "We miss you! Your ALIRA Circle Basic membership is waiting. Check out this week's new teachings.",
            'standard': "Welcome back! Your Standard membership includes access to live teachings & expert Q&A. Join us!",
            'premium': "As a Premium member, you have exclusive benefits waiting. Check your member-only content!"
        }

        message = messages.get(tier, "Welcome back to ALIRA Circle! We have new content for you.")

        try:
            await self.bot.send_message(
                chat_id=user_id,
                text=message
            )
        except TelegramError as e:
            logger.warning(f"Failed to send re-engagement message to {user_id}: {e}")


class AIraCEO:
    """ALIRA AI CEO Orchestrator"""

    def __init__(self, db_path: str, telegram_token: str = "", admin_chat_id: str = ""):
        self.db_path = db_path
        self.monitor = AliraMonitor(db_path)
        self.engine = AliradDecisionEngine(db_path)

        telegram_bot = TelegramBotWrapper(telegram_token, admin_chat_id) if telegram_token else None
        self.actions = AliraActions(db_path, telegram_bot)

        logger.info("ALIRA AI CEO initialized")

    async def run_hourly_monitoring(self):
        """Run hourly monitoring check"""
        logger.info("Running hourly monitoring...")
        try:
            results = await self.actions.execute_hourly_monitoring()
            logger.info(f"Hourly monitoring complete: {results}")
        except Exception as e:
            logger.error(f"Error in hourly monitoring: {e}")

    async def run_daily_actions(self):
        """Run daily actions at 9am"""
        logger.info("Running daily actions...")
        try:
            results = await self.actions.execute_daily_actions()

            report_path = f"reports/daily_{datetime.now().strftime('%Y%m%d')}.log"
            self.actions.export_action_log(report_path)

            logger.info(f"Daily actions complete")
        except Exception as e:
            logger.error(f"Error in daily actions: {e}")

    async def run_four_hourly_analysis(self):
        """Run analysis every 4 hours"""
        logger.info("Running 4-hourly analysis...")
        try:
            analysis = self.engine.analyze()

            report_path = f"reports/analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            import json
            with open(report_path, 'w') as f:
                json.dump(analysis, f, indent=2)

            summary = self.engine.get_executive_summary()
            logger.info(summary)

        except Exception as e:
            logger.error(f"Error in 4-hourly analysis: {e}")

    def schedule_tasks(self):
        """Schedule all recurring tasks"""
        schedule.every().hour.do(asyncio.run, self.run_hourly_monitoring())
        schedule.every().day.at("09:00").do(asyncio.run, self.run_daily_actions())
        schedule.every(4).hours.do(asyncio.run, self.run_four_hourly_analysis())

        logger.info("Tasks scheduled:")
        logger.info("  - Hourly: Monitoring check")
        logger.info("  - Daily at 09:00: Daily actions & summary")
        logger.info("  - Every 4 hours: Analysis & executive summary")

    async def run(self):
        """Main run loop"""
        logger.info("ALIRA AI CEO started")

        self.schedule_tasks()

        while True:
            schedule.run_pending()
            await asyncio.sleep(60)


def main():
    """Main entry point"""
    ceo = AIraCEO(DB_PATH, TELEGRAM_BOT_TOKEN, ADMIN_CHAT_ID)

    try:
        asyncio.run(ceo.run())
    except KeyboardInterrupt:
        logger.info("ALIRA AI CEO shutdown")


if __name__ == "__main__":
    main()
