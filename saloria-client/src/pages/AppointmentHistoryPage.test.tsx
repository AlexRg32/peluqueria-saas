import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import AppointmentHistoryPage from './AppointmentHistoryPage';
import { appointmentService } from '@/services/appointmentService';
import { MemoryRouter } from 'react-router-dom';

// Mock appointmentService
vi.mock('@/services/appointmentService', () => ({
  appointmentService: {
    getMine: vi.fn()
  },
  AppointmentStatus: {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED'
  }
}));

describe('AppointmentHistoryPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (appointmentService.getMine as any).mockReturnValue(new Promise(() => {}));
    render(
      <MemoryRouter>
        <AppointmentHistoryPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('progressbar') || screen.getByText(/cargando/i)).toBeDefined();
  });

  it('renders appointment list when data is fetched', async () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const mockAppointments = [
      {
        id: 1,
        serviceName: 'Corte Moderno',
        enterpriseName: 'Peluking Premium',
        date: futureDate.toISOString(),
        status: 'PENDING',
        price: 25.0
      }
    ];
    (appointmentService.getMine as any).mockResolvedValue(mockAppointments);

    render(
      <MemoryRouter>
        <AppointmentHistoryPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Corte Moderno')).toBeTruthy();
      expect(screen.getByText('Peluking Premium')).toBeTruthy();
    }, { timeout: 3000 });
  });

  it('renders empty state when no appointments found', async () => {
    (appointmentService.getMine as any).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <AppointmentHistoryPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no tienes citas/i)).toBeDefined();
    });
  });
});
