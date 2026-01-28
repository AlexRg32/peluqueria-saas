import { apiClient } from '@/lib/axios';
import { AuthResponse, LoginPayload, RegisterPayload } from '../types';

export const authApi = {
  login: async (data: LoginPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
};
