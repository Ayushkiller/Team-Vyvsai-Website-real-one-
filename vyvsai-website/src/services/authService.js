import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

const JWT_AUTH_SECRET = process.env.REACT_APP_JWT_AUTH_SECRET;

export const login = (token) => {
  Cookies.set('UUID', token);
};

export const logout = () => {
  Cookies.remove('UUID');
};

export const isAuthenticated = () => {
  const token = Cookies.get('UUID');
  if (!token) return false;

  try {
    const user = jwt.verify(token, JWT_AUTH_SECRET);
    return user;
  } catch (err) {
    return false;
  }
};

export const getUser = () => {
  const token = Cookies.get('UUID');
  if (!token) return null;

  try {
    const user = jwt.verify(token, JWT_AUTH_SECRET);
    return user;
  } catch (err) {
    return null;
  }
};