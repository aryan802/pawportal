# Detailed Setup Guide - Step by Step

This guide provides detailed instructions for setting up PawPortal backend and frontend integration.

---

## Step 1: Create Accounts (30-45 minutes)

### 1.1 Create PlanetScale Account (Database)

**Why:** PlanetScale provides a MySQL-compatible cloud database that scales automatically.

**Steps:**

1. **Go to PlanetScale Website**
   - Visit: https://planetscale.com
   - Click **"Sign Up"** or **"Get Started"**

2. **Sign Up Options**
   - You can sign up with:
     - GitHub account (recommended)
     - Google account
     - Email address

3. **Verify Email** (if using email)
   - Check your inbox for verification email
   - Click the verification link

4. **Create Database**
   - After logging in, you'll see the dashboard
   - Click **"Create database"** button (usually green button in top right)
   - Fill in the form:
     - **Name:** `pawportal` (or your preferred name)
     - **Region:** Choose closest to you (e.g., `us-east-1`, `eu-west-1`)
     - **Database type:** MySQL (default)
   - Click **"Create database"**

5. **Get Connection Credentials**
   - Once database is created, click on your database name
   - Go to **"Connect"** tab (in the top navigation)
   - Click **"Passwords"** section
   - Click **"New password"** button
   - Give it a name (e.g., "Development")
   - **IMPORTANT:** Copy the connection string that appears. It looks like:
     ```
     mysql://username:password@host:3306/database
     ```
   - **Or copy these separately:**
     - **Host:** Something like `aws.connect.psdb.cloud`
     - **Username:** Your username
     - **Password:** The generated password (save this securely!)
     - **Database name:** `pawportal`

6. **Note Down Your Credentials**
   - Create a text file (temporarily) with:
     ```
     DATABASE_HOST=your-host.planetscale.com
     DATABASE_USERNAME=your-username
     DATABASE_PASSWORD=your-password-here
     DATABASE_NAME=pawportal
     ```
   - ⚠️ **Keep this secure!** We'll use it in Step 2

**Troubleshooting:**
- If you can't find "Connect" tab, make sure you've selected your database
- Password is only shown once - save it immediately
- You can create multiple passwords for different environments

---

### 1.2 Create Cloudinary Account (Image Storage)

**Why:** Cloudinary provides cloud-based image storage and automatic optimization.

**Steps:**

1. **Go to Cloudinary Website**
   - Visit: https://cloudinary.com
   - Click **"Sign Up for Free"** or **"Get Started"**

2. **Sign Up Form**
   - Fill in:
     - **Email address**
     - **Password** (at least 8 characters)
     - **First name** and **Last name**
     - **Company name** (optional)
   - Click **"Create account"**

3. **Verify Email**
   - Check your email inbox
   - Click the verification link from Cloudinary

4. **Access Dashboard**
   - After verification, you'll be redirected to the dashboard
   - If not, login at: https://console.cloudinary.com

5. **Get API Credentials**
   - In the dashboard, look for **"Account Details"** or click your name → **"Settings"**
   - You'll see a section with:
     - **Cloud name** (e.g., `dxyx7xabc`)
     - **API Key** (e.g., `123456789012345`)
     - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)
   - Click **"Reveal"** next to API Secret to see it

6. **Note Down Your Credentials**
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

7. **Free Tier Limits**
   - 25GB storage
   - 25GB bandwidth/month
   - 25K transformations/month
   - Perfect for development and small production

**Troubleshooting:**
- If you can't find API credentials, look for "Settings" → "Security" or "API Keys"
- API Secret is hidden by default for security

---

### 1.3 Create Railway Account (Deployment - Optional for now)

**Why:** Railway makes deploying Node.js applications easy with automatic deployments.

**Steps:**

1. **Go to Railway Website**
   - Visit: https://railway.app
   - Click **"Start a New Project"** or **"Login"**

2. **Sign Up**
   - Click **"Login with GitHub"** (recommended) or use email
   - If using GitHub:
     - Authorize Railway to access your repositories
     - Select which repositories to give access (you can change later)

3. **Create Project** (Skip for now if just setting up)
   - We'll create the project when deploying
   - For now, just make sure you have an account

4. **Install Railway CLI** (Optional - for local testing)
   ```bash
   npm install -g @railway/cli
   railway login
   ```

**Note:** You don't need to set up Railway deployment immediately. You can test locally first.

---

## Step 2: Set Up Environment Variables (15 minutes)

### 2.1 Create .env File

**Location:** `backend/.env`

**Steps:**

1. **Navigate to Backend Directory**
   ```bash
   cd backend
   ```

