import os
import logging
from dotenv import load_dotenv

load_dotenv()

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
ADMIN_CHAT_ID = os.getenv("ADMIN_CHAT_ID", "")
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)
logger = logging.getLogger(__name__)


def validate_config():
    if not TELEGRAM_BOT_TOKEN:
        logger.error("No TELEGRAM_BOT_TOKEN configured.")
        raise ValueError("No TELEGRAM_BOT_TOKEN configured.")


PROGRAMS = {
    "medium": {
        "name": "Medium Certification",
        "price": 10000,
        "currency": "USD",
        "duration": "6-12 months",
        "description": "Advanced certification including intuitive development, energy reading, spiritual communication, ethics, client training, and historical frameworks.",
        "modules": [
            "Intuitive Development",
            "Energy Reading & Manipulation",
            "Spiritual Communication",
            "Ethics & Responsibility",
            "Client Session Training",
            "Historical Spiritual Frameworks",
            "Advanced Practices",
            "Capstone Project"
        ]
    },
    "practitioner": {
        "name": "Practitioner Training",
        "price": 3500,
        "currency": "USD",
        "duration": "3-6 months",
        "description": "Intermediate training in energy healing, intuitive reading, and spiritual counseling with ethics foundation.",
        "modules": [
            "Energy Healing Basics",
            "Intuitive Reading Techniques",
            "Spiritual Counseling",
            "Ethics & Practice Standards",
            "Client Management",
            "Advanced Techniques"
        ]
    },
    "foundations": {
        "name": "Spiritual Foundations",
        "price": 600,
        "currency": "USD",
        "duration": "6-8 weeks",
        "description": "Introduction to meditation, intuition basics, energy awareness, and consciousness theory.",
        "modules": [
            "Meditation & Mindfulness",
            "Intuition Development",
            "Energy Awareness",
            "Consciousness Theory",
            "Spiritual Philosophy"
        ]
    }
}

MEMBERSHIP_TIERS = {
    "basic": {
        "name": "ALIRA Circle - Basic",
        "price": 25,
        "currency": "USD",
        "frequency": "monthly",
        "description": "Access to community and foundational teachings.",
        "benefits": [
            "Monthly group meditations",
            "Community discussions",
            "Basic teaching library",
            "Newsletter"
        ]
    },
    "standard": {
        "name": "ALIRA Circle - Standard",
        "price": 50,
        "currency": "USD",
        "frequency": "monthly",
        "description": "Full membership with live teachings and history research.",
        "benefits": [
            "Everything in Basic",
            "Weekly live teachings",
            "Full library access",
            "History research access",
            "Expert Q&A sessions",
            "Community directory"
        ]
    },
    "premium": {
        "name": "ALIRA Circle - Premium",
        "price": 75,
        "currency": "USD",
        "frequency": "monthly",
        "description": "VIP access with priority support and exclusive content.",
        "benefits": [
            "Everything in Standard",
            "Priority support",
            "Exclusive advanced teachings",
            "Monthly private group sessions",
            "Member-only events",
            "Certification discount (10%)"
        ]
    }
}

RETREAT_EVENTS = {
    "spring": {
        "name": "Spring Spiritual Retreat",
        "dates": "April 15-20, 2024",
        "location": "Costa Rica",
        "price": 3500,
        "capacity": 25,
        "description": "5-day immersive retreat with meditation, intuitive training, ceremonies, and teachings."
    },
    "summer": {
        "name": "Summer Leadership Summit",
        "dates": "July 10-14, 2024",
        "location": "Sedona, Arizona",
        "price": 2500,
        "capacity": 50,
        "description": "5-day intensive on spiritual leadership and consciousness development."
    },
    "annual": {
        "name": "Annual ALIRA Summit",
        "dates": "October 1-5, 2024",
        "location": "New York",
        "price": 1500,
        "capacity": 500,
        "description": "Large gathering with lectures, workshops, certifications, and community celebrations."
    }
}

SESSION_PRICING = {
    "session_30min": {
        "name": "30-Minute Session",
        "duration": 30,
        "price": 100,
        "currency": "USD"
    },
    "session_60min": {
        "name": "60-Minute Session",
        "duration": 60,
        "price": 200,
        "currency": "USD"
    },
    "session_90min": {
        "name": "90-Minute Deep Session",
        "duration": 90,
        "price": 300,
        "currency": "USD"
    }
}

QUALITY_SCORE_THRESHOLDS = {
    "high": 75,
    "medium": 50,
    "low": 25
}

ENROLLMENT_ALERT_THRESHOLD = 2  # Less than 2 enrollments per week

MEMBERSHIP_CHURN_DAYS = 14  # Days of inactivity before churn alert

LEAD_INACTIVITY_DAYS = 7  # Days before high-value lead flagged as stale
