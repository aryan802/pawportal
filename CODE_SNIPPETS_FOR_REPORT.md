# PawPortal - Code Snippets for Project Report

## 1. Backend (API) - Controller Method for Pet Adoption Listings

### Pet Controller - Get All Pets with Filters
**File:** `backend/controllers/petController.js`

```javascript
/**
 * Get all pets with filters
 */
const getAllPets = async (req, res, next) => {
  try {
    const { status, breed_id, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        p.id, p.name, p.breed_id, p.age_months, p.gender, p.size, 
        p.color, p.weight, p.description, p.temperament, 
        p.special_needs, p.adoption_fee, p.status, p.owner_id, 
        p.shelter_id, p.created_at,
        pb.name as breed_name,
        u.name as owner_name,
        (SELECT image_url FROM pet_images WHERE pet_id = p.id AND is_primary = TRUE LIMIT 1) as primary_image
      FROM pets p
      LEFT JOIN pet_breeds pb ON p.breed_id = pb.id
      LEFT JOIN users u ON p.owner_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ' AND p.status = ?';
      params.push(status);
    }

    if (breed_id) {
      query += ' AND p.breed_id = ?';
      params.push(breed_id);
    }

    if (search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const [pets] = await pool.query(query, params);

    // Get images for each pet
    for (let pet of pets) {
      const [images] = await pool.query(
        'SELECT id, image_url, is_primary, caption FROM pet_images WHERE pet_id = ?',
        [pet.id]
      );
      pet.images = images;
    }

    res.json({
      success: true,
      data: { pets }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new pet
 */
const createPet = async (req, res, next) => {
  try {
    const {
      name, breed_id, age_months, gender, size, color, weight,
      description, temperament, special_needs, adoption_fee,
      status, rfid_number
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Pet name is required'
      });
    }

    const [result] = await pool.query(
      `INSERT INTO pets 
       (name, breed_id, age_months, gender, size, color, weight, 
        description, temperament, special_needs, adoption_fee, status, owner_id, created_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, breed_id || null, age_months || null, gender || null,
        size || null, color || null, weight || null, description || null,
        temperament || null, special_needs || null, adoption_fee || null,
        status || 'Available', req.userId, req.userId
      ]
    );

    const [pets] = await pool.query(
      'SELECT * FROM pets WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Pet created successfully',
      data: { pet: pets[0] }
    });
  } catch (error) {
    next(error);
  }
};
```

### Pet Routes - API Endpoints
**File:** `backend/routes/pets.js`

```javascript
const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { authenticate, authorize } = require('../middleware/auth');
const { uploadSingle, uploadMultiple } = require('../utils/multer');

// All routes require authentication
router.use(authenticate);

