import React, { useEffect, useState } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthorization = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const isAuthenticated = Cookies.get("auth") === "true";

      if (isAuthenticated) {
        setIsAuthorized(true);
        setLoading(false);
      } else if (token) {
        try {
          const response = await axios.get(`/api/validate-token?token=${token}`);
          if (response.data.valid) {
            setIsAuthorized(true);
            navigate('/tender'); // Navigate to the tender page
          }
        } catch (error) {
          console.error("Token validation error:", error);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkAuthorization();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      element={isAuthorized ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;