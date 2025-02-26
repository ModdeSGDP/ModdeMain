import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'; // ✅ Backend on port 3000

const api = axios.create({
  baseURL: API_BASE_URL, // ✅ Connects to Swagger API
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable authentication (if required)
});

// Handle API errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