router.get('/', petController.getAllPets);
router.get('/:id', petController.getPetById);
router.post('/', petController.createPet);
router.put('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);
router.get('/user/:userId', petController.getUserPets);

// Image upload routes
router.post('/:id/images', uploadSingle('image'), petController.uploadPetImage);
router.delete('/images/:imageId', petController.deletePetImage);

module.exports = router;
```

---

## 2. Database - SQL Schema for Pet Management

### Pet Tables Schema
**File:** `database_schema.sql`

```sql
-- Pet profiles table
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

-- Pet images table
CREATE TABLE pet_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    caption VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Pet breeds table
CREATE TABLE pet_breeds (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    size ENUM('Small', 'Medium', 'Large', 'Extra Large'),
    temperament TEXT,
    life_expectancy VARCHAR(50),
    FOREIGN KEY (category_id) REFERENCES pet_categories(id)
);

-- Adoption applications table
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

-- Create indexes for better performance
CREATE INDEX idx_pets_status ON pets(status);
CREATE INDEX idx_pets_breed ON pets(breed_id);
CREATE INDEX idx_adoption_applications_status ON adoption_applications(status);
```

---

## 3. Frontend (React) - Pet Listing Component with Interactivity

### PetListings Component
**File:** `src/pages/adoption/PetListings.jsx`

```javascript
import React, { useState, useEffect } from "react";
import { useRolePromotion } from "../../hooks/useRolePromotion";
import { petService } from "../../services/dataService";

const PetListings = () => {
  const [pets, setPets] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [profilePet, setProfilePet] = useState(null);
  const [adoptPet, setAdoptPet] = useState(null);
  const [adoptForm, setAdoptForm] = useState({ name: '', email: '', message: '' });
  const [adoptSuccess, setAdoptSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [breedFilter, setBreedFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const { promoteOnPetAdoption } = useRolePromotion();

  // Load pets data on component mount
  useEffect(() => {
    const petsData = petService.getPets();
    setPets(petsData);
  }, []);

  // Filter pets based on search and filters
  const uniqueBreeds = Array.from(new Set(pets.map(p => p.breed)));
  const filteredPets = pets.filter(pet => {
    const matchesSearch =
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.breed.toLowerCase().includes(search.toLowerCase());
    const matchesBreed = breedFilter ? pet.breed === breedFilter : true;
    let matchesAge = true;
    if (ageFilter === "young") matchesAge = pet.age.includes("1") || pet.age.includes("2");
    if (ageFilter === "adult") matchesAge = pet.age.includes("3") || pet.age.includes("4");
    if (ageFilter === "senior") matchesAge = pet.age.includes("5") || pet.age.includes("6");
    return matchesSearch && matchesBreed && matchesAge;
  });

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Adoptable Pets</h2>
      
      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Search by name or breed..."
          className="border rounded px-3 py-2 w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={breedFilter}
          onChange={e => setBreedFilter(e.target.value)}
        >
          <option value="">All Breeds</option>
          {uniqueBreeds.map(breed => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
        <select
          className="border rounded px-3 py-2"
          value={ageFilter}
          onChange={e => setAgeFilter(e.target.value)}
        >
          <option value="">All Ages</option>
          <option value="young">Young (1-2 yrs)</option>
          <option value="adult">Adult (3-4 yrs)</option>
          <option value="senior">Senior (5+ yrs)</option>
        </select>
      </div>

      {/* Pet Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {filteredPets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:border-pink-200 border border-transparent"
            style={{ cursor: 'pointer' }}
          >
            <img
              src={pet.image}
              alt={pet.name}
              className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-pink-100 transition duration-200 hover:border-pink-400"
              onClick={() => setModalImage(pet.image)}
              style={{ cursor: 'zoom-in' }}
              title="Click to view full image"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-1">{pet.name}</h3>
            <p className="text-gray-500 mb-1">{pet.breed}</p>
            <p className="text-gray-400 mb-2">{pet.age}</p>
            <p className="text-center text-gray-600 mb-4">{pet.description}</p>
            <div className="flex gap-2 w-full justify-center mt-2">
              <button
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-semibold transition duration-200 hover:bg-gray-200 hover:scale-105 hover:shadow"
                onClick={() => setProfilePet(pet)}
              >
                View Profile
              </button>
              <button
                className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold transition duration-200 hover:bg-pink-600 hover:scale-105 hover:shadow-lg"
                onClick={() => setAdoptPet(pet)}
              >
                Adopt Me
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Adoption Form Modal */}
      {adoptPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-2 text-pink-600">Adopt {adoptPet.name}</h2>
            <p className="mb-4 text-gray-500">Express your interest in adopting this {adoptPet.breed}!</p>
            {adoptSuccess ? (
              <div className="text-green-600 font-semibold text-center py-6">
                Thank you! Your request has been submitted.
              </div>
            ) : (
              <form onSubmit={async (e) => { 
                e.preventDefault(); 
                setAdoptSuccess(true);
                await promoteOnPetAdoption();
              }} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border rounded px-3 py-2"
                  value={adoptForm.name}
                  onChange={e => setAdoptForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="border rounded px-3 py-2"
                  value={adoptForm.email}
                  onChange={e => setAdoptForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
                <textarea
                  placeholder="Why do you want to adopt? (optional)"
                  className="border rounded px-3 py-2"
                  value={adoptForm.message}
                  onChange={e => setAdoptForm(f => ({ ...f, message: e.target.value }))}
                  rows={3}
                />
                <button 
                  type="submit" 
                  className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PetListings;
```

---

## 4. Authentication - Login/Register with JWT

### Auth Controller - Login and Register
**File:** `backend/controllers/authController.js`

```javascript
const bcrypt = require('bcrypt');
const pool = require('../config/database');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

/**
 * Register new user
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    // Check if user exists
    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email.toLowerCase()]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password_hash, phone, address, role) 
       VALUES (?, ?, ?, ?, ?, 'Guest')`,
      [name, email.toLowerCase(), passwordHash, phone || null, address || null]
    );

    // Get created user
    const [users] = await pool.query(
      'SELECT id, name, email, role, phone, address, created_at FROM users WHERE id = ?',
      [result.insertId]
    );

    const user = users[0];

    // Generate tokens
    const token = generateToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user.id });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        token,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email.toLowerCase()]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    await pool.query(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Generate tokens
    const token = generateToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user.id });

    // Remove password from response
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};
```

### Auth Middleware - JWT Authentication
**File:** `backend/middleware/auth.js`

```javascript
const { verifyToken } = require('../utils/jwt');
const pool = require('../config/database');

/**
 * Authentication middleware - verifies JWT token
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      const decoded = verifyToken(token);
      
      // Fetch user from database to ensure they still exist
      const [users] = await pool.query(
        'SELECT id, name, email, role, is_verified FROM users WHERE id = ?',
        [decoded.userId]
      );

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      req.user = users[0];
      req.userId = decoded.userId;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message
    });
  }
};

/**
 * Role-based authorization middleware
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};
```

### Auth Routes
**File:** `backend/routes/auth.js`

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.get('/me', authenticate, authController.getMe);
router.post('/logout', authenticate, authController.logout);

module.exports = router;
```

---

## 5. Integration - Frontend Calling Backend API

### API Service Configuration
**File:** `src/services/api.js`

```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject({
      message: error.response?.data?.message || error.message || 'An error occurred',
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

export default api;
```

### Pet Service - Frontend API Calls
**File:** `src/services/petService.js`

```javascript
import api from './api';

/**
 * Get all pets
 */
export const getPets = async (params = {}) => {
  try {
    const response = await api.get('/pets', { params });
    // Backend returns: { success: true, data: { pets: [...] } }
    return {
      success: true,
      pets: response.data?.pets || response.pets || []
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch pets',
      pets: []
    };
  }
};

/**
 * Get pet by ID
 */
export const getPetById = async (id) => {
  try {
    const response = await api.get(`/pets/${id}`);
    return {
      success: true,
      pet: response.data?.pet || response.pet
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch pet'
    };
  }
};

/**
 * Create new pet
 */
export const createPet = async (petData) => {
  try {
    const response = await api.post('/pets', petData);
    return {
      success: true,
      pet: response.data?.pet || response.pet,
      message: response.message || 'Pet created successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to create pet'
    };
  }
};

/**
 * Update pet
 */
export const updatePet = async (id, petData) => {
  try {
    const response = await api.put(`/pets/${id}`, petData);
    return {
      success: true,
      pet: response.data?.pet || response.pet,
      message: response.message || 'Pet updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to update pet'
    };
  }
};
```

### Auth Service - Frontend API Calls
**File:** `src/services/authService.js`

```javascript
import api from './api';

/**
 * Register new user
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    const { user, token, refreshToken } = response.data || response;
    
    // Store in localStorage
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return { success: true, user, token, refreshToken };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Registration failed'
    };
  }
};

/**
 * Login user
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { user, token, refreshToken } = response.data || response;
    
    // Store in localStorage
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return { success: true, user, token, refreshToken };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Login failed. Please check if backend is running.'
    };
  }
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};
```

### Example Usage in React Component
```javascript
import React, { useState, useEffect } from 'react';
import { getPets, createPet } from '../services/petService';

const PetManagement = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch pets on component mount
  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    setLoading(true);
    const result = await getPets({ status: 'Available', limit: 20 });
    if (result.success) {
      setPets(result.pets);
    } else {
      console.error('Error loading pets:', result.error);
    }
    setLoading(false);
  };

  const handleCreatePet = async (petData) => {
    const result = await createPet(petData);
    if (result.success) {
      alert('Pet created successfully!');
      loadPets(); // Reload pets list
    } else {
      alert('Error: ' + result.error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading pets...</p>
      ) : (
        <div>
          {pets.map(pet => (
            <div key={pet.id}>{pet.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};
```

---

## Summary

These code snippets demonstrate:

1. **Backend API**: RESTful endpoints with Express.js for pet management, including filtering, pagination, and authentication
2. **Database**: Well-structured SQL schema with proper relationships, indexes, and constraints
3. **Frontend React**: Interactive components with state management, filtering, modals, and user interactions
4. **Authentication**: JWT-based authentication with password hashing, token generation, and role-based access control
5. **Integration**: Axios-based API calls with interceptors for automatic token injection and error handling

All code follows best practices for security, error handling, and user experience.

