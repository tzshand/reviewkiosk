-- ReviewKiosk tables (prefixed with reviewkiosk_ to coexist with sendletter)

CREATE TABLE IF NOT EXISTS reviewkiosk_users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS reviewkiosk_businesses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES reviewkiosk_users(id),
  hash TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  google_review_url TEXT DEFAULT '',
  feedback_email TEXT DEFAULT '',
  primary_color TEXT DEFAULT '#F59E0B',
  logo_url TEXT DEFAULT '',
  idle_timeout_ms INTEGER DEFAULT 15000,
  incentive_text TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  config_version INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS reviewkiosk_feedback (
  id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL REFERENCES reviewkiosk_businesses(id),
  rating INTEGER NOT NULL,
  feedback TEXT,
  name TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS reviewkiosk_leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_name TEXT NOT NULL,
  phone TEXT,
  source TEXT DEFAULT 'unknown',
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
