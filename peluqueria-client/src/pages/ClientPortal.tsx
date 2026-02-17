import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { appointmentService, Appointment } from '@/services/appointmentService';
import { marketplaceService } from '@/services/MarketplaceService';
import { EnterpriseSummary } from '@/types/Marketplace';
import { Loader2 } from 'lucide-react';
import MarketplaceHero from '@/features/client-portal/components/MarketplaceHero';
import QuickCategories from '@/features/client-portal/components/QuickCategories';
import UpcomingAppointments from '@/features/client-portal/components/UpcomingAppointments';
import FeaturedSalons from '@/features/client-portal/components/FeaturedSalons';
import PopularNearYou from '@/features/client-portal/components/PopularNearYou';

const ClientPortal = () => {
    const { user, isAuthenticated } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [featuredSalons, setFeaturedSalons] = useState<EnterpriseSummary[]>([]);
    const [nearbySalons, setNearbySalons] = useState<EnterpriseSummary[]>([]);
    const [loadingAppointments, setLoadingAppointments] = useState(false);
    const [loadingSalons, setLoadingSalons] = useState(true);
    const [initializing, setInitializing] = useState(true);

    const userName = (user as any)?.name || user?.sub?.split('@')[0] || '';

    useEffect(() => {
        loadData();
    }, [isAuthenticated]);

    const loadData = async () => {
        try {
            // Load salons (always)
            const [featured, nearby] = await Promise.all([
                marketplaceService.getFeatured(),
                marketplaceService.getNearby(),
            ]);
            setFeaturedSalons(featured);
            setNearbySalons(nearby);
            setLoadingSalons(false);

            // Load appointments (auth only)
            if (isAuthenticated) {
                setLoadingAppointments(true);
                try {
                    const data = await appointmentService.getMine();
                    setAppointments(data);
                } catch (error) {
                    console.error('Error loading appointments:', error);
                } finally {
                    setLoadingAppointments(false);
                }
            }
        } catch (error) {
            console.error('Error loading marketplace data:', error);
            setLoadingSalons(false);
        } finally {
            setInitializing(false);
        }
    };

    if (initializing && loadingSalons) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="animate-spin text-brand-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-8 sm:space-y-10 pb-24 md:pb-10">
            {/* Hero with search */}
            <MarketplaceHero userName={isAuthenticated ? userName : undefined} />

            {/* Quick category chips */}
            <QuickCategories />

            {/* Upcoming appointments (auth-aware) */}
            <UpcomingAppointments
                appointments={appointments}
                loading={loadingAppointments}
                isAuthenticated={isAuthenticated}
            />

            {/* Popular near you - horizontal scroll */}
            <PopularNearYou salons={nearbySalons} />

            {/* Featured salons - full grid */}
            <FeaturedSalons salons={featuredSalons} loading={loadingSalons} />
        </div>
    );
};

export default ClientPortal;
