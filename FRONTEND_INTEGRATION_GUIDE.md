# Frontend Integration Guide

## Step 1: Install Frontend Dependencies (2 minutes)

**Run in project root (not backend folder):**

```bash
npm install axios socket.io-client
```

---

## Step 2: Create Frontend Environment File (1 minute)

**Create `.env` file in project root:**

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Important:** Restart React dev server after creating/updating `.env`

---

## Step 3: Update AuthContext (5 minutes)

The `AuthContext.jsx` needs to be updated to use the new API-based `authService.js`.

**I've already created the new service files:**
- ✅ `src/services/api.js` - Base API configuration
- ✅ `src/services/authService.js` - Updated to use API
- ✅ `src/services/eventService.js` - Event management
- ✅ `src/services/lostFoundService.js` - Lost & Found
- ✅ `src/services/faqService.js` - FAQ system
- ✅ `src/services/discussionService.js` - Event discussions
- ✅ `src/services/socketService.js` - WebSocket for real-time chat

**Now update `src/context/AuthContext.jsx`** - See code below.

---

## Step 4: Update Components to Use API (As Needed)

Components that need updating:
- `src/pages/auth/Login.jsx` - Use new `login()` from authService
- `src/pages/auth/Register.jsx` - Use new `register()` from authService
- `src/pages/dashboard/Events.jsx` - Use `getEvents()` from eventService
- `src/pages/dashboard/OrganiseEvents.jsx` - Use event API methods
- `src/pages/dashboard/LostFound.jsx` - Use lostFoundService
- All other components using localStorage

---

## Step 5: Test Integration (10 minutes)

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   # In project root
   npm start
   ```

3. **Test Registration:**
   - Go to http://localhost:3000/register
   - Create an account
   - Check browser console for errors

4. **Test Login:**
   - Login with registered credentials
   - Should redirect to dashboard

5. **Check Network Tab:**
   - Should see API calls to backend
   - Should see 200 OK responses

---

## Files Created/Updated

### New Service Files:
- `src/services/api.js` ✅
- `src/services/eventService.js` ✅
- `src/services/lostFoundService.js` ✅
- `src/services/faqService.js` ✅
- `src/services/discussionService.js` ✅
- `src/services/socketService.js` ✅

### Updated:
- `src/services/authService.js` ✅ (Now uses API)

### Still Need:
- Update `src/context/AuthContext.jsx` (see code below)
- Update components to use new services
- Test everything

---

## Updated AuthContext Code

Replace `src/context/AuthContext.jsx` with this:

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { register as apiRegister, login as apiLogin, logout as apiLogout, getCurrentUser, getMe } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const currentUser = getCurrentUser();
    if (currentUser) {
      // Verify token is still valid by fetching from API
      getMe().then(result => {
        if (result.success) {
          setUser(result.user);
        } else {
          // Token invalid, clear everything
          apiLogout();
          setUser(null);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (userData) => {
    try {
      setLoading(true);
      const result = await apiRegister(userData);
      if (result.success) {
        setUser(result.user);
        return { success: true, user: result.user };
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await apiLogin(email, password);
      if (result.success) {
        setUser(result.user);
        return { success: true, user: result.user };
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## Quick Test Checklist

After setup, test:

- [ ] Can register new user
- [ ] Can login
- [ ] Token stored in localStorage
- [ ] Can access protected routes
- [ ] API calls work (check Network tab)
- [ ] No CORS errors

---

## Next: Component Updates

After AuthContext is updated, you'll need to update individual components. I can help with that next!

Let me know when you've:
1. Installed dependencies (`npm install axios socket.io-client`)
2. Created `.env` file
3. Updated AuthContext

Then we can update the components! 🚀

