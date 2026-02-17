import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProRegisterPage } from './ProRegisterPage';
import { BrowserRouter } from 'react-router-dom';

// Mock useAuth
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
  }),
}));

describe('ProRegisterPage Layout', () => {
  it('should use the normalized split layout grid and have home link', () => {
    const { container } = render(
      <BrowserRouter>
        <ProRegisterPage />
      </BrowserRouter>
    );
    
    // Check for the grid container
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('lg:grid-cols-2');
    
    // Check for back to home link
    const backLink = screen.getByRole('link', { name: /volver al inicio/i });
    expect(backLink).toHaveAttribute('href', '/');
  });
});
