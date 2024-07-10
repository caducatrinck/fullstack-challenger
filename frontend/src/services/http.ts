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

// Interceptando erros de resposta
http.interceptors.response.use(
  (response: AxiosResponse<IApiReturn<any>>) => {
    return response; // Retorna o objeto completo AxiosResponse
  },
  (error: AxiosError<IApiReturn<any>>) => {
    // Verifica se há uma resposta de erro com dados
    if (error.response && error.response.data) {
      const errorData: IApiReturn<any> = error.response.data;
      return Promise.reject(errorData); // Rejeita a promise com os dados de erro
    }
    return Promise.reject(error.response); // Rejeita a promise com a resposta de erro
  }
);

// Função genérica para fazer uma requisição e retornar a resposta tipada
export async function makeRequest<T>(config: AxiosRequestConfig): Promise<IApiReturn<T>> {
  const response: AxiosResponse<IApiReturn<T>> = await http.request<IApiReturn<T>>(config);
  return response.data; // Retorna apenas os dados da resposta
}

export default http;
