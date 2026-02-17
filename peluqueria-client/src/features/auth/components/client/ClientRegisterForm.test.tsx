import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ClientRegisterForm } from './ClientRegisterForm';
import { BrowserRouter } from 'react-router-dom';

// Mock useAuth
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    register: vi.fn(),
  }),
}));

describe('ClientRegisterForm Styling', () => {
  it('should have the correct container and button styling', () => {
    const { container } = render(
      <BrowserRouter>
        <ClientRegisterForm />
      </BrowserRouter>
    );
    
    // Check form container rounding
    const formContainer = container.firstChild as HTMLElement;
    expect(formContainer).toHaveClass('rounded-3xl');
    
    // Check submit button rounding
    const submitButton = screen.getByRole('button', { name: /crear mi cuenta/i });
    expect(submitButton).toHaveClass('rounded-2xl');
  });
});
