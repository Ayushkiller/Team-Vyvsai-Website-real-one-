// src/services/authService.js
import axios from 'axios';

export const isAuthenticated = () => {
  return !!localStorage.getItem('auth');
};

export const login = async (mobileNo, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', { mobileNo, password });
    if (response.data.success) {
      localStorage.setItem('auth', 'true');
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('auth');
};