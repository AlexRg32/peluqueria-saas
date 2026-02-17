import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ClientPortal from './ClientPortal';

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
        h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
        p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock useAuth
vi.mock('@/features/auth/hooks/useAuth', () => ({
    useAuth: vi.fn(() => ({
        user: null,
        isAuthenticated: false,
        logout: vi.fn(),
        login: vi.fn(),
        loading: false,
    })),
}));

// Mock MarketplaceService
vi.mock('@/services/MarketplaceService', () => ({
    marketplaceService: {
        getFeatured: vi.fn(() =>
            Promise.resolve([
                {
                    id: '1',
                    slug: 'test',
                    name: 'Test Salon',
                    city: 'Madrid',
                    rating: 4.8,
                    reviewCount: 100,
                    thumbnail: 'https://example.com/img.jpg',
                    services: ['Corte'],
                    priceRange: '€€',
                    distance: '1 km',
                },
            ])
        ),
        getNearby: vi.fn(() => Promise.resolve([])),
    },
}));

// Mock appointmentService
vi.mock('@/services/appointmentService', () => ({
    appointmentService: {
        getMine: vi.fn(() => Promise.resolve([])),
    },
    AppointmentStatus: {
        PENDING: 'PENDING',
        COMPLETED: 'COMPLETED',
        CANCELED: 'CANCELED',
        NO_SHOW: 'NO_SHOW',
    },
}));

const renderWithRouter = (ui: React.ReactElement) =>
    render(<BrowserRouter>{ui}</BrowserRouter>);

describe('ClientPortal', () => {
    it('renders MarketplaceHero', async () => {
        renderWithRouter(<ClientPortal />);
        await waitFor(() => {
            expect(screen.getByPlaceholderText(/buscar peluquerías/i)).toBeInTheDocument();
        });
    });

    it('renders QuickCategories', async () => {
        renderWithRouter(<ClientPortal />);
        await waitFor(() => {
            expect(screen.getByText('Coloración')).toBeInTheDocument();
        });
    });

    it('renders FeaturedSalons section', async () => {
        renderWithRouter(<ClientPortal />);
        await waitFor(() => {
            expect(screen.getByText(/destacadas/i)).toBeInTheDocument();
        });
    });
});
