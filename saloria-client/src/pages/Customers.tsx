import { useState, useEffect } from 'react';
import { Users, Info, Loader2 } from 'lucide-react';
import { CustomerList } from '../components/customers/CustomerList';
import { CustomerProfile } from '../components/customers/CustomerProfile';
import { customerService, Customer } from '../services/customerService';
import { useAuth } from '../features/auth/hooks/useAuth';

const CustomersPage = () => {
  const { user } = useAuth();
  
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.enterpriseId) {
      fetchCustomers();
    }
  }, [user]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getCustomersByEnterprise(user!.enterpriseId!);
      setCustomers(data);
      if (data.length > 0 && !selectedCustomer) {
        setSelectedCustomer(data[0]);
      }
    } catch (error) {
      console.error(error);
      alert('Error al cargar la lista de clientes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider mb-1">
            <Users size={16} />
            Administración
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Directorio de Clientes</h1>
          <p className="text-slate-500">Historial de citas, notas y datos de contacto de tus clientes.</p>
        </div>
      </header>

      <div className="flex-1 min-h-0 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row">
        {/* Sidebar/Master List */}
        <div className="w-full md:w-80 border-r border-slate-200 flex-shrink-0">
          <CustomerList 
            customers={customers} 
            selectedId={selectedCustomer?.id}
            onSelect={setSelectedCustomer}
          />
        </div>

        {/* Content/Detail View */}
        <div className="flex-1 bg-slate-50/30 overflow-hidden">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p>Cargando información...</p>
            </div>
          ) : selectedCustomer ? (
            <CustomerProfile customerId={selectedCustomer.id} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <Users className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Selecciona un cliente</h3>
              <p className="max-w-xs mx-auto text-sm">
                Elige un cliente de la lista para ver su historial de citas, notas internas y actualizar sus datos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
