-- Test FAQ Query - Check if FAQs exist and match queries
-- Run this in TiDB Chat2Query

USE pawportal;

-- Check if FAQs exist
SELECT COUNT(*) as total_faqs FROM faqs WHERE is_active = TRUE;

-- Show all FAQs
SELECT id, question, category, is_active FROM faqs ORDER BY category;

-- Test a specific query match
-- Check if "what is pawportal" would match
SELECT 
    id,
    question,
    answer,
    category,
    keywords,
    CASE 
        WHEN LOWER(question) LIKE '%what is pawportal%' OR LOWER(question) LIKE '%pawportal%' THEN 'MATCH'
        WHEN LOWER(answer) LIKE '%pawportal%' THEN 'ANSWER MATCH'
        ELSE 'NO MATCH'
    END as match_status
FROM faqs
WHERE is_active = TRUE
ORDER BY match_status DESC, id;

-- Check keywords format
SELECT 
    id,
    question,
    keywords,
    JSON_TYPE(keywords) as keyword_type,
    CASE 
        WHEN JSON_TYPE(keywords) = 'ARRAY' THEN JSON_LENGTH(keywords)
        ELSE 0
    END as keyword_count
FROM faqs
WHERE is_active = TRUE
LIMIT 5;

