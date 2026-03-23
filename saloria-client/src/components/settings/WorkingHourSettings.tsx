import { useState, useEffect } from 'react';
import { workingHourService, WorkingHour } from '../../services/workingHourService';
import { Clock, Loader2, Save, AlertCircle, Copy, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkingHourSettingsProps {
    enterpriseId: number;
    userId?: number | null;
}

const dayNames: Record<string, string> = {
    'LUNES': 'Lunes',
    'MARTES': 'Martes',
    'MIERCOLES': 'Miércoles',
    'JUEVES': 'Jueves',
    'VIERNES': 'Viernes',
    'SABADO': 'Sábado',
    'DOMINGO': 'Domingo'
};

export const WorkingHourSettings = ({ enterpriseId, userId }: WorkingHourSettingsProps) => {
    const [hours, setHours] = useState<WorkingHour[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        loadHours();
    }, [enterpriseId, userId]);

    const loadHours = async () => {
        try {
            setLoading(true);
            const data = userId 
                ? await workingHourService.getUserHours(userId)
                : await workingHourService.getEnterpriseHours(enterpriseId);
            
            // Sort to ensure Monday-Sunday order
            const order = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];
            const sorted = data.sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day));
            setHours(sorted);
        } catch (error) {
            console.error('Error loading hours:', error);
            setMessage({ type: 'error', text: 'No se pudieron cargar los horarios.' });
        } finally {
            setLoading(false);
        }
    };

    const handleToggleDayOff = (index: number) => {
        const newHours = [...hours];
        newHours[index].dayOff = !newHours[index].dayOff;
        setHours(newHours);
    };

    const handleChangeTime = (index: number, field: 'startTime' | 'endTime', value: string) => {
        const newHours = [...hours];
        newHours[index][field] = value;
        setHours(newHours);
    };

    const handleCopyToAll = (index: number) => {
        const source = hours[index];
        const newHours = hours.map(h => ({
            ...h,
            startTime: source.startTime,
            endTime: source.endTime,
            dayOff: source.dayOff
        }));
        setHours(newHours);
        setMessage({ type: 'success', text: 'Copiado a todos los días' });
        setTimeout(() => setMessage(null), 2000);
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await workingHourService.saveBatch(hours);
            setMessage({ type: 'success', text: 'Horarios guardados correctamente' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error('Error saving hours:', error);
            setMessage({ type: 'error', text: 'Error al guardar los horarios' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="animate-spin text-brand-primary" size={40} />
                <p className="text-slate-500 font-medium">Cargando configuración de horarios...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`p-4 rounded-xl flex items-center gap-3 ${
                            message.type === 'success' 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                : 'bg-red-50 text-red-700 border border-red-100'
                        }`}
                    >
                        {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        <span className="text-sm font-semibold">{message.text}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                <div className="grid grid-cols-1 divide-y divide-slate-100">
                    {hours.map((item, index) => (
                        <div key={item.day} className={`p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${item.dayOff ? 'bg-slate-100/50' : 'bg-white'}`}>
                            <div className="flex items-center gap-4 w-full md:w-40">
                                <div className={`w-12 h-10 rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-tighter ${item.dayOff ? 'bg-slate-200 text-slate-400' : 'bg-brand-primary/10 text-brand-primary'}`}>
                                    {item.day.substring(0, 3)}
                                </div>
                                <span className={`font-bold ${item.dayOff ? 'text-slate-400' : 'text-slate-700'}`}>
                                    {dayNames[item.day]}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 flex-1 justify-center">
                                <input 
                                    type="time" 
                                    value={item.startTime}
                                    disabled={item.dayOff}
                                    onChange={(e) => handleChangeTime(index, 'startTime', e.target.value)}
                                    className="px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary disabled:opacity-30 transition-all font-medium text-slate-700"
                                />
                                <span className="text-slate-300 font-medium">—</span>
                                <input 
                                    type="time" 
                                    value={item.endTime}
                                    disabled={item.dayOff}
                                    onChange={(e) => handleChangeTime(index, 'endTime', e.target.value)}
                                    className="px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary disabled:opacity-30 transition-all font-medium text-slate-700"
                                />
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => handleToggleDayOff(index)}
                                    className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                                        item.dayOff 
                                            ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                    }`}
                                >
                                    {item.dayOff ? 'Cerrado' : 'Abierto'}
                                </button>
                                
                                <button
                                    onClick={() => handleCopyToAll(index)}
                                    title="Copiar a todos los días"
                                    className="p-2 text-slate-400 hover:text-brand-primary hover:bg-slate-100 rounded-lg transition-all"
                                >
                                    <Copy size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {saving ? 'Guardando...' : 'Guardar Horarios'}
                </button>
            </div>
        </div>
    );
};
