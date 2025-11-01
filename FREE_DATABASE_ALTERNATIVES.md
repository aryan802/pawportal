# Free Database Alternatives to PlanetScale

Since PlanetScale no longer offers a free tier, here are the best free alternatives with setup instructions.

---

## 🏆 Recommended Options

### Option 1: **Supabase** (PostgreSQL) - ⭐ BEST CHOICE
**Why:** Most popular, great free tier, easy to use

**Free Tier:**
- 500MB database storage
- 1GB file storage
- 2 million monthly requests
- Real-time subscriptions
- Built-in authentication (bonus!)

**Setup Steps:**
1. Go to https://supabase.com
2. Sign up with GitHub/Google
3. Click "New Project"
4. Fill in:
   - Name: `pawportal`
   - Database password: (generate strong password)
   - Region: Choose closest
5. Wait 2 minutes for setup
6. Go to Settings → Database
7. Copy connection string (under "Connection string")

**Connection Details:**
- Host: `db.xxxxx.supabase.co`
- Port: `5432`
- Database: `postgres`
- Username: `postgres`
- Password: (your password)
- Connection string: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`

**Code Changes Required:** ✅ (PostgreSQL instead of MySQL)
- Install `pg` package instead of `mysql2`
- Update database config
- Minor SQL syntax changes

---

### Option 2: **TiDB Serverless** (MySQL-Compatible) - ⭐ EASIEST MIGRATION
**Why:** MySQL-compatible, minimal code changes needed

**Free Tier:**
- 5 databases
- 5GB storage per database
- Good performance
- MySQL compatible

**Setup Steps:**
1. Go to https://tidbcloud.com
2. Sign up with GitHub/Google
3. Click "Create Cluster"
4. Choose "Serverless Tier" (FREE)
5. Select region
6. Set cluster name: `pawportal`
7. Wait for cluster creation
8. Go to "Connect" → "Connect via Standard Connection"
9. Copy connection details

**Connection Details:**
- Host: `gateway01.xxxxx.tidbcloud.com`
- Port: `4000`
- Username: (your username)
- Password: (your password)
- Database: (create one or use default)

**Code Changes Required:** ❌ (Almost none - MySQL compatible!)

---

### Option 3: **Neon** (PostgreSQL Serverless) - ⭐ MODERN CHOICE
**Why:** Serverless PostgreSQL with branching

**Free Tier:**
- 1GB storage
- 100,000 reads/writes per month
- Automatic backups
- Branching feature

**Setup Steps:**
1. Go to https://neon.tech
2. Sign up with GitHub/Google
3. Click "Create Project"
4. Name: `pawportal`
5. Select region
6. Click "Create"
7. Go to "Connection Details"
8. Copy connection string

**Connection Details:**
- Connection string: `postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/pawportal?sslmode=require`

**Code Changes Required:** ✅ (PostgreSQL)

---

### Option 4: **Railway** (PostgreSQL/MySQL) - ⭐ CONVENIENT
**Why:** Can host both backend and database together

**Free Tier:**
- $5 credit per month (enough for small apps)
- 500MB PostgreSQL or MySQL
- Auto-deploys
- Easy setup

**Setup Steps:**
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Click "Add Database" → Choose PostgreSQL or MySQL
5. Copy connection string from Variables tab

**Code Changes:** Depends on which database you choose

---

## 📊 Comparison Table

| Service | Type | Free Storage | Free Requests | Code Changes | Difficulty |
|---------|------|--------------|---------------|--------------|------------|
| **Supabase** | PostgreSQL | 500MB | 2M/month | Medium | Easy |
| **TiDB Serverless** | MySQL | 5GB/db | Unlimited* | None | Easy |
| **Neon** | PostgreSQL | 1GB | 100K/month | Medium | Easy |
| **Railway** | Both | 500MB | $5 credit | Depends | Easy |

*Subject to fair use

---

## 🚀 Quick Setup Guide by Option

### Setup Option 1: Supabase (PostgreSQL)

**1. Create Account & Project:**
- Visit https://supabase.com
- Sign up → Create new project
- Wait for setup (2 minutes)

**2. Get Connection Details:**
- Go to Settings → Database
- Copy connection string or individual values

**3. Update Backend Code:**

**Install PostgreSQL package:**
```bash
cd backend
npm install pg
npm uninstall mysql2  # Remove MySQL if not needed elsewhere
```

**Update `backend/config/database.js`:**
```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10, // connection pool size
});

