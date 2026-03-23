import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProRegisterForm } from './ProRegisterForm';
import { BrowserRouter } from 'react-router-dom';

// Mock useAuth
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    register: vi.fn(),
  }),
}));

describe('ProRegisterForm Styling', () => {
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
