# Next Steps After Database Setup ✅

Your TiDB database is ready! Now let's connect the backend and test everything.

---

## Step 1: Configure Backend Environment (5 minutes)

### 1.1 Check if .env exists
```bash
cd backend
# Check if .env file exists
```

### 1.2 Create/Update .env file
If you don't have `.env`, copy from template:
```bash
# Windows PowerShell
Copy-Item .env.example .env

# Or Git Bash
cp .env.example .env
```

### 1.3 Fill in TiDB Credentials
Open `backend/.env` and update with your TiDB details:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# TiDB Serverless Database (from TiDB Cloud dashboard)
DATABASE_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
DATABASE_PORT=4000
DATABASE_USERNAME=root
DATABASE_PASSWORD=your-actual-tidb-password
DATABASE_NAME=pawportal
DATABASE_SSL=false

# JWT Authentication (generate these)
JWT_SECRET=your-32-character-random-string-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=another-32-character-random-string
JWT_REFRESH_EXPIRES_IN=30d

# Cloudinary (we'll set this up next)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 1.4 Generate JWT Secrets
Run this command twice to generate secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
- First result → `JWT_SECRET`
- Run again → `JWT_REFRESH_SECRET`

---

## Step 2: Install Backend Dependencies (2 minutes)

```bash
cd backend
npm install
```

Wait for installation to complete.

---

## Step 3: Test Backend Connection (5 minutes)

### 3.1 Start Backend Server
```bash
cd backend
npm run dev
```

### 3.2 Expected Output
You should see:
```
✅ Database connected successfully
🚀 Server running on port 5000
📍 Environment: development
🌐 Frontend URL: http://localhost:3000
```

### 3.3 Test Health Endpoint
Open browser and visit:
```
http://localhost:5000/api/health
```

Should return:
```json
{
  "success": true,
  "message": "PawPortal API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 3.4 Test Registration (Optional)
Use Postman or curl:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test1234"
  }'
```

If registration works, backend is fully connected! ✅

---

## Step 4: Set Up Cloudinary (10 minutes)

### 4.1 Create Cloudinary Account
1. Go to https://cloudinary.com
2. Sign up (free account)
3. Go to Dashboard → Settings
4. Copy:
   - Cloud name
   - API Key
   - API Secret

### 4.2 Update .env
Add Cloudinary credentials to `backend/.env`:
```env
CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
CLOUDINARY_API_KEY=your-actual-api-key
CLOUDINARY_API_SECRET=your-actual-api-secret
```

---

## Step 5: Test Full Backend (10 minutes)

### 5.1 Restart Backend
```bash
# Stop current server (Ctrl+C)
# Then restart
npm run dev
```

### 5.2 Test Multiple Endpoints

**Health Check:**
```
GET http://localhost:5000/api/health
```

**Register User:**
```
POST http://localhost:5000/api/auth/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Secure123"
}
```

**Login:**
```
POST http://localhost:5000/api/auth/login
Body: {
  "email": "john@example.com",
  "password": "Secure123"
}
```

**Get Events:**
```
GET http://localhost:5000/api/events
```

---

## Step 6: Frontend Integration (30-45 minutes)

### 6.1 Install Frontend Dependencies
```bash
# In project root (not backend folder)
npm install axios socket.io-client
```

### 6.2 Create Frontend .env
Create `.env` in project root:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 6.3 Create API Service
Create `src/services/api.js`:

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

### 6.4 Update Auth Service
Update `src/services/authService.js` to use the API instead of localStorage.

---

## Quick Checklist

- [ ] Backend `.env` file created with TiDB credentials
- [ ] JWT secrets generated and added
- [ ] Backend dependencies installed (`npm install` in backend/)
- [ ] Backend server runs without errors
- [ ] Health endpoint returns success
- [ ] Can register a user (test registration)
- [ ] Cloudinary account created
- [ ] Cloudinary credentials added to `.env`
- [ ] Frontend dependencies installed (axios, socket.io-client)
- [ ] Frontend `.env` created
- [ ] API service created in frontend

---

## Troubleshooting

### "Database connection error"
- ✅ Check `.env` has correct TiDB credentials
- ✅ Verify database name is `pawportal`
- ✅ Check port is `4000`
- ✅ Make sure `DATABASE_SSL=false`

### "Cannot find module"
- ✅ Run `npm install` in backend folder
- ✅ Check you're in the correct directory

### "Port 5000 already in use"
- ✅ Change `PORT=5001` in `.env`
- ✅ Or stop the process using port 5000

### CORS errors in frontend
- ✅ Check `FRONTEND_URL` in backend `.env` matches frontend URL
- ✅ Make sure backend server is running

---

## What's Next?

After completing these steps:

1. ✅ **Backend is connected** to TiDB
2. ✅ **Can register/login users**
3. ✅ **Can test all API endpoints**
4. ✅ **Frontend can connect** to backend

Then you can:
- Test all features (events, lost/found, FAQs)
- Build out frontend components
- Deploy to Railway

---

## Success Indicators

✅ Backend runs: `npm run dev` works  
✅ Database connected: See "✅ Database connected successfully"  
✅ Health check works: `http://localhost:5000/api/health` returns JSON  
✅ Registration works: Can create users via API  
✅ Frontend connects: No CORS errors in browser console  

---

Good luck! Let me know if you need help with any step! 🚀

