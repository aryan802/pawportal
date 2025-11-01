-- Create Missing Tables
-- Run this in TiDB Chat2Query to create the missing tables

USE pawportal;

SET FOREIGN_KEY_CHECKS = 0;

-- ⚠️ CRITICAL: Users table (needed for authentication!)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Guest', 'Pet Owner', 'Shelter Admin', 'Moderator', 'System Admin') DEFAULT 'Guest',
    phone VARCHAR(20),
    address TEXT,
    profile_image VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expires DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
) ENGINE=InnoDB;

-- Pet Categories
CREATE TABLE IF NOT EXISTS pet_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Pet Breeds
CREATE TABLE IF NOT EXISTS pet_breeds (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    size ENUM('Small', 'Medium', 'Large', 'Extra Large'),
    temperament TEXT,
    life_expectancy VARCHAR(50),
    FOREIGN KEY (category_id) REFERENCES pet_categories(id)
) ENGINE=InnoDB;

-- Pets
CREATE TABLE IF NOT EXISTS pets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    breed_id INT,
    age_months INT,
    gender ENUM('Male', 'Female'),
    size ENUM('Small', 'Medium', 'Large', 'Extra Large'),
    color VARCHAR(100),
    weight DECIMAL(5,2),
    description TEXT,
    temperament TEXT,
    special_needs TEXT,
    adoption_fee DECIMAL(10,2),
    status ENUM('Available', 'Adopted', 'Pending', 'Not Available') DEFAULT 'Available',
    owner_id INT,
    shelter_id INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (breed_id) REFERENCES pet_breeds(id),
    FOREIGN KEY (owner_id) REFERENCES users(id),
    FOREIGN KEY (shelter_id) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB;

-- Pet Images
CREATE TABLE IF NOT EXISTS pet_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    caption VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Health Records
CREATE TABLE IF NOT EXISTS health_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT,
    record_type ENUM('Vaccination', 'Checkup', 'Treatment', 'Surgery', 'Medication', 'Other'),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date_performed DATE,
    vet_name VARCHAR(255),
    vet_clinic VARCHAR(255),
    cost DECIMAL(10,2),
    documents JSON,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB;

-- Forum Posts
CREATE TABLE IF NOT EXISTS forum_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    author_id INT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES forum_categories(id),
    FOREIGN KEY (author_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- Forum Replies
CREATE TABLE IF NOT EXISTS forum_replies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT,
    author_id INT,
    content TEXT NOT NULL,
    is_solution BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- Lost & Found (with RFID)
CREATE TABLE IF NOT EXISTS lost_found_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('Lost', 'Found') NOT NULL,
    pet_name VARCHAR(255),
    breed_id INT,
    color VARCHAR(100),
    size ENUM('Small', 'Medium', 'Large', 'Extra Large'),
    last_seen_location VARCHAR(255),
    last_seen_date DATE,
    contact_info VARCHAR(255),
    rfid_number VARCHAR(100),
    description TEXT,
    images JSON,
    status ENUM('Active', 'Resolved', 'Closed') DEFAULT 'Active',
    posted_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (breed_id) REFERENCES pet_breeds(id),
    FOREIGN KEY (posted_by) REFERENCES users(id)
) ENGINE=InnoDB;

-- RFID Matches
CREATE TABLE IF NOT EXISTS rfid_matches (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    lost_post_id INT NOT NULL,
    found_post_id INT NOT NULL,
    rfid_number VARCHAR(100) NOT NULL,
    matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notified_lost_user BOOLEAN DEFAULT FALSE,
    notified_found_user BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (lost_post_id) REFERENCES lost_found_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (found_post_id) REFERENCES lost_found_posts(id) ON DELETE CASCADE,
    UNIQUE KEY unique_match (lost_post_id, found_post_id)
) ENGINE=InnoDB;

-- FAQs
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
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Insert default data
INSERT IGNORE INTO pet_categories (id, name, description) VALUES
(1, 'Dog', 'Canine companions'),
(2, 'Cat', 'Feline friends'),
(3, 'Bird', 'Feathered pets'),
(4, 'Fish', 'Aquatic pets'),
(5, 'Rabbit', 'Small mammals'),
(6, 'Other', 'Other pet types');

INSERT IGNORE INTO forum_categories (id, name, description) VALUES
(1, 'General Discussion', 'General pet-related discussions'),
(2, 'Adoption Stories', 'Share your adoption experiences'),
(3, 'Health & Care', 'Pet health and care advice'),
(4, 'Training Tips', 'Pet training discussions'),
(5, 'Lost & Found', 'Help reunite lost pets'),
(6, 'Events & Meetups', 'Local pet events and meetups');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_pets_status ON pets(status);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_lost_found_rfid ON lost_found_posts(rfid_number);

SET FOREIGN_KEY_CHECKS = 1;

-- Verify all tables now exist
SHOW TABLES;

