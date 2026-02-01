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
}

export interface CreateAppointmentRequest {
    userId?: number | null;
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

    create: async (data: CreateAppointmentRequest) => {
        const response = await apiClient.post<Appointment>('/api/appointments', data);
        return response.data;
    }
};
