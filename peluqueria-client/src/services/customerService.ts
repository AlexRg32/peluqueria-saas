import { apiClient } from '../lib/axios';

export interface Customer {
    id: number;
    name: string;
    phone: string;
    email?: string;
    userId?: number;
}

export interface AppointmentSummary {
    id: number;
    date: string;
    serviceName: string;
    price: number;
    employeeName: string;
    status: string;
}

export interface CustomerDetail extends Customer {
    visitsCount: number;
    internalNotes?: string;
    appointments: AppointmentSummary[];
}

export interface UpdateCustomerRequest {
    name: string;
    phone: string;
    email?: string;
    internalNotes?: string;
}

export const customerService = {
    getCustomersByEnterprise: async (enterpriseId: number) => {
        const response = await apiClient.get<Customer[]>(`/api/customers/enterprise/${enterpriseId}`);
        return response.data;
    },
    getCustomerDetails: async (id: number) => {
        const response = await apiClient.get<CustomerDetail>(`/api/customers/${id}`);
        return response.data;
    },
    updateCustomer: async (id: number, request: UpdateCustomerRequest) => {
        const response = await apiClient.patch<Customer>(`/api/customers/${id}`, request);
        return response.data;
    }
};
