-- Private fictional customer conversation pilot, home-demo only.
-- No contact details; draft conversations are not owner leads until confirmed.
CREATE TABLE IF NOT EXISTS demo_conversations (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL DEFAULT 'home-demo',
  initial_message TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  category TEXT NOT NULL,
  priority TEXT NOT NULL CHECK(priority IN ('normal','review promptly')),
  summary TEXT,
  owner_action TEXT,
  response_draft TEXT,
  status TEXT NOT NULL DEFAULT 'awaiting_answer' CHECK(status IN ('awaiting_answer','awaiting_confirmation','completed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS demo_conversations_tenant_status_idx ON demo_conversations(tenant_id,status,created_at);
