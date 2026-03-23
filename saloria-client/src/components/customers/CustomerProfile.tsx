import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Save, 
  History, 
  FileText, 
  Settings, 
  Calendar,
  Clock,
  Loader2,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { CustomerDetail, customerService, UpdateCustomerRequest } from '../../services/customerService';
import { AppointmentTimeline } from './AppointmentTimeline';

interface CustomerProfileProps {
  customerId: number;
}

type TabType = 'history' | 'notes' | 'info';

export const CustomerProfile = ({ customerId }: CustomerProfileProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('history');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [detail, setDetail] = useState<CustomerDetail | null>(null);
  const [form, setForm] = useState<UpdateCustomerRequest>({
    name: '',
    phone: '',
    email: '',
    internalNotes: ''
  });

  useEffect(() => {
    fetchDetails();
  }, [customerId]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const data = await customerService.getCustomerDetails(customerId);
      setDetail(data);
      setForm({
        name: data.name,
        phone: data.phone,
        email: data.email || '',
        internalNotes: data.internalNotes || ''
      });
    } catch (error) {
      console.error(error);
      alert('Error al cargar la lista de clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      await customerService.updateCustomer(customerId, form);
      alert('Cliente actualizado correctamente');
      fetchDetails(); 
    } catch (error) {
      console.error(error);
      alert('Error al actualizar cliente');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (!detail) return null;

  const initials = detail.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  const pendingCount = detail.appointments.filter(a => a.status === 'PENDING').length;

  return (
    <div className="h-full flex flex-col bg-slate-50/50">
      {/* Header Profile */}
      <div className="bg-white p-6 border-b border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-brand-primary text-white flex items-center justify-center text-2xl font-bold shadow-brand">
            {initials}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{detail.name}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <a 
                href={`https://wa.me/${detail.phone.replace(/\s/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors"
              >
                <MessageSquare size={16} /> WhatsApp
              </a>
              <a 
                href={`tel:${detail.phone}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                <Phone size={16} /> Llamar
              </a>
              {detail.email && (
                <a 
                  href={`mailto:${detail.email}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-sm font-medium hover:bg-purple-100 transition-colors"
                >
                  <Mail size={16} /> Email
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-center">
            <TrendingUp size={20} className="mx-auto text-brand-primary mb-2" />
            <p className="text-2xl font-bold text-slate-800">{detail.visitsCount}</p>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Visitas Totales</p>
          </div>
          <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-center">
            <Clock size={20} className="mx-auto text-amber-500 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{pendingCount}</p>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Citas Pendientes</p>
          </div>
          <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-center">
            <CheckCircle2 size={20} className="mx-auto text-green-500 mb-2" />
            <p className="text-lg font-bold text-slate-800 truncate px-2">
              {detail.appointments.length > 0 ? detail.appointments[0].serviceName : 'Ninguno'}
            </p>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Último Servicio</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="px-6 pt-4">
        <div className="flex gap-1 p-1 bg-white border border-slate-200 rounded-xl w-fit">
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'history' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <History size={16} /> Historial
          </button>
          <button 
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'notes' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText size={16} /> Notas
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'info' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Settings size={16} /> Información
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'history' && (
          <div className="max-w-3xl mx-auto">
            <AppointmentTimeline appointments={detail.appointments} />
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText className="text-brand-primary" size={20} />
                Notas del Cliente
              </h3>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">Personal Autorizado</span>
            </div>
            <textarea
              value={form.internalNotes}
              onChange={(e) => setForm({ ...form, internalNotes: e.target.value })}
              placeholder="Escribe preferencias del cliente, fórmulas de color, alergias..."
              className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all resize-none text-slate-700"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary text-white font-bold rounded-xl shadow-brand hover:brightness-110 disabled:opacity-50 transition-all"
              >
                {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Guardar Notas
              </button>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Settings className="text-brand-primary" size={20} />
              Editar Información Básica
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Nombre Completo</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Teléfono</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleUpdate}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary text-white font-bold rounded-xl shadow-brand hover:brightness-110 disabled:opacity-50 transition-all"
                >
                  {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  Actualizar Datos
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
