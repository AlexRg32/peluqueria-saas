import { apiClient } from '../lib/axios';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    enterpriseId?: number;
}

export const userService = {
    getUsersByEnterprise: async (enterpriseId: number) => {
        const response = await apiClient.get<User[]>(`/api/users/${enterpriseId}`);
        return response.data;
    }
};
