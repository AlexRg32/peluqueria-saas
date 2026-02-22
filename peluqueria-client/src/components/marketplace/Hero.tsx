import { Search, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative bg-slate-900 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background with higher opacity and better gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/marketplace/hero-bg.png"
          alt="Barbershop premium background"
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950"></div>
        
        {/* Animated bokeh/lights */}
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px]"
        />
        <motion.div 
            animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 12, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-secondary/10 rounded-full blur-[100px]"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles size={14} />
            La plataforma #1 de Reservas
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-tight"
          >
            Donde el estilo <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary">se encuentra con la comodidad.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-slate-300 mb-12"
          >
            Descubre las barberías más valoradas de tu ciudad y reserva en segundos. Sin llamadas, sin esperas, solo tu mejor versión.
          </motion.p>
          
          {/* Search Bar - Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-white/10 flex flex-col md:flex-row gap-2">
              <div className="flex-[1.5] relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-brand-primary transition-colors">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 bg-white/5 border-transparent rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:bg-white/10 transition-all text-sm"
                  placeholder="¿Qué servicio buscas? (Degradado, Barba, Color...)"
                />
              </div>
              
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-brand-primary transition-colors">
                  <MapPin className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 bg-white/5 border-transparent rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:bg-white/10 transition-all text-sm"
                  placeholder="Ubicación o Ciudad"
                />
              </div>
              
              <button className="bg-brand-primary text-slate-900 font-black py-4 px-10 rounded-xl hover:bg-brand-secondary transition-all active:scale-95 shadow-xl shadow-brand/20 whitespace-nowrap">
                Buscar ahora
              </button>
            </div>
            
            {/* Quick badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <span className="text-slate-400 text-sm">Populares:</span>
              {['Degradado', 'Barba', 'Corte Clásico', 'Color'].map((tag) => (
                <button 
                  key={tag}
                  className="text-white/60 text-xs font-bold hover:text-brand-primary transition-colors border-b border-white/10 hover:border-brand-primary pb-1"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20 hidden lg:block"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/20 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
