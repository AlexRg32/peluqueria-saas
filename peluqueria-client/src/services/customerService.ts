import { apiClient } from '../lib/axios';

export interface Customer {
    id: number;
    name: string;
    phone: string;
    email?: string;
    userId?: number;
}

export const customerService = {
    getCustomersByEnterprise: async (enterpriseId: number) => {
        const response = await apiClient.get<Customer[]>(`/api/customers/enterprise/${enterpriseId}`);
        return response.data;
    }
};
