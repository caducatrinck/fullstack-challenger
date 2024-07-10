import type { IApiReturn } from '@/types/api';
import { makeRequest } from './ApiService';
import type { ICategory, IGetCategory } from '@/types/categoria';

const PATH = '/categorias';
export default {
  create: async (data: ICategory): Promise<IApiReturn<[]>> => {
    return await makeRequest<IApiReturn<[]>>({
      method: 'POST',
      url: `${PATH}`,
      data
    });
  },

  get: async (): Promise<IApiReturn<IGetCategory[]>> => {
    return await makeRequest<IApiReturn<IGetCategory[]>>({
      method: 'GET',
      url: `${PATH}`
    });
  }
};
