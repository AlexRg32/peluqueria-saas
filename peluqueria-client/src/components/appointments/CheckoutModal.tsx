import React, { useState } from 'react';
import { X, CreditCard, Banknote, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Appointment } from '../../services/appointmentService';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (method: 'CASH' | 'CARD') => void;
    appointment: Appointment;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
    isOpen, onClose, onConfirm, appointment
}) => {
    const [method, setMethod] = useState<'CASH' | 'CARD'>('CASH');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConfirm = async () => {
        setIsProcessing(true);
        try {
            await onConfirm(method);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
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
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 border border-slate-100"
                    >
                        <header className="bg-slate-900 px-8 py-6 text-white relative">
                            <h2 className="text-2xl font-bold tracking-tight">Cobrar Cita</h2>
                            <p className="text-slate-400 text-sm mt-1">Selecciona el método de pago para finalizar.</p>
                            <button 
                                onClick={onClose} 
                                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </header>
                        
                        <div className="p-8 space-y-8">
                            <div className="text-center space-y-2">
                                <p className="text-slate-500 font-medium">Total a pagar</p>
                                <h3 className="text-5xl font-black text-slate-900 tracking-tighter">
                                    {appointment.price}€
                                </h3>
                                <p className="text-sm text-slate-400">
                                    {appointment.customerName} - {appointment.serviceName}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <p className="text-sm font-bold text-slate-700 ml-1">Método de Pago</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setMethod('CASH')}
                                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                                            method === 'CASH' 
                                            ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' 
                                            : 'border-slate-100 text-slate-400 hover:border-slate-200'
                                        }`}
                                    >
                                        <Banknote size={32} />
                                        <span className="font-bold">Efectivo</span>
                                    </button>
                                    <button
                                        onClick={() => setMethod('CARD')}
                                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                                            method === 'CARD' 
                                            ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' 
                                            : 'border-slate-100 text-slate-400 hover:border-slate-200'
                                        }`}
                                    >
                                        <CreditCard size={32} />
                                        <span className="font-bold">Tarjeta</span>
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirm}
                                disabled={isProcessing}
                                className="w-full py-4 bg-brand-primary hover:bg-brand-primary/90 text-slate-900 rounded-2xl font-black text-lg shadow-brand transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full"
                                    />
                                ) : (
                                    <>
                                        <CheckCircle2 size={24} />
                                        Confirmar Pago
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
