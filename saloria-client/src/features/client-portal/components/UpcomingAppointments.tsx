import { Calendar, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Appointment } from '@/services/appointmentService';
import AppointmentCard from './AppointmentCard';

interface UpcomingAppointmentsProps {
    appointments: Appointment[];
    loading: boolean;
    isAuthenticated: boolean;
}

const UpcomingAppointments = ({ appointments, loading, isAuthenticated }: UpcomingAppointmentsProps) => {
    if (!isAuthenticated) {
        return (
            <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="relative z-10 flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="text-brand-primary" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base sm:text-lg mb-1">Gestiona tus citas</h3>
                        <p className="text-slate-400 text-sm">Inicia sesión para ver y gestionar tus reservas.</p>
                    </div>
                    <Link
                        to="/auth/login"
                        className="bg-brand-primary text-slate-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-secondary transition-all flex-shrink-0 flex items-center gap-2"
                    >
                        <LogIn size={16} />
                        Acceder
                    </Link>
                </div>
            </section>
        );
    }

    if (loading) {
        return (
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Tus Próximas Citas</h2>
                </div>
                <div className="flex gap-4 overflow-hidden">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex-shrink-0 w-[280px] h-[120px] bg-slate-100 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </section>
        );
    }

    if (appointments.length === 0) {
        return (
            <section className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 sm:p-8 flex items-center gap-4 sm:gap-6">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-inner flex-shrink-0">
                    <Calendar className="text-slate-300" size={28} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm sm:text-base">¿Necesitas un cambio de look?</p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">No tienes citas programadas. ¡Reserva ahora!</p>
                </div>
                <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex-shrink-0">
                    Reservar
                </button>
            </section>
        );
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Calendar size={20} className="text-brand-primary" />
                    Tus Próximas Citas
                </h2>
                <Link to="/citas" className="text-brand-primary font-bold text-xs uppercase tracking-wider hover:underline">
                    Ver todas
                </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                {appointments.slice(0, 5).map(app => (
                    <AppointmentCard
                        key={app.id}
                        serviceName={app.serviceName}
                        salonName={app.enterpriseName || app.employeeName}
                        date={new Date(app.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                        time={new Date(app.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        status={app.status}
                    />
                ))}
            </div>
        </section>
    );
};

export default UpcomingAppointments;
