import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5136', // Substitua pela URL do backend
});

export default api;