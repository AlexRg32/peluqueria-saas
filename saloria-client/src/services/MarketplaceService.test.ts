import { beforeEach, describe, expect, it, vi } from 'vitest';
import { marketplaceService } from './MarketplaceService';

const getMock = vi.fn();

vi.mock('../lib/axios', () => ({
    apiClient: {
        get: (...args: any[]) => getMock(...args),
    },
}));

describe('MarketplaceService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getFeatured', () => {
        it('returns the first 8 salons from the public directory', async () => {
            getMock.mockResolvedValue({
                data: Array.from({ length: 10 }, (_, index) => ({
                    id: index + 1,
                    slug: `salon-${index + 1}`,
                    name: `Salon ${index + 1}`,
                    city: 'Madrid',
                    services: ['Corte'],
                    priceRange: '€€',
                })),
            });

            const salons = await marketplaceService.getFeatured();
            expect(salons).toHaveLength(8);
        });

        it('maps fallback values for missing optional fields', async () => {
            getMock.mockResolvedValue({
                data: [
                    {
                        id: 1,
                        slug: 'barberia-real',
                        name: 'Barbería Real',
                        city: 'Madrid',
                        services: ['Corte'],
                        priceRange: 'Consultar',
                    },
                ],
            });

            const salons = await marketplaceService.getFeatured();
            expect(salons[0].thumbnail).toContain('data:image/svg+xml');
            expect(salons[0].rating).toBeNull();
            expect(salons[0].reviewCount).toBeNull();
        });
    });

    describe('getNearby', () => {
        it('returns a shorter subset for the nearby rail', async () => {
            getMock.mockResolvedValue({
                data: Array.from({ length: 6 }, (_, index) => ({
                    id: index + 1,
                    slug: `salon-${index + 1}`,
                    name: `Salon ${index + 1}`,
                    city: 'Madrid',
                    services: ['Corte'],
                    priceRange: '€€',
                })),
            });

            const salons = await marketplaceService.getNearby();
            expect(salons).toHaveLength(5);
        });
    });

    describe('search', () => {
        it('forwards the text query to the public directory endpoint', async () => {
            getMock.mockResolvedValue({
                data: [
                    {
                        id: 1,
                        slug: 'elite-cuts',
                        name: 'Elite Cuts',
                        city: 'Valencia',
                        services: ['Degradado'],
                        priceRange: '€€',
                    },
                ],
            });

            const results = await marketplaceService.search('Elite');

            expect(getMock).toHaveBeenCalledWith('/api/public/enterprises', {
                params: { q: 'Elite' },
            });
            expect(results[0].name).toContain('Elite');
        });

        it('loads the whole directory when the query is empty', async () => {
            getMock.mockResolvedValue({ data: [] });

            await marketplaceService.search('   ');

            expect(getMock).toHaveBeenCalledWith('/api/public/enterprises', {
                params: undefined,
            });
        });
    });
});
