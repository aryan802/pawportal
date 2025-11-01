# Database Migration Guide for TiDB

## Overview
This document contains all SQL migrations needed to update the database schema for PawPortal features.

**Important:** These migrations are MySQL/TiDB compatible and should be run in order (1-8).

---

## Migration 1: Update Events Table

Add new columns to events table for categories and poster images.

```sql
-- Add new columns to events table
ALTER TABLE events
ADD COLUMN category ENUM('Adoption', 'Training', 'Meetups', 'Fundraisers') AFTER title,
ADD COLUMN poster_image_url VARCHAR(500) AFTER description;

-- Add indexes for better performance
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_active ON events(is_active);
```

---

## Migration 2: Create Event Registrations Table

Create table to track event registrations with participant information.

```sql
CREATE TABLE event_registrations (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    event_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_registration (event_id, email),
    INDEX idx_event_registrations_event (event_id),
    INDEX idx_event_registrations_user (user_id)
);
```

---

## Migration 3: Create Event Images Table

Create table to store multiple images for events (posters and photos).

```sql
CREATE TABLE event_images (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    event_id BIGINT UNSIGNED NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_poster BOOLEAN DEFAULT FALSE,
    caption VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    INDEX idx_event_images_event (event_id)
);
```

---

## Migration 4: Create Event Discussions Table

Create table for real-time event discussions/chat.

```sql
CREATE TABLE event_discussions (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    event_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_event_discussions_event (event_id, created_at),
    INDEX idx_event_discussions_user (user_id)
);
```

---

## Migration 5: Update Lost & Found Table

Add RFID number field and indexes for matching lost/found pets.

```sql
-- Add RFID number field
ALTER TABLE lost_found_posts
ADD COLUMN rfid_number VARCHAR(100) AFTER contact_info;

-- Add indexes for RFID matching
CREATE INDEX idx_lost_found_rfid ON lost_found_posts(rfid_number);
CREATE INDEX idx_lost_found_type_status ON lost_found_posts(type, status);

-- Add index for faster searches
CREATE INDEX idx_lost_found_posted_by ON lost_found_posts(posted_by);
```

---

## Migration 6: Create RFID Matches Table

Create table to track RFID matches between lost and found pets.

```sql
CREATE TABLE rfid_matches (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    lost_post_id BIGINT UNSIGNED NOT NULL,
    found_post_id BIGINT UNSIGNED NOT NULL,
    rfid_number VARCHAR(100) NOT NULL,
    matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notified_lost_user BOOLEAN DEFAULT FALSE,
    notified_found_user BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (lost_post_id) REFERENCES lost_found_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (found_post_id) REFERENCES lost_found_posts(id) ON DELETE CASCADE,
    UNIQUE KEY unique_match (lost_post_id, found_post_id),
    INDEX idx_rfid_matches_rfid (rfid_number)
);
```

---

## Migration 7: Create FAQs Table

Create table for FAQ management with rule-based matching support.

```sql
CREATE TABLE faqs (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    keywords JSON,
    views INT DEFAULT 0,
    helpful_count INT DEFAULT 0,
    created_by BIGINT UNSIGNED,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_faqs_category (category),
    INDEX idx_faqs_active (is_active),
    FULLTEXT INDEX idx_faqs_search (question, answer)
);
```

---

## Migration 8: Create FAQ Query Logs Table (Optional - for analytics)

Create table to log FAQ queries for analytics and improvement.

```sql
CREATE TABLE faq_query_logs (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNSIGNED,
    query TEXT NOT NULL,
    matched_faq_id BIGINT UNSIGNED,
    was_helpful BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (matched_faq_id) REFERENCES faqs(id) ON DELETE SET NULL,
    INDEX idx_faq_query_logs_user (user_id),
    INDEX idx_faq_query_logs_faq (matched_faq_id)
);
```

---

## Migration Execution Order

**⚠️ IMPORTANT: Run migrations in this exact order:**

