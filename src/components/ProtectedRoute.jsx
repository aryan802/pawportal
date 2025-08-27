import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
