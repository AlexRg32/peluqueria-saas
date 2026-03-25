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

    getPublicEnterpriseHours: async (enterpriseId: number): Promise<WorkingHour[]> => {
        const response = await apiClient.get(`/api/public/enterprises/${enterpriseId}/working-hours`);
        return response.data;
    },

    getPublicEmployeeHours: async (enterpriseId: number, employeeId: number): Promise<WorkingHour[]> => {
        const response = await apiClient.get(`/api/public/enterprises/${enterpriseId}/employees/${employeeId}/working-hours`);
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
