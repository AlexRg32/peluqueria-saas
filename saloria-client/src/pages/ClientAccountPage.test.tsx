import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ClientAccountPage from './ClientAccountPage';

vi.mock('@/features/auth/hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    logout: vi.fn(),
    user: {
      sub: 'alex@example.com',
      name: 'Alex',
      role: 'CLIENTE',
    },
  }),
}));

vi.mock('@/services/appointmentService', () => ({
  AppointmentStatus: {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED',
    NO_SHOW: 'NO_SHOW',
  },
  getAppointmentStatusLabel: (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'Pendiente',
      CONFIRMED: 'Confirmada',
      COMPLETED: 'Completada',
      CANCELED: 'Cancelada',
      NO_SHOW: 'No presentada',
    };
    return labels[status] || status;
  },
  appointmentService: {
    getMine: vi.fn(() =>
      Promise.resolve([
        {
          id: 1,
          customerName: 'Alex',
          employeeName: 'Marta',
          serviceName: 'Corte',
          date: '2099-03-26T10:00:00.000Z',
          duration: 45,
          price: 18,
          status: 'PENDING',
          paid: false,
          enterpriseName: 'Salon Norte',
        },
      ])
    ),
  },
}));

describe('ClientAccountPage', () => {
  it('renders account header and next appointment', async () => {
    render(
      <BrowserRouter>
        <ClientAccountPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Mi Cuenta')).toBeInTheDocument();
    expect(await screen.findByText('Tu siguiente visita')).toBeInTheDocument();
    expect(await screen.findByText('Salon Norte')).toBeInTheDocument();
  });

  it('renders quick actions', async () => {
    render(
      <BrowserRouter>
        <ClientAccountPage />
      </BrowserRouter>
    );

    expect(await screen.findByText(/Ver mis citas/i)).toBeInTheDocument();
    expect(await screen.findByText(/Buscar negocio/i)).toBeInTheDocument();
  });
});
