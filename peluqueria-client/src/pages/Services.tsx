import { useEffect, useState } from 'react';
import { serviceOfferingService, ServiceOffering } from '../services/serviceOfferingService';
import { ServiceCard } from '../components/services/ServiceCard';
import { CreateServiceModal } from '../components/services/CreateServiceModal';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Plus } from 'lucide-react';

const ServicesPage = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
    const enterpriseId = user?.enterpriseId;

    const [services, setServices] = useState<ServiceOffering[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchServices = async () => {
        if (!enterpriseId) return;
        try {
            setLoading(true);
            const data = await serviceOfferingService.getAllByEnterprise(enterpriseId);
            setServices(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Error al cargar servicios. Inténtelo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (enterpriseId) {
            fetchServices();
        } else if (user && !enterpriseId) {
             setLoading(false);
             // Maybe user needs to relogin to get the new claim
        }
    }, [enterpriseId, user]);

    const handleCreate = async (service: ServiceOffering, imageFile?: File) => {
        try {
            await serviceOfferingService.create(service, imageFile);
            await fetchServices(); // Refresh list
        } catch (err: any) {
            console.error(err);
            const message = err.response?.data?.message || "Error al crear el servicio";
            alert(message);
            throw err;
        }
    };

    const handleDelete = async (id: number) => {
        if (!enterpriseId) return;
        if (!window.confirm('¿Seguro que deseas eliminar este servicio?')) return;
        
        try {
            await serviceOfferingService.delete(enterpriseId, id);
            setServices(services.filter(s => s.id !== id));
        } catch (err: any) {
             console.error(err);
             const message = err.response?.data?.message || "Error al eliminar el servicio";
             alert(message);
        }
    };

    if (!user) return null; 

    return (
        <section className="max-w-7xl mx-auto space-y-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                     <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Catálogo de Servicios</h1>
                     <p className="text-slate-500 mt-1">Define los servicios que ofrecen las peluquerías.</p>
                </div>
                {isAdmin && (
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-[#c5a059] hover:bg-[#b38f4a] text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-[#c5a059]/30 transition-all active:scale-95"
                    >
                        <Plus size={18} />
                        Nuevo Servicio
                    </button>
                )}
            </header>

            {error && (
                <div className="p-4 bg-red-50 text-red-700 border border-red-100 rounded-lg">
                    {error}
                </div>
            )}

            {!enterpriseId && !loading && (
                 <div className="p-4 bg-yellow-50 text-yellow-800 border border-yellow-100 rounded-lg">
                    No se ha detectado una empresa asociada. Por favor, cierra sesión y vuelve a entrar.
                </div>
            )}

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-80 bg-slate-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : services.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                    <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                         <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No hay servicios registrados</h3>
                    <p className="text-slate-500 mt-1 max-w-sm mx-auto">
                        Comienza agregando tu primer servicio para que tus clientes puedan reservar.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map(service => (
                        <ServiceCard 
                            key={service.id} 
                            service={service} 
                            isAdmin={isAdmin}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

             {enterpriseId && (
                <CreateServiceModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreate}
                    enterpriseId={enterpriseId}
                />
            )}
        </section>
    );
};

export default ServicesPage;
