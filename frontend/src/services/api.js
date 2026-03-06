import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData)
};

// Candidates API
export const candidatesAPI = {
    getAll: () => api.get('/candidates'),
    getResults: (constituency) => api.get(`/candidates/results/${constituency}`),
    getNationwideResults: () => api.get('/candidates/results')
};

// Vote API
export const voteAPI = {
    cast: (candidateId) => api.post('/vote', { candidateId })
};

export default api;
