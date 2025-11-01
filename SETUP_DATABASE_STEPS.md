# Database Setup Steps for TiDB

## Important: Run Base Schema FIRST, Then Migrations!

The migrations assume the base database schema already exists. Follow these steps in order:

---

## Step 1: Run Base Database Schema (10 minutes)

**First, create all the base tables** from `database_schema.sql`.

### In TiDB Chat2Query:

1. **Select your database:**
   ```sql
   USE pawportal;
   ```

2. **Copy and run the ENTIRE `database_schema.sql` file:**
   - Open `database_schema.sql` in your project
   - Copy all SQL statements (or run section by section)
   - Paste into TiDB Chat2Query
   - Click "Run"

This creates all base tables including:
- `users`
- `pets`
- `pet_images`
- `events` ⭐ (This is what you need!)
- `lost_found_posts`
- And all other base tables

---

## Step 2: Verify Base Tables (2 minutes)

After running the base schema, verify tables exist:

```sql
USE pawportal;
SHOW TABLES;
```

You should see tables like:
- `users`
- `pets`
- `pet_images`
- `pet_categories`
- `pet_breeds`
- `events` ⭐
- `lost_found_posts`
- `forum_posts`
- `forum_categories`
- `notifications`
- etc.

---

## Step 3: Run Migrations 1-8 (15 minutes)

**Now that base tables exist, run the migrations:**

1. **Open `DATABASE_MIGRATIONS.md`**

2. **Run Migration 1** (Update Events Table)
   - Copy Migration 1 SQL
   - Paste in Chat2Query
   - Run it

3. **Run Migration 2** (Create Event Registrations)
   - Copy Migration 2 SQL
   - Run it

4. **Continue with Migrations 3-8** in order

---

## Quick Fix for Your Current Issue

**If you're getting "Table 'events' doesn't exist":**

### Option A: Run Base Schema First

1. Go to TiDB Chat2Query
2. Run: `USE pawportal;`
3. Open `database_schema.sql` in your project
4. Copy the section that creates the `events` table (lines 188-204 approximately)
5. Or copy the entire file and run it

### Option B: Create Events Table Manually

If you just need the events table quickly, run this:

```sql
USE pawportal;

CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type ENUM('Adoption Event', 'Fundraiser', 'Training', 'Health Check', 'Community Meet', 'Other'),
    location VARCHAR(255),
    start_date DATETIME,
    end_date DATETIME,
    max_attendees INT,
    registration_required BOOLEAN DEFAULT FALSE,
    organizer_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id)
);
```

**Then continue with Migration 1.**

---

## Recommended: Full Database Setup

### Run Everything in Order:

1. ✅ **Base Schema** (`database_schema.sql`)
   - Creates all foundation tables
   - Inserts default data (categories, breeds, etc.)

2. ✅ **Migrations 1-8** (`DATABASE_MIGRATIONS.md`)
   - Adds new features
   - Creates additional tables
   - Updates existing tables

---

## Verification After Setup

After running base schema + migrations, verify with:

```sql
USE pawportal;

-- Check all tables
SHOW TABLES;

-- Check events table has new columns
DESCRIBE events;
-- Should show: category, poster_image_url

-- Check new tables exist
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'pawportal' 
AND TABLE_NAME IN (
    'event_registrations',
    'event_images',
    'event_discussions',
    'rfid_matches',
    'faqs',
    'faq_query_logs'
);
```

---

## Troubleshooting

### Error: "Table 'events' doesn't exist"
**Solution:** Run the base schema first (Step 1)

### Error: "Table already exists" 
**Solution:** Skip that migration or drop the table if needed

### Error: "Column already exists"
**Solution:** That column was already added - skip that ALTER statement

### Error: "Unknown database 'pawportal'"
**Solution:** Create it first:
```sql
CREATE DATABASE pawportal;
USE pawportal;
```

---

## Summary

**Before migrations:**
- ✅ Run `database_schema.sql` (creates all base tables)

**Then migrations:**
- ✅ Run migrations 1-8 from `DATABASE_MIGRATIONS.md`

**Total time:** ~25 minutes for complete setup

---

Need help? Let me know which step you're on!

