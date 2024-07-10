import type { IApiReturn } from '@/types/api';
import { makeRequest } from './http';
import type { ICategory } from '@/types/categoria';

const PATH = '/categorias';

export const createCategory = async (data: ICategory): Promise<IApiReturn<[]>> => {
  return await makeRequest<[]>({
    method: 'POST',
    url: `${PATH}`,
    data
  });
};
