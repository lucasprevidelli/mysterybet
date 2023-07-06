// PrivateRoute.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const serverResponse = JSON.parse(localStorage.getItem('serverResponse'));

  useEffect(() => {
    if (!serverResponse || serverResponse.success === false) {
      console.log('Navigating to /login');
      navigate('/login', { replace: true });
    }
  }, [serverResponse, navigate]);
  

  return children;
};

export default PrivateRoute;
