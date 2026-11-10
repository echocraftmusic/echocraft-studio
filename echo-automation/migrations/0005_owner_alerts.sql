-- Separate owner alert acknowledgment from service workflow status.
-- New inquiries start unseen; acknowledging an alert does not mark them contacted.
ALTER TABLE inquiries ADD COLUMN owner_seen_at TEXT;
-- Existing fictional staging inquiries predate alerts; don't label them as new notifications.
UPDATE inquiries SET owner_seen_at=datetime('now') WHERE owner_seen_at IS NULL;
