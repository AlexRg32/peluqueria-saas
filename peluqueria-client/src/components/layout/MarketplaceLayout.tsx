// Imports
import { Link, Outlet } from 'react-router-dom';
import { User, Menu, X, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';

const MarketplaceLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                                    <span className="text-slate-900 font-bold text-lg">P</span>
                                </div>
                                <span className="font-bold text-xl tracking-tight text-slate-900">Peluquería SaaS</span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/search" className="text-slate-600 hover:text-brand-primary font-medium transition-colors">
                                Explorar
                            </Link>
                            
                            {isAuthenticated ? (
                                <Link 
                                    to="/admin/dashboard" 
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors shadow-brand"
                                >
                                    <LayoutDashboard size={16} className="mr-2" />
                                    Ir al Panel
                                </Link>
                            ) : (
                                <>
                                    <Link to="/register" className="text-slate-600 hover:text-brand-primary font-medium transition-colors">
                                        Soy Profesional
                                    </Link>
                                    <Link 
                                        to="/login" 
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors"
                                    >
                                        <User size={16} className="mr-2" />
                                        Iniciar Sesión
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            <Link
                                to="/search"
                                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:bg-slate-50 hover:border-brand-primary hover:text-brand-primary"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Explorar
                            </Link>
                            
                            {isAuthenticated ? (
                                <Link
                                    to="/admin/dashboard"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-brand-primary font-bold hover:bg-slate-50"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Ir al Panel
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:bg-slate-50 hover:border-brand-primary hover:text-brand-primary"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Soy Profesional
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:bg-slate-50 hover:border-brand-primary hover:text-brand-primary"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Iniciar Sesión
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-bold mb-4">Peluquería SaaS</h3>
                            <p className="text-slate-400 text-sm">
                                La plataforma líder para reservar tu próximo corte de pelo.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">Enlaces</h3>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><Link to="/search" className="hover:text-white">Explorar Barberías</Link></li>
                                <li><Link to="/login" className="hover:text-white">Acceso Profesionales</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">Legal</h3>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li>Privacidad</li>
                                <li>Términos y Condiciones</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                        &copy; 2026 Peluquería SaaS. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MarketplaceLayout;
