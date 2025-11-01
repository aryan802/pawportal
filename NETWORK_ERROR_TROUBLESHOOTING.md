# Network Error Troubleshooting Guide

## Common Causes of "Network Error" on Login

### 1. Backend Server Not Running ✅ CHECK THIS FIRST

**Check if backend is running:**
```bash
cd backend
npm run dev
```

**You should see:**
```
✅ Database connected successfully
🚀 Server running on port 5000
```

**If not running, start it:**
```bash
cd backend
npm run dev
```

---

### 2. Wrong API URL

**Check `.env` file in project root:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Verify it's correct:**
- Backend runs on port 5000
- URL should end with `/api`

---

### 3. CORS Issue

**Check backend `.env` has:**
```env
FRONTEND_URL=http://localhost:3000
```

**In `backend/server.js`, CORS should be configured:**
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

---

### 4. Backend Endpoint Not Found

**Check login endpoint exists:**
- Backend route: `POST /api/auth/login`
- Controller: `backend/controllers/authController.js`
- Should handle `email` and `password`

---

## Quick Fixes

### Fix 1: Restart Backend
```bash
# Stop current backend (Ctrl+C)
cd backend
npm run dev
```

### Fix 2: Check Backend Logs
Look for errors in backend terminal when you try to login.

### Fix 3: Test Backend Directly
```bash
# Test if backend responds
curl http://localhost:5000/api/health

# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'
```

### Fix 4: Check Browser Console
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab to see the exact error

---

## Step-by-Step Debugging

1. **Check Backend is Running:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"success":true,...}`

2. **Check Frontend .env:**
   ```bash
   # In project root
   cat .env
   ```
   Should have: `REACT_APP_API_URL=http://localhost:5000/api`

3. **Restart Frontend:**
   ```bash
   # Stop frontend (Ctrl+C)
   npm start
   ```
   (Restart required after creating .env)

4. **Check Network Tab:**
   - Open DevTools → Network tab
   - Try login
   - Click on the failed request
   - Check "Response" tab for error message

---

## Expected Behavior

**If everything works:**
- Backend returns: `{"success": true, "user": {...}, "token": "..."}`
- Frontend stores token in localStorage
- User is redirected to dashboard

**If network error:**
- Request fails before reaching backend
- Usually means backend not running or wrong URL

