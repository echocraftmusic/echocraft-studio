-- Global AI test allowance, enforced through atomic writes on D1 primary.
-- Each attempted inference reserves one slot; failed calls remain counted.
CREATE TABLE IF NOT EXISTS ai_daily_usage (
  day_utc TEXT PRIMARY KEY,
  used INTEGER NOT NULL DEFAULT 0 CHECK (used >= 0),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
