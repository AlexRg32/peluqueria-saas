import { apiClient } from '../lib/axios';
import { EnterpriseSummary } from '../types/Marketplace';

interface PublicDirectoryResponse {
    id: number;
    slug: string;
    name: string;
    city: string;
    rating?: number | null;
    reviewCount?: number | null;
    thumbnail?: string | null;
    services: string[];
    priceRange: string;
    address?: string;
}

const FALLBACK_THUMBNAIL =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><rect width="640" height="480" fill="%23e2e8f0"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23475569" font-family="Arial, sans-serif" font-size="32">Saloria</text></svg>';

const mapEnterprise = (enterprise: PublicDirectoryResponse): EnterpriseSummary => ({
    id: enterprise.id,
    slug: enterprise.slug,
    name: enterprise.name,
    city: enterprise.city,
    rating: enterprise.rating ?? null,
    reviewCount: enterprise.reviewCount ?? null,
    thumbnail: enterprise.thumbnail || FALLBACK_THUMBNAIL,
    services: enterprise.services ?? [],
    priceRange: enterprise.priceRange || 'Consultar',
    address: enterprise.address,
});

const fetchDirectory = async (query?: string): Promise<EnterpriseSummary[]> => {
    const response = await apiClient.get<PublicDirectoryResponse[]>('/api/public/enterprises', {
        params: query ? { q: query } : undefined,
    });
    return response.data.map(mapEnterprise);
};

export const marketplaceService = {
    getFeatured: async (): Promise<EnterpriseSummary[]> => {
        const enterprises = await fetchDirectory();
        return enterprises.slice(0, 8);
    },

    getNearby: async (): Promise<EnterpriseSummary[]> => {
        const enterprises = await fetchDirectory();
        return enterprises.slice(0, 5);
    },

    search: async (query: string): Promise<EnterpriseSummary[]> => {
        return fetchDirectory(query.trim() || undefined);
    },
};

// Legacy export for backward compatibility
export const getFeaturedEnterprises = marketplaceService.getFeatured;