1. ✅ Migration 1: Update Events Table
2. ✅ Migration 2: Create Event Registrations Table
3. ✅ Migration 3: Create Event Images Table
4. ✅ Migration 4: Create Event Discussions Table
5. ✅ Migration 5: Update Lost & Found Table
6. ✅ Migration 6: Create RFID Matches Table
7. ✅ Migration 7: Create FAQs Table
8. ✅ Migration 8: Create FAQ Query Logs Table

---

## How to Run Migrations in TiDB

### Method 1: Using TiDB Chat2Query (Easiest)

1. **Login to TiDB Cloud:** https://tidbcloud.com
2. **Select your cluster** (pawportal)
3. **Go to "Chat2Query" tab**
4. **Select database:**
   ```sql
   USE pawportal;
   ```
5. **Copy and paste each migration** one at a time
6. **Click "Run"** or press `Ctrl+Enter`
7. **Wait for "Query executed successfully"** before moving to next migration
8. **Repeat for all 8 migrations**

### Method 2: Using MySQL Client

```bash
# Connect to TiDB
mysql -h gateway01.xxxxx.tidbcloud.com -P 4000 -u root -p pawportal

# Then run each migration SQL one by one
```

---

## Verification Queries

After running all migrations, verify with these queries:

```sql
-- Check all tables exist
SHOW TABLES;

-- Should show tables like:
-- event_registrations
-- event_images
-- event_discussions
-- rfid_matches
-- faqs
-- faq_query_logs

-- Check indexes on events table
SHOW INDEXES FROM events;

-- Check event_registrations table structure
DESCRIBE event_registrations;

-- Check RFID field exists
DESCRIBE lost_found_posts;
-- Should see 'rfid_number' column
```

---

## Rollback Scripts (if needed)

If you need to undo migrations, use these in reverse order:

```sql
-- Rollback Migration 8
DROP TABLE IF EXISTS faq_query_logs;

-- Rollback Migration 7
DROP TABLE IF EXISTS faqs;

-- Rollback Migration 6
DROP TABLE IF EXISTS rfid_matches;

-- Rollback Migration 5
ALTER TABLE lost_found_posts
DROP COLUMN rfid_number,
DROP INDEX idx_lost_found_rfid,
DROP INDEX idx_lost_found_type_status,
DROP INDEX idx_lost_found_posted_by;

-- Rollback Migration 4
DROP TABLE IF EXISTS event_discussions;

-- Rollback Migration 3
DROP TABLE IF EXISTS event_images;

-- Rollback Migration 2
DROP TABLE IF EXISTS event_registrations;

-- Rollback Migration 1
ALTER TABLE events
DROP COLUMN category,
DROP COLUMN poster_image_url,
DROP INDEX idx_events_category,
DROP INDEX idx_events_active;
```

---

## Notes for TiDB

- TiDB is MySQL-compatible, so all MySQL syntax works
- `BIGINT UNSIGNED` is supported
- `AUTO_INCREMENT` works as expected
- `ENUM` types are supported
- `JSON` type is supported
- Foreign keys work
- Indexes work normally

---

## Troubleshooting

### Error: "Table already exists"
- The migration was already run - skip it and continue to next

### Error: "Unknown column"
- Make sure you ran migrations in order
- Check previous migrations completed successfully

### Error: "Duplicate key"
- Index might already exist - you can safely skip index creation if table exists

### Error: "Cannot add foreign key constraint"
- Make sure referenced tables exist
- Check foreign key columns match referenced primary keys

---

## Quick Copy-Paste Checklist

When running migrations, check off each one:

- [ ] Migration 1: Update Events Table ✅
- [ ] Migration 2: Create Event Registrations ✅
- [ ] Migration 3: Create Event Images ✅
- [ ] Migration 4: Create Event Discussions ✅
- [ ] Migration 5: Update Lost & Found ✅
- [ ] Migration 6: Create RFID Matches ✅
- [ ] Migration 7: Create FAQs ✅
- [ ] Migration 8: Create FAQ Query Logs ✅
- [ ] Verification: `SHOW TABLES;` shows all new tables ✅

---

## Ready to Migrate!

1. Make sure you're connected to TiDB
2. Select the `pawportal` database: `USE pawportal;`
3. Run migrations 1-8 in order
4. Verify with `SHOW TABLES;`
5. You're done! 🎉

