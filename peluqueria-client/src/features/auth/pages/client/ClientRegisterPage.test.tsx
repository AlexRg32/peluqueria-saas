import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ClientRegisterPage } from './ClientRegisterPage';
import { BrowserRouter } from 'react-router-dom';

// Mock useAuth
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
  }),
}));

describe('ClientRegisterPage Layout', () => {
  it('should have the home link', () => {
    render(
      <BrowserRouter>
        <ClientRegisterPage />
      </BrowserRouter>
    );
    
    // Check for back to home link
    const backLink = screen.getByRole('link', { name: /volver al inicio/i });
    expect(backLink).toHaveAttribute('href', '/');
  });
});
