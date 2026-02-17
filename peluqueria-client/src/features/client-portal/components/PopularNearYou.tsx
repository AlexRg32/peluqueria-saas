import { MapPin } from 'lucide-react';
import { EnterpriseSummary } from '@/types/Marketplace';
import SalonCard from './SalonCard';

interface PopularNearYouProps {
    salons: EnterpriseSummary[];
}

const PopularNearYou = ({ salons }: PopularNearYouProps) => {
    if (salons.length === 0) return null;

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <MapPin size={20} className="text-brand-primary" />
                    Populares cerca de ti
                </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                {salons.map(salon => (
                    <SalonCard key={salon.id} salon={salon} variant="compact" />
                ))}
            </div>
        </section>
    );
};

export default PopularNearYou;
