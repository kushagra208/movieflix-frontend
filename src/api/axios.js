import axios from 'axios';

let storeRef; // placeholder for store

export const setupAxiosInterceptors = (store) => {
  storeRef = store;

  api.interceptors.request.use((config) => {
    const token = storeRef.getState().auth?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        storeRef.dispatch({ type: 'auth/logout' }); // ✅ logout action
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 30000,
});

export default api;
