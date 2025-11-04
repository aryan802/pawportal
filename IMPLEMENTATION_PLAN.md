# Implementation Plan: Forum FK Fix, Notifications & Analytics

## 1. Forum Foreign Key Constraint Fix ✅

### Problem
- Frontend hardcodes `category_id: 1` but category might not exist in database
- Need to fetch and validate categories before creating posts

### Solution Implemented
- ✅ Added `getForumCategories()` API endpoint
- ✅ Updated frontend to fetch categories on mount
- ✅ Added category dropdown in "Start New Thread" modal
- ✅ Added backend validation to check category exists before creating post

### Status: COMPLETE

---

## 2. Real-Time Notifications System

### Architecture
```
Database → Backend → Socket.IO → Frontend → Toast Component
```

### Implementation Steps

#### Step 1: Database Schema
Create `notifications` table:
```sql
CREATE TABLE notifications (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  type ENUM('Appointment', 'Event', 'Adoption', 'Health', 'System') NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR(500),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### Step 2: Backend API
- `POST /api/notifications` - Create notification (admin/system)
- `GET /api/notifications` - Get user's notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification

#### Step 3: Socket.IO Integration
- Emit notifications to specific users when events occur
- Listen for: `new-notification`, `notification-read`

#### Step 4: Frontend Components
- Notification service (API calls)
- Socket.IO client connection
- Toast notification component (React)
- Notification panel (bell icon with dropdown)

#### Step 5: Integration Points
- **Care Reminders**: Check `care_reminders` table, emit notifications 1 hour before
- **Events**: Check `events` table, emit notifications 24 hours before start
- **Adoption**: Emit when application status changes
- **Health**: Emit for vaccination reminders, check-ups

---

## 3. Analytics System

### System Analytics (Admin Dashboard)

#### Metrics to Track:
1. **User Statistics**
   - Total users by role
   - New users (last 7/30 days)
   - Active users (logged in last 7 days)

2. **Pet Statistics**
   - Total pets by status
   - Adoption rate (adopted vs available)
   - Pets by category/breed

3. **Event Statistics**
   - Total events
   - Upcoming events
   - Registration counts
   - Events by category

4. **Forum Statistics**
   - Total posts
   - Total replies
   - Most active categories
   - Posts per day

5. **Adoption Statistics**
   - Total applications
   - Applications by status
   - Adoption success rate

#### Backend API: `GET /api/analytics/system`
Returns:
```json
{
  "users": {
    "total": 150,
    "byRole": { "Pet Owner": 120, "Shelter Admin": 5 },
    "newUsers": { "last7Days": 10, "last30Days": 45 }
  },
  "pets": {
    "total": 200,
    "byStatus": { "Available": 150, "Adopted": 50 },
    "adoptionRate": 25.0
  },
  "events": {
    "total": 30,
    "upcoming": 5,
    "totalRegistrations": 450
  },
  "forum": {
    "totalPosts": 500,
    "totalReplies": 2000,
    "postsLast7Days": 50
  }
}
```

### Pet Analytics (Pet Owner Dashboard)

#### Metrics to Track:
1. **Health Records**
   - Total health records
   - Vaccination status
   - Upcoming appointments
   - Total spent on healthcare

2. **Care Reminders**
   - Active reminders
   - Completed reminders
   - Overdue reminders

3. **Adoption History**
   - Pets adopted
   - Application status

#### Backend API: `GET /api/analytics/pet/:petId`
Returns:
```json
{
  "pet": { "id": 1, "name": "Buddy" },
  "healthRecords": {
    "total": 15,
    "vaccinations": 5,
    "totalSpent": 2500.00
  },
  "reminders": {
    "active": 3,
    "completed": 20,
    "overdue": 0
  }
}
```

---

## Implementation Order

1. ✅ Fix Forum FK constraint (COMPLETE)
2. ⏳ Create notifications table and API
3. ⏳ Set up Socket.IO for notifications
4. ⏳ Create notification components
5. ⏳ Create system analytics API
6. ⏳ Create pet analytics API
7. ⏳ Update frontend analytics components

---

## Files to Create/Update

### Backend
- `backend/routes/notifications.js`
- `backend/controllers/notificationController.js`
- `backend/routes/analytics.js`
- `backend/controllers/analyticsController.js`
- `backend/utils/notificationScheduler.js` (cron job for reminders)

### Frontend
- `src/services/notificationService.js`
- `src/services/analyticsService.js`
- `src/components/NotificationToast.jsx`
- `src/components/NotificationPanel.jsx`
- Update `src/pages/dashboard/SystemAnalytics.jsx`
- Update `src/pages/management/PetAnalytics.jsx`

