import type { IApiPaginationReturn, IGetListaProdutos } from '@/types/produtos';
import { makeRequest } from './ApiService';
import type { ICategory } from '@/types/categoria';
import type { IApiReturn } from '@/types/api';

const PATH = '/produtos';

export default {
  create: async (data: FormData): Promise<IApiReturn<[]>> => {
    return await makeRequest<IApiReturn<[]>>({
      method: 'POST',
      url: `${PATH}`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    });
  },

  get: async (
    page = 0,
    per_page: number,
    categories?: number
  ): Promise<IApiPaginationReturn<IGetListaProdutos>> => {
    const params = {
      page,
      per_page: per_page,
      categoria_id: categories
    };

    return await makeRequest<IApiPaginationReturn<IGetListaProdutos>>({
      method: 'GET',
      url: `${PATH}`,
      params
    });
  },

  getCategories: async (search = ''): Promise<IApiReturn<ICategory[]>> => {
    return await makeRequest<IApiReturn<ICategory[]>>({
      method: 'GET',
      url: `/categorias`,
      params: { search }
    });
  }
};
