import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UpcomingAppointments from './UpcomingAppointments';
import { Appointment, AppointmentStatus } from '@/services/appointmentService';

const renderWithRouter = (ui: React.ReactElement) =>
    render(<BrowserRouter>{ui}</BrowserRouter>);

const mockAppointments: Appointment[] = [
    {
        id: 1,
        customerName: 'Alex',
        employeeName: 'Paco',
        serviceName: 'Corte Degradado',
        date: '2026-02-20T10:00:00',
        duration: 30,
        price: 15,
        status: AppointmentStatus.PENDING,
        paid: false,
    },
];

describe('UpcomingAppointments', () => {
    it('shows sign-in CTA when not authenticated', () => {
        renderWithRouter(
            <UpcomingAppointments appointments={[]} loading={false} isAuthenticated={false} />
        );
        expect(screen.getByText(/gestiona tus citas/i)).toBeInTheDocument();
        expect(screen.getByText(/acceder/i)).toBeInTheDocument();
    });

    it('shows empty state CTA when authenticated with no appointments', () => {
        renderWithRouter(
            <UpcomingAppointments appointments={[]} loading={false} isAuthenticated={true} />
        );
        expect(screen.getByText(/necesitas un cambio de look/i)).toBeInTheDocument();
        expect(screen.getByText(/reservar/i)).toBeInTheDocument();
    });

    it('renders appointment cards when data provided', () => {
        renderWithRouter(
            <UpcomingAppointments appointments={mockAppointments} loading={false} isAuthenticated={true} />
        );
        expect(screen.getByText('Corte Degradado')).toBeInTheDocument();
        expect(screen.getByText(/próximas citas/i)).toBeInTheDocument();
    });

    it('shows skeletons when loading', () => {
        renderWithRouter(
            <UpcomingAppointments appointments={[]} loading={true} isAuthenticated={true} />
        );
        expect(screen.getByText(/próximas citas/i)).toBeInTheDocument();
    });
});
