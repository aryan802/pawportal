-- PawPortal Database Schema
-- Pet Adoption & Healthcare Management System

-- Users table with role-based authentication
CREATE TABLE users (
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

-- Pet categories and breeds
CREATE TABLE pet_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pet_breeds (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    size ENUM('Small', 'Medium', 'Large', 'Extra Large'),
    temperament TEXT,
    life_expectancy VARCHAR(50),
    FOREIGN KEY (category_id) REFERENCES pet_categories(id)
);

-- Pet profiles
CREATE TABLE pets (
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
CREATE TABLE pet_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    caption VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Adoption applications
CREATE TABLE adoption_applications (
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
CREATE TABLE health_records (
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
CREATE TABLE care_reminders (
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

-- Community forum
CREATE TABLE forum_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forum_posts (
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

CREATE TABLE forum_replies (
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
CREATE TABLE lost_found_posts (
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
CREATE TABLE events (
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

-- Notifications
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    type ENUM('Adoption Update', 'Health Reminder', 'Forum Reply', 'Event Reminder', 'System', 'Other'),
    title VARCHAR(255) NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Vet services
CREATE TABLE vet_services (
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

-- Pet insurance
CREATE TABLE insurance_providers (
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
CREATE TABLE system_logs (
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

-- Insert default data
INSERT INTO pet_categories (name, description) VALUES
('Dog', 'Canine companions'),
('Cat', 'Feline friends'),
('Bird', 'Feathered pets'),
('Fish', 'Aquatic pets'),
('Rabbit', 'Small mammals'),
('Other', 'Other pet types');

INSERT INTO pet_breeds (category_id, name, size, temperament, life_expectancy) VALUES
(1, 'Golden Retriever', 'Large', 'Friendly, Intelligent, Devoted', '10-12 years'),
(1, 'Labrador Retriever', 'Large', 'Outgoing, Active, Friendly', '10-12 years'),
(1, 'German Shepherd', 'Large', 'Confident, Courageous, Smart', '9-13 years'),
(1, 'Beagle', 'Medium', 'Friendly, Curious, Merry', '13-16 years'),
(1, 'Pug', 'Small', 'Charming, Mischievous, Loving', '13-15 years'),
(2, 'Persian', 'Medium', 'Quiet, Sweet, Gentle', '12-17 years'),
(2, 'Maine Coon', 'Large', 'Gentle, Friendly, Intelligent', '13-14 years'),
(2, 'Siamese', 'Medium', 'Active, Vocal, Social', '15-20 years');

INSERT INTO forum_categories (name, description) VALUES
('General Discussion', 'General pet-related discussions'),
('Adoption Stories', 'Share your adoption experiences'),
('Health & Care', 'Pet health and care advice'),
('Training Tips', 'Pet training discussions'),
('Lost & Found', 'Help reunite lost pets'),
('Events & Meetups', 'Local pet events and meetups');

-- Insert system admin user
INSERT INTO users (name, email, password_hash, role, is_verified) VALUES
('System Administrator', 'admin@pawportal.com', '$2b$10$example_hash', 'System Admin', TRUE);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_pets_status ON pets(status);
CREATE INDEX idx_pets_breed ON pets(breed_id);
CREATE INDEX idx_adoption_applications_status ON adoption_applications(status);
CREATE INDEX idx_health_records_pet ON health_records(pet_id);
CREATE INDEX idx_forum_posts_category ON forum_posts(category_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
