import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Scissors, Calendar, Search, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import BottomTabBar from './BottomTabBar';

const ClientPortalLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();

    const navItems = [
        { name: 'Inicio', path: '/', icon: Search },
        ...(isAuthenticated ? [{ name: 'Mis Citas', path: '/citas', icon: Calendar }] : []),
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            {/* Top Navbar */}
            <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2.5">
                                <div className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
                                    <Scissors className="text-slate-900 w-5 h-5" />
                                </div>
                                <span className="font-black text-xl tracking-tighter hidden sm:block">
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

                        {/* User Profile / Auth Actions */}
                        <div className="hidden md:flex items-center gap-6 border-l border-slate-100 pl-8 ml-4">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/perfil"
                                        className="flex items-center gap-3 px-3 py-2 -mx-3 -my-2 rounded-xl hover:bg-slate-50 transition-all duration-200 group"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-brand-primary border-2 border-slate-50 group-hover:border-brand-primary/30 group-hover:bg-brand-primary/10 transition-all duration-200">
                                            {(user as any)?.name?.[0] || 'U'}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 leading-none group-hover:text-brand-primary transition-colors">
                                                {(user as any)?.name || 'Usuario'}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                                                Cliente
                                            </span>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        title="Cerrar Sesión"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="/auth/login"
                                        className="text-sm font-bold text-slate-600 hover:text-brand-primary transition-colors"
                                    >
                                        Acceder
                                    </Link>
                                    <Link
                                        to="/auth/register"
                                        className="bg-slate-900 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg"
                                    >
                                        Registrarse
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            {!isAuthenticated && (
                                <Link
                                    to="/auth/login"
                                    className="mr-3 text-xs font-bold text-slate-600"
                                >
                                    Acceder
                                </Link>
                            )}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:bg-slate-50"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <item.icon size={20} className="text-brand-primary" />
                                        {item.name}
                                    </Link>
                                ))}

                                {isAuthenticated ? (
                                    <div className="pt-4 border-t border-slate-100">
                                        <button
                                            onClick={logout}
                                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-bold text-red-500 hover:bg-red-50"
                                        >
                                            <LogOut size={20} />
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                ) : (
                                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                                        <Link
                                            to="/auth/login"
                                            className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-base font-bold text-slate-900 border border-slate-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Iniciar Sesión
                                        </Link>
                                        <Link
                                            to="/auth/register"
                                            className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-base font-bold text-white bg-slate-900"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Crear Cuenta
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content */}
            <main className="flex-grow px-4 py-6 md:px-6 md:py-8 lg:px-10">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Bottom Tab Bar - Mobile only, always visible */}
            <BottomTabBar />

            {/* Footer - Desktop only */}
            <footer className="hidden md:block bg-white border-t border-slate-200 py-8 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2.5 mb-4">
                        <div className="w-7 h-7 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                            <Scissors size={16} className="text-brand-primary" />
                        </div>
                        <span className="font-black text-base tracking-tighter">
                            Peluquería<span className="text-brand-primary">SaaS</span>
                        </span>
                    </div>
                    <p className="text-slate-400 text-xs font-medium">
                        &copy; 2026 Peluquería SaaS. Tu centro de belleza personal.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ClientPortalLayout;