// Test connection
pool.query('SELECT NOW()')
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch(error => {
    console.error('❌ Database connection error:', error.message);
  });

module.exports = pool;
```

**4. Update `.env` file:**
```env
DATABASE_HOST=db.xxxxx.supabase.co
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
DATABASE_NAME=postgres
```

**5. SQL Syntax Changes:**

**MySQL → PostgreSQL changes needed in migrations:**

| MySQL | PostgreSQL |
|-------|------------|
| `AUTO_INCREMENT` | `SERIAL` or `BIGSERIAL` |
| `INT` | `INTEGER` or `BIGINT` |
| `DATETIME` | `TIMESTAMP` |
| `BOOLEAN` with `0/1` | `BOOLEAN` with `true/false` |
| Backticks `` ` `` | Double quotes `"` or none |
| `ENUM` | Use `VARCHAR` with CHECK constraint |

**Example migration update:**
```sql
-- MySQL (old)
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PostgreSQL (new)
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Setup Option 2: TiDB Serverless (MySQL-Compatible) - EASIEST!

**1. Create Account & Cluster:**
- Visit https://tidbcloud.com
- Sign up → Create Cluster → Choose Serverless (Free)
- Wait for setup

**2. Get Connection Details:**
- Go to "Connect" tab
- Choose "Standard Connection"
- Copy host, port, username, password

**3. Create Database:**
```sql
CREATE DATABASE pawportal;
USE pawportal;
```

**4. Update `.env` file:**
```env
DATABASE_HOST=gateway01.xxxxx.tidbcloud.com
DATABASE_PORT=4000
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=pawportal
```

**5. Code Changes:** ❌ **NONE!** It's MySQL-compatible, so your existing code works!

**Just update `.env` and you're done!**

---

### Setup Option 3: Neon (PostgreSQL)

**1. Create Account & Project:**
- Visit https://neon.tech
- Sign up → Create Project
- Name: `pawportal`

**2. Get Connection String:**
- Copy connection string from dashboard
- Format: `postgresql://user:password@host/database`

**3. Update Backend (Same as Supabase):**
- Install `pg` package
- Update `database.js` (see Supabase section)
- Update SQL syntax (see Supabase section)

**4. Update `.env`:**
```env
# Option A: Use connection string
DATABASE_URL=postgresql://user:password@ep-xxxxx.region.aws.neon.tech/pawportal?sslmode=require

# Option B: Individual values
DATABASE_HOST=ep-xxxxx.region.aws.neon.tech
DATABASE_PORT=5432
DATABASE_USERNAME=neondb
DATABASE_PASSWORD=your-password
DATABASE_NAME=pawportal
```

---

### Setup Option 4: Railway (PostgreSQL or MySQL)

**1. Create Account:**
- Visit https://railway.app
- Sign up with GitHub

**2. Create Database:**
- New Project → Add Database
- Choose PostgreSQL or MySQL

**3. Get Connection Details:**
- Click on database → Variables tab
- Copy connection string or individual variables

**4. Update Code:**
- If PostgreSQL: Follow Supabase setup
- If MySQL: Just update `.env` (no code changes needed!)

---

## 🔧 Updated Database Config Files

### For PostgreSQL (Supabase/Neon):

