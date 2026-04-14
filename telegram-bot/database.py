import os
import sqlite3
import json
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List
from pathlib import Path

DB_PATH = os.path.join(os.path.dirname(__file__), "alira.db")


class Database:
    """SQLite database handler for ALIRA Telegram bot"""

    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self.init_db()

    def get_connection(self):
        """Get database connection with row factory"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def init_db(self):
        """Initialize all database tables"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY,
                username TEXT,
                first_name TEXT,
                last_name TEXT,
                phone_number TEXT,
                email TEXT,
                join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_activity_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                utm_source TEXT DEFAULT 'organic',
                status TEXT DEFAULT 'active'
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS leads (
                lead_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                program_interest TEXT NOT NULL,
                timeline TEXT,
                budget REAL,
                quality_score INTEGER DEFAULT 50,
                status TEXT DEFAULT 'new',
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                contacted_at TIMESTAMP,
                converted_at TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS enrollments (
                enrollment_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                program_name TEXT NOT NULL,
                price REAL NOT NULL,
                currency TEXT DEFAULT 'USD',
                status TEXT DEFAULT 'active',
                enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expected_completion TIMESTAMP,
                actual_completion TIMESTAMP,
                payment_method TEXT,
                revenue_amount REAL,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS memberships (
                membership_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                tier TEXT NOT NULL,
                price REAL NOT NULL,
                currency TEXT DEFAULT 'USD',
                start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                renewal_date TIMESTAMP,
                status TEXT DEFAULT 'active',
                last_activity_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                engagement_score INTEGER DEFAULT 50,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS certifications (
                cert_id INTEGER PRIMARY KEY AUTOINCREMENT,
                enrollment_id INTEGER NOT NULL UNIQUE,
                cohort_id TEXT,
                current_module TEXT DEFAULT 'Introduction',
                progress_percentage INTEGER DEFAULT 0,
                start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expected_completion TIMESTAMP,
                actual_completion TIMESTAMP,
                status TEXT DEFAULT 'in_progress',
                graduate_status BOOLEAN DEFAULT 0,
                FOREIGN KEY (enrollment_id) REFERENCES enrollments(enrollment_id)
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS sessions (
                session_id INTEGER PRIMARY KEY AUTOINCREMENT,
                provider_id INTEGER,
                user_id INTEGER NOT NULL,
                duration INTEGER,
                price REAL NOT NULL,
                currency TEXT DEFAULT 'USD',
                scheduled_date TIMESTAMP,
                completed_date TIMESTAMP,
                status TEXT DEFAULT 'scheduled',
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS revenue_log (
                log_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                source TEXT NOT NULL,
                amount REAL NOT NULL,
                currency TEXT DEFAULT 'USD',
                status TEXT DEFAULT 'completed',
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                metadata TEXT,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )
        ''')

        conn.commit()
        conn.close()

    def register_user(self, user_id: int, username: str, first_name: str = "", last_name: str = "") -> None:
        """Register or update a user"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            INSERT OR IGNORE INTO users (user_id, username, first_name, last_name)
            VALUES (?, ?, ?, ?)
        ''', (user_id, username, first_name, last_name))

        conn.commit()
        conn.close()

    def get_user(self, user_id: int) -> Optional[Dict[str, Any]]:
        """Get user by ID"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM users WHERE user_id = ?', (user_id,))
        row = cursor.fetchone()
        conn.close()

        return dict(row) if row else None

    def update_user_email(self, user_id: int, email: str) -> None:
        """Update user email"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            UPDATE users SET email = ? WHERE user_id = ?
        ''', (email, user_id))

        conn.commit()
        conn.close()

    def update_user_phone(self, user_id: int, phone: str) -> None:
        """Update user phone number"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            UPDATE users SET phone_number = ? WHERE user_id = ?
        ''', (phone, user_id))

        conn.commit()
        conn.close()

    def create_lead(self, user_id: int, program_interest: str, timeline: str = "", budget: float = 0.0, notes: str = "") -> int:
        """Create a new lead/inquiry"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO leads (user_id, program_interest, timeline, budget, notes)
            VALUES (?, ?, ?, ?, ?)
        ''', (user_id, program_interest, timeline, budget, notes))

        lead_id = cursor.lastrowid
        conn.commit()
        conn.close()

        return lead_id

    def get_lead(self, lead_id: int) -> Optional[Dict[str, Any]]:
        """Get lead by ID"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM leads WHERE lead_id = ?', (lead_id,))
        row = cursor.fetchone()
        conn.close()

        return dict(row) if row else None

    def get_user_leads(self, user_id: int) -> List[Dict[str, Any]]:
        """Get all leads for a user"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM leads WHERE user_id = ? ORDER BY created_at DESC', (user_id,))
        rows = cursor.fetchall()
        conn.close()

        return [dict(row) for row in rows]

    def get_all_leads(self, status: str = None) -> List[Dict[str, Any]]:
        """Get all leads, optionally filtered by status"""
        conn = self.get_connection()
        cursor = conn.cursor()

        if status:
            cursor.execute('SELECT * FROM leads WHERE status = ? ORDER BY created_at DESC', (status,))
        else:
            cursor.execute('SELECT * FROM leads ORDER BY created_at DESC')

        rows = cursor.fetchall()
        conn.close()

        return [dict(row) for row in rows]

    def update_lead_quality(self, lead_id: int, quality_score: int) -> None:
        """Update lead quality score"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            UPDATE leads SET quality_score = ? WHERE lead_id = ?
        ''', (quality_score, lead_id))

        conn.commit()
        conn.close()

    def update_lead_status(self, lead_id: int, status: str) -> None:
        """Update lead status"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            UPDATE leads SET status = ?, contacted_at = CURRENT_TIMESTAMP WHERE lead_id = ?
        ''', (status, lead_id))

        conn.commit()
        conn.close()

    def convert_lead(self, lead_id: int) -> None:
        """Mark lead as converted"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            UPDATE leads SET status = 'converted', converted_at = CURRENT_TIMESTAMP WHERE lead_id = ?
        ''', (lead_id,))

        conn.commit()
        conn.close()

    def create_enrollment(self, user_id: int, program_name: str, price: float) -> int:
        """Create a new enrollment"""
        conn = self.get_connection()
        cursor = conn.cursor()

        expected_completion = datetime.now() + timedelta(days=180)

        cursor.execute('''
            INSERT INTO enrollments (user_id, program_name, price, revenue_amount, expected_completion)
            VALUES (?, ?, ?, ?, ?)
        ''', (user_id, program_name, price, price, expected_completion))

        enrollment_id = cursor.lastrowid
        conn.commit()
        conn.close()

        return enrollment_id

    def get_enrollment(self, enrollment_id: int) -> Optional[Dict[str, Any]]:
        """Get enrollment by ID"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM enrollments WHERE enrollment_id = ?', (enrollment_id,))
        row = cursor.fetchone()
        conn.close()

        return dict(row) if row else None

    def get_user_enrollments(self, user_id: int) -> List[Dict[str, Any]]:
        """Get all enrollments for a user"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM enrollments WHERE user_id = ? ORDER BY enrollment_date DESC', (user_id,))
        rows = cursor.fetchall()
        conn.close()

        return [dict(row) for row in rows]

    def get_all_enrollments(self, status: str = None) -> List[Dict[str, Any]]:
        """Get all enrollments, optionally filtered by status"""
        conn = self.get_connection()
        cursor = conn.cursor()

        if status:
            cursor.execute('SELECT * FROM enrollments WHERE status = ? ORDER BY enrollment_date DESC', (status,))
        else:
            cursor.execute('SELECT * FROM enrollments ORDER BY enrollment_date DESC')

        rows = cursor.fetchall()
        conn.close()

        return [dict(row) for row in rows]

    def create_certification(self, enrollment_id: int, cohort_id: str) -> int:
        """Create certification record for enrollment"""
        conn = self.get_connection()
        cursor = conn.cursor()

        expected_completion = datetime.now() + timedelta(days=365)

        cursor.execute('''
            INSERT INTO certifications (enrollment_id, cohort_id, expected_completion)
            VALUES (?, ?, ?)
        ''', (enrollment_id, cohort_id, expected_completion))

        cert_id = cursor.lastrowid
        conn.commit()
        conn.close()

        return cert_id

    def get_certification_by_enrollment(self, enrollment_id: int) -> Optional[Dict[str, Any]]:
        """Get certification by enrollment ID"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM certifications WHERE enrollment_id = ?', (enrollment_id,))
        row = cursor.fetchone()
        conn.close()

        return dict(row) if row else None

    def update_certification_progress(self, cert_id: int, module: str, percentage: int) -> None:
        """Update certification progress"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            UPDATE certifications
            SET current_module = ?, progress_percentage = ?
            WHERE cert_id = ?
        ''', (module, percentage, cert_id))

        conn.commit()
        conn.close()

    def complete_certification(self, cert_id: int) -> None:
        """Mark certification as completed"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            UPDATE certifications
            SET status = 'completed', graduate_status = 1, actual_completion = CURRENT_TIMESTAMP
            WHERE cert_id = ?
        ''', (cert_id,))

        conn.commit()
        conn.close()

    def create_membership(self, user_id: int, tier: str, price: float) -> int:
        """Create membership"""
        conn = self.get_connection()
        cursor = conn.cursor()

        renewal_date = datetime.now() + timedelta(days=30)

        cursor.execute('''
            INSERT INTO memberships (user_id, tier, price, renewal_date)
            VALUES (?, ?, ?, ?)
        ''', (user_id, tier, price, renewal_date))

        membership_id = cursor.lastrowid
        conn.commit()
        conn.close()

        return membership_id

    def get_user_membership(self, user_id: int) -> Optional[Dict[str, Any]]:
        """Get active membership for user"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            SELECT * FROM memberships
            WHERE user_id = ? AND status = 'active'
            ORDER BY start_date DESC
            LIMIT 1
        ''', (user_id,))

        row = cursor.fetchone()
        conn.close()

        return dict(row) if row else None

    def get_all_memberships(self, status: str = None) -> List[Dict[str, Any]]:
        """Get all memberships, optionally filtered by status"""
        conn = self.get_connection()
        cursor = conn.cursor()

        if status:
            cursor.execute('SELECT * FROM memberships WHERE status = ? ORDER BY start_date DESC', (status,))
        else:
            cursor.execute('SELECT * FROM memberships ORDER BY start_date DESC')

        rows = cursor.fetchall()
        conn.close()

        return [dict(row) for row in rows]

    def update_membership_activity(self, membership_id: int) -> None:
        """Update last activity timestamp for membership"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            UPDATE memberships SET last_activity_date = CURRENT_TIMESTAMP
            WHERE membership_id = ?
        ''', (membership_id,))

        conn.commit()
        conn.close()

    def cancel_membership(self, membership_id: int) -> None:
        """Cancel membership"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            UPDATE memberships SET status = 'cancelled'
            WHERE membership_id = ?
        ''', (membership_id,))

        conn.commit()
        conn.close()

    def create_session(self, user_id: int, duration: int, price: float) -> int:
        """Create session booking"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO sessions (user_id, duration, price)
            VALUES (?, ?, ?)
        ''', (user_id, duration, price))

        session_id = cursor.lastrowid
        conn.commit()
        conn.close()

        return session_id

    def get_session(self, session_id: int) -> Optional[Dict[str, Any]]:
        """Get session by ID"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM sessions WHERE session_id = ?', (session_id,))
        row = cursor.fetchone()
        conn.close()

        return dict(row) if row else None

    def get_user_sessions(self, user_id: int) -> List[Dict[str, Any]]:
        """Get all sessions for a user"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM sessions WHERE user_id = ? ORDER BY created_at DESC', (user_id,))
        rows = cursor.fetchall()
        conn.close()

        return [dict(row) for row in rows]

    def log_revenue(self, user_id: int, source: str, amount: float, status: str = "completed", metadata: Dict = None) -> int:
        """Log revenue transaction"""
        conn = self.get_connection()
        cursor = conn.cursor()

        metadata_json = json.dumps(metadata) if metadata else None

        cursor.execute('''
            INSERT INTO revenue_log (user_id, source, amount, status, metadata)
            VALUES (?, ?, ?, ?, ?)
        ''', (user_id, source, amount, status, metadata_json))

        log_id = cursor.lastrowid
        conn.commit()
        conn.close()

        return log_id

    def get_revenue_logs(self, user_id: int = None, source: str = None, days: int = 30) -> List[Dict[str, Any]]:
        """Get revenue logs"""
        conn = self.get_connection()
        cursor = conn.cursor()

        start_date = datetime.now() - timedelta(days=days)

        if user_id and source:
            cursor.execute('''
                SELECT * FROM revenue_log
                WHERE user_id = ? AND source = ? AND date >= ?
                ORDER BY date DESC
            ''', (user_id, source, start_date))
        elif user_id:
            cursor.execute('''
                SELECT * FROM revenue_log
                WHERE user_id = ? AND date >= ?
                ORDER BY date DESC
            ''', (user_id, start_date))
        elif source:
            cursor.execute('''
                SELECT * FROM revenue_log
                WHERE source = ? AND date >= ?
                ORDER BY date DESC
            ''', (source, start_date))
        else:
            cursor.execute('''
                SELECT * FROM revenue_log
                WHERE date >= ?
                ORDER BY date DESC
            ''', (start_date,))

        rows = cursor.fetchall()
        conn.close()

        return [dict(row) for row in rows]

    def get_total_revenue(self, source: str = None, days: int = 30) -> float:
        """Get total revenue"""
        conn = self.get_connection()
        cursor = conn.cursor()

        start_date = datetime.now() - timedelta(days=days)

        if source:
            cursor.execute('''
                SELECT SUM(amount) as total FROM revenue_log
                WHERE source = ? AND status = 'completed' AND date >= ?
            ''', (source, start_date))
        else:
            cursor.execute('''
                SELECT SUM(amount) as total FROM revenue_log
                WHERE status = 'completed' AND date >= ?
            ''', (start_date,))

        row = cursor.fetchone()
        conn.close()

        return row['total'] or 0.0

    def get_inactive_members(self, days: int = 14) -> List[Dict[str, Any]]:
        """Get inactive members"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cutoff_date = datetime.now() - timedelta(days=days)

        cursor.execute('''
            SELECT m.*, u.username, u.email FROM memberships m
            JOIN users u ON m.user_id = u.user_id
            WHERE m.status = 'active' AND m.last_activity_date < ?
            ORDER BY m.last_activity_date ASC
        ''', (cutoff_date,))

        rows = cursor.fetchall()
        conn.close()

        return [dict(row) for row in rows]

    def get_stale_high_value_leads(self, days: int = 7, min_quality: int = 60) -> List[Dict[str, Any]]:
        """Get high-value leads inactive for N days"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cutoff_date = datetime.now() - timedelta(days=days)

        cursor.execute('''
            SELECT l.*, u.username, u.email FROM leads l
            JOIN users u ON l.user_id = u.user_id
            WHERE l.status = 'qualified' AND l.quality_score >= ?
            AND l.created_at < ? AND (l.contacted_at IS NULL OR l.contacted_at < ?)
            ORDER BY l.quality_score DESC
        ''', (min_quality, cutoff_date, cutoff_date))

        rows = cursor.fetchall()
        conn.close()

        return [dict(row) for row in rows]

    def get_enrollments_by_week(self, weeks_back: int = 4) -> Dict[str, int]:
        """Get enrollment count by week"""
        conn = self.get_connection()
        cursor = conn.cursor()

        query = '''
            SELECT
                strftime('%Y-W%W', enrollment_date) as week,
                COUNT(*) as count
            FROM enrollments
            WHERE enrollment_date >= date('now', '-' || ? || ' days')
            GROUP BY week
            ORDER BY week DESC
        '''

        cursor.execute(query, (weeks_back * 7,))
        rows = cursor.fetchall()
        conn.close()

        return {row['week']: row['count'] for row in rows}

    def get_active_cohorts(self) -> List[Dict[str, Any]]:
        """Get active certification cohorts"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('''
            SELECT
                c.cohort_id,
                COUNT(*) as student_count,
                AVG(c.progress_percentage) as avg_progress,
                COUNT(CASE WHEN c.status = 'completed' THEN 1 END) as completions,
                COUNT(CASE WHEN c.status = 'in_progress' THEN 1 END) as in_progress
            FROM certifications c
            WHERE c.status IN ('in_progress', 'completed')
            GROUP BY c.cohort_id
            ORDER BY c.cohort_id DESC
        ''')

        rows = cursor.fetchall()
        conn.close()

        return [dict(row) for row in rows]

    def get_revenue_by_source(self, days: int = 30) -> Dict[str, float]:
        """Get revenue breakdown by source"""
        conn = self.get_connection()
        cursor = conn.cursor()

        start_date = datetime.now() - timedelta(days=days)

        cursor.execute('''
            SELECT
                source,
                SUM(amount) as total
            FROM revenue_log
            WHERE status = 'completed' AND date >= ?
            GROUP BY source
            ORDER BY total DESC
        ''', (start_date,))

        rows = cursor.fetchall()
        conn.close()

        return {row['source']: row['total'] for row in rows}

    def get_user_stats(self) -> Dict[str, Any]:
        """Get overall user statistics"""
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT COUNT(*) as count FROM users')
        total_users = cursor.fetchone()['count']

        cursor.execute('SELECT COUNT(*) as count FROM enrollments WHERE status = "active"')
        active_enrollments = cursor.fetchone()['count']

        cursor.execute('SELECT COUNT(*) as count FROM memberships WHERE status = "active"')
        active_memberships = cursor.fetchone()['count']

        cursor.execute('SELECT COUNT(*) as count FROM certifications WHERE status = "in_progress"')
        in_progress_certs = cursor.fetchone()['count']

        cursor.execute('SELECT COUNT(*) as count FROM certifications WHERE status = "completed"')
        completed_certs = cursor.fetchone()['count']

        conn.close()

        return {
            "total_users": total_users,
            "active_enrollments": active_enrollments,
            "active_memberships": active_memberships,
            "in_progress_certifications": in_progress_certs,
            "completed_certifications": completed_certs
        }
