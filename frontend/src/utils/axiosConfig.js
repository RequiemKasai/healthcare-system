import axios from 'axios';

// Retrieve the backend URL from environment variables or use a default
const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

// Create an axios instance
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Required for cookies and authentication credentials
});

// Add an interceptor to include JWT token in requests if available
axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the Authorization header
            }
        } catch (error) {
            console.error('Error accessing token:', error);
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add an interceptor to handle responses and errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Response error:', error.response ? error.response.data : error.message);

        if (error.response?.status === 401) {
            // Token expired or unauthorized
            console.warn('Unauthorized. Redirecting to login...');
            localStorage.removeItem('jwtToken'); // Clear token
            window.location.href = '/login'; // Redirect to login
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
