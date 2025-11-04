-- Seed Forum Categories in TiDB
-- Run this in TiDB Chat2Query if categories are missing

USE pawportal;

-- Insert default forum categories if they don't exist
INSERT IGNORE INTO forum_categories (id, name, description, is_active) VALUES
(1, 'General Discussion', 'General pet-related discussions', TRUE),
(2, 'Adoption Stories', 'Share your adoption experiences', TRUE),
(3, 'Health & Care', 'Pet health and care advice', TRUE),
(4, 'Training Tips', 'Pet training discussions', TRUE),
(5, 'Lost & Found', 'Help reunite lost pets', TRUE),
(6, 'Events & Meetups', 'Local pet events and meetups', TRUE);

-- Verify categories were inserted
SELECT * FROM forum_categories;

