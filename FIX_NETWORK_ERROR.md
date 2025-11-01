# Fix Network Error on Login

## Issue
Getting "Network Error" when trying to login as admin.

## Root Causes

1. **Backend Not Running** ⚠️ Most Common
2. **Wrong API URL**
3. **Response Format Mismatch** (Fixed in code)
4. **CORS Issue**

---

## Quick Fix Steps

### Step 1: Check Backend is Running

**Open a new terminal and run:**
```bash
cd backend
npm run dev
```

**You should see:**
```
✅ Database connected successfully
🚀 Server running on port 5000
```

**If you see errors:**
- Check `.env` file in backend folder
- Make sure TiDB credentials are correct
- Check port 5000 is not used by another app

---

### Step 2: Test Backend Directly

**In another terminal, test the backend:**
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Should return: {"success":true,"message":"PawPortal API is running",...}
```

**If this fails, backend is not running or not accessible.**

---

### Step 3: Check Frontend .env

**In project root, create/check `.env` file:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Important:** Restart frontend after creating/updating `.env`!

---

### Step 4: Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Try to login
4. Look for error messages

**Common errors:**
- `ECONNREFUSED` = Backend not running
- `CORS error` = CORS not configured
- `Network Error` = Connection refused or timeout

---

### Step 5: Check Network Tab

1. Open DevTools → Network tab
2. Try to login
3. Look for the `/api/auth/login` request
4. Click on it and check:
   - **Status:** Should be 200, not "failed" or "pending"
   - **Response:** Should show JSON response
   - **Preview:** Should show `{success: true, ...}`

---

## Already Fixed in Code

I've updated:
- ✅ `src/services/api.js` - Better network error handling
- ✅ `src/services/authService.js` - Fixed response format handling

**The code now:**
- Detects network errors properly
- Shows clearer error messages
- Handles backend response format correctly

---

## Create Admin User (If Needed)

**If you need to create an admin user, you can:**

1. **Register a new user** via the register page
2. **Then manually update role in database:**
   ```sql
   UPDATE users SET role = 'System Admin' WHERE email = 'admin@pawportal.com';
   ```

Or create admin directly in TiDB:
```sql
INSERT INTO users (name, email, password_hash, role) 
VALUES (
  'System Admin',
  'admin@pawportal.com',
  '$2b$10$YourHashedPasswordHere',
  'System Admin'
);
```

**To hash password:**
```bash
cd backend
node -e "console.log(require('bcrypt').hashSync('Admin@123', 10))"
```

---

## Verification Checklist

- [ ] Backend is running (`npm run dev` in backend folder)
- [ ] Backend responds to health check (`curl http://localhost:5000/api/health`)
- [ ] Frontend `.env` file exists with correct URL
- [ ] Frontend restarted after creating `.env`
- [ ] No CORS errors in browser console
- [ ] Network tab shows requests going to backend
- [ ] Admin user exists in database

---

## Still Having Issues?

1. **Check backend terminal** - Look for error messages
2. **Check browser console** - Look for JavaScript errors
3. **Check Network tab** - See the exact request/response
4. **Verify ports:**
   - Backend: 5000
   - Frontend: 3000
   - Make sure nothing else is using these ports

---

## Expected Success Flow

1. User enters email/password
2. Frontend sends POST to `http://localhost:5000/api/auth/login`
3. Backend validates credentials
4. Backend returns: `{success: true, data: {user, token, refreshToken}}`
5. Frontend stores token
6. User redirected to dashboard

If any step fails, check the logs/console!

