-- Create FAQs Table for PawPortal (Simplified - No FULLTEXT)
-- Run this in TiDB Chat2Query if FULLTEXT index causes issues

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

SET FOREIGN_KEY_CHECKS = 1;

-- Verify table was created
SELECT 'FAQs table created successfully!' as status;
DESCRIBE faqs;

-- Show indexes
SHOW INDEXES FROM faqs;

