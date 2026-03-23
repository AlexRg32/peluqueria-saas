import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MarketplaceHero from './MarketplaceHero';

describe('MarketplaceHero', () => {
    it('renders search input', () => {
        render(<MarketplaceHero />);
        expect(screen.getByPlaceholderText(/buscar peluquerías/i)).toBeInTheDocument();
    });

    it('shows personalized greeting when userName provided', () => {
        render(<MarketplaceHero userName="Alex" />);
        expect(screen.getByText(/Alex/)).toBeInTheDocument();
        expect(screen.getByText(/Hola,/)).toBeInTheDocument();
    });

    it('shows generic tagline when no userName', () => {
        render(<MarketplaceHero />);
        expect(screen.getByText(/peluquería ideal/)).toBeInTheDocument();
    });

    it('renders search button', () => {
        render(<MarketplaceHero />);
        expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
    });
});
