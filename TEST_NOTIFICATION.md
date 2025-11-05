# Quick Test: Trigger Notification

## Method 1: Browser Console (Easiest) ⭐

1. **Open your app** (http://localhost:3000)
2. **Login** as any user
3. **Open Browser Console** (F12 → Console tab)
4. **Get your token**:
   ```javascript
   const token = localStorage.getItem('token');
   console.log('Token:', token);
   ```

5. **Get your user ID** (from auth context or API):
   ```javascript
   // Check user info
   const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
   console.log('User ID:', userInfo.id);
   ```

6. **Send notification**:
   ```javascript
   const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
   const token = localStorage.getItem('token');
   
   fetch('http://localhost:5000/api/notifications', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     },
     body: JSON.stringify({
       user_id: userId,
       type: 'Event',
       title: 'Test Notification! 🎉',
       message: 'This is a test notification sent from browser console',
       link: '/events'
     })
   })
   .then(res => res.json())
   .then(data => {
     console.log('Notification sent!', data);
     // You should see a toast notification appear!
   })
   .catch(err => console.error('Error:', err));
   ```

---

## Method 2: curl Command (Terminal)

```bash
# Replace YOUR_TOKEN with actual JWT token
# Replace USER_ID with your user ID (usually 1 for admin)

curl -X POST http://localhost:5000/api/notifications \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "type": "Event",
    "title": "Test Notification",
    "message": "This is a test notification from curl",
    "link": "/events"
  }'
```

**To get token:**
1. Login to your app
2. Open browser console
3. Run: `localStorage.getItem('token')`

---

## Method 3: Create Test Button (For Easy Testing)

I'll create a simple test page you can add to your app.

---

## Method 4: Postman

1. **Create POST request**:
   - URL: `http://localhost:5000/api/notifications`
   - Method: `POST`
   - Headers:
     - `Authorization`: `Bearer YOUR_TOKEN`
     - `Content-Type`: `application/json`
   - Body (JSON):
     ```json
     {
       "user_id": 1,
       "type": "Event",
       "title": "Test Notification",
       "message": "This is a test notification",
       "link": "/events"
     }
     ```

---

## Notification Types

You can use any of these types:
- `Appointment` - Care reminder notifications
- `Event` - Event reminders
- `Adoption` - Adoption status changes
- `Health` - Health-related notifications
- `System` - System-wide announcements
- `Forum` - Forum reply notifications

---

## What to Expect

1. **Toast Notification** (bottom-right):
   - Should appear immediately
   - Color-coded by type
   - Auto-dismisses after 5 seconds

2. **Notification Panel** (bell icon):
   - Badge count should update
   - Notification appears in dropdown
   - Click to mark as read

3. **Real-time**:
   - If you have multiple tabs open, notification appears in all tabs
   - No page refresh needed!

---

## Troubleshooting

**No notification appearing?**
1. Check backend is running: `http://localhost:5000/api/health`
2. Check browser console for errors
3. Verify Socket.IO connection: Look for "Socket.IO connected" in console
4. Check token is valid (not expired)

**Socket.IO not connecting?**
- Make sure backend is running
- Check CORS settings in `backend/server.js`
- Verify `FRONTEND_URL` in backend `.env`

---

## Quick Test Script

Save this as `test-notification.html` and open in browser:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test Notification</title>
</head>
<body>
    <h1>Test Notification</h1>
    <button onclick="sendNotification()">Send Test Notification</button>
    <div id="result"></div>
    
    <script>
        async function sendNotification() {
            const token = prompt('Enter your JWT token (from localStorage):');
            const userId = prompt('Enter your user ID:');
            
            try {
                const response = await fetch('http://localhost:5000/api/notifications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        user_id: parseInt(userId),
                        type: 'Event',
                        title: 'Test Notification! 🎉',
                        message: 'This is a test notification',
                        link: '/events'
                    })
                });
                
                const data = await response.json();
                document.getElementById('result').innerHTML = 
                    '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            } catch (error) {
                document.getElementById('result').innerHTML = 
                    '<p style="color: red;">Error: ' + error.message + '</p>';
            }
        }
    </script>
</body>
</html>
```

