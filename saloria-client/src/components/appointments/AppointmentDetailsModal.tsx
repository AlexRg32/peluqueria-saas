import React, { useEffect, useState } from 'react';
import { X, User, Scissors, Calendar, Clock, Receipt, CheckCircle, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Appointment, AppointmentStatus, BusySlot, appointmentService, getAppointmentStatusLabel } from '../../services/appointmentService';
import { CheckoutModal } from './CheckoutModal';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import { DateTimePicker } from '../ui/DateTimePicker';
import { workingHourService, WorkingHour } from '../../services/workingHourService';

interface AppointmentDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: Appointment | null;
    onStatusUpdate: () => void;
    isAdmin?: boolean;
}

export const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
    isOpen, onClose, appointment, onStatusUpdate, isAdmin = true
}) => {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
    const [isRescheduleLoading, setIsRescheduleLoading] = useState(false);
    const [rescheduleDate, setRescheduleDate] = useState<string>('');
    const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
    const [busySlots, setBusySlots] = useState<BusySlot[]>([]);

    useEffect(() => {
        if (!appointment) {
            return;
        }
        setRescheduleDate(new Date(appointment.date).toISOString());
        setIsRescheduleOpen(false);
        setWorkingHours([]);
        setBusySlots([]);
        setErrorMessage(null);
    }, [appointment]);

    useEffect(() => {
        if (!appointment?.employeeId || !isRescheduleOpen) {
            return;
        }

        let cancelled = false;
        setIsRescheduleLoading(true);

        Promise.all([
            workingHourService.getUserHours(appointment.employeeId).catch(() => {
                if (!cancelled) {
                    setErrorMessage('No se pudo cargar la disponibilidad del profesional.');
                }
                return [] as WorkingHour[];
            }),
            appointmentService.getBusySlotsByEmployee(appointment.employeeId).catch(() => [] as BusySlot[])
        ])
            .then(([hours, slots]) => {
                if (!cancelled) {
                    setWorkingHours(hours);
                    setBusySlots(slots.filter((slot) => slot.appointmentId !== appointment.id));
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setIsRescheduleLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [appointment?.employeeId, isRescheduleOpen]);

    if (!appointment) return null;

    const handleStatusUpdate = async (status: AppointmentStatus) => {
        try {
            setIsActionLoading(true);
            setErrorMessage(null);
            await appointmentService.updateStatus(appointment.id, status);
            onStatusUpdate();
        } catch (error: any) {
            console.error('Error updating appointment status:', error);
            setErrorMessage(error?.response?.data?.message || 'No se pudo actualizar el estado de la cita.');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleReschedule = async () => {
        if (!rescheduleDate) {
            return;
        }

        try {
            setIsActionLoading(true);
            setErrorMessage(null);
            await appointmentService.reschedule(appointment.id, { date: rescheduleDate });
            setIsRescheduleOpen(false);
            onStatusUpdate();
        } catch (error: any) {
            console.error('Error rescheduling appointment:', error);
            setErrorMessage(error?.response?.data?.message || 'No se pudo reprogramar la cita.');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleCheckout = async (method: 'CASH' | 'CARD') => {
        try {
            setErrorMessage(null);
            await appointmentService.checkout(appointment.id, method);
            setIsCheckoutOpen(false);
            onStatusUpdate();
        } catch (error: any) {
            console.error('Error in checkout:', error);
            setErrorMessage(error?.response?.data?.message || 'Error al procesar el pago');
        }
    };

    const handleGeneratePDF = () => {
        if (!appointment) return;

        const doc = new jsPDF({
            unit: 'mm',
            format: [80, 160]
        });

        const dateStr = format(new Date(appointment.date), "dd/MM/yyyy HH:mm");
        const paidAtStr = appointment.paidAt ? format(new Date(appointment.paidAt), "dd/MM/yyyy HH:mm") : 'N/A';

        // Header
        doc.setFont('courier', 'bold');
        doc.setFontSize(14);
        doc.text('PELUQUERIA SaaS', 40, 15, { align: 'center' });
        
        doc.setFont('courier', 'normal');
        doc.setFontSize(10);
        doc.text('Comprobante de Pago', 40, 22, { align: 'center' });
        
        doc.line(10, 27, 70, 27);

        // Body
        doc.setFontSize(9);
        doc.text(`Cita #:   BT-${appointment.id}`, 10, 35);
        doc.text(`Fecha:     ${dateStr}`, 10, 42);
        doc.text(`Cliente:   ${appointment.customerName}`, 10, 49);
        
        doc.line(10, 54, 70, 54);
        
        doc.setFont('courier', 'bold');
        doc.text(`${appointment.serviceName}`, 10, 62);
        doc.text(`${appointment.price}E`, 70, 62, { align: 'right' });
        
        doc.line(10, 67, 70, 67);
        
        doc.setFontSize(12);
        doc.text('TOTAL', 10, 75);
        doc.text(`${appointment.price}E`, 70, 75, { align: 'right' });
        
        doc.setFontSize(9);
        doc.line(10, 80, 70, 80);
        
        doc.text(`Estado:    PAGADO`, 10, 88);
        doc.text(`Metodo:    ${appointment.paymentMethod === 'CASH' ? 'Efectivo' : 'Tarjeta'}`, 10, 95);
        doc.text(`F. Pago:   ${paidAtStr}`, 10, 102);
        
        doc.line(10, 110, 70, 110);
        
        // Footer
        doc.setFontSize(8);
        doc.text('Gracias por su visita!', 40, 118, { align: 'center' });
        doc.text('GestiPelu - Sistema de Gestion', 40, 123, { align: 'center' });

        // Open in new tab
        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    const statusTone = appointment.status === AppointmentStatus.CONFIRMED
        ? 'bg-blue-100 text-blue-700'
        : appointment.status === AppointmentStatus.COMPLETED
            ? 'bg-emerald-100 text-emerald-700'
            : appointment.status === AppointmentStatus.NO_SHOW
                ? 'bg-fuchsia-100 text-fuchsia-700'
                : appointment.status === AppointmentStatus.CANCELED
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-amber-100 text-amber-700';

    const showStatusActions = isAdmin && (
        appointment.status === AppointmentStatus.PENDING || appointment.status === AppointmentStatus.CONFIRMED
    );

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto custom-scrollbar">
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
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-visible relative z-10 border border-slate-100 my-auto"
                        >
                            <header className="bg-slate-900 px-8 py-6 text-white relative rounded-t-[24px]">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl ${appointment.paid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-brand-primary/20 text-brand-primary'}`}>
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold tracking-tight">Detalles de la Cita</h2>
                                        <p className="text-slate-400 text-xs">ID: BT-{appointment.id}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={onClose} 
                                    className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </header>
                            
                            <div className="p-8 space-y-6">
                                {errorMessage && (
                                    <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                                        {errorMessage}
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Cliente</label>
                                        <div className="flex items-center gap-2">
                                            <User size={16} className="text-slate-400" />
                                            <span className="font-bold text-slate-900">{appointment.customerName}</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Barbero/a</label>
                                        <div className="flex items-center gap-2">
                                            <Scissors size={16} className="text-slate-400" />
                                            <span className="font-bold text-slate-900">{appointment.employeeName}</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Servicio</label>
                                        <div className="flex items-center gap-2">
                                            <Receipt size={16} className="text-slate-400" />
                                            <span className="font-bold text-slate-900">{appointment.serviceName}</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Hora</label>
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-slate-400" />
                                            <span className="font-bold text-slate-900">
                                                {format(new Date(appointment.date), "HH:mm 'hs'")}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Estado de la cita</p>
                                    <div className="mt-2 flex items-center justify-between gap-3">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${statusTone}`}>
                                            {getAppointmentStatusLabel(appointment.status)}
                                        </span>
                                        {appointment.paid && (
                                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                                                Cobrada
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {isAdmin && (
                                    <div className="flex items-center justify-between p-6 bg-slate-900 text-white rounded-3xl">
                                        <div className="space-y-1">
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Estado del Pago</p>
                                            <div className="flex items-center gap-2">
                                                {appointment.paid ? (
                                                    <>
                                                        <CheckCircle size={18} className="text-emerald-400" />
                                                        <span className="text-emerald-400 font-bold uppercase text-sm">Pagada</span>
                                                        <span className="text-slate-400 text-xs">
                                                            ({appointment.paymentMethod === 'CASH' ? 'Efectivo' : 'Tarjeta'})
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Clock size={18} className="text-amber-400" />
                                                        <span className="text-amber-400 font-bold uppercase text-sm">Pendiente</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Precio</p>
                                            <p className="text-3xl font-black text-brand-primary">{appointment.price}€</p>
                                        </div>
                                    </div>
                                )}

                                {showStatusActions && (
                                    <div className="space-y-3">
                                        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">Acciones operativas</p>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <button
                                                onClick={() => {
                                                    setErrorMessage(null);
                                                    setIsRescheduleOpen((value) => !value);
                                                }}
                                                disabled={isActionLoading}
                                                className="rounded-2xl bg-brand-primary px-4 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-brand-primary/90 disabled:opacity-50"
                                            >
                                                {isRescheduleOpen ? 'Cerrar reprogramación' : 'Reprogramar cita'}
                                            </button>
                                            {appointment.status === AppointmentStatus.PENDING && (
                                                <button
                                                    onClick={() => handleStatusUpdate(AppointmentStatus.CONFIRMED)}
                                                    disabled={isActionLoading}
                                                    className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                                                >
                                                    Confirmar cita
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleStatusUpdate(AppointmentStatus.COMPLETED)}
                                                disabled={isActionLoading}
                                                className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                                            >
                                                Marcar completada
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(AppointmentStatus.NO_SHOW)}
                                                disabled={isActionLoading}
                                                className="rounded-2xl bg-fuchsia-600 px-4 py-3 text-sm font-black text-white transition-colors hover:bg-fuchsia-700 disabled:opacity-50"
                                            >
                                                Marcar no-show
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(AppointmentStatus.CANCELED)}
                                                disabled={isActionLoading}
                                                className="rounded-2xl bg-slate-700 px-4 py-3 text-sm font-black text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
                                            >
                                                Cancelar cita
                                            </button>
                                        </div>

                                        {isRescheduleOpen && (
                                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 space-y-4">
                                                <DateTimePicker
                                                    label="Nueva fecha y hora"
                                                    value={rescheduleDate}
                                                    onChange={setRescheduleDate}
                                                    workingHours={workingHours}
                                                    busySlots={busySlots}
                                                    appointmentDurationMinutes={appointment.duration}
                                                    disabled={isActionLoading || isRescheduleLoading}
                                                    placeholder={isRescheduleLoading ? 'Cargando disponibilidad...' : 'Seleccionar fecha y hora'}
                                                    required
                                                />
                                                <div className="flex items-center justify-end gap-3">
                                                    <button
                                                        onClick={() => setIsRescheduleOpen(false)}
                                                        disabled={isActionLoading}
                                                        className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-white disabled:opacity-50"
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        onClick={handleReschedule}
                                                        disabled={isActionLoading || isRescheduleLoading || !rescheduleDate}
                                                        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-black text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
                                                    >
                                                        Guardar cambio
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex flex-col gap-3">
                                    {isAdmin && appointment.status === AppointmentStatus.COMPLETED && !appointment.paid ? (
                                        <button 
                                            onClick={() => setIsCheckoutOpen(true)}
                                            className="w-full py-4 bg-brand-primary hover:bg-brand-primary/90 text-slate-900 rounded-2xl font-black text-lg shadow-brand transition-all active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle size={20} />
                                            COBRAR Y FINALIZAR
                                        </button>
                                    ) : isAdmin && appointment.paid ? (
                                        <button 
                                            onClick={handleGeneratePDF}
                                            className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                                        >
                                            <Printer size={20} />
                                            VER TICKET (PDF)
                                        </button>
                                    ) : null}
                                    <button 
                                        onClick={onClose}
                                        disabled={isActionLoading}
                                        className="w-full py-3 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors disabled:opacity-50"
                                    >
                                        Cerrar Ventana
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <CheckoutModal 
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                appointment={appointment}
                onConfirm={handleCheckout}
            />
        </>
    );
};
