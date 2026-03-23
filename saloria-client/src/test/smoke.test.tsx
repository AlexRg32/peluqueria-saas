import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Test Setup Verification', () => {
  it('should render a basic React element', () => {
    render(<div data-testid="smoke">Hello Tests</div>);
    expect(screen.getByTestId('smoke')).toBeInTheDocument();
    expect(screen.getByText('Hello Tests')).toBeInTheDocument();
  });

  it('should have jest-dom matchers available', () => {
    render(<button disabled>Click me</button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
