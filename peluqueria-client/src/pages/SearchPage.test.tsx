import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchPage from './SearchPage';

describe('SearchPage', () => {
    it('renders search heading', () => {
        render(<SearchPage />);
        expect(screen.getByText('Buscador')).toBeInTheDocument();
    });

    it('renders placeholder text', () => {
        render(<SearchPage />);
        expect(screen.getByText(/próximamente/i)).toBeInTheDocument();
    });
});
