import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { EnterpriseSummary } from '@/types/Marketplace';

interface SalonCardProps {
    salon: EnterpriseSummary;
    variant?: 'grid' | 'compact';
    index?: number;
}

const SalonCard = ({ salon, variant = 'grid', index = 0 }: SalonCardProps) => {
    if (variant === 'compact') {
        return (
            <Link
                to={`/b/${salon.slug}`}
                className="group flex-shrink-0 w-[260px] bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
                <div className="relative h-36 overflow-hidden">
                    <img
                        src={salon.thumbnail}
                        alt={salon.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <Star size={12} className="text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-slate-900">{salon.rating}</span>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-primary transition-colors truncate">
                        {salon.name}
                    </h3>
                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                        <MapPin size={12} />
                        <span>{salon.city}</span>
                        {salon.distance && (
                            <>
                                <span className="text-slate-300 mx-1">•</span>
                                <span>{salon.distance}</span>
                            </>
                        )}
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
        >
            <Link
                to={`/b/${salon.slug}`}
                className="group relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
                {/* Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                        src={salon.thumbnail}
                        alt={salon.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <span className="text-sm font-bold text-slate-900">{salon.rating}</span>
                        <span className="text-xs text-slate-400">({salon.reviewCount})</span>
                    </div>

                    {/* Price badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-lg">
                        <span className="text-sm font-bold text-emerald-600">{salon.priceRange}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors leading-tight mb-1.5">
                        {salon.name}
                    </h3>

                    <div className="flex items-center text-slate-500 text-sm mb-3">
                        <MapPin size={14} className="mr-1 text-brand-primary flex-shrink-0" />
                        <span>{salon.city}</span>
                        {salon.distance && (
                            <>
                                <span className="text-slate-300 mx-2">•</span>
                                <span className="text-slate-400">{salon.distance}</span>
                            </>
                        )}
                    </div>

                    {/* Services preview */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                        {salon.services.slice(0, 3).map(service => (
                            <span
                                key={service}
                                className="text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100"
                            >
                                {service}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default SalonCard;
