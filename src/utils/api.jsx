import axios from 'axios';

const api = axios.create({
  baseURL: 'https://notes-taker-backend.onrender.com/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
    
  },
});

export default api;
