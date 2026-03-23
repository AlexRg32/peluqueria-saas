import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { appointmentService, Appointment } from '@/services/appointmentService';
import { Calendar, Clock, CheckCircle, Loader2, Scissors, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, isToday, isFuture, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const EmployeeDashboard = () => {
    const { user, logout } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.userId) {
            loadAppointments();
        } else if (user && !user.userId) {
            // Token antiguo sin userId — necesita re-login
            setLoading(false);
        }
    }, [user?.userId]);

    const loadAppointments = async () => {
        try {
            const data = await appointmentService.getByEmployee(user!.userId!);
            setAppointments(data);
        } catch (error) {
            console.error('Error loading appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const todayApps = appointments.filter(a => {
        try {
            return isToday(parseISO(a.date));
        } catch { return false; }
    });

    const upcomingApps = appointments.filter(a => {
        try {
            const d = parseISO(a.date);
            return isFuture(d) && !isToday(d);
        } catch { return false; }
    });

    const completedToday = todayApps.filter(a => a.status === 'COMPLETED').length;
    const pendingToday = todayApps.filter(a => a.status === 'PENDING').length;

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="animate-spin text-brand-primary" size={48} />
            </div>
        );
    }

    if (!user?.userId) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                        <LogOut className="text-amber-600" size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Sesión desactualizada</h2>
                    <p className="text-slate-500 max-w-sm">
                        Tu sesión necesita actualizarse para acceder a las nuevas funciones. 
                        Por favor, cierra sesión y vuelve a entrar.
                    </p>
                    <button
                        onClick={() => logout()}
                        className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-semibold shadow-brand transition-all active:scale-95"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    ¡Hola, {user?.sub?.split('@')[0]}!
                </h1>
                <p className="text-slate-500 mt-1">
                    Aquí tienes el resumen de tu día.
                </p>
            </header>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="p-3 rounded-2xl bg-brand-primary bg-opacity-10">
                            <Calendar className="text-brand-primary" size={24} />
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Citas Hoy</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-1">{todayApps.length}</h3>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="p-3 rounded-2xl bg-emerald-500 bg-opacity-10">
                            <CheckCircle className="text-emerald-500" size={24} />
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Completadas Hoy</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-1">{completedToday}</h3>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="p-3 rounded-2xl bg-amber-500 bg-opacity-10">
                            <Clock className="text-amber-500" size={24} />
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Pendientes Hoy</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-1">{pendingToday}</h3>
                    </div>
                </motion.div>
            </div>

            {/* Today's Appointments */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
            >
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Scissors size={20} className="text-brand-primary" />
                    Citas de Hoy
                </h3>

                {todayApps.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                        <Calendar className="mx-auto mb-3 opacity-30" size={48} />
                        <p className="font-medium">No tienes citas para hoy</p>
                        <p className="text-sm mt-1">¡Disfruta del descanso!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {todayApps
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                            .map(app => (
                                <div
                                    key={app.id}
                                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                                        app.status === 'COMPLETED'
                                            ? 'bg-emerald-50/50 border-emerald-100'
                                            : app.status === 'CANCELED'
                                            ? 'bg-red-50/50 border-red-100 opacity-60'
                                            : 'bg-slate-50 border-slate-100'
                                    }`}
                                >
                                    <div className="w-14 text-center">
                                        <span className="text-lg font-bold text-slate-900">
                                            {format(parseISO(app.date), 'HH:mm')}
                                        </span>
                                    </div>
                                    <div className="w-1 h-10 rounded-full bg-brand-primary" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-slate-900 truncate">{app.customerName}</p>
                                        <p className="text-sm text-slate-500 truncate">{app.serviceName} · {app.duration} min</p>
                                    </div>
                                    <div>
                                        {app.status === 'COMPLETED' ? (
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg">
                                                Completada
                                            </span>
                                        ) : app.status === 'CANCELED' ? (
                                            <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-lg">
                                                Cancelada
                                            </span>
                                        ) : (
                                            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-lg">
                                                Pendiente
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </motion.div>

            {/* Upcoming Appointments */}
            {upcomingApps.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Clock size={20} className="text-brand-primary" />
                        Próximas Citas ({upcomingApps.length})
                    </h3>
                    <div className="space-y-3">
                        {upcomingApps.slice(0, 5).map(app => (
                            <div
                                key={app.id}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                            >
                                <div className="text-center min-w-[60px]">
                                    <p className="text-xs font-bold text-slate-400 uppercase">
                                        {format(parseISO(app.date), 'EEE', { locale: es })}
                                    </p>
                                    <p className="text-lg font-bold text-slate-900">
                                        {format(parseISO(app.date), 'dd')}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {format(parseISO(app.date), 'HH:mm')}
                                    </p>
                                </div>
                                <div className="w-1 h-10 rounded-full bg-slate-200" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-slate-900 truncate">{app.customerName}</p>
                                    <p className="text-sm text-slate-500 truncate">{app.serviceName} · {app.duration} min</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default EmployeeDashboard;
