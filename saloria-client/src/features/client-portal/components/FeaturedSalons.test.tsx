import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FeaturedSalons from './FeaturedSalons';
import { EnterpriseSummary } from '@/types/Marketplace';

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const renderWithRouter = (ui: React.ReactElement) =>
    render(<BrowserRouter>{ui}</BrowserRouter>);

const mockSalons: EnterpriseSummary[] = [
    {
        id: '1',
        slug: 'test-1',
        name: 'Salon Alpha',
        city: 'Madrid',
        rating: 4.8,
        reviewCount: 100,
        thumbnail: 'https://example.com/img.jpg',
        services: ['Corte'],
        priceRange: '€€',
    },
    {
        id: '2',
        slug: 'test-2',
        name: 'Salon Beta',
        city: 'Barcelona',
        rating: 4.5,
        reviewCount: 50,
        thumbnail: 'https://example.com/img2.jpg',
        services: ['Barba'],
        priceRange: '€',
    },
];

describe('FeaturedSalons', () => {
    it('renders section heading', () => {
        renderWithRouter(<FeaturedSalons salons={mockSalons} loading={false} />);
        expect(screen.getByText(/destacadas/i)).toBeInTheDocument();
    });

    it('renders SalonCard for each salon', () => {
        renderWithRouter(<FeaturedSalons salons={mockSalons} loading={false} />);
        expect(screen.getByText('Salon Alpha')).toBeInTheDocument();
        expect(screen.getByText('Salon Beta')).toBeInTheDocument();
    });

    it('shows skeletons when loading', () => {
        const { container } = renderWithRouter(<FeaturedSalons salons={[]} loading={true} />);
        const skeletons = container.querySelectorAll('.animate-pulse');
        expect(skeletons.length).toBe(8);
    });
});
