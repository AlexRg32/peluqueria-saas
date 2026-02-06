import { useEffect, useState } from 'react';
import { getFeaturedEnterprises } from '../../services/MarketplaceService';
import { EnterpriseSummary } from '../../types/Marketplace';
import Hero from '../../components/marketplace/Hero';
import SectionHeading from '../../components/marketplace/SectionHeading';
import HowItWorks from '../../components/marketplace/HowItWorks';
import EnterpriseCard from '../../components/marketplace/EnterpriseCard';
import Features from '../../components/marketplace/Features';
import ProfessionalCTA from '../../components/marketplace/ProfessionalCTA';

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
        <div className="bg-white">
            <Hero />
            
            {/* How It Works Section */}
            <section className="py-24 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeading 
                        title="Reserva en 3 simples pasos" 
                        subtitle="Nunca fue tan fácil encontrar y reservar tu cita en las mejores barberías."
                        centered
                    />
                    <HowItWorks />
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                                Barberías <span className="text-brand-primary">Destacadas</span>
                            </h2>
                            <p className="text-lg text-slate-500">
                                Los establecimientos mejor valorados por la comunidad de Peluquería SaaS. Calidad garantizada en cada corte.
                            </p>
                        </div>
                        <button className="text-brand-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                            Ver todas las barberías <span>→</span>
                        </button>
                    </div>
                    
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-slate-50 rounded-2xl h-80 animate-pulse border border-slate-100" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {featured.map((enterprise, index) => (
                                <EnterpriseCard 
                                    key={enterprise.id}
                                    enterprise={enterprise}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-slate-900/5 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeading 
                        title="¿Por qué Peluquería SaaS?" 
                        subtitle="Ofrecemos la mejor tecnología para que tu única preocupación sea elegir qué estilo llevar hoy."
                        centered
                    />
                    <Features />
                </div>
            </section>
            
            <ProfessionalCTA />
        </div>
    );
};

export default HomePage;
