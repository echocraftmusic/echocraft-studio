-- Preserve full AI handoff details in the owner queue.
ALTER TABLE inquiries ADD COLUMN summary TEXT;
ALTER TABLE inquiries ADD COLUMN owner_action TEXT;
