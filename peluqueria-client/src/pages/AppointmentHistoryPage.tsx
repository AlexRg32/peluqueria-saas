import { useState, useEffect } from 'react';
import { appointmentService, Appointment } from '@/services/appointmentService';
import { Loader2, Calendar, Clock, MapPin, ChevronRight, History } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const AppointmentHistoryPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.getMine();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();
  const upcoming = appointments.filter(a => new Date(a.date) >= now && a.status !== 'CANCELED');
  const past = appointments.filter(a => new Date(a.date) < now || a.status === 'CANCELED' || a.status === 'COMPLETED');

  const filteredAppointments = activeTab === 'upcoming' ? upcoming : past;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 role="progressbar" aria-label="Cargando" className="w-12 h-12 text-brand-primary animate-spin" />
        <p className="text-gray-500 font-medium">Cargando tus citas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Citas</h1>
          <p className="text-gray-600">Gestiona y revisa tus reservas actuales y pasadas</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'upcoming'
              ? 'bg-white text-brand-primary shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Calendar size={18} />
          <span>Próximas</span>
          {upcoming.length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded-full text-xs">
              {upcoming.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'past'
              ? 'bg-white text-brand-primary shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <History size={18} />
          <span>Historial</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-100">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-gray-300" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No tienes citas {activeTab === 'upcoming' ? 'próximas' : 'en el historial'}</h3>
            <p className="text-gray-500 mt-1 max-w-xs mx-auto">
              {activeTab === 'upcoming' 
                ? '¡Es un buen momento para reservar un nuevo servicio!'
                : 'Tus citas completadas o canceladas aparecerán aquí.'}
            </p>
            {activeTab === 'upcoming' && (
              <Link
                to="/"
                className="mt-6 inline-flex items-center text-brand-primary font-semibold hover:underline"
              >
                Buscar barberías <ChevronRight size={16} />
              </Link>
            )}
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="group bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="flex gap-4 sm:gap-6">
                <div className="hidden sm:flex flex-col items-center justify-center bg-brand-primary/5 rounded-2xl w-20 h-20 text-brand-primary">
                  <span className="text-xs font-bold uppercase">{format(new Date(appointment.date), 'MMM', { locale: es })}</span>
                  <span className="text-2xl font-black">{format(new Date(appointment.date), 'dd')}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      appointment.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                      appointment.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {appointment.status === 'PENDING' ? 'Pendiente' :
                       appointment.status === 'COMPLETED' ? 'Completado' : 'Cancelado'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                    {appointment.serviceName}
                  </h3>
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center text-gray-500 text-sm gap-2">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="font-medium">{appointment.enterpriseName}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <span>{format(new Date(appointment.date), "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es })}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-8">
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-medium">Precio</p>
                  <p className="text-2xl font-black text-gray-900">{appointment.price.toFixed(2)}€</p>
                </div>
                {appointment.enterpriseSlug && (
                  <Link
                    to={`/b/${appointment.enterpriseSlug}`}
                    className="flex items-center text-sm font-bold text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10 px-4 py-2 rounded-lg transition-colors"
                  >
                    Ver negocio <ChevronRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentHistoryPage;
