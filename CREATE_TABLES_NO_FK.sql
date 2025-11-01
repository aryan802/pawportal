-- Quick Fix: Create All Tables Without Foreign Key Constraints
-- Run this if you're having foreign key dependency issues
-- This creates tables first, then you can add foreign keys later if needed

USE pawportal;

-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Users
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

-- Pet categories
CREATE TABLE IF NOT EXISTS pet_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pet breeds
CREATE TABLE IF NOT EXISTS pet_breeds (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    size ENUM('Small', 'Medium', 'Large', 'Extra Large'),
    temperament TEXT,
    life_expectancy VARCHAR(50)
);

-- Forum categories
CREATE TABLE IF NOT EXISTS forum_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Pet images
CREATE TABLE IF NOT EXISTS pet_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    caption VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Health records
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Forum replies
CREATE TABLE IF NOT EXISTS forum_replies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT,
    author_id INT,
    content TEXT NOT NULL,
    is_solution BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Vet services
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

-- Insurance providers
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

-- System logs
CREATE TABLE IF NOT EXISTS system_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(255) NOT NULL,
    resource_type VARCHAR(100),
    resource_id INT,
    details JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Verify tables
SHOW TABLES;

