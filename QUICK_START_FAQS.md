# Quick Start: Seed FAQs for Chatbot

## Step 1: Get Admin User ID

First, check what System Admin user ID you have:

**In TiDB Chat2Query:**
```sql
USE pawportal;
SELECT id, name, email, role FROM users WHERE role = 'System Admin';
```

Note the `id` - you'll need it for the next step.

## Step 2: Update the SQL Script

Open `SEED_FAQS.sql` and update the `@admin_id` line if needed:

```sql
-- If you have an admin with ID 1, you can use:
SET @admin_id = 1;

-- OR if you want to auto-detect:
SET @admin_id = (SELECT id FROM users WHERE role = 'System Admin' LIMIT 1);
```

## Step 3: Run the Script

**In TiDB Chat2Query:**
1. Copy the entire contents of `SEED_FAQS.sql`
2. Paste it into the query editor
3. Click "Run" or press Ctrl+Enter
4. Check the results - you should see:
   - A list of all FAQs
   - Count by category

## Step 4: Test the Chatbot

1. **Open your app** (http://localhost:3000)
2. **Login** as any user
3. **Find the chatbot** (should be floating at bottom-right)
4. **Try these queries:**
   - "How do I adopt a pet?"
   - "What vaccinations does my pet need?"
   - "How do I register for an event?"
   - "My pet is lost"
   - "How do I add my pet?"

## What's Included

The seed script includes **20 FAQs** covering:

### Adoption (4 FAQs)
- How to adopt
- Adoption requirements
- Process duration
- Meet and greet

### Health & Care (5 FAQs)
- Vet visit frequency
- Vaccinations needed
- Health records
- Care reminders
- Notifications

### Events (3 FAQs)
- Event registration
- Event costs
- Bringing pets

### Lost & Found (3 FAQs)
- Lost pet procedure
- RFID matching
- Found pet procedure

### Account (3 FAQs)
- Update profile
- Change password
- Delete account

### Forum (2 FAQs)
- How to post
- Delete posts

### General (4 FAQs)
- What is PawPortal
- Contact support
- Free to use
- Report content

## Troubleshooting

### Error: "Unknown column 'keywords'"
Make sure your `faqs` table has a `keywords` column. If not, run:
```sql
ALTER TABLE faqs ADD COLUMN keywords JSON;
```

### Error: "User does not exist"
Make sure you have a System Admin user. Create one if needed:
```sql
-- See CREATE_ADMIN_USER.sql for reference
INSERT INTO users (name, email, password_hash, role) 
VALUES ('Admin', 'admin@pawportal.com', '$2b$10$...', 'System Admin');
```

### FAQs not showing in chatbot
1. Check that `is_active = TRUE` in the database
2. Check browser console for errors
3. Verify the API endpoint: `GET /api/faq/query?query=test`

## Next Steps

After seeding FAQs, you can:
1. **Add more FAQs** via the "Manage FAQs" page (System Admin only)
2. **Test the chatbot** with various queries
3. **Monitor FAQ usage** via analytics (if implemented)
4. **Update keywords** to improve matching

---

**Total FAQs: 20**  
**Categories: 7**  
**Ready to use!** 🎉

