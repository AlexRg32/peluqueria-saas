import { EnterpriseSummary } from '../types/Marketplace';

// Mock data
const MOCK_ENTERPRISES: EnterpriseSummary[] = [
    {
        id: '1',
        slug: 'barberia-paco',
        name: 'Barbería Paco',
        city: 'Madrid',
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=60'
    },
    {
        id: '2',
        slug: 'style-studio',
        name: 'Style Studio',
        city: 'Barcelona',
        rating: 4.5,
        thumbnail: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=60'
    },
    {
        id: '3',
        slug: 'elite-cuts',
        name: 'Elite Cuts',
        city: 'Valencia',
        rating: 4.9,
        thumbnail: 'https://images.unsplash.com/photo-1599351431202-6e0c06e7d25a?w=800&auto=format&fit=crop&q=60'
    },
    {
        id: '4',
        slug: 'urban-grooming',
        name: 'Urban Grooming',
        city: 'Sevilla',
        rating: 4.7,
        thumbnail: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=60'
    }
];

export const getFeaturedEnterprises = async (): Promise<EnterpriseSummary[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return MOCK_ENTERPRISES;
};
