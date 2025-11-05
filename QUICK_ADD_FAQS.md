# Quick Guide: Add 50 Additional FAQs

## Step 1: Run the SQL Script

**In TiDB Chat2Query**, run `SEED_ADDITIONAL_FAQS.sql`:

1. Copy the entire contents of `SEED_ADDITIONAL_FAQS.sql`
2. Paste it into TiDB Chat2Query
3. Click "Run" or press Ctrl+Enter
4. Check the results - you should see:
   - Total FAQs count (should be 70 if you ran SEED_FAQS_SIMPLE.sql first)
   - Count by category

## Step 2: Verify

After running, check:
```sql
SELECT COUNT(*) as total FROM faqs WHERE is_active = TRUE;
-- Should show 70 (20 original + 50 new)
```

## Step 3: Test the Chatbot

Try these queries in the chatbot:
- "What is PawPortal?" ✅
- "How can I adopt a pet?" ✅
- "Is there an adoption fee?" ✅
- "Can I donate?" ✅
- "How do I reset my password?" ✅
- "What payment methods do you accept?" ✅

## What's Included

### Categories:
- **Adoption** (15 FAQs)
- **General** (20 FAQs)
- **Health** (2 FAQs)
- **Account** (4 FAQs)
- **Lost & Found** (2 FAQs)
- **Forum** (1 FAQ)
- **Events** (1 FAQ)

### Topics Covered:
- Platform overview
- Adoption process & fees
- Pet listing & searching
- Account management
- Payment methods
- Safety & security
- Support & contact
- Shelter partnerships
- Lost & Found
- And more!

## Total FAQs After Adding

- **Original FAQs**: 20
- **New FAQs**: 50
- **Total**: **70 FAQs** 🎉

## Troubleshooting

### Error: "Duplicate entry"
- Some FAQs might already exist
- The script uses `INSERT INTO` which will fail on duplicates
- Check which ones already exist and skip them

### Error: "Unknown column 'keywords'"
- Make sure the `faqs` table exists
- Run `CREATE_FAQS_TABLE_SIMPLE.sql` first if needed

### Error: "User does not exist"
- Make sure you have a System Admin user
- The script auto-detects admin ID, or set manually: `SET @admin_id = 1;`

---

**Your chatbot now has 70 comprehensive FAQs!** 🚀

