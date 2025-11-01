-- PawPortal Database Schema (Fixed Order)
-- Pet Adoption & Healthcare Management System
-- Run this ENTIRE file in TiDB Chat2Query

USE pawportal;

-- Disable foreign key checks temporarily to avoid dependency issues
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================
-- Step 1: Core Tables (No Foreign Keys)
-- ============================================

-- Users table with role-based authentication
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
);

-- Pet categories (no foreign keys)
CREATE TABLE IF NOT EXISTS pet_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pet breeds (depends on categories)
CREATE TABLE IF NOT EXISTS pet_breeds (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    size ENUM('Small', 'Medium', 'Large', 'Extra Large'),
    temperament TEXT,
    life_expectancy VARCHAR(50),
    FOREIGN KEY (category_id) REFERENCES pet_categories(id)
);

-- Forum categories (no foreign keys)
CREATE TABLE IF NOT EXISTS forum_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Step 2: Tables that depend on users/categories
-- ============================================

-- Pet profiles
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
);

-- Pet images
CREATE TABLE IF NOT EXISTS pet_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    caption VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Adoption applications
CREATE TABLE IF NOT EXISTS adoption_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT,
    applicant_id INT,
    status ENUM('Pending', 'Approved', 'Rejected', 'Withdrawn') DEFAULT 'Pending',
    application_data JSON,
    documents JSON,
    notes TEXT,
    reviewed_by INT,
    reviewed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pets(id),
    FOREIGN KEY (applicant_id) REFERENCES users(id),
    FOREIGN KEY (reviewed_by) REFERENCES users(id)
);

-- Pet health records
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
);

-- Care reminders
CREATE TABLE IF NOT EXISTS care_reminders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT,
    user_id INT,
    reminder_type ENUM('Feeding', 'Medication', 'Exercise', 'Grooming', 'Vet Visit', 'Vaccination', 'Other'),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    frequency ENUM('Daily', 'Weekly', 'Monthly', 'Yearly', 'Custom'),
    custom_frequency_days INT,
    next_reminder DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Forum posts
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
);

-- Forum replies
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
);

-- Lost & Found
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
    description TEXT,
    images JSON,
    status ENUM('Active', 'Resolved', 'Closed') DEFAULT 'Active',
    posted_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (breed_id) REFERENCES pet_breeds(id),
    FOREIGN KEY (posted_by) REFERENCES users(id)
);

-- Events
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

-- ============================================
-- Step 3: Tables that depend on users
-- ============================================

-- Note: Notifications removed - handled in frontend with localStorage

-- Vet services (no foreign keys)
CREATE TABLE IF NOT EXISTS vet_services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    services JSON,
    rating DECIMAL(3,2),
    is_emergency BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pet insurance providers (no foreign keys)
CREATE TABLE IF NOT EXISTS insurance_providers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    coverage_types JSON,
    premium_range VARCHAR(100),
    website VARCHAR(255),
    rating DECIMAL(3,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System logs (depends on users)
CREATE TABLE IF NOT EXISTS system_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(255) NOT NULL,
    resource_type VARCHAR(100),
    resource_id INT,
    details JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============================================
-- Step 4: Insert Default Data
-- ============================================

-- Insert default pet categories
INSERT IGNORE INTO pet_categories (id, name, description) VALUES
(1, 'Dog', 'Canine companions'),
(2, 'Cat', 'Feline friends'),
(3, 'Bird', 'Feathered pets'),
(4, 'Fish', 'Aquatic pets'),
(5, 'Rabbit', 'Small mammals'),
(6, 'Other', 'Other pet types');

-- Insert default pet breeds
INSERT IGNORE INTO pet_breeds (id, category_id, name, size, temperament, life_expectancy) VALUES
(1, 1, 'Golden Retriever', 'Large', 'Friendly, Intelligent, Devoted', '10-12 years'),
(2, 1, 'Labrador Retriever', 'Large', 'Outgoing, Active, Friendly', '10-12 years'),
(3, 1, 'German Shepherd', 'Large', 'Confident, Courageous, Smart', '9-13 years'),
(4, 1, 'Beagle', 'Medium', 'Friendly, Curious, Merry', '13-16 years'),
(5, 1, 'Pug', 'Small', 'Charming, Mischievous, Loving', '13-15 years'),
(6, 2, 'Persian', 'Medium', 'Quiet, Sweet, Gentle', '12-17 years'),
(7, 2, 'Maine Coon', 'Large', 'Gentle, Friendly, Intelligent', '13-14 years'),
(8, 2, 'Siamese', 'Medium', 'Active, Vocal, Social', '15-20 years');

-- Insert default forum categories
INSERT IGNORE INTO forum_categories (id, name, description) VALUES
(1, 'General Discussion', 'General pet-related discussions'),
(2, 'Adoption Stories', 'Share your adoption experiences'),
(3, 'Health & Care', 'Pet health and care advice'),
(4, 'Training Tips', 'Pet training discussions'),
(5, 'Lost & Found', 'Help reunite lost pets'),
(6, 'Events & Meetups', 'Local pet events and meetups');

-- Insert system admin user (password should be hashed in real app)
-- For now, create it manually after registration or use default
-- INSERT INTO users (name, email, password_hash, role, is_verified) VALUES
-- ('System Administrator', 'admin@pawportal.com', '$2b$10$example_hash', 'System Admin', TRUE);

-- ============================================
-- Step 5: Create Indexes
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_pets_status ON pets(status);
CREATE INDEX IF NOT EXISTS idx_pets_breed ON pets(breed_id);
CREATE INDEX IF NOT EXISTS idx_adoption_applications_status ON adoption_applications(status);
CREATE INDEX IF NOT EXISTS idx_health_records_pet ON health_records(pet_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_category ON forum_posts(category_id);

-- ============================================
-- Step 6: Re-enable Foreign Key Checks
-- ============================================

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- Done! Verify tables were created
-- ============================================

-- Run this to verify:
-- SHOW TABLES;

