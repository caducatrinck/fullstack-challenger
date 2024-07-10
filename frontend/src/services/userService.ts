import type { IApiReturn } from '@/types/api';
import { makeRequest } from './http';
import type { IUser } from '@/types/user'; // Certifique-se de que o caminho está correto

const PATH = '/users';

export const createUser = async (data: IUser): Promise<IApiReturn<[]>> => {
  return await makeRequest<[]>({
    method: 'POST',
    url: `${PATH}`,
    data
  });
};
