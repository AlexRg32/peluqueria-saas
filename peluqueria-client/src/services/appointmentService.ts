import { apiClient } from '../lib/axios';
import { ServiceOffering } from './serviceOfferingService';

export enum AppointmentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
    NO_SHOW = 'NO_SHOW'
}

export interface Appointment {
    id?: number;
    date: string;
    enterpriseId: number;
    userId: number;
    serviceId: number;
    service?: ServiceOffering;
    status: AppointmentStatus;
    price: number;
}

export const appointmentService = {
    // We'll implement endpoints here as we build the calendar
    // For now, this prepares the ground for stats
};
