import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import SuperAdminEnterprisesPage from './SuperAdminEnterprisesPage';

vi.mock('@/services/enterpriseService', () => ({
  enterpriseService: {
    getAll: vi.fn(() =>
      Promise.resolve([
        {
          id: 1,
          name: 'Salon Visible',
          slug: 'salon-visible',
          address: 'Gran Via 1, Madrid',
          email: 'hola@visible.com',
          phone: '600111222',
          description: 'Color y corte',
          cif: 'A12345678',
        },
        {
          id: 2,
          name: 'Salon Pendiente',
          slug: '',
          address: '',
          email: '',
          phone: '',
          description: '',
          cif: 'B12345678',
        },
      ])
    ),
  },
}));

describe('SuperAdminEnterprisesPage', () => {
  it('renders enterprise overview and readiness state', async () => {
    render(<SuperAdminEnterprisesPage />);

    expect(screen.getByText('Panel de Empresas')).toBeInTheDocument();
    expect(await screen.findByText('Salon Visible')).toBeInTheDocument();
    expect(await screen.findByText('Salon Pendiente')).toBeInTheDocument();
    expect(await screen.findByText('Lista para directorio')).toBeInTheDocument();
    expect(await screen.findByText('Perfil incompleto')).toBeInTheDocument();
  });
});
