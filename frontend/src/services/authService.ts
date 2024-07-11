import router from '@/router';
import type { IApiReturn } from '@/types/api';
import { makeRequest } from './ApiService';
import type { IUser } from '@/types/user';
import type { ILoginResponse } from '@/types/auth';

const PATH = '/login';
export default {
  login: async (data: IUser): Promise<IApiReturn<ILoginResponse>> => {
    const response = await makeRequest<IApiReturn<ILoginResponse>>({
      method: 'post',
      url: `${PATH}`,
      data
    });

    if (response.statusCode === 200) {
      router.push({ name: 'dashboard' });
    }

    return response;
  }
};
