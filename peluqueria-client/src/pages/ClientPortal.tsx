import React from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { motion } from 'framer-motion';
import { Calendar, Star, Scissors, Sparkles, User, MapPinned, Loader2 } from 'lucide-react';
import PortalHero from '@/features/client-portal/components/PortalHero';
import AppointmentMiniCard from '@/features/client-portal/components/AppointmentMiniCard';
import { appointmentService, Appointment } from '@/services/appointmentService';
import { useState, useEffect } from 'react';

const ClientPortal: React.FC = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    
    const userName = (user as any)?.name || user?.sub?.split('@')[0] || 'VIVE';

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await appointmentService.getMine();
            setAppointments(data);
        } catch (error) {
            console.error('Error loading client home data:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { name: 'Corte', icon: Scissors, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
        { name: 'Coloración', icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-50' },
        { name: 'Barbería', icon: User, color: 'text-blue-500', bg: 'bg-blue-50' },
        { name: 'Tratamientos', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
        { name: 'Cerca de ti', icon: MapPinned, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    ];

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="animate-spin text-brand-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            {/* Hero Section */}
            <PortalHero userName={userName} />

            {/* Quick Categories */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {categories.map((cat, i) => (
                    <motion.button
                        key={cat.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-primary/30 transition-all text-center group"
                    >
                        <div className={`w-14 h-14 ${cat.bg} rounded-2xl mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110`}>
                            <cat.icon className={cat.color} size={28} />
                        </div>
                        <span className="font-bold text-slate-800 tracking-tight">{cat.name}</span>
                    </motion.button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Side: Appointments */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <Calendar className="text-brand-primary" size={32} />
                            Mis Próximas Citas
                        </h2>
                        <button className="text-brand-primary font-black hover:underline text-sm uppercase tracking-widest">Ver todas</button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {appointments.length > 0 ? (
                            appointments.map(app => (
                                <AppointmentMiniCard 
                                    key={app.id}
                                    salonName={app.serviceName} // Generic placeholder for salon name if missing
                                    address="Ubicación registrada"
                                    date={new Date(app.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                    time={new Date(app.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                    status={app.status}
                                />
                            ))
                        ) : (
                            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] p-10 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-inner">
                                    <Calendar className="text-slate-300" size={40} />
                                </div>
                                <div className="max-w-xs">
                                    <p className="font-bold text-slate-800 text-lg">¿Necesitas un cambio de look?</p>
                                    <p className="text-sm text-slate-500 mt-1">Aún no tienes citas programadas. ¡Reserva hoy mismo!</p>
                                </div>
                                <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg">
                                    Nueva Reserva
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Discovery / Recommendations */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recomendados</h2>
                    <div className="space-y-4">
                        {[
                            { name: 'Studio V', rating: '4.9', type: 'Peluquería' },
                            { name: 'Gents Club', rating: '4.8', type: 'Barbería' },
                            { name: 'Nails & More', rating: '4.7', type: 'Estética' }
                        ].map((salon, i) => (
                            <motion.div 
                                key={salon.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-4 hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex-shrink-0" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors">{salon.name}</h4>
                                    <p className="text-xs text-slate-500 font-medium">{salon.type} • ⭐ {salon.rating}</p>
                                </div>
                            </motion.div>
                        ))}
                        <button className="w-full py-4 border-2 border-slate-100 rounded-3xl text-slate-400 font-bold hover:bg-slate-50 transition-colors">
                            Explorar más
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPortal;
