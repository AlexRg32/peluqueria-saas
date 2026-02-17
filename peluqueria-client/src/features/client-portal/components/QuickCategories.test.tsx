import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuickCategories from './QuickCategories';

describe('QuickCategories', () => {
    it('renders all category names', () => {
        render(<QuickCategories />);
        expect(screen.getByText('Corte')).toBeInTheDocument();
        expect(screen.getByText('Coloración')).toBeInTheDocument();
        expect(screen.getByText('Barbería')).toBeInTheDocument();
        expect(screen.getByText('Tratamientos')).toBeInTheDocument();
        expect(screen.getByText('Cerca de ti')).toBeInTheDocument();
    });

    it('renders category buttons', () => {
        render(<QuickCategories />);
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(5);
    });
});
