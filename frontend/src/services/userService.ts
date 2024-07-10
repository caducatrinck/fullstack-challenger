import type { IApiReturn } from '@/types/api';
import { makeRequest } from './ApiService';
import type { IUser } from '@/types/user'; // Certifique-se de que o caminho está correto

const PATH = '/users';
export default {
  create: async (data: IUser): Promise<IApiReturn<[]>> => {
    return await makeRequest<[]>({
      method: 'POST',
      url: `${PATH}`,
      data
    });
  }
};
