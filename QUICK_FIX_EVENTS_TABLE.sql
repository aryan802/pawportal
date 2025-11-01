-- Quick Fix: Create Events Table (if it doesn't exist)
-- Run this BEFORE running migrations

USE pawportal;

-- Create events table (base schema)
CREATE TABLE IF NOT EXISTS events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type ENUM('Adoption Event', 'Fundraiser', 'Training', 'Health Check', 'Community Meet', 'Other'),
    location VARCHAR(255),
    start_date DATETIME,
    end_date DATETIME,
    max_attendees INT,
    registration_required BOOLEAN DEFAULT FALSE,
    organizer_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id)
);

-- Verify table was created
SHOW TABLES LIKE 'events';