2. **Check if .env.example exists**
   ```bash
   ls -la
   # On Windows:
   dir
   ```
   You should see `.env.example`

3. **Copy the Example File**
   ```bash
   # On Linux/Mac:
   cp .env.example .env
   
   # On Windows (PowerShell):
   Copy-Item .env.example .env
   
   # On Windows (CMD):
   copy .env.example .env
   ```

4. **Open .env File**
   - Use any text editor (VS Code, Notepad++, etc.)
   - **DO NOT** use Word or similar - it may add formatting

### 2.2 Fill in Environment Variables

**Open `backend/.env` and replace the placeholder values:**

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# PlanetScale Database (from Step 1.1)
DATABASE_HOST=aws.connect.psdb.cloud
DATABASE_USERNAME=your-actual-username
DATABASE_PASSWORD=your-actual-password
DATABASE_NAME=pawportal

# JWT Authentication (Generate strong random strings)
JWT_SECRET=generate-a-random-string-here-minimum-32-characters-long
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=generate-another-random-string-here-minimum-32-characters
JWT_REFRESH_EXPIRES_IN=30d

# Cloudinary Image Storage (from Step 1.2)
CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
CLOUDINARY_API_KEY=your-actual-api-key
CLOUDINARY_API_SECRET=your-actual-api-secret

# File Upload (default values are fine)
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### 2.3 Generate JWT Secrets

**You need to generate random strings for JWT_SECRET and JWT_REFRESH_SECRET.**

**Option A: Using Node.js (Easiest)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Run this twice - once for JWT_SECRET, once for JWT_REFRESH_SECRET.

**Option B: Using Online Tool**
- Visit: https://randomkeygen.com
- Copy a "CodeIgniter Encryption Keys" (use a 32-character one)
- Generate two different keys

**Option C: Using PowerShell (Windows)**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```
Run twice to generate two keys.

**Example .env file should look like:**
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

DATABASE_HOST=aws.connect.psdb.cloud
DATABASE_USERNAME=abc123xyz
DATABASE_PASSWORD=pscale_pw_xxxxxxxxxxxxxxxxxxxxx
DATABASE_NAME=pawportal

JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3
JWT_REFRESH_EXPIRES_IN=30d

CLOUDINARY_CLOUD_NAME=dxyx7xabc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456

MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### 2.4 Verify .env File

**Checklist:**
- ✅ All DATABASE_* variables filled from PlanetScale
- ✅ All CLOUDINARY_* variables filled from Cloudinary
- ✅ JWT_SECRET and JWT_REFRESH_SECRET are long random strings (32+ characters)
- ✅ No quotes around values (unless needed)
- ✅ No spaces around `=` sign
- ✅ File is named exactly `.env` (not `.env.txt` or `.env.example`)

**Common Mistakes:**
- ❌ Adding quotes: `DATABASE_HOST="aws.connect.psdb.cloud"` → Remove quotes
- ❌ Spaces: `DATABASE_HOST = aws.connect.psdb.cloud` → Remove spaces
- ❌ Wrong file name: `.env.txt` → Should be `.env`
- ❌ Copying from example without changing values

---

## Step 3: Run Database Migrations (20-30 minutes)

### 3.1 Understand What Migrations Do

Migrations create the database tables and structure needed for the application. We need to run 8 migrations in order.

### 3.2 Method 1: Using PlanetScale Web Console (Easiest)

**Steps:**

1. **Login to PlanetScale**
   - Go to https://planetscale.com
   - Login and select your `pawportal` database

2. **Open Database Console**
   - Click on your database
   - Go to **"Console"** tab (in the navigation bar)
   - You'll see a SQL editor

3. **Run Migration 1: Update Events Table**
   - Open `DATABASE_MIGRATIONS.md` from your project
   - Find **"Migration 1: Update Events Table"**
   - Copy the SQL code (starting from `ALTER TABLE events`)
   - Paste into PlanetScale console
   - Click **"Run"** or press `Ctrl+Enter`
   - Wait for "Query executed successfully" message

4. **Run Migration 2: Create Event Registrations Table**
   - Find **"Migration 2"** in `DATABASE_MIGRATIONS.md`
   - Copy the `CREATE TABLE event_registrations...` SQL
   - Paste and run in console

5. **Run Remaining Migrations (3-8)**
   - Repeat for each migration (3, 4, 5, 6, 7, 8)
   - Always wait for success message before proceeding
   - Run them in order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

6. **Verify Tables Were Created**
   - In PlanetScale console, run:
     ```sql
     SHOW TABLES;
     ```
   - You should see tables like:
     - `events`
     - `event_registrations`
     - `event_images`
     - `event_discussions`
     - `lost_found_posts`
     - `rfid_matches`
     - `faqs`
     - `faq_query_logs`
     - Plus existing tables from original schema

**Troubleshooting:**
- If you get "Table already exists" error, the migration was already run - skip it
- If you get syntax error, check that you copied the entire SQL block
- Make sure you're in the correct database (check top of console)

### 3.3 Method 2: Using PlanetScale CLI

**If you prefer command line:**

1. **Install PlanetScale CLI**
   ```bash
   npm install -g @planetscale/cli
   ```

2. **Login**
   ```bash
   pscale auth login
   ```
   - This will open a browser for authentication

3. **Connect to Database**
   ```bash
   pscale connect pawportal main --port 3309
   ```

4. **In Another Terminal, Connect with MySQL Client**
   ```bash
   mysql -h 127.0.0.1 -P 3309 -u root -ppscale_main_branch
   ```

5. **Run Migrations**
   - Copy each migration from `DATABASE_MIGRATIONS.md`
   - Paste and execute in MySQL client
   - Run in order 1-8

### 3.4 Method 3: Using MySQL Workbench or DBeaver

1. **Get Connection Details from PlanetScale**
   - Go to Connect tab → "Passwords"
   - Copy connection string

2. **Connect Database Client**
   - Use MySQL Workbench, DBeaver, or similar
   - Enter connection details:
     - Host: from PlanetScale
     - Username: from PlanetScale
     - Password: from PlanetScale
     - Database: `pawportal`
     - Port: `3306`
     - SSL: Enabled

3. **Run Migrations**
   - Open SQL editor
   - Copy migrations from `DATABASE_MIGRATIONS.md`
   - Execute one by one in order

### 3.5 Verify Migrations

**Run this SQL to check all tables exist:**
```sql
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'pawportal'
ORDER BY TABLE_NAME;
```

**Expected Tables:**
- `event_discussions`
- `event_images`
- `event_registrations`
- `events`
- `faq_query_logs`
- `faqs`
- `lost_found_posts`
- `pet_breeds`
- `pet_categories`
- `pet_images`
- `pets`
- `rfid_matches`
- `users`
- (and others from original schema)

---

## Step 4: Test Backend (10 minutes)

### 4.1 Install Backend Dependencies

**Open terminal in project root:**

```bash
cd backend
npm install
```

**This will install all packages listed in `backend/package.json`**

**Expected Output:**
```
added 245 packages, and audited 246 packages in 45s
```

**If you get errors:**
- Make sure Node.js is installed: `node --version` (should be v16+)
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### 4.2 Start the Backend Server

```bash
# Make sure you're in backend directory
cd backend

