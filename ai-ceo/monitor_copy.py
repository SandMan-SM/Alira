"""
ALIRA AI CEO Monitoring System

Continuously tracks business health metrics:
- Enrollment pipeline
- Membership revenue
- Certification progress
- Lead conversion rates
"""

import logging
import sqlite3
from datetime import datetime, timedelta
from typing import Dict, List, Any
import json

logger = logging.getLogger(__name__)


class AliraMonitor:
    """Monitor ALIRA business metrics"""

    def __init__(self, db_path: str):
        self.db_path = db_path

    def get_connection(self):
        """Get database connection"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def get_enrollment_metrics(self) -> Dict[str, Any]:
        """Track enrollment pipeline metrics"""
        conn = self.get_connection()
        cursor = conn.cursor()

        metrics = {}

        cursor.execute('SELECT COUNT(*) as count FROM leads WHERE status = "new"')
        metrics['new_leads'] = cursor.fetchone()['count']

        cursor.execute('SELECT COUNT(*) as count FROM leads WHERE status = "qualified"')
        metrics['qualified_leads'] = cursor.fetchone()['count']

        cursor.execute('SELECT COUNT(*) as count FROM leads WHERE status = "converted"')
        metrics['converted_leads'] = cursor.fetchone()['count']

        cursor.execute('SELECT COUNT(*) as count FROM enrollments WHERE status = "active"')
        metrics['active_enrollments'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT COUNT(*) as count FROM enrollments
            WHERE enrollment_date >= date('now', '-7 days')
        ''')
        metrics['enrollments_last_7_days'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT COUNT(*) as count FROM enrollments
            WHERE enrollment_date >= date('now', '-30 days')
        ''')
        metrics['enrollments_last_30_days'] = cursor.fetchone()['count']

        if metrics['new_leads'] > 0:
            conversion_rate = (metrics['converted_leads'] / metrics['new_leads']) * 100
            metrics['conversion_rate_percent'] = round(conversion_rate, 2)
        else:
            metrics['conversion_rate_percent'] = 0

        cursor.execute('''
            SELECT
                strftime('%Y-W%W', enrollment_date) as week,
                COUNT(*) as count
            FROM enrollments
            WHERE enrollment_date >= date('now', '-56 days')
            GROUP BY week
            ORDER BY week DESC
        ''')
        rows = cursor.fetchall()
        metrics['enrollments_by_week'] = {row['week']: row['count'] for row in rows}

        cursor.execute('''
            SELECT program_name, COUNT(*) as count
            FROM enrollments
            WHERE enrollment_date >= date('now', '-30 days')
            GROUP BY program_name
            ORDER BY count DESC
        ''')
        rows = cursor.fetchall()
        metrics['top_programs'] = {row['program_name']: row['count'] for row in rows}

        cursor.execute('''
            SELECT AVG(CAST((julianday(converted_at) - julianday(created_at)) AS INTEGER)) as days
            FROM leads
            WHERE converted_at IS NOT NULL AND created_at >= date('now', '-90 days')
        ''')
        row = cursor.fetchone()
        metrics['avg_days_to_conversion'] = round(row['days']) if row['days'] else None

        conn.close()
        return metrics

    def get_membership_metrics(self) -> Dict[str, Any]:
        """Track membership revenue and health"""
        conn = self.get_connection()
        cursor = conn.cursor()

        metrics = {}

        cursor.execute('SELECT COUNT(*) as count FROM memberships WHERE status = "active"')
        metrics['active_members'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT tier, COUNT(*) as count FROM memberships
            WHERE status = 'active'
            GROUP BY tier
            ORDER BY count DESC
        ''')
        rows = cursor.fetchall()
        metrics['members_by_tier'] = {row['tier']: row['count'] for row in rows}

        cursor.execute('''
            SELECT SUM(price) as total FROM memberships
            WHERE status = 'active'
        ''')
        row = cursor.fetchone()
        metrics['monthly_mrr'] = row['total'] or 0.0

        cursor.execute('''
            SELECT COUNT(*) as count FROM memberships
            WHERE status = 'cancelled'
            AND renewal_date >= date('now', '-30 days')
        ''')
        metrics['churned_last_30_days'] = cursor.fetchone()['count']

        if metrics['active_members'] > 0:
            churn_rate = (metrics['churned_last_30_days'] / max(metrics['active_members'], 1)) * 100
            metrics['monthly_churn_rate_percent'] = round(churn_rate, 2)
        else:
            metrics['monthly_churn_rate_percent'] = 0

        cursor.execute('''
            SELECT COUNT(*) as count FROM memberships
            WHERE status = 'active'
            AND last_activity_date < date('now', '-14 days')
        ''')
        metrics['inactive_members_14_days'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT
                tier,
                SUM(price) as revenue
            FROM memberships
            WHERE status = 'active'
            GROUP BY tier
        ''')
        rows = cursor.fetchall()
        metrics['revenue_by_tier'] = {row['tier']: row['revenue'] for row in rows}

        cursor.execute('''
            SELECT COUNT(*) as count FROM memberships
            WHERE status = 'active' AND start_date >= date('now', '-30 days')
        ''')
        metrics['new_members_last_30_days'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT SUM(CASE WHEN status = 'completed' THEN price ELSE 0 END) as ltv
            FROM enrollments
            WHERE user_id IN (
                SELECT user_id FROM memberships WHERE status = 'active'
            )
        ''')
        row = cursor.fetchone()
        metrics['member_enrollment_value'] = row['ltv'] or 0.0

        conn.close()
        return metrics

    def get_certification_metrics(self) -> Dict[str, Any]:
        """Track certification progress and completion"""
        conn = self.get_connection()
        cursor = conn.cursor()

        metrics = {}

        cursor.execute('''
            SELECT COUNT(*) as count FROM certifications
            WHERE status = 'in_progress'
        ''')
        metrics['students_in_progress'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT COUNT(*) as count FROM certifications
            WHERE status = 'completed'
        ''')
        metrics['graduates'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT AVG(progress_percentage) as avg_progress
            FROM certifications
            WHERE status = 'in_progress'
        ''')
        row = cursor.fetchone()
        metrics['avg_progress_percent'] = round(row['avg_progress']) if row['avg_progress'] else 0

        total = metrics['students_in_progress'] + metrics['graduates']
        if total > 0:
            completion_rate = (metrics['graduates'] / total) * 100
            metrics['completion_rate_percent'] = round(completion_rate, 2)
        else:
            metrics['completion_rate_percent'] = 0

        cursor.execute('''
            SELECT
                cohort_id,
                COUNT(*) as count,
                AVG(progress_percentage) as avg_progress,
                COUNT(CASE WHEN status = 'completed' THEN 1 END) as completions
            FROM certifications
            WHERE status IN ('in_progress', 'completed')
            GROUP BY cohort_id
            ORDER BY cohort_id DESC
        ''')
        rows = cursor.fetchall()
        metrics['cohorts'] = [
            {
                'cohort_id': row['cohort_id'],
                'students': row['count'],
                'avg_progress': round(row['avg_progress']),
                'completions': row['completions']
            }
            for row in rows
        ]

        cursor.execute('''
            SELECT
                AVG(CAST((julianday(actual_completion) - julianday(start_date)) AS INTEGER)) as avg_days
            FROM certifications
            WHERE status = 'completed' AND actual_completion IS NOT NULL
        ''')
        row = cursor.fetchone()
        metrics['avg_completion_time_days'] = round(row['avg_days']) if row['avg_days'] else None

        cursor.execute('''
            SELECT COUNT(*) as count FROM certifications
            WHERE status = 'in_progress'
            AND progress_percentage = 0
            AND start_date < date('now', '-30 days')
        ''')
        metrics['stalled_students'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT COUNT(*) as count FROM certifications
            WHERE status = 'completed'
            AND actual_completion >= date('now', '-30 days')
        ''')
        metrics['completions_last_30_days'] = cursor.fetchone()['count']

        conn.close()
        return metrics

    def get_revenue_metrics(self) -> Dict[str, Any]:
        """Track all revenue sources"""
        conn = self.get_connection()
        cursor = conn.cursor()

        metrics = {}

        cursor.execute('''
            SELECT SUM(amount) as total FROM revenue_log
            WHERE status = 'completed'
        ''')
        row = cursor.fetchone()
        metrics['total_revenue_all_time'] = row['total'] or 0.0

        cursor.execute('''
            SELECT SUM(amount) as total FROM revenue_log
            WHERE status = 'completed' AND date >= date('now', '-30 days')
        ''')
        row = cursor.fetchone()
        metrics['revenue_last_30_days'] = row['total'] or 0.0

        cursor.execute('''
            SELECT
                source,
                SUM(amount) as total,
                COUNT(*) as count
            FROM revenue_log
            WHERE status = 'completed' AND date >= date('now', '-30 days')
            GROUP BY source
            ORDER BY total DESC
        ''')
        rows = cursor.fetchall()
        metrics['revenue_by_source_30d'] = {
            row['source']: {
                'total': row['total'],
                'count': row['count']
            }
            for row in rows
        }

        enrollment_revenue = sum(
            row['total'] for row in cursor.execute('''
                SELECT SUM(amount) as total FROM revenue_log
                WHERE source = 'enrollment' AND status = 'completed'
                AND date >= date('now', '-30 days')
            ''').fetchall()
        )

        cursor.execute('''
            SELECT SUM(price) as total FROM memberships
            WHERE status = 'active'
        ''')
        row = cursor.fetchone()
        membership_mrr = row['total'] or 0.0

        metrics['monthly_run_rate'] = membership_mrr
        metrics['avg_revenue_per_customer'] = (
            metrics['revenue_last_30_days'] / max(metrics['active_members'], 1)
        ) if 'active_members' in dir(self) else 0

        cursor.execute('''
            SELECT SUM(revenue_amount) as total FROM enrollments
            WHERE status = 'active'
        ''')
        row = cursor.fetchone()
        metrics['active_enrollment_value'] = row['total'] or 0.0

        conn.close()
        return metrics

    def get_lead_quality_metrics(self) -> Dict[str, Any]:
        """Analyze lead quality and conversion"""
        conn = self.get_connection()
        cursor = conn.cursor()

        metrics = {}

        cursor.execute('''
            SELECT COUNT(*) as count FROM leads
            WHERE quality_score >= 75
        ''')
        metrics['high_quality_leads'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT COUNT(*) as count FROM leads
            WHERE quality_score BETWEEN 50 AND 74
        ''')
        metrics['medium_quality_leads'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT COUNT(*) as count FROM leads
            WHERE quality_score < 50
        ''')
        metrics['low_quality_leads'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT
                CASE
                    WHEN quality_score >= 75 THEN 'high'
                    WHEN quality_score >= 50 THEN 'medium'
                    ELSE 'low'
                END as quality,
                COUNT(*) as count,
                SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END) as conversions
            FROM leads
            GROUP BY quality
        ''')
        rows = cursor.fetchall()
        metrics['conversion_by_quality'] = {}
        for row in rows:
            conv_rate = (row['conversions'] / row['count'] * 100) if row['count'] > 0 else 0
            metrics['conversion_by_quality'][row['quality']] = {
                'count': row['count'],
                'conversions': row['conversions'],
                'rate': round(conv_rate, 2)
            }

        cursor.execute('''
            SELECT COUNT(*) as count FROM leads
            WHERE status = 'qualified' AND contacted_at IS NULL
            AND created_at < date('now', '-1 days')
        ''')
        metrics['uncontacted_qualified_leads'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT COUNT(*) as count FROM leads
            WHERE quality_score >= 75 AND status NOT IN ('converted', 'lost')
            AND created_at < date('now', '-7 days')
            AND (contacted_at IS NULL OR contacted_at < date('now', '-7 days'))
        ''')
        metrics['stale_high_value_leads'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT program_interest, COUNT(*) as count
            FROM leads
            WHERE status = 'new'
            GROUP BY program_interest
            ORDER BY count DESC
        ''')
        rows = cursor.fetchall()
        metrics['lead_interests'] = {row['program_interest']: row['count'] for row in rows}

        conn.close()
        return metrics

    def get_user_metrics(self) -> Dict[str, Any]:
        """Overall user and engagement metrics"""
        conn = self.get_connection()
        cursor = conn.cursor()

        metrics = {}

        cursor.execute('SELECT COUNT(*) as count FROM users')
        metrics['total_users'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT COUNT(*) as count FROM users
            WHERE join_date >= date('now', '-30 days')
        ''')
        metrics['new_users_last_30_days'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT COUNT(*) as count FROM users
            WHERE last_activity_date >= date('now', '-7 days')
        ''')
        metrics['active_users_7_days'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT COUNT(DISTINCT user_id) as count FROM users
            WHERE last_activity_date >= date('now', '-30 days')
        ''')
        metrics['active_users_30_days'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT COUNT(DISTINCT user_id) as count FROM users u
            WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.user_id = u.user_id)
            OR EXISTS (SELECT 1 FROM memberships m WHERE m.user_id = u.user_id)
        ''')
        metrics['engaged_users'] = cursor.fetchone()['count']

        cursor.execute('''
            SELECT email FROM users
            WHERE email IS NOT NULL AND LENGTH(email) > 0
        ''')
        metrics['users_with_email'] = len(cursor.fetchall())

        cursor.execute('''
            SELECT email FROM users
            WHERE phone_number IS NOT NULL AND LENGTH(phone_number) > 0
        ''')
        metrics['users_with_phone'] = len(cursor.fetchall())

        conn.close()
        return metrics

    def generate_report(self) -> Dict[str, Any]:
        """Generate comprehensive business health report"""
        timestamp = datetime.now().isoformat()

        return {
            'timestamp': timestamp,
            'enrollment_metrics': self.get_enrollment_metrics(),
            'membership_metrics': self.get_membership_metrics(),
            'certification_metrics': self.get_certification_metrics(),
            'revenue_metrics': self.get_revenue_metrics(),
            'lead_quality_metrics': self.get_lead_quality_metrics(),
            'user_metrics': self.get_user_metrics()
        }

    def log_report(self, report: Dict[str, Any], log_file: str = None):
        """Log monitoring report"""
        timestamp = report['timestamp']
        logger.info(f"=== ALIRA Business Health Report - {timestamp} ===")

        logger.info(f"Users: {report['user_metrics']['total_users']}")
        logger.info(f"Active Members: {report['membership_metrics']['active_members']}")
        logger.info(f"Active Enrollments: {report['enrollment_metrics']['active_enrollments']}")
        logger.info(f"Conversion Rate: {report['enrollment_metrics']['conversion_rate_percent']}%")
        logger.info(f"Monthly MRR: ${report['membership_metrics']['monthly_mrr']:.2f}")
        logger.info(f"Revenue (30d): ${report['revenue_metrics']['revenue_last_30_days']:.2f}")
        logger.info(f"Churn Rate: {report['membership_metrics']['monthly_churn_rate_percent']}%")
        logger.info(f"Students in Progress: {report['certification_metrics']['students_in_progress']}")
        logger.info(f"Completion Rate: {report['certification_metrics']['completion_rate_percent']}%")

        if log_file:
            with open(log_file, 'a') as f:
                f.write(json.dumps(report) + '\n')
