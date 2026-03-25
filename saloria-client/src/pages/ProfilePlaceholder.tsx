import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Mail, Scissors, ShieldCheck, User } from 'lucide-react';
import { motion } from 'framer-motion';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { appointmentService, Appointment } from '@/services/appointmentService';

const ProfilePlaceholder = () => {
    const { user, isAuthenticated } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const loadAppointments = async () => {
            if (!isAuthenticated) {
                setLoading(false);
                return;
            }

            try {
                const data = await appointmentService.getMine();
                if (mounted) {
                    setAppointments(data);
                }
            } catch {
                if (mounted) {
                    setAppointments([]);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadAppointments();
        return () => {
            mounted = false;
        };
    }, [isAuthenticated]);

    const displayName = useMemo(() => {
        const explicitName = (user as any)?.name;
        if (explicitName) {
            return explicitName;
        }
        return user?.sub?.split('@')[0] || 'Cliente';
    }, [user]);

    const upcomingAppointments = appointments.filter((appointment) => new Date(appointment.date) >= new Date()).length;

    const items = [
        { icon: Mail, label: 'Correo', value: user?.sub || 'Sin correo' },
        { icon: ShieldCheck, label: 'Rol', value: user?.role || 'CLIENTE' },
        { icon: Calendar, label: 'Próximas citas', value: loading ? 'Cargando...' : `${upcomingAppointments}` },
    ];

    return (
        <div className="max-w-4xl mx-auto py-10 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2rem] bg-slate-900 text-white p-8 sm:p-10 space-y-4 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/15 rounded-full blur-3xl" />
                <div className="relative flex items-center gap-4">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                        <User className="text-brand-primary" size={38} />
                    </div>
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-brand-primary mb-2">Mi Perfil</p>
                        <h1 className="text-3xl font-black tracking-tight">{displayName}</h1>
                        <p className="text-slate-400 text-sm mt-1">Tu cuenta cliente ya tiene acceso a reservas, historial y seguimiento básico.</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
                {items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 text-slate-700 shadow-sm"
                        >
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                                <Icon size={20} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-black uppercase tracking-wider text-slate-400">{item.label}</p>
                                <p className="font-semibold text-slate-900 truncate">{item.value}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Link to="/citas" className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="flex items-center gap-3 text-brand-primary mb-4">
                        <Calendar size={22} />
                        <span className="text-[11px] font-black uppercase tracking-[0.25em]">Historial</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">Mis citas</h2>
                    <p className="text-slate-500 mt-2">Revisa tus reservas, próximas visitas y sesiones ya completadas.</p>
                    <div className="mt-5 inline-flex items-center gap-2 font-bold text-slate-900 group-hover:text-brand-primary">
                        Ver historial
                        <ChevronRight size={18} />
                    </div>
                </Link>

                <Link to="/search" className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="flex items-center gap-3 text-brand-primary mb-4">
                        <Scissors size={22} />
                        <span className="text-[11px] font-black uppercase tracking-[0.25em]">Reservas</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">Explorar negocios</h2>
                    <p className="text-slate-500 mt-2">Busca tu próxima peluquería o barbería y reserva desde el perfil público.</p>
                    <div className="mt-5 inline-flex items-center gap-2 font-bold text-slate-900 group-hover:text-brand-primary">
                        Buscar ahora
                        <ChevronRight size={18} />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ProfilePlaceholder;
