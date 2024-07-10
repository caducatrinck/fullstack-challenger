import router from '@/router';
import type { IApiReturn } from '@/types/api';
import { makeRequest } from './http';
import type { IUser } from '@/types/user';
import type { ILoginResponse } from '@/types/auth';

const PATH = '/login';

export const login = async (data: IUser): Promise<IApiReturn<ILoginResponse>> => {
  const response = await makeRequest<ILoginResponse>({
    method: 'post',
    url: `${PATH}`,
    data
  });

  if (response.statusCode === 200) {
    router.push({ name: 'home' });
  }

  return response;
};
