import { describe, it, expect } from 'vitest';
import { marketplaceService } from './MarketplaceService';

describe('MarketplaceService', () => {
    describe('getFeatured', () => {
        it('returns at least 8 salons', async () => {
            const salons = await marketplaceService.getFeatured();
            expect(salons.length).toBeGreaterThanOrEqual(8);
        });

        it('each salon has all required fields', async () => {
            const salons = await marketplaceService.getFeatured();
            for (const salon of salons) {
                expect(salon).toHaveProperty('id');
                expect(salon).toHaveProperty('slug');
                expect(salon).toHaveProperty('name');
                expect(salon).toHaveProperty('city');
                expect(salon).toHaveProperty('rating');
                expect(salon).toHaveProperty('reviewCount');
                expect(salon).toHaveProperty('thumbnail');
                expect(salon).toHaveProperty('services');
                expect(salon).toHaveProperty('priceRange');
                expect(salon.services.length).toBeGreaterThan(0);
            }
        });
    });

    describe('getNearby', () => {
        it('returns salons with distance field', async () => {
            const salons = await marketplaceService.getNearby();
            expect(salons.length).toBeGreaterThan(0);
            for (const salon of salons) {
                expect(salon.distance).toBeDefined();
            }
        });

        it('returns salons sorted by distance', async () => {
            const salons = await marketplaceService.getNearby();
            for (let i = 1; i < salons.length; i++) {
                const prev = parseFloat(salons[i - 1].distance!);
                const curr = parseFloat(salons[i].distance!);
                expect(curr).toBeGreaterThanOrEqual(prev);
            }
        });
    });

    describe('search', () => {
        it('returns matching salons by name', async () => {
            const results = await marketplaceService.search('Elite');
            expect(results.length).toBeGreaterThan(0);
            expect(results[0].name).toContain('Elite');
        });

        it('returns matching salons by service', async () => {
            const results = await marketplaceService.search('Degradado');
            expect(results.length).toBeGreaterThan(0);
        });

        it('returns empty array for non-matching query', async () => {
            const results = await marketplaceService.search('xyznonexistent');
            expect(results).toEqual([]);
        });
    });
});
