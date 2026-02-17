import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ClientLoginPage } from './ClientLoginPage';
import { BrowserRouter } from 'react-router-dom';

// Mock useAuth
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
  }),
}));

describe('ClientLoginPage Layout', () => {
  it('should use the split layout grid', () => {
    const { container } = render(
      <BrowserRouter>
        <ClientLoginPage />
      </BrowserRouter>
    );
    
    // Check for the grid container
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('lg:grid-cols-2');
    expect(gridContainer).toHaveClass('gap-12');

    // Check for back to home link
    const backLink = screen.getByRole('link', { name: /volver al inicio/i });
    expect(backLink).toHaveAttribute('href', '/');
  });
});
