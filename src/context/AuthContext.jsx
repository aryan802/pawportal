import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  authenticateUser, 
  createUser, 
  updateUserRole, 
  promoteToPetOwner,
  getAllUsers,
  getUserByEmail,
  isSystemAdminCredentials 
} from '../services/authService';
import { USER_ROLES } from '../utils/constants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Check if it's the system admin credentials
      if (isSystemAdminCredentials(email, password)) {
        const adminUser = {
          id: 1,
          name: 'System Administrator',
          email: email,
          role: USER_ROLES.SYSTEM_ADMIN,
          lastLogin: new Date().toISOString()
        };
        
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return { success: true, user: adminUser };
      }
      
      // Authenticate regular user
      const authenticatedUser = authenticateUser(email, password);
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      
      return { success: true, user: authenticatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Check if user already exists
      const existingUser = getUserByEmail(userData.email);
      if (existingUser) {
        return { success: false, error: 'User with this email already exists' };
      }
      
      const newUser = createUser(userData);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Update user role (System Admin only)
  const updateRole = async (userId, newRole) => {
    try {
      if (user?.role !== USER_ROLES.SYSTEM_ADMIN) {
        throw new Error('Only System Admin can assign roles');
      }
      
      const updatedUser = updateUserRole(userId, newRole, user.role);
      
      // If updating current user's role, update local state
      if (userId === user.id) {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Promote user to Pet Owner (automatic on pet adoption/creation)
  const promoteToPetOwnerRole = async (userId) => {
    try {
      const updatedUser = promoteToPetOwner(userId);
      
      // If promoting current user, update local state
      if (userId === user?.id) {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Get all users (System Admin only)
  const getUsers = async () => {
    try {
      if (user?.role !== USER_ROLES.SYSTEM_ADMIN) {
        throw new Error('Only System Admin can view all users');
      }
      
      return { success: true, users: getAllUsers() };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Check if user has specific role
  const hasRole = (requiredRole) => {
    if (!user) return false;
    return user.role === requiredRole;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  // Check if user can assign roles
  const canAssignRoles = () => {
    return hasRole(USER_ROLES.SYSTEM_ADMIN);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateRole,
    promoteToPetOwnerRole,
    getUsers,
    hasRole,
    hasAnyRole,
    canAssignRoles,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
