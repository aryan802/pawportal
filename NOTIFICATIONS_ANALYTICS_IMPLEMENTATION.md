# Notifications & Analytics Implementation Guide

## Part 1: Forum FK Fix ✅ COMPLETE

**Problem**: Foreign key constraint fails when posting thread
**Solution**: 
- ✅ Fetch categories from backend before creating post
- ✅ Add category dropdown in UI
- ✅ Validate category_id in backend before insert

**Status**: Ready to test!

---

## Part 2: Real-Time Notifications System

### Step 1: Database Migration

Run this SQL in TiDB:

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
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;
```

### Step 2: Backend API Structure

**Routes**: `backend/routes/notifications.js`
- `GET /api/notifications` - Get user's notifications (with pagination)
- `GET /api/notifications/unread-count` - Get unread count
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification
- `POST /api/notifications` - Create notification (admin/system)

**Socket.IO Events**:
- Server emits: `notification:new` (to specific user)
- Client listens: `notification:new`, `notification:read`

### Step 3: Notification Triggers

1. **Care Reminders**
   - Check `care_reminders` table every hour
   - If `next_reminder <= NOW() + 1 HOUR`, create notification
   - Type: 'Health'

2. **Events**
   - Check `events` table every hour
   - If `start_date <= NOW() + 24 HOURS` and not notified, create notification
   - Type: 'Event'

3. **Adoption Status**
   - When adoption application status changes
   - Type: 'Adoption'

4. **Forum Replies**
   - When someone replies to your forum post
   - Type: 'Forum'

### Step 4: Frontend Components

**Toast Notification**:
- Appears in bottom-right corner
- Auto-dismisses after 5 seconds
- Shows icon based on type
- Clickable to navigate to link

**Notification Panel**:
- Bell icon in Navbar
- Shows unread count badge
- Dropdown with recent notifications
- "Mark all as read" button

---

## Part 3: Analytics System

### System Analytics (Admin)

**API**: `GET /api/analytics/system`

**Metrics**:
```json
{
  "users": {
    "total": 150,
    "byRole": {
      "Guest": 50,
      "Pet Owner": 80,
      "Shelter Admin": 10,
      "Moderator": 5,
      "System Admin": 5
    },
    "newUsers": {
      "last7Days": 10,
      "last30Days": 45,
      "last90Days": 120
    },
    "activeUsers": {
      "last7Days": 80,
      "last30Days": 120
    }
  },
  "pets": {
    "total": 200,
    "byStatus": {
      "Available": 150,
      "Adopted": 40,
      "Pending": 8,
      "Not Available": 2
    },
    "byCategory": {
      "Dog": 120,
      "Cat": 60,
      "Other": 20
    },
    "adoptionRate": 20.0
  },
  "events": {
    "total": 30,
    "upcoming": 5,
    "past": 25,
    "byCategory": {
      "Adoption": 10,
      "Training": 8,
      "Meetups": 7,
      "Fundraisers": 5
    },
    "totalRegistrations": 450,
    "avgRegistrationsPerEvent": 15
  },
  "forum": {
    "totalPosts": 500,
    "totalReplies": 2000,
    "postsLast7Days": 50,
    "repliesLast7Days": 200,
    "mostActiveCategory": "General Discussion"
  },
  "adoptions": {
    "totalApplications": 100,
    "byStatus": {
      "Pending": 20,
      "Approved": 60,
      "Rejected": 15,
      "Withdrawn": 5
    },
    "successRate": 60.0
  },
  "health": {
    "totalHealthRecords": 500,
    "upcomingAppointments": 15,
    "totalVaccinations": 200
  }
}
```

### Pet Analytics (Pet Owner)

**API**: `GET /api/analytics/pet/:petId`

**Metrics**:
```json
{
  "pet": {
    "id": 1,
    "name": "Buddy",
    "breed": "Golden Retriever",
    "age": 2
  },
  "healthRecords": {
    "total": 15,
    "byType": {
      "Vaccination": 5,
      "Checkup": 8,
      "Treatment": 2
    },
    "totalSpent": 2500.00,
    "lastCheckup": "2024-01-15",
    "nextVaccinationDue": "2024-06-01"
  },
  "careReminders": {
    "active": 3,
    "completed": 20,
    "overdue": 0,
    "byType": {
      "Feeding": 2,
      "Medication": 1,
      "Exercise": 0
    }
  },
  "adoptionInfo": {
    "adoptedDate": "2023-01-15",
    "daysOwned": 365
  }
}
```

---

## Implementation Checklist

### Notifications
- [ ] Create notifications table (SQL migration)
- [ ] Create notifications API routes
- [ ] Create notifications controller
- [ ] Set up Socket.IO for real-time notifications
- [ ] Create notification scheduler (cron job)
- [ ] Create frontend notification service
- [ ] Create Toast component
- [ ] Create NotificationPanel component
- [ ] Integrate with Navbar
- [ ] Test with care reminders
- [ ] Test with events

### Analytics
- [ ] Create analytics API routes
- [ ] Create system analytics controller
- [ ] Create pet analytics controller
- [ ] Update SystemAnalytics.jsx to use real data
- [ ] Update PetAnalytics.jsx to use real data
- [ ] Add charts/visualizations (optional: Chart.js or Recharts)

---

## Next Steps

1. **Run SQL migration** for notifications table
2. **Create backend APIs** (notifications + analytics)
3. **Create frontend components**
4. **Test end-to-end**

Would you like me to start implementing these now?

