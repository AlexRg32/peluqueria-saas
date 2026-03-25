import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from './SearchPage';

vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

vi.mock('@/services/MarketplaceService', () => ({
    marketplaceService: {
        search: vi.fn(() =>
            Promise.resolve([
                {
                    id: 1,
                    slug: 'barberia-real',
                    name: 'Barbería Real',
                    city: 'Madrid',
                    services: ['Corte'],
                    priceRange: '€€',
                },
            ])
        ),
    },
}));

describe('SearchPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders search heading', async () => {
        render(
            <BrowserRouter>
                <SearchPage />
            </BrowserRouter>
        );
        expect(screen.getByText('Buscador')).toBeInTheDocument();
        expect(await screen.findByText('Barbería Real')).toBeInTheDocument();
    });

    it('renders loaded results', async () => {
        render(
            <BrowserRouter>
                <SearchPage />
            </BrowserRouter>
        );
        expect(await screen.findByText('Barbería Real')).toBeInTheDocument();
    });
});
