import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateAppointmentRequest } from '../../services/appointmentService';
import { enterpriseService } from '../../services/enterpriseService';
import { userService, User } from '../../services/userService';
import { serviceOfferingService } from '../../services/serviceOfferingService';
import { X, User as UserIcon, Scissors, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreateAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateAppointmentRequest) => void;
    enterpriseId: number;
    initialDate?: Date;
}

export const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({
    isOpen, onClose, onSubmit, enterpriseId, initialDate
}) => {
    const { register, handleSubmit, setValue } = useForm<CreateAppointmentRequest>();
    const [isGuest, setIsGuest] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [customers, setCustomers] = useState<User[]>([]);
    const [services, setServices] = useState<any[]>([]);

    useEffect(() => {
        if (isOpen) {
            Promise.all([
                enterpriseService.getEmployees(enterpriseId),
                userService.getUsersByEnterprise(enterpriseId),
                serviceOfferingService.getAllByEnterprise(enterpriseId)
            ]).then(([emp, cust, serv]) => {
                setEmployees(emp);
                setCustomers(cust);
                setServices(serv);
            });

            if (initialDate) {
                const tzOffset = initialDate.getTimezoneOffset() * 60000;
                const localISOTime = (new Date(initialDate.getTime() - tzOffset)).toISOString().slice(0, 16);
                setValue('date', localISOTime);
            }
        }
    }, [isOpen, enterpriseId, initialDate, setValue]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 border border-slate-100"
                    >
                        <header className="bg-slate-900 px-8 py-6 text-white relative">
                            <h2 className="text-2xl font-bold tracking-tight">Nueva Cita</h2>
                            <p className="text-slate-400 text-sm mt-1">Completa los datos para agendar el servicio.</p>
                            <button 
                                onClick={onClose} 
                                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </header>
                        
                        <form onSubmit={handleSubmit((data) => {
                            const submitData: CreateAppointmentRequest = {
                                ...data,
                                enterpriseId,
                                userId: isGuest ? null : (data.userId ? Number(data.userId) : null),
                                employeeId: Number(data.employeeId),
                                serviceId: Number(data.serviceId),
                                customerName: isGuest ? data.customerName : undefined,
                                customerPhone: isGuest ? data.customerPhone : undefined
                            };
                            onSubmit(submitData);
                        })} className="p-8 space-y-6">
                            
                            {/* Toggle Client Type */}
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                <button
                                    type="button"
                                    onClick={() => setIsGuest(false)}
                                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${!isGuest ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Usuario Registrado
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsGuest(true)}
                                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${isGuest ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Walk-in / Invitado
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {!isGuest ? (
                                    <div className="space-y-2 col-span-1 md:col-span-2">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Cliente Registrado</label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <select 
                                                {...register('userId', { required: !isGuest })} 
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all appearance-none bg-white"
                                            >
                                                <option value="">Seleccionar Cliente</option>
                                                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Nombre Cliente</label>
                                            <div className="relative">
                                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input 
                                                    type="text"
                                                    placeholder="Nombre Completo"
                                                    {...register('customerName', { required: isGuest })} 
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Teléfono</label>
                                            <div className="relative">
                                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input 
                                                    type="tel"
                                                    placeholder="Teléfono (ej: 600000000)"
                                                    {...register('customerPhone', { required: isGuest })} 
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="space-y-2 col-span-1 md:col-span-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Empleado</label>
                                    <div className="relative">
                                        <Scissors className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <select 
                                            {...register('employeeId', { required: true })} 
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all appearance-none bg-white"
                                        >
                                            <option value="">Seleccionar empleado</option>
                                            {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2 col-span-1 md:col-span-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Servicio</label>
                                    <div className="relative">
                                        <Scissors className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <select 
                                            {...register('serviceId', { required: true })} 
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all appearance-none bg-white"
                                        >
                                            <option value="">Seleccionar un servicio</option>
                                            {services.map(s => <option key={s.id} value={s.id}>{s.name} — {s.price}€ ({s.duration} min)</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2 col-span-1 md:col-span-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Fecha y Hora</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input 
                                            type="datetime-local" 
                                            {...register('date', { required: true })} 
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex items-center justify-end gap-4 border-t border-slate-100">
                                <button 
                                    type="button" 
                                    onClick={onClose} 
                                    className="px-6 py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-8 py-3 bg-brand-primary hover:bg-brand-primary/90 text-slate-900 rounded-xl font-bold shadow-brand transition-all active:scale-95"
                                >
                                    Confirmar Cita
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
