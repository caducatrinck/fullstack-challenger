import type { IApiPaginationReturn, IGetListaProdutos, IPostProdutos } from '@/types/produtos';
import { makeRequest } from './ApiService';
import type { IApiReturn } from '@/types/api';

const PATH = '/produtos';

export default {
  create: async (data: FormData): Promise<IApiReturn<IPostProdutos>> => {
    return await makeRequest<IApiReturn<IPostProdutos>>({
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
  }
};
