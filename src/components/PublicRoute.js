import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const serverResponse = JSON.parse(localStorage.getItem('serverResponse'));

  useEffect(() => {
    if (serverResponse && serverResponse.success) {
      console.log('Navigating to /home');
      navigate('/home', { replace: true });
    }
  }, [serverResponse, navigate]);
  
  return children;
};

export default PublicRoute;