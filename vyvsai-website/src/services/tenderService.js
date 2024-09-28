import axios from 'axios';

const getTenders = async () => {
  const response = await axios.get('/tenders');
  return response.data;
};

export default { getTenders };