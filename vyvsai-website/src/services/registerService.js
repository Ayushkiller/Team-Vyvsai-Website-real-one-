import axios from 'axios';

const register = async (userData) => {
  try {
    const response = await axios.post('http://38.69.12.10:1301/api/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { register };