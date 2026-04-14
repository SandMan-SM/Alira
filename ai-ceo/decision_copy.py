"""
ALIRA AI CEO Decision Layer

Analyzes monitoring data and flags critical business issues:
- Slow enrollment periods
- Membership churn signals
- High-value lead inactivity
- Revenue at-risk
- Opportunity signals
"""

import logging
from typing import Dict, List, Any
from datetime import datetime, timedelta
from monitor import AliraMonitor

logger = logging.getLogger(__name__)


class AliradDecisionEngine:
    """Decision-making AI CEO for ALIRA"""

    ENROLLMENT_ALERT_THRESHOLD = 2  # Less than 2 enrollments per week
    MEMBERSHIP_CHURN_DAYS = 14
    LEAD_INACTIVITY_DAYS = 7
    MIN_HIGH_VALUE_QUALITY = 60

    def __init__(self, db_path: str):
        self.monitor = AliraMonitor(db_path)
        self.alerts = []
        self.opportunities = []

    def analyze(self) -> Dict[str, Any]:
        """Run full analysis and return decision report"""
        self.alerts = []
        self.opportunities = []

        report = self.monitor.generate_report()

        self.check_slow_enrollment(report)
        self.check_membership_churn(report)
        self.check_lead_inactivity(report)
        self.check_revenue_health(report)
        self.identify_opportunities(report)

        return {
            'timestamp': datetime.now().isoformat(),
            'alerts': self.alerts,
            'opportunities': self.opportunities,
            'metrics': report
        }

    def check_slow_enrollment(self, report: Dict[str, Any]) -> None:
        """Flag if enrollment is below target"""
        enrollment_metrics = report['enrollment_metrics']
        enrollments_7d = enrollment_metrics['enrollments_last_7_days']

        if enrollments_7d < self.ENROLLMENT_ALERT_THRESHOLD:
            severity = 'CRITICAL' if enrollments_7d == 0 else 'HIGH'

            alert = {
                'type': 'SLOW_ENROLLMENT',
                'severity': severity,
                'message': f'Only {enrollments_7d} enrollment(s) in last 7 days (target: {self.ENROLLMENT_ALERT_THRESHOLD}+)',
                'metric': enrollments_7d,
                'target': self.ENROLLMENT_ALERT_THRESHOLD * 7,
                'action': 'Review marketing channels, lead nurturing, pricing, or messaging'
            }
            self.alerts.append(alert)
            logger.warning(f"ALERT: {alert['message']}")

    def check_membership_churn(self, report: Dict[str, Any]) -> None:
        """Flag unhealthy membership churn"""
        membership_metrics = report['membership_metrics']
        churn_rate = membership_metrics['monthly_churn_rate_percent']
        inactive_members = membership_metrics['inactive_members_14_days']

        if churn_rate > 15:
            alert = {
                'type': 'HIGH_CHURN',
                'severity': 'HIGH' if churn_rate > 25 else 'MEDIUM',
                'message': f'Monthly churn rate is {churn_rate}% (target: <10%)',
                'metric': churn_rate,
                'target': 10,
                'action': 'Analyze cancellation reasons, improve engagement, create retention campaigns'
            }
            self.alerts.append(alert)
            logger.warning(f"ALERT: {alert['message']}")

        if inactive_members > membership_metrics['active_members'] * 0.2:
            alert = {
                'type': 'INACTIVE_MEMBERS',
                'severity': 'MEDIUM',
                'message': f'{inactive_members} members inactive >14 days',
                'metric': inactive_members,
                'target': int(membership_metrics['active_members'] * 0.1),
                'action': 're-engagement campaign with valuable content and offers'
            }
            self.alerts.append(alert)
            logger.warning(f"ALERT: {alert['message']}")

    def check_lead_inactivity(self, report: Dict[str, Any]) -> None:
        """Flag high-value leads inactive too long"""
        lead_metrics = report['lead_quality_metrics']
        stale_leads = lead_metrics['stale_high_value_leads']
        uncontacted = lead_metrics['uncontacted_qualified_leads']

        if stale_leads > 0:
            alert = {
                'type': 'STALE_HIGH_VALUE_LEADS',
                'severity': 'MEDIUM' if stale_leads <= 3 else 'HIGH',
                'message': f'{stale_leads} high-quality leads inactive >7 days',
                'metric': stale_leads,
                'target': 0,
                'action': 'Personalized re-engagement: testimonials, special offers, 1-on-1 calls'
            }
            self.alerts.append(alert)
            logger.warning(f"ALERT: {alert['message']}")

        if uncontacted > 0:
            alert = {
                'type': 'UNCONTACTED_QUALIFIED_LEADS',
                'severity': 'HIGH',
                'message': f'{uncontacted} qualified leads not yet contacted',
                'metric': uncontacted,
                'target': 0,
                'action': 'Immediate follow-up: warmest leads first, personalized approach'
            }
            self.alerts.append(alert)
            logger.warning(f"ALERT: {alert['message']}")

    def check_revenue_health(self, report: Dict[str, Any]) -> None:
        """Flag concerning revenue trends"""
        revenue_metrics = report['revenue_metrics']
        enrollment_metrics = report['enrollment_metrics']

        monthly_revenue = revenue_metrics['revenue_last_30_days']
        avg_days_to_conversion = enrollment_metrics['avg_days_to_conversion']

        if monthly_revenue == 0 and enrollment_metrics['enrollments_last_30_days'] == 0:
            alert = {
                'type': 'NO_REVENUE',
                'severity': 'CRITICAL',
                'message': 'Zero revenue in last 30 days',
                'metric': 0,
                'target': 10000,
                'action': 'Emergency review of sales pipeline, pricing, and market conditions'
            }
            self.alerts.append(alert)
            logger.critical(f"ALERT: {alert['message']}")

        if avg_days_to_conversion and avg_days_to_conversion > 30:
            alert = {
                'type': 'LONG_SALES_CYCLE',
                'severity': 'MEDIUM',
                'message': f'Average {avg_days_to_conversion} days to convert leads (target: <14 days)',
                'metric': avg_days_to_conversion,
                'target': 14,
                'action': 'Streamline qualification process, improve messaging clarity, increase touchpoints'
            }
            self.alerts.append(alert)
            logger.warning(f"ALERT: {alert['message']}")

    def identify_opportunities(self, report: Dict[str, Any]) -> None:
        """Identify growth opportunities"""
        enrollment_metrics = report['enrollment_metrics']
        membership_metrics = report['membership_metrics']
        certification_metrics = report['certification_metrics']
        lead_metrics = report['lead_quality_metrics']
        revenue_metrics = report['revenue_metrics']

        conversion_rate = enrollment_metrics['conversion_rate_percent']
        if conversion_rate > 20:
            opp = {
                'type': 'HIGH_CONVERSION_RATE',
                'message': f'Strong conversion rate at {conversion_rate}% - scale marketing spend',
                'metric': conversion_rate,
                'action': 'Increase ad spend, scale successful channels, expand audience reach'
            }
            self.opportunities.append(opp)
            logger.info(f"OPPORTUNITY: {opp['message']}")

        high_quality_leads = lead_metrics['high_quality_leads']
        if high_quality_leads > 5:
            opp = {
                'type': 'QUALITY_LEAD_POOL',
                'message': f'{high_quality_leads} high-quality leads ready for nurturing',
                'metric': high_quality_leads,
                'action': 'Personalized follow-up, limited-time offers, payment plans'
            }
            self.opportunities.append(opp)
            logger.info(f"OPPORTUNITY: {opp['message']}")

        top_program = enrollment_metrics['top_programs']
        if top_program:
            leading_program = max(top_program.items(), key=lambda x: x[1])
            opp = {
                'type': 'TOP_PROGRAM_MOMENTUM',
                'message': f'{leading_program[0]} is leading ({leading_program[1]} enrollments) - emphasize in marketing',
                'metric': leading_program[1],
                'action': f'Create case studies, testimonials, and social proof for {leading_program[0]}'
            }
            self.opportunities.append(opp)
            logger.info(f"OPPORTUNITY: {opp['message']}")

        completions = certification_metrics['completions_last_30_days']
        if completions > 0:
            graduates = certification_metrics['graduates']
            opp = {
                'type': 'GRADUATION_CONVERSIONS',
                'message': f'{completions} recent graduates - upsell to premium memberships and sessions',
                'metric': completions,
                'action': 'Special session packages, advanced training, mentorship programs'
            }
            self.opportunities.append(opp)
            logger.info(f"OPPORTUNITY: {opp['message']}")

        monthly_mrr = membership_metrics['monthly_mrr']
        if monthly_mrr > 0:
            potential_churn_value = monthly_mrr * (membership_metrics['monthly_churn_rate_percent'] / 100)
            if potential_churn_value > 0:
                opp = {
                    'type': 'CHURN_PREVENTION_VALUE',
                    'message': f'${potential_churn_value:.2f}/month at risk from churn - retention ROI is high',
                    'metric': potential_churn_value,
                    'action': 'Invest in member engagement, exclusive content, community building'
                }
                self.opportunities.append(opp)
                logger.info(f"OPPORTUNITY: {opp['message']}")

        avg_revenue_per_enrollment = revenue_metrics.get('active_enrollment_value', 0)
        new_enrollments = enrollment_metrics['enrollments_last_30_days']
        if new_enrollments > 3 and avg_revenue_per_enrollment > 1000:
            opp = {
                'type': 'PREMIUM_PROGRAM_SUCCESS',
                'message': f'Premium programs averaging ${avg_revenue_per_enrollment/new_enrollments:.2f} per enrollment',
                'metric': avg_revenue_per_enrollment,
                'action': 'Highlight success stories, create waiting lists, exclusive access offers'
            }
            self.opportunities.append(opp)
            logger.info(f"OPPORTUNITY: {opp['message']}")

        unconverted_rate = 100 - conversion_rate
        if unconverted_rate > 70:
            opp = {
                'type': 'NURTURING_OPPORTUNITY',
                'message': f'{unconverted_rate:.0f}% of leads not yet converted - implement nurture sequences',
                'metric': unconverted_rate,
                'action': 'Email sequences, webinars, payment plan options, limited-time offers'
            }
            self.opportunities.append(opp)
            logger.info(f"OPPORTUNITY: {opp['message']}")

        stalled_students = certification_metrics['stalled_students']
        if stalled_students > 0:
            opp = {
                'type': 'COMPLETION_INTERVENTION',
                'message': f'{stalled_students} students stalled >30 days - intervention prevents dropouts',
                'metric': stalled_students,
                'action': 'Personal outreach, payment plans, mentorship, break down modules'
            }
            self.opportunities.append(opp)
            logger.info(f"OPPORTUNITY: {opp['message']}")

    def get_action_items(self) -> List[str]:
        """Get prioritized action items based on alerts and opportunities"""
        actions = []

        for alert in sorted(self.alerts, key=lambda x: {'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2}.get(x['severity'], 3)):
            actions.append(f"[{alert['severity']}] {alert['type']}: {alert['action']}")

        for opp in self.opportunities[:3]:
            actions.append(f"[OPPORTUNITY] {opp['type']}: {opp['action']}")

        return actions

    def get_executive_summary(self) -> str:
        """Get executive summary for leadership"""
        analysis = self.analyze()

        summary = "=== ALIRA AI CEO Executive Summary ===\n\n"

        alerts = analysis['alerts']
        if alerts:
            summary += f"⚠️  {len(alerts)} ALERTS REQUIRING ACTION:\n"
            for alert in sorted(alerts, key=lambda x: {'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2}.get(x['severity'], 3)):
                summary += f"  [{alert['severity']}] {alert['type']}: {alert['message']}\n"
                summary += f"       Action: {alert['action']}\n\n"
        else:
            summary += "✅ No critical alerts detected\n\n"

        opportunities = analysis['opportunities']
        if opportunities:
            summary += f"🚀 {len(opportunities)} GROWTH OPPORTUNITIES:\n"
            for opp in opportunities[:3]:
                summary += f"  {opp['type']}: {opp['message']}\n"
                summary += f"       Action: {opp['action']}\n\n"

        metrics = analysis['metrics']
        summary += "KEY METRICS (SNAPSHOT):\n"
        summary += f"  Active Members: {metrics['membership_metrics']['active_members']}\n"
        summary += f"  MRR: ${metrics['membership_metrics']['monthly_mrr']:.2f}\n"
        summary += f"  Active Enrollments: {metrics['enrollment_metrics']['active_enrollments']}\n"
        summary += f"  Conversion Rate: {metrics['enrollment_metrics']['conversion_rate_percent']}%\n"
        summary += f"  Churn Rate: {metrics['membership_metrics']['monthly_churn_rate_percent']}%\n"
        summary += f"  30-Day Revenue: ${metrics['revenue_metrics']['revenue_last_30_days']:.2f}\n"

        return summary
