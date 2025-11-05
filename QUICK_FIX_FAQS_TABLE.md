# Quick Fix: Create FAQs Table

## Problem
Error: `Table 'pawportal.faqs' doesn't exist`

## Solution

### Step 1: Create the FAQs Table

**In TiDB Chat2Query**, run `CREATE_FAQS_TABLE.sql`:

```sql
USE pawportal;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS faqs (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  keywords JSON,
  views INT DEFAULT 0,
  helpful_count INT DEFAULT 0,
  created_by INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  FULLTEXT INDEX idx_faqs_search (question, answer)
) ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS = 1;

-- Verify
SHOW TABLES LIKE 'faqs';
DESCRIBE faqs;
```

### Step 2: Verify Table Creation

After running the script, you should see:
- ✅ `SHOW TABLES LIKE 'faqs'` returns the `faqs` table
- ✅ `DESCRIBE faqs` shows the table structure

### Step 3: Seed FAQs (Optional)

Now you can run `SEED_FAQS.sql` to add sample FAQs:

```sql
-- Run SEED_FAQS.sql
```

### Step 4: Test

1. Restart backend (if running)
2. Test chatbot with queries like:
   - "How do I adopt a pet?"
   - "What vaccinations does my pet need?"

## Table Structure

The `faqs` table includes:
- `id` - Primary key
- `question` - FAQ question text
- `answer` - FAQ answer text
- `category` - Category (Adoption, Health, Events, etc.)
- `keywords` - JSON array of keywords for matching
- `views` - Number of times viewed
- `helpful_count` - Number of helpful votes
- `created_by` - User ID who created the FAQ
- `is_active` - Whether FAQ is active
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Troubleshooting

### Error: "Unknown column 'keywords'"
If you see this, the table might already exist but without the `keywords` column. Add it:
```sql
ALTER TABLE faqs ADD COLUMN keywords JSON;
```

### Error: "Table already exists"
Good! The table exists. You can skip to Step 3 (seed FAQs).

### Error: "Foreign key constraint fails"
Make sure the `users` table exists first. Run `database_schema_fixed.sql` if needed.

---

**Quick Fix:** Just run `CREATE_FAQS_TABLE.sql` in TiDB Chat2Query! 🚀

