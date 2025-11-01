# 🚀 Quick Start: Frontend Integration

## ✅ What's Done

1. ✅ **API Service Layer Created:**
   - `src/services/api.js` - Base API client
   - `src/services/authService.js` - Updated to use API
   - `src/services/eventService.js` - Event management
   - `src/services/lostFoundService.js` - Lost & Found
   - `src/services/faqService.js` - FAQ system
   - `src/services/discussionService.js` - Event discussions
   - `src/services/socketService.js` - WebSocket for real-time

2. ✅ **AuthContext Updated** - Now uses API instead of localStorage

3. ✅ **Frontend dependencies installed** (or install now)

---

## 📋 Next Steps (5 minutes)

### Step 1: Create `.env` file in project root

Create `.env` in the root folder:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 2: Install Dependencies (if not done)

```bash
npm install axios socket.io-client
```

### Step 3: Start Backend & Frontend

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
# In project root
npm start
```

### Step 4: Test Registration & Login

1. Go to http://localhost:3000/register
2. Create an account
3. Login
4. Check browser console for errors
5. Check Network tab - should see API calls

---

## 🧪 Testing Checklist

- [ ] Frontend starts without errors
- [ ] Can access registration page
- [ ] Can register new user (creates in database)
- [ ] Can login with registered credentials
- [ ] Token stored in localStorage
- [ ] Redirects to dashboard after login
- [ ] No CORS errors in console
- [ ] API calls visible in Network tab

---

## 📝 What Still Needs Updating

The following components still use localStorage and need to be updated:

### High Priority:
- ✅ `src/context/AuthContext.jsx` - **DONE!**
- ⏳ `src/pages/auth/Login.jsx` - Should work, but verify
- ⏳ `src/pages/auth/Register.jsx` - Should work, but verify

### Medium Priority (when needed):
- `src/pages/dashboard/Events.jsx` - Use `eventService.getEvents()`
- `src/pages/dashboard/OrganiseEvents.jsx` - Use event API methods
- `src/pages/dashboard/LostFound.jsx` - Use `lostFoundService`
- `src/pages/community/Events.jsx` - Use event API

---

## 🔧 Troubleshooting

### "Cannot find module 'axios'"
- Run: `npm install axios socket.io-client`

### "Network Error" or CORS errors
- Make sure backend is running on port 5000
- Check `FRONTEND_URL` in backend `.env` matches frontend URL
- Verify backend CORS is configured correctly

### "401 Unauthorized"
- Token might be expired
- Try logging in again
- Check backend JWT_SECRET is set

### API calls not showing in Network tab
- Check browser DevTools → Network tab
- Make sure frontend is actually calling the API (not localStorage)

---

## 🎯 Success Indicators

✅ **Backend running:** See "✅ Database connected successfully"  
✅ **Frontend running:** React app loads at http://localhost:3000  
✅ **Registration works:** Can create user via API  
✅ **Login works:** Can authenticate via API  
✅ **No console errors:** Check browser console  
✅ **API calls visible:** Check Network tab in DevTools  

---

## 🚀 You're Ready!

Once you've:
1. Created `.env` file
2. Installed dependencies
3. Started both servers
4. Tested registration/login

**Everything is connected!** 🎉

Next, you can start updating individual components to use the new API services as needed.

---

**Need help?** Check:
- `FRONTEND_INTEGRATION_GUIDE.md` - Detailed guide
- Backend logs for API errors
- Browser console for frontend errors
- Network tab for API call details

