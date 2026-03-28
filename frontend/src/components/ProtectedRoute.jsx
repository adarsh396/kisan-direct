import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useContext(AuthContext);

  // 1. If there is no user in context, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. If a specific role is required and the user's role doesn't match, kick them to the home page
  // Note: Check if your database saves roles exactly as 'farmer' or 'Farmer'
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // 3. If they ARE logged in and have the right role, let them through
  return children;
};

export default ProtectedRoute;