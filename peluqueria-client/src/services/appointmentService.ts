import { apiClient } from '../lib/axios';

export enum AppointmentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
    NO_SHOW = 'NO_SHOW'
}

export interface Appointment {
    id: number;
    customerName: string;
    customerPhone?: string;
    employeeName: string;
    serviceName: string;
    date: string;
    duration: number;
    price: number;
    status: AppointmentStatus | string;
    paid: boolean;
    paymentMethod?: 'CASH' | 'CARD';
    paidAt?: string;
}

export interface BillingSummary {
    revenueToday: number;
    revenueThisWeek: number;
    revenueThisMonth: number;
    transactionsCount: number;
}

export interface CreateAppointmentRequest {
    userId?: number | null;
    customerId?: number | null;
    customerName?: string;
    customerPhone?: string;
    employeeId: number;
    serviceId: number;
    enterpriseId: number;
    date: string;
}

export const appointmentService = {
    getAll: async (enterpriseId: number) => {
        const response = await apiClient.get<Appointment[]>('/api/appointments', {
            params: { enterpriseId }
        });
        return response.data;
    },
    
    getMine: async () => {
        const response = await apiClient.get<Appointment[]>('/api/appointments/me');
        return response.data;
    },

    getByEmployee: async (employeeId: number) => {
        const response = await apiClient.get<Appointment[]>(`/api/appointments/employee/${employeeId}`);
        return response.data;
    },

    create: async (data: CreateAppointmentRequest) => {
        const response = await apiClient.post<Appointment>('/api/appointments', data);
        return response.data;
    },

    checkout: async (id: number, paymentMethod: 'CASH' | 'CARD') => {
        const response = await apiClient.post<Appointment>(`/api/appointments/${id}/checkout`, {
            paymentMethod
        });
        return response.data;
    },

    getTransactions: async (enterpriseId: number, start: string, end: string) => {
        const response = await apiClient.get<Appointment[]>('/api/appointments/transactions', {
            params: { enterpriseId, start, end }
        });
        return response.data;
    },

    getBillingSummary: async (enterpriseId: number) => {
        const response = await apiClient.get<BillingSummary>('/api/appointments/billing-summary', {
            params: { enterpriseId }
        });
        return response.data;
    }
};
