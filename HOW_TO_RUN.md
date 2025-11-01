# 🚀 How to Run PawPortal

## Step-by-Step Instructions

### Step 1: Start Backend Server

**Open Terminal 1:**

```bash
cd backend
npm run dev
```

**Wait for:**
```
✅ Database connected successfully
🚀 Server running on port 5000
```

**Keep this terminal open!** The backend must stay running.

---

### Step 2: Start Frontend Server

**Open Terminal 2 (new terminal window/tab):**

```bash
cd C:\Users\HP\OneDrive\Desktop\pawportal
npm start
```

Or if you're already in the project folder:
```bash
npm start
```

**Wait for:**
- Browser to automatically open at `http://localhost:3000`
- Or manually visit: **http://localhost:3000**

---

### Step 3: Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

## Quick Command Summary

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd ..
npm start
```

---

## Important Notes

✅ **Both servers must run simultaneously:**
- Backend on port 5000
- Frontend on port 3000

✅ **Don't close either terminal:**
- Backend terminal: Keep running for API access
- Frontend terminal: Keep running for React app

✅ **First time setup:**
- Make sure `.env` file exists in `backend/` folder with TiDB credentials
- Make sure `.env` file exists in project root with `REACT_APP_API_URL=http://localhost:5000/api`

---

## Troubleshooting

### Backend won't start:
- Check if port 5000 is already in use
- Verify `.env` file exists in `backend/` folder
- Check database credentials are correct

### Frontend won't start:
- Check if port 3000 is already in use
- Make sure you're in the project root (not backend folder)
- Restart if you just created `.env` file

### Network errors in browser:
- Verify backend is running (Terminal 1)
- Check backend terminal for errors
- Test: `curl http://localhost:5000/api/health`

---

## Stopping Servers

**To stop:**
- Press `Ctrl + C` in each terminal window
- Stop backend first, then frontend

---

## That's It! 🎉

Once both are running, you can:
- Register new users
- Login
- Use all features
- Test the full application

