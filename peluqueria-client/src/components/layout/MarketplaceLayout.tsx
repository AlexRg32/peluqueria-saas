import { Link, Outlet } from 'react-router-dom';
import { User, Menu, X, LayoutDashboard, Scissors, Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const MarketplaceLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 selection:bg-brand-primary/30">
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3 shadow-md' 
                : 'bg-transparent py-5'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-10">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-3 group">
                                <div className={`w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg ${scrolled ? 'scale-90' : 'scale-100'}`}>
                                    <Scissors className="text-slate-900 w-6 h-6" />
                                </div>
                                <span className={`font-black text-2xl tracking-tighter transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                                    Peluquería<span className="text-brand-primary">SaaS</span>
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-10">
                            <Link to="/search" className={`font-bold text-sm uppercase tracking-widest transition-colors hover:text-brand-primary ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}>
                                Explorar
                            </Link>
                            
                            {isAuthenticated ? (
                                <Link 
                                    to="/admin/dashboard" 
                                    className="inline-flex items-center px-6 py-2.5 text-sm font-black rounded-xl text-slate-900 bg-brand-primary hover:bg-brand-secondary transition-all hover:scale-105 shadow-lg shadow-brand/20"
                                >
                                    <LayoutDashboard size={18} className="mr-2" />
                                    Panel de Control
                                </Link>
                            ) : (
                                <>
                                    <Link to="/pro/register" className={`font-bold text-sm uppercase tracking-widest transition-colors hover:text-brand-primary ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}>
                                        Soy Profesional
                                    </Link>
                                    <Link 
                                        to="/auth/login" 
                                        className={`inline-flex items-center px-6 py-2.5 text-sm font-black rounded-xl transition-all hover:scale-105 shadow-lg ${
                                            scrolled 
                                            ? 'bg-slate-900 text-white hover:bg-slate-800' 
                                            : 'bg-white text-slate-900 hover:bg-slate-50'
                                        }`}
                                    >
                                        <User size={18} className="mr-2 text-brand-primary" />
                                        Acceder
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`p-2 rounded-xl transition-colors ${scrolled ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10'}`}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
                        >
                            <div className="px-4 pt-4 pb-6 space-y-4">
                                <Link
                                    to="/search"
                                    className="block px-4 py-3 rounded-xl text-base font-bold text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Explorar Barberías
                                </Link>
                                
                                {isAuthenticated ? (
                                    <Link
                                        to="/admin/dashboard"
                                        className="block px-4 py-3 rounded-xl text-base font-black text-slate-900 bg-brand-primary text-center"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Ir al Panel de Control
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            to="/pro/register"
                                            className="block px-4 py-3 rounded-xl text-base font-bold text-slate-600 hover:bg-slate-50"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Soy Profesional
                                        </Link>
                                        <Link
                                            to="/auth/login"
                                            className="block px-4 py-3 rounded-xl text-base font-black text-white bg-slate-900 text-center"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Iniciar Sesión
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Premium Footer */}
            <footer className="relative bg-slate-950 text-white pt-24 pb-12 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/5">
                        {/* Brand Column */}
                        <div className="lg:col-span-1">
                            <Link to="/" className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                                    <Scissors size={18} className="text-slate-950" />
                                </div>
                                <span className="font-black text-xl tracking-tighter">
                                    Peluquería<span className="text-brand-primary">SaaS</span>
                                </span>
                            </Link>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
                                Digitalizando el mundo de la peluquería y barbería. Reserva tu cita favorita en un par de clics.
                            </p>
                            <div className="flex gap-4">
                                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-slate-950 transition-all border border-white/5">
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links Columns */}
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary mb-8">Descubrir</h3>
                            <ul className="space-y-4">
                                {['Barberías', 'Peluquerías', 'Centros de Estética', 'Mejor Valorados'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary mb-8">Empresa</h3>
                            <ul className="space-y-4">
                                {['Sobre Nosotros', 'Carreras', 'Blog', 'Contacto'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter Column */}
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary mb-8">Suscríbete</h3>
                            <p className="text-slate-500 text-sm mb-6">Recibe ofertas exclusivas y novedades en tu email.</p>
                            <div className="relative">
                                <input 
                                    type="email" 
                                    placeholder="tu@email.com" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-brand-primary transition-colors"
                                />
                                <button className="absolute right-2 top-2 w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-slate-950 hover:bg-brand-secondary transition-colors">
                                    <Mail size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-slate-600 text-xs font-medium">
                            &copy; 2026 Peluquería SaaS. Desarrollado con ❤️ para Barberos.
                        </p>
                        <div className="flex gap-8">
                            <a href="#" className="text-slate-600 hover:text-white text-xs font-medium underline-offset-4 hover:underline">Privacidad</a>
                            <a href="#" className="text-slate-600 hover:text-white text-xs font-medium underline-offset-4 hover:underline">Términos</a>
                            <a href="#" className="text-slate-600 hover:text-white text-xs font-medium underline-offset-4 hover:underline">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MarketplaceLayout;
