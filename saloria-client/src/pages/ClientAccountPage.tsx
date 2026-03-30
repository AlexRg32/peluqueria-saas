import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ChevronRight,
  Clock3,
  Loader2,
  LogOut,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { Appointment, AppointmentStatus, appointmentService, getAppointmentStatusLabel } from '@/services/appointmentService';

const formatAppointmentDate = (value: string) =>
  new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date(value));

const ClientAccountPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
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

  const sortedAppointments = useMemo(
    () => [...appointments].sort((left, right) => new Date(left.date).getTime() - new Date(right.date).getTime()),
    [appointments]
  );

  const upcomingAppointments = useMemo(
    () =>
      sortedAppointments.filter((appointment) => {
        const isFuture = new Date(appointment.date).getTime() >= Date.now();
        return isFuture && appointment.status !== AppointmentStatus.CANCELED && appointment.status !== AppointmentStatus.NO_SHOW;
      }),
    [sortedAppointments]
  );

  const recentAppointments = useMemo(
    () => [...sortedAppointments].reverse().slice(0, 3),
    [sortedAppointments]
  );

  const completedVisits = useMemo(
    () =>
      appointments.filter((appointment) => {
        if (appointment.status === AppointmentStatus.COMPLETED) {
          return true;
        }

        const alreadyHappened = new Date(appointment.date).getTime() < Date.now();
        return alreadyHappened && appointment.status !== AppointmentStatus.CANCELED && appointment.status !== AppointmentStatus.NO_SHOW;
      }).length,
    [appointments]
  );

  const displayName = user?.name || user?.sub?.split('@')[0] || 'Cliente';
  const nextAppointment = upcomingAppointments[0] || null;
  const nextAppointmentStatusLabel = nextAppointment ? getAppointmentStatusLabel(nextAppointment.status) : null;

  const stats = [
    { icon: Mail, label: 'Correo', value: user?.sub || 'Sin correo' },
    { icon: ShieldCheck, label: 'Tipo de cuenta', value: user?.role || 'CLIENTE' },
    { icon: Calendar, label: 'Próximas citas', value: loading ? 'Cargando...' : `${upcomingAppointments.length}` },
    { icon: Sparkles, label: 'Visitas completadas', value: loading ? 'Cargando...' : `${completedVisits}` },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 sm:p-10 text-white"
      >
        <div className="absolute inset-y-0 right-0 w-56 bg-brand-primary/15 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
              <User className="text-brand-primary" size={38} />
            </div>
            <div>
              <p className="mb-2 text-[11px] font-black uppercase tracking-[0.25em] text-brand-primary">Mi Cuenta</p>
              <h1 className="text-3xl font-black tracking-tight">{displayName}</h1>
              <p className="mt-1 text-sm text-slate-400">
                Gestiona tu cuenta, revisa tu actividad y vuelve a reservar sin perder contexto.
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-brand-primary">
                <Icon size={20} />
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
              <p className="mt-2 truncate text-lg font-bold text-slate-900">{item.value}</p>
            </motion.div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">Próxima cita</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">Tu siguiente visita</h2>
            </div>
            <Clock3 className="text-brand-primary" size={22} />
          </div>

          {loading ? (
            <div className="flex min-h-40 items-center justify-center text-slate-400">
              <Loader2 className="animate-spin" size={28} />
            </div>
          ) : nextAppointment ? (
            <div className="mt-6 space-y-5">
              <div className="rounded-3xl bg-slate-900 p-6 text-white">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary">
                  {nextAppointmentStatusLabel}
                </p>
                <h3 className="mt-3 text-2xl font-black">{nextAppointment.serviceName}</h3>
                <p className="mt-2 text-sm text-slate-300">{formatAppointmentDate(nextAppointment.date)}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/5 px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Profesional</p>
                    <p className="mt-1 font-bold">{nextAppointment.employeeName}</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Negocio</p>
                    <p className="mt-1 font-bold">{nextAppointment.enterpriseName || 'Saloria'}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/citas"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-brand-primary/90"
                >
                  Ver historial completo
                  <ChevronRight size={16} />
                </Link>
                <Link
                  to="/search"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Buscar otro negocio
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-black text-slate-900">Todavía no tienes una próxima cita</h3>
              <p className="mt-2 text-sm text-slate-500">
                Explora negocios disponibles y reserva tu siguiente servicio desde el marketplace.
              </p>
              <Link
                to="/search"
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
              >
                Buscar negocio
                <ChevronRight size={16} />
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">Actividad</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">Últimos movimientos</h2>

            <div className="mt-5 space-y-3">
              {loading ? (
                <div className="flex min-h-24 items-center justify-center text-slate-400">
                  <Loader2 className="animate-spin" size={24} />
                </div>
              ) : recentAppointments.length > 0 ? (
                recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="font-bold text-slate-900">{appointment.serviceName}</p>
                    <p className="mt-1 text-sm text-slate-500">{formatAppointmentDate(appointment.date)}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      {appointment.enterpriseName || 'Saloria'} · {getAppointmentStatusLabel(appointment.status)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
                  Aún no hay actividad registrada en tu cuenta.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">Acciones rápidas</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">Sigue desde aquí</h2>

            <div className="mt-5 space-y-3">
              <Link
                to="/citas"
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Ver mis citas
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/search"
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Buscar negocio
                <ChevronRight size={18} />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default ClientAccountPage;
