import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://lms-backend-new.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    enrolledCourses: string[];
    progress: Record<string, number>;
  };
}

interface RegisterResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    enrolledCourses: string[];
    progress: Record<string, number>;
  };
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (username: string, email: string, password: string): Promise<RegisterResponse> => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },

  removeToken: (): void => {
    localStorage.removeItem('token');
  },
};
