import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface MarketplaceHeroProps {
    userName?: string;
    onSearch?: (query: string) => void;
}

const MarketplaceHero = ({ userName, onSearch }: MarketplaceHeroProps) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch?.(query);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-10 sm:px-10 sm:py-14 text-white">
            {/* Animated background blobs */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -top-20 -right-20 w-80 h-80 bg-brand-primary rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.12, 0.05] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-secondary rounded-full blur-[80px] pointer-events-none"
            />

            <div className="relative z-10 max-w-2xl">
                {/* Greeting / Tagline */}
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-3"
                >
                    {userName ? (
                        <>
                            Hola, <span className="text-brand-primary">{userName}</span> 👋
                        </>
                    ) : (
                        <>
                            Encuentra tu{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                                peluquería ideal
                            </span>
                        </>
                    )}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-slate-400 text-base sm:text-lg font-medium mb-8 max-w-lg"
                >
                    {userName
                        ? 'Reserva tu próxima cita en las mejores peluquerías de tu zona.'
                        : 'Descubre, compara y reserva en las mejores peluquerías y barberías cerca de ti.'}
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex gap-2"
                >
                    <div className="flex-1 relative group">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors"
                            size={20}
                        />
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Buscar peluquerías, servicios..."
                            className="w-full bg-white/10 border border-white/15 rounded-xl py-3.5 sm:py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:bg-white/15 transition-all font-medium text-sm sm:text-base"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-brand-primary hover:bg-brand-secondary text-slate-900 px-6 sm:px-8 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-brand-primary/20 whitespace-nowrap"
                    >
                        Buscar
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default MarketplaceHero;
