import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { EnterpriseSummary } from '../../types/Marketplace';

interface EnterpriseCardProps {
  enterprise: EnterpriseSummary;
  index: number;
}

const EnterpriseCard = ({ enterprise, index }: EnterpriseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link 
        to={`/b/${enterprise.slug}`}
        className="group relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
      >
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
          <img 
            src={enterprise.thumbnail || "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80"} 
            alt={enterprise.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
          />
          
          {/* Badge: Rating */}
          <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-white/20">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-slate-900">{enterprise.rating || 'New'}</span>
          </div>
          
          {/* Badge: Open/Closed - Mock */}
          <div className="absolute bottom-4 left-4 z-20 bg-emerald-500 text-white px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-lg text-xs font-bold uppercase tracking-wider">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Abierto
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-primary transition-colors leading-tight">
              {enterprise.name}
            </h3>
          </div>
          
          <div className="flex items-center text-slate-500 text-sm mb-4 gap-3">
            <div className="flex items-center">
              <MapPin size={14} className="mr-1 text-brand-primary" />
              {enterprise.city}
            </div>
            <div className="flex items-center border-l border-slate-200 pl-3">
              <Clock size={14} className="mr-1 text-brand-primary" />
              15 min de ti
            </div>
          </div>
          
          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
            <span className="text-slate-900 font-bold text-sm">Próxima cita disponible: Hoy 17:00</span>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-slate-900 transition-colors">
                <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EnterpriseCard;
