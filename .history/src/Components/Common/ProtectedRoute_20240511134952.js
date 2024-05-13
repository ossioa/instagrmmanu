import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};