**`backend/config/database.js`:**
```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: process.env.DATABASE_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false,
  max: 10,
});

pool.on('connect', () => {
  console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err.message);
});

// Helper function to execute queries (PostgreSQL uses different method)
const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return [result.rows, result.fields];
  } catch (error) {
    throw error;
  }
};

module.exports = pool;
module.exports.query = query;
```

**Update package.json:**
```json
{
  "dependencies": {
    "pg": "^8.11.3"
  }
}
```

### For MySQL (TiDB/Railway MySQL):

**No changes needed!** Just update `.env`:
```env
DATABASE_HOST=your-host
DATABASE_PORT=3306  # or 4000 for TiDB
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=pawportal
```

---

## 📝 Updated Database Migrations for PostgreSQL

I'll create a PostgreSQL version of the migrations. Here are the key changes:

**Migration 1 (PostgreSQL version):**
```sql
-- Update events table
ALTER TABLE events
ADD COLUMN IF NOT EXISTS category VARCHAR(50) CHECK (category IN ('Adoption', 'Training', 'Meetups', 'Fundraisers')),
ADD COLUMN IF NOT EXISTS poster_image_url VARCHAR(500);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_active ON events(is_active);
```

**Migration 2 (PostgreSQL version):**
```sql
CREATE TABLE IF NOT EXISTS event_registrations (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL,
    user_id INTEGER,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE (event_id, email)
);

CREATE INDEX IF NOT EXISTS idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user ON event_registrations(user_id);
```

**Key Changes:**
- `AUTO_INCREMENT` → `SERIAL`
- `BIGINT UNSIGNED` → `BIGSERIAL`
- `UNIQUE KEY` → `UNIQUE`
- `ENUM` → `VARCHAR` with `CHECK` constraint
- `` `backticks` `` → `"quotes"` or none
- `IF NOT EXISTS` for safety

---

## 🎯 My Recommendation

### For Easiest Setup (No Code Changes):
**Choose TiDB Serverless** - It's MySQL-compatible, so you can use your existing code with just `.env` changes!

### For Best Features & Free Tier:
**Choose Supabase** - Great free tier, additional features (auth, storage), but requires PostgreSQL code changes.

### For Simplicity & Deployment:
**Choose Railway** - Host everything in one place (backend + database), easy deployment.

---

## 🚀 Quick Start with TiDB (Recommended for No Code Changes)

1. **Sign up:** https://tidbcloud.com
2. **Create cluster:** Serverless (Free) tier
3. **Get connection details** from Connect tab
4. **Update `.env`:**
   ```env
   DATABASE_HOST=gateway01.xxxxx.tidbcloud.com
   DATABASE_PORT=4000
   DATABASE_USERNAME=your-username
   DATABASE_PASSWORD=your-password
   DATABASE_NAME=pawportal
   ```
5. **Create database in TiDB console:**
   ```sql
   CREATE DATABASE pawportal;
   ```
6. **Run migrations** from `DATABASE_MIGRATIONS.md` (they work as-is!)
7. **Done!** No code changes needed!

---

## 📚 Additional Resources

- **Supabase Docs:** https://supabase.com/docs
- **TiDB Docs:** https://docs.pingcap.com/tidbcloud
- **Neon Docs:** https://neon.tech/docs
- **Railway Docs:** https://docs.railway.app

---

## ⚠️ Important Notes

1. **TiDB Serverless** is the easiest if you want MySQL compatibility (no code changes)
2. **Supabase** is best if you want more features and don't mind PostgreSQL
3. All these services offer free tiers that should be sufficient for development and small production apps
4. If you need MySQL specifically, TiDB is your best bet
5. If you're open to PostgreSQL, Supabase has the best free tier

**Which one should you choose?**
- ✅ **Want no code changes?** → TiDB Serverless
- ✅ **Want best free tier?** → Supabase
- ✅ **Want everything in one place?** → Railway

Let me know which one you'd like to use, and I can provide specific setup instructions!

