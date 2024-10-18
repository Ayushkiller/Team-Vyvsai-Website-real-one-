import axios from 'axios';

const register = async (userData) => {
  try {
    const response = await axios.post('https://panel.embotic.xyz/server/944a767c:5000/api/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { register };