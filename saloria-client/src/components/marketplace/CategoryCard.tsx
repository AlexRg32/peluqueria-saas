import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    image: string;
    index: number;
}

const CategoryCard = ({ title, description, icon: Icon, image, index }: CategoryCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
        >
            {/* Background Image */}
            <img 
                src={image} 
                alt={title} 
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent group-hover:from-brand-primary/90 group-hover:via-brand-primary/40 transition-colors duration-500" />
            
            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-brand-primary transition-colors duration-300">
                    <Icon size={24} className="text-white group-hover:text-brand-primary" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 leading-tight transform group-hover:-translate-y-1 transition-transform">{title}</h3>
                <p className="text-white/70 text-sm font-medium transform group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                    {description}
                </p>
                
                {/* Arrow indicator */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <span className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                        Explorar <span className="text-lg">→</span>
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default CategoryCard;
