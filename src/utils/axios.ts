import axios from 'axios';
import { toast } from 'react-toastify';
import { configs } from '@/utils/config';
import { useNavigate } from 'react-router-dom';

// Create an Axios instance with the centralized base URL
const authorizedAxiosInstance = axios.create({
  baseURL: configs.host,
  timeout: 1000 * 60 * 10,
  //    headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   }
});

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // ngrok
    // config.headers['Content-Type'] = 'application/json';
    // config.headers['ngrok-skip-browser-warning'] = '69420';

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    console.log(response);
    if (response?.status === 401) {
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('accessToken');
      const navigate = useNavigate();
      navigate('/login');
    } else if (response?.status === 419) {
      toast.error('CSRF token mismatch. Please refresh the page.');
    } else if (response?.status === 422) {
      return;
    } else if (response?.status === 500) {
      toast.error('Server error. Please try again later.');
    } else {
      toast.error(response?.data?.message || 'An unexpected error occurred.');
    }
    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;
