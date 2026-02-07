import { motion } from 'framer-motion';

const images = [
    "https://images.unsplash.com/photo-1599351431247-f57933838ae2?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1622286332618-f28fd7f4d56d?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1593702295094-ada34bed074c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512690118294-f0607659da07?w=800&auto=format&fit=crop&q=80"
];

const StyleGallery = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
                            Inspiración e <span className="text-brand-primary">Influencia</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium">
                            Los mejores trabajos realizados por nuestros profesionales asociados. Encuentra tu próximo look.
                        </p>
                    </div>
                    <button className="bg-slate-900 text-white font-black py-4 px-8 rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/20 whitespace-nowrap">
                        Ver Galería Completa
                    </button>
                </div>
            </div>
            
            {/* Sliding gallery effect */}
            <div className="flex gap-4 overflow-hidden py-4 -mx-4 group">
                <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ 
                        duration: 30, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    className="flex gap-4 px-4 shrink-0"
                >
                    {[...images, ...images].map((img, i) => (
                        <div 
                            key={i} 
                            className="w-72 h-96 rounded-3xl overflow-hidden shadow-lg border border-slate-100 shrink-0 transform group-hover:scale-95 transition-transform duration-500 hover:!scale-105"
                        >
                            <img 
                                src={img} 
                                alt={`Style ${i}`} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default StyleGallery;
