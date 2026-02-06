import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star } from 'lucide-react';
import { getFeaturedEnterprises } from '../../services/MarketplaceService';
import { EnterpriseSummary } from '../../types/Marketplace';

const HomePage = () => {
    const [featured, setFeatured] = useState<EnterpriseSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEnterprises = async () => {
            try {
                const data = await getFeaturedEnterprises();
                setFeatured(data);
            } catch (error) {
                console.error("Failed to load featured enterprises", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEnterprises();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <div className="relative bg-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&auto=format&fit=crop&q=80"
                        alt="Barbershop background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl mb-6">
                            <span className="block">Encuentra y reserva</span>
                            <span className="block text-brand-primary">tu próximo estilo</span>
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300 mb-10">
                            Descubre las mejores barberías y peluquerías cerca de ti. Reserva cita en segundos, sin llamadas.
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white rounded-xl shadow-xl p-2 flex flex-col md:flex-row gap-2">
                                <div className="flex-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-3 border-transparent rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent sm:text-sm"
                                        placeholder="¿Qué servicio buscas? (Corte, Barba...)"
                                    />
                                </div>
                                <div className="flex-1 relative border-t md:border-t-0 md:border-l border-slate-200">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-3 border-transparent rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent sm:text-sm"
                                        placeholder="Ciudad o CP"
                                    />
                                </div>
                                <button className="bg-brand-primary text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-brand-secondary transition-colors shadow-lg">
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Barberías Destacadas</h2>
                
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-80 animate-pulse">
                                <div className="h-48 bg-slate-200"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featured.map((enterprise) => (
                            <Link 
                                key={enterprise.id}
                                to={`/b/${enterprise.slug}`}
                                className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                    <img 
                                        src={enterprise.thumbnail} 
                                        alt={enterprise.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
                                    />
                                    <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                        <span className="text-xs font-bold text-slate-900">{enterprise.rating}</span>
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-brand-primary transition-colors">
                                            {enterprise.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center text-slate-500 text-sm mb-4">
                                        <MapPin size={14} className="mr-1" />
                                        {enterprise.city}
                                    </div>
                                    <div className="mt-auto">
                                        <button className="w-full py-2 bg-slate-50 text-slate-600 font-medium rounded-lg text-sm group-hover:bg-brand-primary/10 group-hover:text-brand-primary-dark transition-colors">
                                            Ver Disponibilidad
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            
             {/* CTA PRO */}
             <div className="bg-slate-900 py-16">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                     <h2 className="text-3xl font-extrabold text-white mb-4">¿Tienes una barbería?</h2>
                     <p className="text-slate-400 max-w-xl mx-auto mb-8">
                         Únete a la plataforma y gestiona tus citas, clientes y facturación desde un solo lugar.
                         Pruébalo gratis hoy.
                     </p>
                     <Link 
                         to="/register" 
                         className="inline-block bg-brand-primary text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-brand-secondary transition-colors"
                     >
                         Registrar mi Negocio
                     </Link>
                 </div>
             </div>
        </div>
    );
};

export default HomePage;
