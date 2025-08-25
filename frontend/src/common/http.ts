import axios, { AxiosInstance } from 'axios';

axios.defaults.withCredentials = true; // Eenables cookie/token CORS support

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api'
});

export default api;
