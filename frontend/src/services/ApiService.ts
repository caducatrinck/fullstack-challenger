import type { IApiReturn } from '@/types/api';
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError
} from 'axios';

const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost/api',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse<IApiReturn<any>>) => {
    return response;
  },
  (error: AxiosError<IApiReturn<any>>) => {
    if (error.response && error.response.data) {
      const errorData: IApiReturn<any> = error.response.data;
      return Promise.reject(errorData);
    }
    return Promise.reject(error.response);
  }
);

export async function makeRequest<T>(config: AxiosRequestConfig): Promise<T> {
  const response: AxiosResponse<T> = await http.request<T>(config);
  return response.data;
}

export default http;
