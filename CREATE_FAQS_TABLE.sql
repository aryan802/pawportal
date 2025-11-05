-- Create FAQs Table for PawPortal
-- Run this in TiDB Chat2Query

USE pawportal;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS faqs (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  keywords JSON,
  views INT DEFAULT 0,
  helpful_count INT DEFAULT 0,
  created_by INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_faqs_category (category),
  INDEX idx_faqs_active (is_active)
) ENGINE=InnoDB;

-- Create FULLTEXT index separately (if supported by TiDB)
-- Note: TiDB may not support FULLTEXT indexes. If this fails, just remove it.
-- The regular indexes above will still work for searches.
ALTER TABLE faqs ADD FULLTEXT INDEX idx_faqs_search (question);

SET FOREIGN_KEY_CHECKS = 1;

-- Try to create FULLTEXT index on answer separately (if FULLTEXT is supported)
-- If this fails, it's okay - regular indexes will work fine
-- ALTER TABLE faqs ADD FULLTEXT INDEX idx_faqs_answer (answer);

-- Verify table was created
SELECT 'FAQs table created successfully!' as status;
DESCRIBE faqs;

-- Check if table exists
SHOW TABLES LIKE 'faqs';

-- Show indexes
SHOW INDEXES FROM faqs;

