import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, role }) {
  const { token, role: userRole } = useSelector((s) => s.auth);

  console.log(role, userRole);

  if (!token) {
    // not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    // logged in but not the right role → go home
    return <Navigate to="/" replace />;
  }

  return children;
}
