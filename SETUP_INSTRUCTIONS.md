# PawPortal Setup Instructions

## 🚀 Quick Setup Guide

Follow these steps to set up PawPortal with cloud database and storage.

---

## Step 1: Create Accounts (30 minutes)

### 1.1 PlanetScale Database
1. Go to https://planetscale.com
2. Sign up for a free account
3. Click "Create database"
4. Name it: `pawportal`
5. Select a region (closest to you)
6. After creation, go to "Connect" → "Passwords"
7. Click "New password" → Copy the connection details
8. You'll need:
   - Host (e.g., `aws.connect.psdb.cloud`)
   - Username
   - Password
   - Database name: `pawportal`

### 1.2 Cloudinary Account
1. Go to https://cloudinary.com
2. Sign up for a free account
3. Go to Dashboard
4. Copy these values:
   - Cloud name
   - API Key
   - API Secret

### 1.3 Railway Account (for deployment)
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project
4. We'll deploy later

---

## Step 2: Backend Setup (2-3 hours)

### 2.1 Install Backend Dependencies

```bash
cd backend
npm install
```

### 2.2 Create Environment File

Create `backend/.env` file:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# PlanetScale Database (from Step 1.1)
DATABASE_HOST=your-host.planetscale.com
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=pawportal

# JWT (generate strong random strings)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars
JWT_REFRESH_EXPIRES_IN=30d

# Cloudinary (from Step 1.2)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2.3 Run Database Migrations

1. **Option A: Using PlanetScale Web Console**
   - Go to your database in PlanetScale
   - Click on "Console"
   - Copy and paste each migration from `DATABASE_MIGRATIONS.md` one by one
   - Execute each migration in order (1-8)

2. **Option B: Using PlanetScale CLI**
   ```bash
   # Install PlanetScale CLI
   npm install -g @planetscale/cli
   
   # Login
   pscale auth login
   
   # Connect to database
   pscale connect pawportal main
   
   # Run migrations from DATABASE_MIGRATIONS.md
   ```

3. **Option C: Using MySQL Client**
   - Connect to PlanetScale using any MySQL client
   - Run migrations from `DATABASE_MIGRATIONS.md`

**Important:** Run migrations in this order:
1. Migration 1: Update Events Table
2. Migration 2: Create Event Registrations Table
3. Migration 3: Create Event Images Table
4. Migration 4: Create Event Discussions Table
5. Migration 5: Update Lost & Found Table
6. Migration 6: Create RFID Matches Table
7. Migration 7: Create FAQs Table
8. Migration 8: Create FAQ Query Logs Table (Optional)

### 2.4 Test Backend

```bash
cd backend
npm run dev
```

Open http://localhost:5000/api/health - You should see:
```json
{
  "success": true,
  "message": "PawPortal API is running",
  "timestamp": "..."
}
```

---

## Step 3: Frontend Setup (1 hour)

### 3.1 Install Frontend Dependencies

```bash
# In project root
npm install axios socket.io-client
```

### 3.2 Create Frontend Environment File

Create `.env` in project root:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3.3 Update Frontend API Service

Create/update `src/services/api.js`:

```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## Step 4: Test the System

### 4.1 Start Backend
```bash
cd backend
npm run dev
```

### 4.2 Start Frontend
```bash
# In project root
npm start
```

### 4.3 Test Registration
1. Go to http://localhost:3000/register
2. Register a new user
3. Check backend logs for success

### 4.4 Test Login
1. Go to http://localhost:3000/login
2. Login with your credentials
3. Token should be stored in localStorage

---

## Step 5: Deploy to Railway

### 5.1 Prepare Backend for Deployment

1. Create `railway.json` in `backend/`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 5.2 Deploy Backend

1. In Railway dashboard:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Add service: "Empty Service"
   - Connect to your repo
   - Root Directory: `/backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Port: `5000`

2. Add Environment Variables in Railway:
   - Add all variables from `backend/.env`
   - Set `FRONTEND_URL` to your frontend URL (e.g., `https://your-app.vercel.app`)
   - Set `NODE_ENV=production`

3. Deploy!

### 5.3 Deploy Frontend

Deploy to Vercel or Netlify:

**Vercel:**
1. Go to https://vercel.com
2. Import your GitHub repository
3. Root Directory: `/` (project root)
4. Build Command: `npm run build`
5. Output Directory: `build`
6. Add environment variable:
   - `REACT_APP_API_URL` = your Railway backend URL

---

## Step 6: Configure Production

### 6.1 Update CORS in Backend

Make sure `FRONTEND_URL` in Railway matches your frontend domain.

### 6.2 Update Frontend API URL

Update `.env` in Vercel/Netlify to use Railway backend URL.

---

## Troubleshooting

### Database Connection Error
- Check PlanetScale credentials
- Verify SSL is enabled
- Check network connectivity

### Image Upload Fails
- Verify Cloudinary credentials
- Check file size limits (5MB)
- Verify CORS settings

### JWT Token Errors
- Check JWT_SECRET is set
- Verify token expiration time
- Clear localStorage and re-login

### WebSocket Not Working
- Check Socket.IO version
- Verify CORS settings
- Check frontend Socket.IO connection

---

## Next Steps

1. **Create First Admin User:**
   - Register normally
   - In database, update user role to "System Admin"
   - Or create via SQL:
     ```sql
     UPDATE users SET role = 'System Admin' WHERE email = 'your-email@example.com';
     ```

2. **Add Sample Data:**
   - Create some events
   - Add FAQs
   - Test RFID matching

3. **Customize:**
   - Update email templates (if implementing)
   - Customize Cloudinary upload settings
   - Adjust JWT expiration times

---

## Support

If you encounter issues:
1. Check backend logs: `cd backend && npm run dev`
2. Check browser console for frontend errors
3. Verify all environment variables are set
4. Test database connection separately
5. Test Cloudinary upload separately

---

## Quick Commands Reference

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev         # Run in development
npm start           # Run in production

# Frontend
npm install          # Install dependencies
npm start           # Run development server
npm run build       # Build for production

# Database
# Use PlanetScale console or CLI to run migrations
```

---

## Success Checklist

- [ ] PlanetScale account created and database connected
- [ ] Cloudinary account created and configured
- [ ] Backend dependencies installed
- [ ] Backend `.env` file created with all credentials
- [ ] Database migrations run successfully
- [ ] Backend server runs without errors
- [ ] Frontend dependencies installed (axios, socket.io-client)
- [ ] Frontend `.env` file created
- [ ] Can register new users
- [ ] Can login successfully
- [ ] Can upload images
- [ ] Railway deployment configured
- [ ] Frontend deployed to Vercel/Netlify

Good luck! 🎉

