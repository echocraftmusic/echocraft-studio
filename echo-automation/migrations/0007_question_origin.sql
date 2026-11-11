-- Preserve provenance when policy replaces an unhelpful model question.
ALTER TABLE demo_conversations ADD COLUMN question_origin TEXT NOT NULL DEFAULT 'model';
