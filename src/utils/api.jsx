import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8002/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
    
  },
});

export default api;
