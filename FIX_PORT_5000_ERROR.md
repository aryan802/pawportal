# Fix "Port 5000 Already in Use" Error

## Error Message
```
Error: listen EADDRINUSE: address already in use :::5000
```

This means another process is already using port 5000.

---

## Solution 1: Find and Kill the Process (Recommended)

### Step 1: Find What's Using Port 5000

**Windows (PowerShell or Command Prompt):**
```bash
netstat -ano | findstr :5000
```

You'll see something like:
```
TCP    0.0.0.0:5000    0.0.0.0:0    LISTENING    12345
```

The last number (12345) is the Process ID (PID).

### Step 2: Kill the Process

```bash
taskkill /PID 12345 /F
```

Replace `12345` with the actual PID you found.

### Step 3: Try Starting Backend Again

```bash
cd backend
npm run dev
```

---

## Solution 2: Use a Different Port

### Option A: Change Backend Port

1. Edit `backend/.env` file
2. Add or change:
   ```env
   PORT=5001
   ```
3. Update frontend `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5001/api
   ```
4. Restart both servers

### Option B: Quick Port Change (Temporary)

Edit `backend/server.js` temporarily:
```javascript
const PORT = process.env.PORT || 5001; // Changed from 5000 to 5001
```

Then update frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

---

## Solution 3: Check if Backend is Already Running

Maybe you already started it in another terminal?

**Check:**
1. Look for other terminal windows
2. Check if `node server.js` or `nodemon` is running
3. If found, use that terminal instead

---

## Quick Fix Script (Windows)

Create a file `kill-port-5000.bat`:

```batch
@echo off
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    echo Killing process %%a
    taskkill /PID %%a /F
)
pause
```

Run it to automatically kill anything on port 5000.

---

## Prevention

**Always stop servers properly:**
- Press `Ctrl + C` in the terminal running the server
- Don't close terminal windows while server is running
- Check for running processes before starting new ones

---

## Verify Port is Free

After killing the process, verify:
```bash
netstat -ano | findstr :5000
```

Should return nothing (or just your new process).

Then start backend:
```bash
cd backend
npm run dev
```

