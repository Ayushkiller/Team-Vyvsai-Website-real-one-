import axios from 'axios';

const register = async (userData) => {
  try {
    const response = await axios.post('https://yeah.emboticnodes.xyz:1301/api/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { register };