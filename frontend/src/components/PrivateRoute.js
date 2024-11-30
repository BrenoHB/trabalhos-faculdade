import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.js';

const PrivateRoute = ({ element, ...rest }) => {
  const { authenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={authenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;