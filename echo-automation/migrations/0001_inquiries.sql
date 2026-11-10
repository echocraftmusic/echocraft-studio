-- Echo staging only. Do not store real customer personal information in demo.
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL DEFAULT 'home-demo',
  source TEXT NOT NULL DEFAULT 'demo',
  message TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('normal','review promptly')),
  suggested_reply TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','contacted','closed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS inquiries_tenant_created_idx ON inquiries(tenant_id,created_at DESC);
