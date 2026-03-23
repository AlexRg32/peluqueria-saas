import { EnterpriseSummary } from '../types/Marketplace';

const MOCK_ENTERPRISES: EnterpriseSummary[] = [
    {
        id: '1',
        slug: 'barberia-paco',
        name: 'Barbería Paco',
        city: 'Madrid',
        rating: 4.8,
        reviewCount: 127,
        thumbnail: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=60',
        services: ['Corte', 'Barba', 'Afeitado'],
        priceRange: '€€',
        distance: '0.8 km',
    },
    {
        id: '2',
        slug: 'style-studio',
        name: 'Style Studio',
        city: 'Barcelona',
        rating: 4.5,
        reviewCount: 89,
        thumbnail: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=60',
        services: ['Coloración', 'Mechas', 'Tratamiento'],
        priceRange: '€€€',
        distance: '1.2 km',
    },
    {
        id: '3',
        slug: 'elite-cuts',
        name: 'Elite Cuts',
        city: 'Valencia',
        rating: 4.9,
        reviewCount: 214,
        thumbnail: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?w=800&auto=format&fit=crop&q=60',
        services: ['Degradado', 'Diseño', 'Barba'],
        priceRange: '€€',
        distance: '2.1 km',
    },
    {
        id: '4',
        slug: 'urban-grooming',
        name: 'Urban Grooming',
        city: 'Sevilla',
        rating: 4.7,
        reviewCount: 156,
        thumbnail: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=60',
        services: ['Corte Clásico', 'Facial', 'Spa'],
        priceRange: '€€€',
        distance: '3.5 km',
    },
    {
        id: '5',
        slug: 'the-barber-house',
        name: 'The Barber House',
        city: 'Madrid',
        rating: 4.6,
        reviewCount: 98,
        thumbnail: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=60',
        services: ['Corte', 'Barba', 'Cejas'],
        priceRange: '€',
        distance: '1.5 km',
    },
    {
        id: '6',
        slug: 'salon-luxe',
        name: 'Salón Luxe',
        city: 'Barcelona',
        rating: 4.9,
        reviewCount: 302,
        thumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60',
        services: ['Coloración', 'Alisado', 'Corte'],
        priceRange: '€€€',
        distance: '0.5 km',
    },
    {
        id: '7',
        slug: 'razor-kings',
        name: 'Razor Kings',
        city: 'Málaga',
        rating: 4.4,
        reviewCount: 67,
        thumbnail: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=800&auto=format&fit=crop&q=60',
        services: ['Afeitado', 'Degradado', 'Perfilado'],
        priceRange: '€€',
        distance: '4.2 km',
    },
    {
        id: '8',
        slug: 'hair-lab',
        name: 'Hair Lab',
        city: 'Bilbao',
        rating: 4.8,
        reviewCount: 183,
        thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=60',
        services: ['Tratamiento Capilar', 'Corte', 'Tinte'],
        priceRange: '€€',
        distance: '2.8 km',
    },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const marketplaceService = {
    getFeatured: async (): Promise<EnterpriseSummary[]> => {
        await delay(400);
        return MOCK_ENTERPRISES;
    },

    getNearby: async (): Promise<EnterpriseSummary[]> => {
        await delay(300);
        return MOCK_ENTERPRISES
            .filter(e => e.distance)
            .sort((a, b) => parseFloat(a.distance!) - parseFloat(b.distance!))
            .slice(0, 5);
    },

    search: async (query: string): Promise<EnterpriseSummary[]> => {
        await delay(300);
        const q = query.toLowerCase();
        return MOCK_ENTERPRISES.filter(
            e =>
                e.name.toLowerCase().includes(q) ||
                e.city.toLowerCase().includes(q) ||
                e.services.some(s => s.toLowerCase().includes(q))
        );
    },
};

// Legacy export for backward compatibility
export const getFeaturedEnterprises = marketplaceService.getFeatured;
