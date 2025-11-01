# TiDB Setup Checklist - Quick Start

Follow this checklist to set up TiDB Serverless for PawPortal.

---

## ✅ Step 1: Create TiDB Account & Cluster (10 minutes)

- [ ] **1.1** Visit https://tidbcloud.com and sign up
- [ ] **1.2** Click "Create Cluster"
- [ ] **1.3** Select **"Serverless Tier"** (FREE option)
- [ ] **1.4** Choose region (closest to you)
- [ ] **1.5** Set cluster name: `pawportal`
- [ ] **1.6** Click "Create" and wait 2-3 minutes

---

## ✅ Step 2: Get Connection Details (5 minutes)

- [ ] **2.1** Click on your cluster name
- [ ] **2.2** Go to **"Connect"** tab
- [ ] **2.3** Click **"Standard Connection"**
- [ ] **2.4** Copy **Endpoint** (hostname)
- [ ] **2.5** Note **Port:** `4000`
- [ ] **2.6** Note **Username** (usually `root`)
- [ ] **2.7** Click **"Generate Password"** → **SAVE IT IMMEDIATELY!**
  - ⚠️ Password is only shown once!
  - Copy to a text file temporarily

**Connection details should look like:**
```
Endpoint: gateway01.us-east-1.prod.aws.tidbcloud.com
Port: 4000
User: root
Password: [generated password - SAVE THIS!]
```

---

## ✅ Step 3: Create Database (2 minutes)

- [ ] **3.1** In TiDB dashboard, go to **"Chat2Query"** tab
- [ ] **3.2** Run this SQL:
  ```sql
  CREATE DATABASE pawportal;
  ```
- [ ] **3.3** Verify database was created:
  ```sql
  SHOW DATABASES;
  ```
  (You should see `pawportal` in the list)

---

## ✅ Step 4: Configure Backend (5 minutes)

- [ ] **4.1** Copy `.env.example` to `.env`:
  ```bash
  cd backend
  cp .env.example .env
  # Or on Windows:
  copy .env.example .env
  ```

- [ ] **4.2** Open `backend/.env` in a text editor

- [ ] **4.3** Fill in TiDB connection details:
  ```env
  DATABASE_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
  DATABASE_PORT=4000
  DATABASE_USERNAME=root
  DATABASE_PASSWORD=your-generated-password-from-step-2
  DATABASE_NAME=pawportal
  DATABASE_SSL=false
  ```

- [ ] **4.4** Generate JWT secrets (run twice to get two different keys):
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
  Copy the output for `JWT_SECRET` and run again for `JWT_REFRESH_SECRET`

- [ ] **4.5** Update JWT secrets in `.env`:
  ```env
  JWT_SECRET=paste-first-generated-key-here
  JWT_REFRESH_SECRET=paste-second-generated-key-here
  ```

- [ ] **4.6** Leave Cloudinary settings for now (we'll do that next)

---

## ✅ Step 5: Run Database Migrations (15 minutes)

- [ ] **5.1** Open `DATABASE_MIGRATIONS.md` in your project

- [ ] **5.2** Go to TiDB dashboard → **"Chat2Query"** tab

- [ ] **5.3** Select database:
  ```sql
  USE pawportal;
  ```

- [ ] **5.4** Run **Migration 1** (Update Events Table):
  - Copy SQL from `DATABASE_MIGRATIONS.md` → Migration 1
  - Paste in Chat2Query
  - Click "Run" or press Ctrl+Enter
  - Wait for "Query executed successfully"

- [ ] **5.5** Run **Migration 2** (Create Event Registrations):
  - Copy Migration 2 SQL
  - Run it
  - Verify success

- [ ] **5.6** Run **Migration 3** (Create Event Images):
  - Copy and run Migration 3

- [ ] **5.7** Run **Migration 4** (Create Event Discussions):
  - Copy and run Migration 4

- [ ] **5.8** Run **Migration 5** (Update Lost & Found):
  - Copy and run Migration 5

- [ ] **5.9** Run **Migration 6** (Create RFID Matches):
  - Copy and run Migration 6

- [ ] **5.10** Run **Migration 7** (Create FAQs):
  - Copy and run Migration 7

- [ ] **5.11** Run **Migration 8** (Create FAQ Query Logs):
  - Copy and run Migration 8

- [ ] **5.12** Verify tables were created:
  ```sql
  SHOW TABLES;
  ```
  You should see: `event_registrations`, `event_images`, `event_discussions`, `lost_found_posts`, `rfid_matches`, `faqs`, `faq_query_logs`, etc.

---

## ✅ Step 6: Test Backend Connection (5 minutes)

- [ ] **6.1** Install backend dependencies (if not done):
  ```bash
  cd backend
  npm install
  ```

- [ ] **6.2** Start backend server:
  ```bash
  npm run dev
  ```

- [ ] **6.3** Check for success message:
  ```
  ✅ Database connected successfully
  🚀 Server running on port 5000
  ```

- [ ] **6.4** Test health endpoint:
  - Open browser: http://localhost:5000/api/health
  - Should see JSON response with `"success": true`

- [ ] **6.5** If you see connection errors:
  - Check `.env` file has correct credentials
  - Verify database name is `pawportal`
  - Check port is `4000`
  - Make sure `DATABASE_SSL=false`

---

## ✅ Step 7: Set Up Cloudinary (Optional for now)

You can do this later, but here's the quick version:

- [ ] **7.1** Go to https://cloudinary.com and sign up
- [ ] **7.2** Go to Dashboard → Settings
- [ ] **7.3** Copy Cloud name, API Key, API Secret
- [ ] **7.4** Update `backend/.env`:
  ```env
  CLOUDINARY_CLOUD_NAME=your-cloud-name
  CLOUDINARY_API_KEY=your-api-key
  CLOUDINARY_API_SECRET=your-api-secret
  ```

---

## 🎉 Success!

If all steps are checked, your backend should be connected to TiDB!

### Next Steps:

1. **Test Registration:**
   ```bash
   # Use Postman or curl
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "password": "Test1234"
     }'
   ```

2. **Continue with Frontend Integration** (from `DETAILED_SETUP_GUIDE.md`)

3. **Set up Cloudinary** (for image uploads)

---

## 🔧 Troubleshooting

### "Access denied for user"
- ✅ Check username and password in `.env`
- ✅ Make sure password was copied correctly (no extra spaces)
- ✅ Try generating a new password in TiDB dashboard

### "Unknown database"
- ✅ Run `CREATE DATABASE pawportal;` in Chat2Query
- ✅ Verify `DATABASE_NAME=pawportal` in `.env`

### "Connection timeout"
- ✅ Check firewall allows port 4000
- ✅ Verify endpoint hostname is correct
- ✅ Try pinging the hostname

### "Database connection error"
- ✅ Make sure backend server is running
- ✅ Check all `.env` variables are filled
- ✅ Verify `DATABASE_PORT=4000`
- ✅ Make sure `DATABASE_SSL=false`

---

## 📝 Quick Reference

**TiDB Dashboard:** https://tidbcloud.com  
**Connection Port:** `4000`  
**Database Name:** `pawportal`  
**SSL Required:** No (set `DATABASE_SSL=false`)

**Test Connection:**
```sql
-- In Chat2Query tab
USE pawportal;
SHOW TABLES;
```

**Backend Test:**
```bash
cd backend
npm run dev
# Visit: http://localhost:5000/api/health
```

---

## ⏱️ Total Setup Time: ~30-40 minutes

Good luck! 🚀

