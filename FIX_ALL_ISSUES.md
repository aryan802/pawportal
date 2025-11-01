# Fix All Issues - Complete Guide

## Issues to Fix:
1. ❌ Can't login with admin credentials
2. ❌ Forum page not accessible/working
3. ❌ Hardcoded data instead of real TiDB data
4. ❌ AI chatbot not working
5. ❌ Need real multi-user testing

---

## Fix 1: Create Admin User in Database

### Option A: Use Backend Script (Recommended)

Create a file `backend/scripts/createAdmin.js`:

```javascript
const bcrypt = require('bcrypt');
const pool = require('../config/database');
require('dotenv').config();

async function createAdmin() {
  try {
    const passwordHash = await bcrypt.hash('Admin@123', 10);
    
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password_hash, role, is_verified) 
       VALUES (?, ?, ?, 'System Admin', TRUE)
       ON DUPLICATE KEY UPDATE 
         password_hash = VALUES(password_hash),
         role = 'System Admin',
         is_verified = TRUE`,
      ['System Administrator', 'admin@pawportal.com', passwordHash]
    );
    
    console.log('✅ Admin user created/updated successfully!');
    console.log('Email: admin@pawportal.com');
    console.log('Password: Admin@123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
```

**Run it:**
```bash
cd backend
node scripts/createAdmin.js
```

### Option B: Manual SQL (Alternative)

1. Generate password hash:
```bash
cd backend
node -e "const bcrypt=require('bcrypt'); bcrypt.hash('Admin@123',10).then(h=>console.log(h))"
```

2. Run SQL in TiDB Chat2Query:
```sql
USE pawportal;

INSERT INTO users (name, email, password_hash, role, is_verified) 
VALUES ('System Administrator', 'admin@pawportal.com', 'YOUR_HASH_HERE', 'System Admin', TRUE)
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);
```

---

## Fix 2: Update Components to Use Real API Data

### Events Page
Update `src/pages/dashboard/Events.jsx` to use `eventService.getEvents()`

### Lost & Found Page
Update `src/pages/dashboard/LostFound.jsx` to use `lostFoundService.getLostFoundPosts()`

### Forum Page
Update `src/pages/dashboard/CommunityForums.jsx` to fetch from API

### Dashboard
Update to show real statistics from API

---

## Fix 3: Add Chatbot Component

Create `src/components/Chatbot.jsx` that:
- Uses `faqService.queryFAQ()`
- Displays FAQ matches
- Has a chat interface

---

## Fix 4: Verify Forum Route

Forum route exists: `/community-forums`
- Check if Navbar has link to it
- Verify component loads correctly
- Update to use real data

---

## Fix 5: Test Multi-User

1. Create 2-3 test users via registration
2. Test simultaneous login in different browsers
3. Verify data is shared (events, lost/found posts)
4. Test real-time features (event discussions)

---

## Next Steps

1. ✅ Create admin user
2. ✅ Update Events component
3. ✅ Update LostFound component
4. ✅ Update CommunityForums component
5. ✅ Create Chatbot component
6. ✅ Update Dashboard with real stats
7. ✅ Test multi-user access

