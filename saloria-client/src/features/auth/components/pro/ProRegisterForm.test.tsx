import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProRegisterForm } from './ProRegisterForm';
import { BrowserRouter } from 'react-router-dom';

const registerMock = vi.fn();

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    register: registerMock,
  }),
}));

describe('ProRegisterForm Styling', () => {
  it('shows backend conflict message when enterprise name already exists', async () => {
    registerMock.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Ya existe una empresa con ese nombre. Contacta con soporte si necesitas acceso.',
        },
      },
    });

    render(
      <BrowserRouter>
        <ProRegisterForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre del propietario/i), { target: { value: 'Lucia' } });
    fireEvent.change(screen.getByLabelText(/email profesional/i), { target: { value: 'lucia@example.com' } });
    fireEvent.change(screen.getByLabelText(/nombre de la peluquería/i), { target: { value: 'Salon Norte' } });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: 'secret123' } });
    fireEvent.change(screen.getByLabelText(/repetir/i), { target: { value: 'secret123' } });
    fireEvent.click(screen.getByRole('button', { name: /registrar empresa/i }));

    await waitFor(() => {
      expect(screen.getByText(/ya existe una empresa con ese nombre/i)).toBeInTheDocument();
    });
  });

  it('should have the correct container and button styling (Normalized)', () => {
    const { container } = render(
      <BrowserRouter>
        <ProRegisterForm />
      </BrowserRouter>
    );

    // Check form container rounding (Should be rounded-3xl to match clients)
    const formContainer = container.firstChild as HTMLElement;
    expect(formContainer).toHaveClass('rounded-3xl');

    // Check submit button rounding (Should be rounded-2xl to match clients)
    const submitButton = screen.getByRole('button', { name: /registrar empresa/i });
    expect(submitButton).toHaveClass('rounded-2xl');
  });
});
