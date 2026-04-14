"""
ALIRA AI CEO Actions Layer

Takes data-driven actions based on decision flags:
- Enrollment alerts
- Re-engagement nudges
- Revenue summaries
- Admin notifications
"""

import logging
import json
from typing import Dict, List, Any
from datetime import datetime
from decision import AliradDecisionEngine
from monitor import AliraMonitor

logger = logging.getLogger(__name__)


class AliraActions:
    """Execute business actions based on AI CEO decisions"""

    def __init__(self, db_path: str, telegram_bot=None):
        self.db_path = db_path
        self.monitor = AliraMonitor(db_path)
        self.engine = AliradDecisionEngine(db_path)
        self.telegram_bot = telegram_bot
        self.action_log = []

    async def execute_daily_actions(self) -> Dict[str, Any]:
        """Execute daily automated actions at 9am"""
        logger.info("ALIRA: Executing daily actions...")

        analysis = self.engine.analyze()
        results = {
            'timestamp': datetime.now().isoformat(),
            'actions_taken': [],
            'notifications_sent': []
        }

        if analysis['alerts']:
            await self.send_admin_alert_summary(analysis)
            results['notifications_sent'].append('admin_alert_summary')

        await self.send_enrollment_summary(analysis)
        results['notifications_sent'].append('enrollment_summary')

        await self.identify_and_send_reengagement_nudges(analysis)
        results['actions_taken'].append('reengagement_nudges')

        results['actions_taken'].append('revenue_summary')

        results['executive_summary'] = self.engine.get_executive_summary()

        logger.info(f"Daily actions complete: {json.dumps(results, indent=2)}")
        return results

    async def execute_hourly_monitoring(self) -> Dict[str, Any]:
        """Hourly monitoring check for critical issues"""
        analysis = self.engine.analyze()
        results = {
            'timestamp': datetime.now().isoformat(),
            'alerts_detected': len(analysis['alerts']),
            'critical_alerts': []
        }

        critical_alerts = [a for a in analysis['alerts'] if a['severity'] == 'CRITICAL']
        results['critical_alerts'] = critical_alerts

        if critical_alerts:
            await self.send_critical_alert_notification(critical_alerts)
            results['critical_notification_sent'] = True

        return results

    async def send_admin_alert_summary(self, analysis: Dict[str, Any]) -> None:
        """Send admin summary of alerts"""
        if not self.telegram_bot:
            logger.warning("No Telegram bot configured for admin notifications")
            return

        admin_chat_id = self.telegram_bot.admin_chat_id

        alerts = analysis['alerts']
        if not alerts:
            return

        message = "🚨 *ALIRA AI CEO - DAILY ALERT SUMMARY*\n\n"

        critical = [a for a in alerts if a['severity'] == 'CRITICAL']
        high = [a for a in alerts if a['severity'] == 'HIGH']
        medium = [a for a in alerts if a['severity'] == 'MEDIUM']

        if critical:
            message += "🔴 *CRITICAL ALERTS:*\n"
            for alert in critical:
                message += f"  • {alert['type']}\n"
                message += f"    {alert['message']}\n"
                message += f"    → {alert['action']}\n\n"

        if high:
            message += "🟠 *HIGH PRIORITY:*\n"
            for alert in high:
                message += f"  • {alert['type']}\n"
                message += f"    {alert['message']}\n\n"

        if medium:
            message += f"🟡 *{len(medium)} Medium Priority Items*\n"

        try:
            await self.telegram_bot.send_admin_message(message)
            self.action_log.append({
                'action': 'admin_alert_summary',
                'timestamp': datetime.now().isoformat(),
                'alerts_sent': len(alerts),
                'status': 'success'
            })
        except Exception as e:
            logger.error(f"Failed to send admin alert: {e}")
            self.action_log.append({
                'action': 'admin_alert_summary',
                'timestamp': datetime.now().isoformat(),
                'status': 'failed',
                'error': str(e)
            })

    async def send_critical_alert_notification(self, critical_alerts: List[Dict[str, Any]]) -> None:
        """Send immediate notification for critical alerts"""
        if not self.telegram_bot:
            return

        for alert in critical_alerts:
            message = f"🚨 *CRITICAL ALERT - {alert['type']}*\n\n"
            message += f"{alert['message']}\n\n"
            message += f"Action Required: {alert['action']}"

            try:
                await self.telegram_bot.send_admin_message(message)
                self.action_log.append({
                    'action': f'critical_alert_{alert["type"]}',
                    'timestamp': datetime.now().isoformat(),
                    'status': 'notified'
                })
            except Exception as e:
                logger.error(f"Failed to send critical alert: {e}")

    async def send_enrollment_summary(self, analysis: Dict[str, Any]) -> None:
        """Send daily enrollment summary to admin"""
        if not self.telegram_bot:
            return

        metrics = analysis['metrics']['enrollment_metrics']

        message = "📊 *ENROLLMENT REPORT - Daily Summary*\n\n"
        message += f"📈 New Enrollments (7d): {metrics['enrollments_last_7_days']}\n"
        message += f"📈 Total Enrollments (30d): {metrics['enrollments_last_30_days']}\n"
        message += f"📋 Active Inquiries: {metrics['new_leads']}\n"
        message += f"✅ Conversion Rate: {metrics['conversion_rate_percent']}%\n"
        message += f"⏱️  Avg Days to Conversion: {metrics.get('avg_days_to_conversion', 'N/A')} days\n\n"

        if metrics['top_programs']:
            message += "*Top Programs:*\n"
            for program, count in list(metrics['top_programs'].items())[:3]:
                message += f"  • {program}: {count} enrollments\n"

        try:
            await self.telegram_bot.send_admin_message(message)
            self.action_log.append({
                'action': 'enrollment_summary',
                'timestamp': datetime.now().isoformat(),
                'status': 'success'
            })
        except Exception as e:
            logger.error(f"Failed to send enrollment summary: {e}")

    async def identify_and_send_reengagement_nudges(self, analysis: Dict[str, Any]) -> None:
        """Identify inactive users and send re-engagement messages"""
        membership_metrics = analysis['metrics']['membership_metrics']
        inactive_members = membership_metrics['inactive_members_14_days']

        if inactive_members == 0:
            return

        logger.info(f"Identifying {inactive_members} inactive members for re-engagement...")

        import sqlite3
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        cursor.execute('''
            SELECT m.membership_id, m.user_id, m.tier, u.username
            FROM memberships m
            JOIN users u ON m.user_id = u.user_id
            WHERE m.status = 'active'
            AND m.last_activity_date < date('now', '-14 days')
            ORDER BY m.last_activity_date ASC
            LIMIT 10
        ''')

        inactive = cursor.fetchall()
        conn.close()

        reengaged = 0
        for member in inactive:
            if self.telegram_bot:
                try:
                    await self.telegram_bot.send_reengagement_message(
                        user_id=member['user_id'],
                        tier=member['tier']
                    )
                    reengaged += 1
                except Exception as e:
                    logger.warning(f"Failed to send reengagement to {member['username']}: {e}")

        self.action_log.append({
            'action': 'reengagement_nudges',
            'timestamp': datetime.now().isoformat(),
            'members_targeted': inactive_members,
            'messages_sent': reengaged,
            'status': 'partial' if reengaged > 0 else 'failed'
        })

    async def process_new_leads(self) -> None:
        """Process and qualify new leads"""
        import sqlite3
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        cursor.execute('''
            SELECT lead_id, user_id, program_interest, budget
            FROM leads
            WHERE status = 'new'
            AND created_at >= date('now', '-24 hours')
            LIMIT 10
        ''')

        new_leads = cursor.fetchall()

        qualified = 0
        for lead in new_leads:
            quality_score = self.calculate_lead_quality(lead)

            if quality_score > 75:
                status = 'qualified'
                qualified += 1
            elif quality_score > 50:
                status = 'qualified'
                qualified += 1
            else:
                status = 'new'

            cursor.execute('''
                UPDATE leads
                SET quality_score = ?, status = ?
                WHERE lead_id = ?
            ''', (quality_score, status, lead['lead_id']))

        conn.commit()
        conn.close()

        logger.info(f"Qualified {qualified} out of {len(new_leads)} new leads")

        self.action_log.append({
            'action': 'process_new_leads',
            'timestamp': datetime.now().isoformat(),
            'leads_processed': len(new_leads),
            'leads_qualified': qualified,
            'status': 'success'
        })

    def calculate_lead_quality(self, lead: Dict[str, Any]) -> int:
        """Calculate lead quality score (0-100)"""
        score = 50

        if lead['program_interest'] == 'Medium Certification':
            score += 15

        if lead['budget'] and lead['budget'] >= 5000:
            score += 20

        import sqlite3
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT email FROM users WHERE user_id = ?', (lead['user_id'],))
        user = cursor.fetchone()
        conn.close()

        if user and user[0]:
            score += 10

        return min(score, 100)

    def get_revenue_summary(self, days: int = 30) -> Dict[str, Any]:
        """Calculate revenue summary"""
        metrics = self.monitor.get_revenue_metrics()

        return {
            'period_days': days,
            'total_revenue': metrics['revenue_last_30_days'],
            'by_source': metrics['revenue_by_source_30d'],
            'monthly_mrr': metrics['monthly_mrr'],
            'active_enrollment_value': metrics['active_enrollment_value']
        }

    async def send_revenue_summary(self) -> None:
        """Send revenue summary to admin"""
        if not self.telegram_bot:
            return

        revenue = self.get_revenue_summary()

        message = "💰 *REVENUE REPORT - Monthly Summary*\n\n"
        message += f"📈 Total Revenue (30d): ${revenue['total_revenue']:.2f}\n"
        message += f"📈 Monthly Recurring Revenue: ${revenue['monthly_mrr']:.2f}\n"
        message += f"📈 Active Enrollment Value: ${revenue['active_enrollment_value']:.2f}\n\n"

        if revenue['by_source']:
            message += "*Revenue by Source:*\n"
            for source, data in revenue['by_source'].items():
                message += f"  • {source}: ${data['total']:.2f} ({data['count']} transactions)\n"

        try:
            await self.telegram_bot.send_admin_message(message)
        except Exception as e:
            logger.error(f"Failed to send revenue summary: {e}")

    def get_cohort_status(self) -> List[Dict[str, Any]]:
        """Get status of all certification cohorts"""
        return self.monitor.get_active_cohorts()

    async def send_cohort_report(self) -> None:
        """Send certification cohort report"""
        if not self.telegram_bot:
            return

        cohorts = self.get_cohort_status()

        message = "🎓 *CERTIFICATION COHORT REPORT*\n\n"

        for cohort in cohorts:
            completion_rate = 0
            if cohort['students'] > 0:
                completion_rate = (cohort['completions'] / cohort['students']) * 100

            message += f"*Cohort {cohort['cohort_id']}*\n"
            message += f"  Students: {cohort['students']}\n"
            message += f"  Avg Progress: {cohort['avg_progress']}%\n"
            message += f"  Completions: {cohort['completions']} ({completion_rate:.0f}%)\n\n"

        try:
            await self.telegram_bot.send_admin_message(message)
        except Exception as e:
            logger.error(f"Failed to send cohort report: {e}")

    def export_action_log(self, filepath: str) -> None:
        """Export action log to file"""
        with open(filepath, 'w') as f:
            f.write(json.dumps(self.action_log, indent=2))
        logger.info(f"Action log exported to {filepath}")
