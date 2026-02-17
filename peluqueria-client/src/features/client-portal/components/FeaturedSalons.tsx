import { EnterpriseSummary } from '@/types/Marketplace';
import SalonCard from './SalonCard';

interface FeaturedSalonsProps {
    salons: EnterpriseSummary[];
    loading: boolean;
}

const FeaturedSalons = ({ salons, loading }: FeaturedSalonsProps) => {
    return (
        <section>
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Peluquerías <span className="text-brand-primary">Destacadas</span>
                </h2>
                <button className="text-brand-primary font-bold text-xs uppercase tracking-wider hover:underline">
                    Ver todas
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="bg-slate-100 rounded-2xl h-72 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {salons.map((salon, index) => (
                        <SalonCard key={salon.id} salon={salon} variant="grid" index={index} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default FeaturedSalons;
