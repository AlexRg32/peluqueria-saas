import { apiClient } from '../lib/axios';

export interface WorkingHour {
    id?: number;
    day: string;
    startTime: string;
    endTime: string;
    dayOff: boolean;
    enterpriseId: number;
    userId?: number | null;
}

export const workingHourService = {
    getEnterpriseHours: async (enterpriseId: number): Promise<WorkingHour[]> => {
        const response = await apiClient.get(`/api/working-hours/enterprise/${enterpriseId}`);
        return response.data;
    },

    getUserHours: async (userId: number): Promise<WorkingHour[]> => {
        const response = await apiClient.get(`/api/working-hours/user/${userId}`);
        return response.data;
    },

    saveBatch: async (hours: WorkingHour[]): Promise<WorkingHour[]> => {
        const response = await apiClient.put('/api/working-hours/batch', hours);
        return response.data;
    }
};
