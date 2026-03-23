import { Appointment } from '@/services/appointmentService';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Scissors } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ReceiptModalProps {
    appointment: Appointment | null;
    onClose: () => void;
    enterpriseName?: string;
}

export const ReceiptModal = ({ appointment, onClose, enterpriseName }: ReceiptModalProps) => {
    if (!appointment) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                />
                
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden print:shadow-none print:rounded-none"
                >
                    {/* Header */}
                    <div className="p-8 pb-0 flex justify-between items-start print:hidden">
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                            <X size={20} />
                        </button>
                        <button 
                            onClick={handlePrint}
                            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-xl active:scale-95 transition-all"
                        >
                            <Printer size={16} />
                            Imprimir
                        </button>
                    </div>

                    {/* Receipt Content */}
                    <div className="p-10 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center shadow-brand/20 shadow-xl mb-6">
                            <Scissors className="text-slate-900" size={32} />
                        </div>
                        
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                            {enterpriseName || 'Comprobante de Pago'}
                        </h2>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-2 mb-8 border-b border-slate-100 pb-8 w-full">
                            Recibo de Servicio
                        </p>

                        <div className="w-full space-y-6 text-left">
                            <div className="flex justify-between items-end border-b border-dashed border-slate-200 pb-4">
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Cliente</p>
                                    <p className="font-bold text-slate-900">{appointment.customerName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fecha</p>
                                    <p className="text-sm font-medium text-slate-700">
                                        {format(new Date(appointment.date), "dd/MM/yyyy HH:mm")}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                                    <div>
                                        <p className="font-bold text-slate-900">{appointment.serviceName}</p>
                                        <p className="text-xs text-slate-500">Atendido por {appointment.employeeName}</p>
                                    </div>
                                    <p className="font-black text-slate-900">{appointment.price.toLocaleString()}€</p>
                                </div>
                            </div>

                            <div className="pt-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Método de Pago</span>
                                    <span className="font-bold text-slate-900">{appointment.paymentMethod || 'Efectivo'}</span>
                                </div>
                                <div className="flex justify-between text-2xl pt-2 border-t-2 border-slate-900">
                                    <span className="font-black text-slate-900">TOTAL</span>
                                    <span className="font-black text-brand-primary">{appointment.price.toLocaleString()}€</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 text-[10px] text-slate-400 uppercase font-black tracking-[0.3em]">
                            ¡Gracias por su visita!
                        </div>
                    </div>

                    {/* Footer decoration */}
                    <div className="h-4 bg-slate-900 w-full" />
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