# Start development server
npm run dev
```

**Expected Output:**
```
✅ Database connected successfully
🚀 Server running on port 5000
📍 Environment: development
🌐 Frontend URL: http://localhost:3000
```

**If you see errors:**

**Error: "Database connection error"**
- Check your `.env` file has correct PlanetScale credentials
- Verify DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD are correct
- Check PlanetScale database is active

**Error: "Cannot find module"**
- Run `npm install` again
- Check you're in `backend/` directory

**Error: "Port 5000 already in use"**
- Change PORT in `.env` to another number (e.g., 5001)
- Or stop the process using port 5000

### 4.3 Test the Health Endpoint

**While server is running, open browser and visit:**
```
http://localhost:5000/api/health
```

**Expected Response (JSON):**
```json
{
  "success": true,
  "message": "PawPortal API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**If you get connection error:**
- Make sure server is running (check terminal)
- Check the port number (might be different if you changed it)
- Try `http://127.0.0.1:5000/api/health`

### 4.4 Test Database Connection (Optional)

**Create a test endpoint or use existing one:**

Visit in browser:
```
http://localhost:5000/api/auth/register
```

**With Postman or curl, send POST request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test1234"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {...},
    "token": "...",
    "refreshToken": "..."
  }
}
```

**If registration works, your backend is fully connected! ✅**

---

## Step 5: Integrate Frontend (30-45 minutes)

### 5.1 Install Frontend Dependencies

**Open terminal in project root (not backend folder):**

```bash
# Make sure you're in project root
npm install axios socket.io-client
```

**Verify installation:**
```bash
npm list axios socket.io-client
```

### 5.2 Create Frontend API Service

**Create/Update `src/services/api.js`:**

```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 5.3 Create Environment File for Frontend

**Create `.env` in project root (not backend folder):**

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Important:** Restart your React dev server after creating/updating `.env`

### 5.4 Update Auth Service

**Update `src/services/authService.js`:**

