import { 
  USER_ROLES, 
  SYSTEM_ADMIN_CREDENTIALS, 
  DEFAULT_USER_ROLE,
  ROLE_ROUTES 
} from '../utils/constants';

// Initialize users from localStorage or create default users
const initializeUsers = () => {
  const storedUsers = localStorage.getItem('pawportal_users');
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  
  // Default users
  const defaultUsers = [
    {
      id: 1,
      name: 'System Administrator',
      email: SYSTEM_ADMIN_CREDENTIALS.email,
      password: SYSTEM_ADMIN_CREDENTIALS.password,
      role: USER_ROLES.SYSTEM_ADMIN,
      createdAt: new Date().toISOString(),
      lastLogin: null
    }
  ];
  
  localStorage.setItem('pawportal_users', JSON.stringify(defaultUsers));
  return defaultUsers;
};

let users = initializeUsers();

// Save users to localStorage
const saveUsers = () => {
  localStorage.setItem('pawportal_users', JSON.stringify(users));
};

// Get all users (for System Admin)
export const getAllUsers = () => {
  return users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
};

// Get user by email
export const getUserByEmail = (email) => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Get user by ID
export const getUserById = (id) => {
  return users.find(user => user.id === id);
};

// Create new user
export const createUser = (userData) => {
  const newUser = {
    id: users.length + 1,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: DEFAULT_USER_ROLE, // Always assign Guest role by default
    createdAt: new Date().toISOString(),
    lastLogin: null
  };
  
  users.push(newUser);
  saveUsers(); // Save to localStorage
  
  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Update user role (only System Admin can do this)
export const updateUserRole = (userId, newRole, requesterRole) => {
  if (requesterRole !== USER_ROLES.SYSTEM_ADMIN) {
    throw new Error('Only System Admin can assign roles');
  }
  
  const user = getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  user.role = newRole;
  saveUsers(); // Save to localStorage
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Promote user to Pet Owner (automatic when they adopt/create a pet)
export const promoteToPetOwner = (userId) => {
  const user = getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  // Only promote if they're currently a Guest
  if (user.role === USER_ROLES.GUEST) {
    user.role = USER_ROLES.PET_OWNER;
    saveUsers(); // Save to localStorage
  }
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Authenticate user
export const authenticateUser = (email, password) => {
  const user = getUserByEmail(email);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  if (user.password !== password) {
    throw new Error('Invalid password');
  }
  
  // Update last login
  user.lastLogin = new Date().toISOString();
  saveUsers(); // Save to localStorage
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Check if credentials match System Admin
export const isSystemAdminCredentials = (email, password) => {
  return email === SYSTEM_ADMIN_CREDENTIALS.email && 
         password === SYSTEM_ADMIN_CREDENTIALS.password;
};

// Get redirect route based on role
export const getRedirectRoute = (role) => {
  return ROLE_ROUTES[role] || ROLE_ROUTES[USER_ROLES.GUEST];
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
