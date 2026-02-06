export interface BusinessHour {
    dayOfWeek: number; // 1 = Monday, 7 = Sunday
    isOpen: boolean;
    startTime: string; // "09:00"
    endTime: string;   // "18:00"
}

export interface PublicEnterpriseProfile {
    id: string;
    slug: string;
    name: string;
    description: string;
    address: string;
    city: string;
    rating: number;
    reviewCount: number;
    coverImage: string;
    logo: string;
    brandingColors: {
        primary: string;
        secondary: string;
    };
    contactPhone: string;
    businessHours: BusinessHour[];
}

export interface EnterpriseSummary {
    id: string;
    slug: string;
    name: string;
    city: string;
    rating: number;
    thumbnail: string;
}
