import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface LoginResponse {
  access: string;
  refresh: string;
}

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const removeToken = () => localStorage.removeItem('access');
const saveToken = (token: string) => localStorage.setItem('access', token)


api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await refreshAccessToken();
      if (refreshToken) {
        originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);


const refreshAccessToken = async (): Promise<string> => {
  try {
    const response = await api.post<AxiosResponse<LoginResponse>>(
      '',
      {
        refresh_token: localStorage.getItem('refresh'),
      }
    );
    saveToken(response.data.data.access);
    return response.data.data.access;
  }
  catch (e) {
    removeToken();
    throw e;
  }
}