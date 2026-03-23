import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SalonCard from './SalonCard';
import { EnterpriseSummary } from '@/types/Marketplace';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const mockSalon: EnterpriseSummary = {
    id: '1',
    slug: 'test-salon',
    name: 'Test Salon',
    city: 'Madrid',
    rating: 4.8,
    reviewCount: 100,
    thumbnail: 'https://example.com/img.jpg',
    services: ['Corte', 'Barba'],
    priceRange: '€€',
    distance: '1.5 km',
};

const renderWithRouter = (ui: React.ReactElement) =>
    render(<BrowserRouter>{ui}</BrowserRouter>);

describe('SalonCard', () => {
    it('renders salon name', () => {
        renderWithRouter(<SalonCard salon={mockSalon} />);
        expect(screen.getByText('Test Salon')).toBeInTheDocument();
    });

    it('renders rating', () => {
        renderWithRouter(<SalonCard salon={mockSalon} />);
        expect(screen.getByText('4.8')).toBeInTheDocument();
    });

    it('renders city', () => {
        renderWithRouter(<SalonCard salon={mockSalon} />);
        expect(screen.getByText('Madrid')).toBeInTheDocument();
    });

    it('links to /b/:slug', () => {
        renderWithRouter(<SalonCard salon={mockSalon} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/b/test-salon');
    });

    it('renders services in grid variant', () => {
        renderWithRouter(<SalonCard salon={mockSalon} variant="grid" />);
        expect(screen.getByText('Corte')).toBeInTheDocument();
        expect(screen.getByText('Barba')).toBeInTheDocument();
    });

    it('renders compact variant without services', () => {
        renderWithRouter(<SalonCard salon={mockSalon} variant="compact" />);
        expect(screen.getByText('Test Salon')).toBeInTheDocument();
        expect(screen.queryByText('Corte')).not.toBeInTheDocument();
    });
});
