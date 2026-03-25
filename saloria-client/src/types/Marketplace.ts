export interface BusinessHour {
    dayOfWeek: number; // 1 = Monday, 7 = Sunday
    isOpen: boolean;
    startTime: string; // "09:00"
    endTime: string;   // "18:00"
}

export interface PublicEnterpriseProfile {
    id: number;
    slug: string;
    name: string;
    description: string;
    address: string;
    city: string;
    rating?: number | null;
    reviewCount?: number | null;
    coverImage?: string;
    logo?: string;
    brandingColors: {
        primary?: string;
        secondary?: string;
    };
    contactPhone: string;
    businessHours: BusinessHour[];
}

export interface EnterpriseSummary {
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
    distance?: string;
}
