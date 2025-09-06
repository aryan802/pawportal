import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ role, roles, children }) => {
  const { user, isAuthenticated } = useAuth();
  
  // If no user is authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If specific role is required and user doesn't have it
  if (role && user.role !== role) {
    return <Navigate to="/dashboard" />;
  }
  
  // If multiple roles are allowed and user doesn't have any of them
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

export default ProtectedRoute;