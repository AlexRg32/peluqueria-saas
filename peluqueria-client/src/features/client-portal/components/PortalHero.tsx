import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface PortalHeroProps {
    userName?: string;
}

const PortalHero: React.FC<PortalHeroProps> = ({ userName }) => {
    return (
        <section className="relative overflow-hidden rounded-[40px] bg-slate-900 p-12 lg:p-20 text-white shadow-2xl shadow-slate-900/20">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                <img 
                    src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1000" 
                    alt="Barber" 
                    className="object-cover w-full h-full"
                />
            </div>
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-2xl space-y-6"
            >
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                    {userName ? (
                        <>Hola, <span className="text-brand-primary">{userName}</span> 👋</>
                    ) : (
                        <>Encuentra tu <span className="text-brand-primary">estilo</span> perfecto</>
                    )}
                </h1>
                <p className="text-xl text-slate-300 font-medium">
                    {userName 
                        ? '¿Qué servicio necesitas hoy? Encuentra las mejores peluquerías en tu zona.'
                        : 'Reserva tu cita en las mejores peluquerías y barberías de la ciudad en segundos.'}
                </p>

                <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={24} />
                        <input 
                            type="text"
                            placeholder="Buscar peluquerías, servicios..."
                            className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white/20 transition-all font-bold text-lg"
                        />
                    </div>
                    <button className="bg-brand-primary hover:bg-brand-primary/90 text-slate-900 px-10 py-5 rounded-2xl font-black text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-brand-primary/20">
                        Explorar
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default PortalHero;
