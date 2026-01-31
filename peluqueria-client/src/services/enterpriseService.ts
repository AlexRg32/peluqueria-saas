import { apiClient } from '../lib/axios';

export interface Enterprise {
    id: number;
    name: string;
    cif: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    logo?: string;
    banner?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    whatsapp?: string;
    primaryColor?: string;
    secondaryColor?: string;
    description?: string;
}

export const enterpriseService = {
    getById: async (id: number) => {
        const response = await apiClient.get<Enterprise>(`/api/enterprises/${id}`);
        return response.data;
    },

    update: async (id: number, enterprise: Enterprise) => {
        const response = await apiClient.put<Enterprise>(`/api/enterprises/${id}`, enterprise);
        return response.data;
    },

    getEmployees: async (id: number) => {
        const response = await apiClient.get<any[]>(`/api/enterprises/${id}/employees`);
        return response.data;
    }
};
