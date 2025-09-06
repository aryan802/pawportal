// User Roles
export const USER_ROLES = {
  GUEST: 'Guest',
  PET_OWNER: 'Pet Owner',
  SHELTER_ADMIN: 'Shelter Admin',
  MODERATOR: 'Moderator',
  SYSTEM_ADMIN: 'System Admin'
};

// Role hierarchy (higher number = more permissions)
export const ROLE_HIERARCHY = {
  [USER_ROLES.GUEST]: 0,
  [USER_ROLES.PET_OWNER]: 1,
  [USER_ROLES.MODERATOR]: 2,
  [USER_ROLES.SHELTER_ADMIN]: 3,
  [USER_ROLES.SYSTEM_ADMIN]: 4
};

// Default credentials for System Admin
export const SYSTEM_ADMIN_CREDENTIALS = {
  email: 'admin@pawportal.com',
  password: 'Admin@123'
};

// Role-based route mappings
export const ROLE_ROUTES = {
  [USER_ROLES.GUEST]: '/dashboard',
  [USER_ROLES.PET_OWNER]: '/owner-dashboard',
  [USER_ROLES.SHELTER_ADMIN]: '/shelter-admin-dashboard',
  [USER_ROLES.MODERATOR]: '/moderator-dashboard',
  [USER_ROLES.SYSTEM_ADMIN]: '/system-admin-dashboard'
};

// Roles that can be assigned by System Admin
export const ASSIGNABLE_ROLES = [
  USER_ROLES.SHELTER_ADMIN,
  USER_ROLES.MODERATOR
];

// Default role for new users
export const DEFAULT_USER_ROLE = USER_ROLES.GUEST;
