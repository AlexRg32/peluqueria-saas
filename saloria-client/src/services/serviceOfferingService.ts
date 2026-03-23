import { apiClient } from '../lib/axios';

export interface ServiceOffering {
    id?: number;
    name: string;
    description: string;
    price: number;
    image: string;
    duration: number; // in minutes
    category: string;
    enterprise: {
        id: number;
    };
}

export const serviceOfferingService = {
    getAllByEnterprise: async (enterpriseId: number) => {
        const response = await apiClient.get<ServiceOffering[]>(`/api/services/${enterpriseId}`);
        return response.data;
    },

    create: async (service: ServiceOffering, imageFile?: File) => {
        const formData = new FormData();
        
        // Append service JSON
        formData.append('service', JSON.stringify(service));
        
        // Append image if exists
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const response = await apiClient.post<ServiceOffering>('/api/services', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    delete: async (enterpriseId: number, id: number) => {
        await apiClient.delete(`/api/services/${enterpriseId}/${id}`);
    }
};
