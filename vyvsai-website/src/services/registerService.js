import axios from 'axios';
import https from 'https';

const register = async (userData) => {
  try {
    const response = await axios.post('https://38.69.12.10:1301/api/register', userData, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { register };