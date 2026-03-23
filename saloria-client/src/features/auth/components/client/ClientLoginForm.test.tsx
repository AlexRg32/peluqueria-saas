import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ClientLoginForm } from './ClientLoginForm';
import { BrowserRouter } from 'react-router-dom';

// Mock useAuth
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    login: vi.fn(),
  }),
}));

describe('ClientLoginForm Styling', () => {
  it('should have the correct container and button styling', () => {
    const { container } = render(
      <BrowserRouter>
        <ClientLoginForm />
      </BrowserRouter>
    );
    
    // Check form container rounding
    const formContainer = container.firstChild as HTMLElement;
    expect(formContainer).toHaveClass('rounded-3xl');
    
    // Check submit button rounding
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    expect(submitButton).toHaveClass('rounded-2xl');
  });
});
