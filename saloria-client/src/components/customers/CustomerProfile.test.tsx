import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CustomerProfile } from './CustomerProfile';

vi.mock('../../services/customerService', () => ({
  customerService: {
    getCustomerDetails: vi.fn().mockResolvedValue({
      id: 1,
      name: 'Cliente Sin Telefono',
      phone: null,
      email: 'cliente@example.com',
      visitsCount: 2,
      internalNotes: '',
      appointments: [],
    }),
    updateCustomer: vi.fn(),
  },
}));

describe('CustomerProfile', () => {
  it('renders without crashing when the customer phone is missing', async () => {
    render(<CustomerProfile customerId={1} />);

    await waitFor(() => {
      expect(screen.getByText('Cliente Sin Telefono')).toBeInTheDocument();
    });

    expect(screen.queryByText('WhatsApp')).not.toBeInTheDocument();
    expect(screen.queryByText('Llamar')).not.toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
});
