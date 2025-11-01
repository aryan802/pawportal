-- Create Admin User in TiDB
-- Run this in TiDB Chat2Query

USE pawportal;

-- First, hash the password: Admin@123
-- You need to run this in Node.js to get the hash:
-- node -e "console.log(require('bcrypt').hashSync('Admin@123', 10))"

-- Or use this pre-hashed password (Admin@123):
-- NOTE: Replace this with actual hash generated from your backend
-- To generate: cd backend && node -e "const bcrypt=require('bcrypt'); bcrypt.hash('Admin@123',10).then(h=>console.log(h))"

-- Insert admin user
INSERT INTO users (
    name, 
    email, 
    password_hash, 
    role, 
    is_verified,
    phone,
    created_at
) VALUES (
    'System Administrator',
    'admin@pawportal.com',
    '$2b$10$nAWV2/bXtxZhoX/vOkqSYuxoeDxyrDDUnz0kSDits8Vz076OwFCUK', -- REPLACE with actual hash from backend
    'System Admin',
    TRUE,
    '+91-9302028636',
    NOW()
)
ON DUPLICATE KEY UPDATE
    role = 'System Admin',
    is_verified = TRUE;

-- Verify admin user was created
SELECT id, name, email, role, is_verified FROM users WHERE email = 'admin@pawportal.com';

