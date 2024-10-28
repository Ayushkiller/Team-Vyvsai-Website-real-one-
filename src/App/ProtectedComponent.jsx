import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedComponent = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/check-password', { password });
      if (response.data.success) {
        setIsAuthenticated(true);
        Cookies.set('auth', 'true');
        Cookies.set('secretPassword', password); // Set the additional cookie
        navigate('/portal'); // Redirect to Portal.jsx
      } else {
        setErrorMessage('Incorrect password. Please try again.');
      }
    } catch (error) {
      console.error('Error checking password:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  if (isAuthenticated) {
    return (
      <div>
        <h2>Protected Content</h2>
        <p>This content is only accessible to authenticated users.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Enter Secret Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProtectedComponent;