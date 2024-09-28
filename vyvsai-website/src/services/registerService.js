import axios from 'axios';

const register = async (userData) => {
  const response = await axios.post('/register', userData);
  return response.data;
};

export default { register };