# Setup Guide: Notifications & Analytics

## ✅ Completed Implementation

### 1. Notifications System
- ✅ Database table created (`NOTIFICATIONS_TABLE_MIGRATION.sql`)
- ✅ Backend API routes (`/api/notifications`)
- ✅ Socket.IO integration for real-time notifications
- ✅ Frontend notification service
- ✅ NotificationPanel component (bell icon in Navbar)
- ✅ NotificationToast component (popup notifications)
- ✅ NotificationManager component (global toast handler)

### 2. Analytics System
- ✅ System Analytics API (`/api/analytics/system`)
- ✅ Pet Analytics API (`/api/analytics/pet/:petId`)
- ✅ Frontend analytics service
- ✅ SystemAnalytics component (updated with real data)
- ✅ PetAnalytics component (updated with real data)

---

## 🚀 Setup Steps

### Step 1: Run Database Migration

**In TiDB Chat2Query**, run:
```sql
-- File: NOTIFICATIONS_TABLE_MIGRATION.sql
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

### Step 2: Restart Backend

```bash
cd backend
npm run dev
```

### Step 3: Test Notifications

1. **Check Notification Panel**:
   - Look for bell icon in Navbar (top-right)
   - Click to see notifications dropdown
   - Should show "No notifications" if empty

2. **Test Real-time Notifications**:
   - Open browser console (F12)
   - Should see "Socket.IO connected" message
   - Create a test notification via API (see below)

### Step 4: Test Analytics

1. **System Analytics**:
   - Login as System Admin
   - Go to "System Analytics" page
   - Should show real data from database

2. **Pet Analytics**:
   - Login as Pet Owner
   - Go to "Pet Analytics" page
   - Select a pet to see analytics

---

## 🧪 Testing Notifications

### Create Test Notification via API

**Using curl** (or Postman):
```bash
# Replace YOUR_TOKEN with actual JWT token
curl -X POST http://localhost:5000/api/notifications \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "type": "Event",
    "title": "Test Notification",
    "message": "This is a test notification",
    "link": "/events"
  }'
```

**Or create via Admin Panel** (if you add UI for it):
- System Admin → Create Notification
- Select user, type, title, message
- Notification will appear in real-time!

---

## 📊 Analytics Features

### System Analytics (Admin)
- **User Statistics**: Total, by role, new users, active users
- **Pet Statistics**: Total, by status, by category, adoption rate
- **Event Statistics**: Total, upcoming, registrations
- **Forum Statistics**: Posts, replies, active categories
- **Adoption Statistics**: Applications, success rate
- **Health Statistics**: Records, vaccinations, appointments

### Pet Analytics (Pet Owner)
- **Health Records**: Total, by type, total spent, last checkup
- **Care Reminders**: Active, completed, overdue
- **Health Score**: Calculated based on care compliance
- **Recommendations**: Based on overdue reminders, health score

---

## 🔔 Notification Types

1. **Appointment** - Care reminder notifications
2. **Event** - Event reminders (24 hours before)
3. **Adoption** - Adoption status changes
4. **Health** - Health-related notifications
5. **System** - System-wide announcements
6. **Forum** - Forum reply notifications

---

## 📝 Next Steps (Optional Enhancements)

1. **Notification Scheduler**:
   - Create cron job to check `care_reminders` table
   - Send notifications 1 hour before due time
   - Check `events` table for upcoming events

2. **Notification Preferences**:
   - Allow users to enable/disable notification types
   - Add notification settings page

3. **Email Notifications**:
   - Send email for critical notifications
   - Configure SMTP settings

4. **Analytics Charts**:
   - Add Chart.js or Recharts for visualizations
   - Show trends over time

---

## ✅ Status

- ✅ Notifications backend API - COMPLETE
- ✅ Socket.IO integration - COMPLETE
- ✅ Frontend notification components - COMPLETE
- ✅ Analytics backend API - COMPLETE
- ✅ Frontend analytics components - COMPLETE

**Everything is ready to test!** 🎉

