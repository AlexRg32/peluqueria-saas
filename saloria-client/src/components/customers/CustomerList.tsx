import { useState } from 'react';
import { Search, User } from 'lucide-react';
import { Customer } from '../../services/customerService';

interface CustomerListProps {
  customers: Customer[];
  selectedId?: number;
  onSelect: (customer: Customer) => void;
}

export const CustomerList = ({ customers, selectedId, onSelect }: CustomerListProps) => {
  const [search, setSearch] = useState('');

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm text-slate-700"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredCustomers.map((customer) => (
          <button
            key={customer.id}
            onClick={() => onSelect(customer)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
              selectedId === customer.id
                ? 'bg-brand-primary text-white shadow-brand'
                : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              selectedId === customer.id ? 'bg-white/20' : 'bg-slate-100 text-slate-500'
            }`}>
              {customer.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{customer.name}</p>
              <p className={`text-xs truncate ${selectedId === customer.id ? 'text-white/70' : 'text-slate-500'}`}>
                {customer.phone}
              </p>
            </div>
          </button>
        ))}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-8">
            <User className="mx-auto text-slate-200 mb-2" size={32} />
            <p className="text-sm text-slate-500 px-4">
              No se encontraron clientes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
