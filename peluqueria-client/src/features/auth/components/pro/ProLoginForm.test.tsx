import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProLoginForm } from './ProLoginForm';
import { BrowserRouter } from 'react-router-dom';

// Mock useAuth
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    login: vi.fn(),
  }),
}));

describe('ProLoginForm Styling', () => {
  it('should have the correct container and button styling (Normalized)', () => {
    const { container } = render(
      <BrowserRouter>
        <ProLoginForm />
      </BrowserRouter>
    );
    
    // Check form container rounding (Should be rounded-3xl to match client)
    const formContainer = container.firstChild as HTMLElement;
    expect(formContainer).toHaveClass('rounded-3xl');
    
    // Check submit button rounding (Should be rounded-2xl to match client)
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    expect(submitButton).toHaveClass('rounded-2xl');
  });
});
