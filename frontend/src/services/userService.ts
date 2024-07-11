import type { IApiReturn } from '@/types/api';
import { makeRequest } from './ApiService';
import type { IPostUser, IUser } from '@/types/user';

const PATH = '/users';
export default {
  create: async (data: IUser): Promise<IApiReturn<IPostUser>> => {
    return await makeRequest<IApiReturn<IPostUser>>({
      method: 'POST',
      url: `${PATH}`,
      data
    });
  }
};
