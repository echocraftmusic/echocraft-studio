-- Phase 12: store explicit owner handoff evidence separately from the model summary.
ALTER TABLE demo_conversations ADD COLUMN customer_facts TEXT;
ALTER TABLE demo_conversations ADD COLUMN open_questions TEXT;
ALTER TABLE demo_conversations ADD COLUMN next_step TEXT;
ALTER TABLE inquiries ADD COLUMN customer_facts TEXT;
ALTER TABLE inquiries ADD COLUMN open_questions TEXT;
ALTER TABLE inquiries ADD COLUMN next_step TEXT;
-- Older fictional entries remain NULL to avoid retroactively claiming verified AI facts.
