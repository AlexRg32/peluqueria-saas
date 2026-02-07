import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Scissors, Calendar, Search, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const ClientPortalLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { name: 'Inicio', path: '/portal', icon: Search },
        { name: 'Mis Citas', path: '/portal/citas', icon: Calendar },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            {/* Top Navbar */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/portal" className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
                                    <Scissors className="text-slate-900 w-6 h-6" />
                                </div>
                                <span className="font-black text-2xl tracking-tighter hidden sm:block">
                                    Peluquería<span className="text-brand-primary">SaaS</span>
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link 
                                        key={item.path}
                                        to={item.path} 
                                        className={`flex items-center gap-2 font-bold text-sm uppercase tracking-widest transition-all hover:text-brand-primary ${
                                            isActive ? 'text-brand-primary' : 'text-slate-500'
                                        }`}
                                    >
                                        <Icon size={18} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* User Profile / Logout */}
                        <div className="hidden md:flex items-center gap-6 border-l border-slate-100 pl-8 ml-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-brand-primary border-2 border-slate-50">
                                    {(user as any)?.name?.[0] || 'U'}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-900 leading-none">{(user as any)?.name || 'Usuario'}</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Cliente</span>
                                </div>
                            </div>
                            <button 
                                onClick={logout}
                                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                title="Cerrar Sesión"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
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
                            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
                        >
                            <div className="px-4 pt-2 pb-6 space-y-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="flex items-center gap-3 px-4 py-4 rounded-2xl text-base font-bold text-slate-700 hover:bg-slate-50"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <item.icon size={20} className="text-brand-primary" />
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="pt-4 border-t border-slate-100">
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-3 w-full px-4 py-4 rounded-2xl text-base font-bold text-red-500 hover:bg-red-50"
                                    >
                                        <LogOut size={20} />
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content */}
            <main className="flex-grow p-4 md:p-10">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Simple Bottom Nav for Mobile */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-[28px] p-2 flex justify-around items-center shadow-2xl border border-white/10">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.path}
                                to={item.path}
                                className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
                                    isActive ? 'text-brand-primary bg-white/5' : 'text-slate-400'
                                }`}
                            >
                                <Icon size={24} />
                                <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                            <Scissors size={18} className="text-brand-primary" />
                        </div>
                        <span className="font-black text-lg tracking-tighter">
                            Peluquería<span className="text-brand-primary">SaaS</span>
                        </span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">
                        &copy; 2026 Peluquería SaaS. Tu centro de belleza personal.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ClientPortalLayout;
