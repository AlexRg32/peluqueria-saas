import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProLoginPage } from './ProLoginPage';
import { BrowserRouter } from 'react-router-dom';

// Mock useAuth
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
  }),
}));

describe('ProLoginPage Layout Styling', () => {
  it('should use the normalized split layout grid', () => {
    const { container } = render(
      <BrowserRouter>
        <ProLoginPage />
      </BrowserRouter>
    );
    
    // Check for the grid container (Should exist now)
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeDefined();
    expect(gridContainer).toHaveClass('lg:grid-cols-2');
    
    // Check for decorative blurs (Should exist now)
    const blurElement = container.querySelector('.blur-\\[120px\\]');
    expect(blurElement).toBeDefined();

    // Check for back to home link
    const backLink = screen.getByRole('link', { name: /volver al inicio/i });
    expect(backLink).toHaveAttribute('href', '/');
  });
});
