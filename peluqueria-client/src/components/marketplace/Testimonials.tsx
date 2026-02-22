import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Carlos Rodríguez",
        role: "Cliente Satisfecho",
        comment: "La mejor forma de reservar mis cortes. Ya no tengo que esperar ni llamar por teléfono. El sistema es impecable.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=carlos"
    },
    {
        name: "Marcos Pérez",
        role: "Cliente Recurrente",
        comment: "Descubrí mi barbería actual gracias a esta app. Las valoraciones son reales y la calidad es siempre de 10.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=marcos"
    },
    {
        name: "David García",
        role: "Entusiasta del Estilo",
        comment: "Me encanta poder ver los trabajos de los barberos antes de reservar. Me da mucha confianza.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=david"
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background quote icon */}
            <div className="absolute top-10 right-10 text-slate-200/50 -rotate-12">
                <Quote size={200} />
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
                        Lo que dicen <span className="text-brand-primary">nuestros clientes</span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                        Miles de personas ya confían en Peluquería SaaS para gestionar su estilo personal.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
                                ))}
                            </div>
                            
                            <p className="text-slate-600 italic mb-8 font-medium leading-relaxed">
                                "{t.comment}"
                            </p>
                            
                            <div className="flex items-center gap-4">
                                <img 
                                    src={t.avatar} 
                                    alt={t.name} 
                                    className="w-12 h-12 rounded-full border-2 border-brand-primary/20 p-0.5 group-hover:border-brand-primary transition-colors"
                                />
                                <div>
                                    <h4 className="font-black text-slate-900 leading-none mb-1">{t.name}</h4>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
