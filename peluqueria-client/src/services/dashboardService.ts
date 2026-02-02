import { apiClient } from '../lib/axios';

export interface DashboardStats {
    totalRevenue: number;
    totalAppointments: number;
    totalCustomers: number;
    pendingAppointments: number;
    revenueChart: { label: string; value: number }[];
    popularServices: { name: string; count: number }[];
    employeePerformance: { name: string; count: number }[];
}

export const dashboardService = {
    getStats: async (enterpriseId: number): Promise<DashboardStats> => {
        const response = await apiClient.get(`/api/dashboard/stats/${enterpriseId}`);
        return response.data;
    }
};
