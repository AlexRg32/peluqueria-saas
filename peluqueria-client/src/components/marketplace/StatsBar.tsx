import { motion } from 'framer-motion';

const stats = [
    { label: "Barberías Partners", value: "500+" },
    { label: "Usuarios Activos", value: "25k+" },
    { label: "Citas Reservadas", value: "100k+" },
    { label: "Valoración Media", value: "4.9/5" }
];

const StatsBar = () => {
    return (
        <section className="py-16 bg-slate-900 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-black text-brand-primary mb-2 tracking-tighter">
                                {stat.value}
                            </div>
                            <div className="text-slate-400 text-sm font-black uppercase tracking-widest">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsBar;