```javascript
import api from './api';

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    const { user, token, refreshToken } = response.data.data;
    
    // Store in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { user, token, refreshToken } = response.data.data;
    
    // Store in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
```

### 5.5 Update AuthContext

**Update `src/context/AuthContext.jsx`:**

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { register as apiRegister, login as apiLogin, logout as apiLogout, getCurrentUser } from '../services/authService';

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
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
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

### 5.6 Create Event Service (Example)

**Create `src/services/eventService.js`:**

```javascript
import api from './api';

export const getEvents = async (params = {}) => {
  try {
    const response = await api.get('/events', { params });
    return { success: true, events: response.data.data.events };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export const getEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return { success: true, event: response.data.data.event };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export const createEvent = async (eventData) => {
  try {
    const formData = new FormData();
    Object.keys(eventData).forEach(key => {
      if (key === 'poster' && eventData[key] instanceof File) {
        formData.append('poster', eventData[key]);
      } else {
        formData.append(key, eventData[key]);
      }
    });
    
    const response = await api.post('/events', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return { success: true, event: response.data.data.event };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export const registerForEvent = async (eventId, registrationData) => {
  try {
    const response = await api.post(`/events/${eventId}/register`, registrationData);
    return { success: true, registration: response.data.data.registration };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};
```

### 5.7 Update Components to Use API

**Example: Update `src/pages/dashboard/Events.jsx`:**

```javascript
import React, { useState, useEffect } from "react";
import { getEvents } from "../../services/eventService";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    const result = await getEvents();
    if (result.success) {
      setEvents(result.events);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-yellow-50 py-10">
      {/* Your existing JSX, but use events from API instead of mockEvents */}
      {events.map((event) => (
        // ... existing event card JSX
      ))}
    </div>
  );
};

export default Events;
```

### 5.8 Test Frontend-Backend Connection

1. **Start Backend** (if not running):
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
   - Fill in form and submit
   - Check browser console for any errors
   - Check Network tab to see API call

4. **Test Login:**
   - Go to http://localhost:3000/login
   - Login with registered credentials
   - Should redirect to dashboard

**If you see CORS errors:**
- Check `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Make sure backend CORS middleware is configured correctly

---

## Step 6: Install Socket.IO Client for Real-Time Features

### 6.1 Create Socket Service

**Create `src/services/socketService.js`:**

```javascript
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

let socket = null;

export const connectSocket = (token) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket']
  });

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const joinEventRoom = (eventId) => {
  if (socket) {
    socket.emit('join-event', eventId);
  }
};

export const leaveEventRoom = (eventId) => {
  if (socket) {
    socket.emit('leave-event', eventId);
  }
};

export const getSocket = () => socket;
```

### 6.2 Use in Event Discussion Component

**Example usage in component:**

```javascript
import { useEffect } from 'react';
import { connectSocket, joinEventRoom, leaveEventRoom, getSocket } from '../../services/socketService';

const EventDiscussion = ({ eventId }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      connectSocket(token);
      joinEventRoom(eventId);

      const socket = getSocket();
      socket.on('message-received', (data) => {
        // Handle new message
        console.log('New message:', data);
      });

      return () => {
        leaveEventRoom(eventId);
      };
    }
  }, [eventId]);

  // ... rest of component
};
```

---

## Troubleshooting Common Issues

### Issue: "Cannot connect to database"
**Solution:**
- Verify PlanetScale credentials in `.env`
- Check database is active in PlanetScale dashboard
- Ensure SSL is enabled (it should be automatic)

### Issue: "CORS error"
**Solution:**
- Check `FRONTEND_URL` in backend `.env` matches exactly
- Make sure backend server is running
- Clear browser cache

### Issue: "JWT token invalid"
**Solution:**
- Clear localStorage: `localStorage.clear()`
- Login again
- Check JWT_SECRET in backend `.env` is set correctly

### Issue: "Image upload fails"
**Solution:**
- Verify Cloudinary credentials
- Check file size (max 5MB)
- Ensure file is an image format (jpg, png, etc.)

---

## Success Checklist

After completing all steps, verify:

- [ ] PlanetScale account created and database connected
- [ ] Cloudinary account created and configured
- [ ] Backend `.env` file created with all credentials
- [ ] Database migrations run successfully (all 8 migrations)
- [ ] Backend server runs without errors
- [ ] Health endpoint returns success: http://localhost:5000/api/health
- [ ] Frontend dependencies installed (axios, socket.io-client)
- [ ] Frontend `.env` file created
- [ ] Frontend API service created
- [ ] Can register new users via frontend
- [ ] Can login successfully
- [ ] Frontend can fetch data from backend API

**Congratulations! Your backend is now fully set up and integrated! 🎉**

