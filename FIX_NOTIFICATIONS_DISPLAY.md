# Fix: Notifications Not Showing in UI

## Issue
Notifications are being created successfully (API returns success), but they're not appearing in the UI. There are 500 errors in the console.

## Possible Causes

### 1. **Notifications Table Doesn't Exist** ⚠️ (Most Likely)
The `notifications` table might not have been created in TiDB.

**Solution:**
1. Go to TiDB Chat2Query
2. Run `NOTIFICATIONS_TABLE_MIGRATION.sql`:
   ```sql
   USE pawportal;
   
   CREATE TABLE IF NOT EXISTS notifications (
     id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
     user_id INT NOT NULL,
     type ENUM('Appointment', 'Event', 'Adoption', 'Health', 'System', 'Forum') NOT NULL,
     title VARCHAR(255) NOT NULL,
     message TEXT NOT NULL,
     link VARCHAR(500),
     is_read BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
     INDEX idx_user_unread (user_id, is_read),
     INDEX idx_created_at (created_at),
     INDEX idx_type (type)
   ) ENGINE=InnoDB;
   ```

### 2. **Database Connection Issue**
Check if the backend can connect to TiDB.

**Solution:**
- Check backend logs for database connection errors
- Verify `.env` file has correct database credentials

### 3. **User ID Mismatch**
The notification might be created for a different user ID than the logged-in user.

**Debug:**
```javascript
// In browser console
const user = JSON.parse(localStorage.getItem('user') || '{}');
console.log('Current user ID:', user.id);
```

### 4. **Response Parsing Issue**
The frontend might not be parsing the API response correctly.

**Fixed in code:**
- Updated `notificationService.js` to handle response structure correctly
- Added debug logs to trace the issue

## Quick Test Steps

### Step 1: Check if Table Exists
Run in TiDB Chat2Query:
```sql
USE pawportal;
SHOW TABLES LIKE 'notifications';
```

If table doesn't exist, run the migration script.

### Step 2: Check Database Connection
Check backend logs when you try to fetch notifications. Look for:
- Database connection errors
- Query execution errors

### Step 3: Test API Directly
Open browser console and run:
```javascript
const token = localStorage.getItem('token');
fetch('http://localhost:5000/api/notifications', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => {
  console.log('API Response:', data);
  console.log('Notifications:', data.data?.notifications);
  console.log('Unread Count:', data.data?.unreadCount);
})
.catch(err => console.error('Error:', err));
```

### Step 4: Check Console Logs
After the fix, you should see debug logs in console:
- "Loading notifications for user: X"
- "Notifications API response: ..."
- "Parsed notifications: ..."
- "Notifications loaded: X"

## What I Fixed

1. ✅ **Better Error Handling**: Added try-catch and error logging
2. ✅ **Response Parsing**: Fixed response data extraction
3. ✅ **Debug Logs**: Added console logs to trace the issue
4. ✅ **Type Safety**: Added checks for array/number types
5. ✅ **Backend Fix**: Fixed unreadCount parsing to handle both number and string

## Next Steps

1. **Run the migration** (if table doesn't exist)
2. **Restart backend** (to ensure latest code is running)
3. **Refresh frontend** (to get latest code)
4. **Check browser console** for debug logs
5. **Test again** by sending a notification

If still not working, check:
- Backend terminal for error messages
- Browser Network tab for API response
- Database to verify notification was created

