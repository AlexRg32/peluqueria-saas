import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PopularNearYou from './PopularNearYou';
import { EnterpriseSummary } from '@/types/Marketplace';

const renderWithRouter = (ui: React.ReactElement) =>
    render(<BrowserRouter>{ui}</BrowserRouter>);

const mockSalons: EnterpriseSummary[] = [
    {
        id: '1',
        slug: 'near-1',
        name: 'Nearby Salon',
        city: 'Madrid',
        rating: 4.8,
        reviewCount: 100,
        thumbnail: 'https://example.com/img.jpg',
        services: ['Corte'],
        priceRange: '€€',
        distance: '0.5 km',
    },
];

describe('PopularNearYou', () => {
    it('renders section heading', () => {
        renderWithRouter(<PopularNearYou salons={mockSalons} />);
        expect(screen.getByText(/populares cerca de ti/i)).toBeInTheDocument();
    });

    it('renders compact SalonCards', () => {
        renderWithRouter(<PopularNearYou salons={mockSalons} />);
        expect(screen.getByText('Nearby Salon')).toBeInTheDocument();
    });

    it('renders nothing when salons array is empty', () => {
        const { container } = renderWithRouter(<PopularNearYou salons={[]} />);
        expect(container.querySelector('section')).toBeNull();
    });
});
