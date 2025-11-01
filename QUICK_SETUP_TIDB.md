# Quick Setup: TiDB Serverless (MySQL-Compatible - No Code Changes!)

This is the **EASIEST** option - no code changes needed! Your existing MySQL code will work as-is.

---

## Step 1: Create TiDB Account (5 minutes)

1. **Visit:** https://tidbcloud.com
2. **Sign up** with GitHub, Google, or Email
3. **Verify email** if needed
4. **Login** to dashboard

---

## Step 2: Create Free Cluster (5 minutes)

1. **Click "Create Cluster"** (big button)
2. **Select "Serverless Tier"** (FREE option)
3. **Choose region** (closest to you):
   - `us-east-1` (US East)
   - `ap-southeast-1` (Singapore)
   - `eu-central-1` (Europe)
   - etc.
4. **Set cluster name:** `pawportal` (or any name)
5. **Click "Create"**
6. **Wait 2-3 minutes** for cluster to be ready

---

## Step 3: Get Connection Details (2 minutes)

1. **Click on your cluster** name
2. **Go to "Connect" tab**
3. **Click "Standard Connection"** (not HTTP)
4. **You'll see connection details:**

**Copy these values:**
- **Endpoint:** Something like `gateway01.us-east-1.prod.aws.tidbcloud.com`
- **Port:** `4000`
- **User:** Your username (e.g., `root`)
- **Password:** Click "Generate Password" → **SAVE IT!** (only shown once)

---

## Step 4: Create Database (2 minutes)

1. **In TiDB dashboard, go to "Clusters"**
2. **Click on your cluster**
3. **Go to "Chat2Query" tab** (SQL editor)
4. **Or use any MySQL client** with connection details
5. **Run this SQL:**

```sql
CREATE DATABASE pawportal;
USE pawportal;
```

---

## Step 5: Update Backend .env (2 minutes)

**Open `backend/.env` and update:**

```env
# TiDB Serverless Configuration
DATABASE_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
DATABASE_PORT=4000
DATABASE_USERNAME=root
DATABASE_PASSWORD=your-password-from-step-3
DATABASE_NAME=pawportal
```

**Important:** No other changes needed! Remove SSL config if present:
```env
# Remove or comment out DATABASE_SSL if it exists
# DATABASE_SSL=false
```

**Update `backend/config/database.js` to remove SSL requirement for TiDB:**

```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT || 4000,
  // TiDB doesn't require SSL for serverless tier
  ssl: false,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully');
    connection.release();
  })
  .catch(error => {
    console.error('❌ Database connection error:', error.message);
  });

module.exports = pool;
```

---

## Step 6: Run Database Migrations (10 minutes)

**TiDB is MySQL-compatible, so use the ORIGINAL migrations from `DATABASE_MIGRATIONS.md`**

1. **In TiDB dashboard → Chat2Query tab**
2. **Make sure database is selected:** `USE pawportal;`
3. **Copy migrations 1-8 from `DATABASE_MIGRATIONS.md`**
4. **Run them one by one in order:**
   - Migration 1: Update Events Table
   - Migration 2: Create Event Registrations
   - Migration 3: Create Event Images
   - Migration 4: Create Event Discussions
   - Migration 5: Update Lost & Found
   - Migration 6: Create RFID Matches
   - Migration 7: Create FAQs
   - Migration 8: Create FAQ Query Logs

**They work as-is because TiDB is MySQL-compatible!**

---

## Step 7: Test Connection (2 minutes)

1. **Start backend:**
   ```bash
   cd backend
   npm install  # If not done yet
   npm run dev
   ```

2. **You should see:**
   ```
   ✅ Database connected successfully
   🚀 Server running on port 5000
   ```

3. **Test health endpoint:**
   - Visit: http://localhost:5000/api/health
   - Should return success JSON

4. **Test registration:**
   - Use Postman or curl to test registration endpoint
   - If it works, you're all set! ✅

---

## Troubleshooting

### Error: "Access denied for user"
- **Solution:** Check username and password are correct
- Make sure you generated and saved the password

### Error: "Unknown database"
- **Solution:** Run `CREATE DATABASE pawportal;` first

### Error: "Connection timeout"
- **Solution:** Check your firewall allows port 4000
- Verify endpoint hostname is correct

### Error: "SSL connection required"
- **Solution:** Update `database.js` to set `ssl: false`

---

## Free Tier Limits

- **5 databases** per account
- **5GB storage** per database
- **Good performance** for development and small production
- **No credit card required**

---

## Done! ✅

That's it! Your backend should now work with TiDB Serverless. No code changes needed because it's MySQL-compatible!

**Next Steps:**
- Continue with frontend integration
- Test all API endpoints
- Deploy when ready

---

## Quick Reference

**TiDB Connection Details:**
- **Host:** From Connect tab
- **Port:** `4000`
- **Username:** From Connect tab
- **Password:** Generate and save
- **Database:** `pawportal` (create it first)

**Migrations:** Use original `DATABASE_MIGRATIONS.md` (MySQL version)

**Code:** No changes needed! Your existing MySQL code works!

