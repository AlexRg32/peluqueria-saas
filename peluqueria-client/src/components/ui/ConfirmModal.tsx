import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
}

export const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    variant = 'danger',
    isLoading = false
}: ConfirmModalProps) => {
    if (!isOpen) return null;

    const variants = {
        danger: {
            icon: <AlertTriangle className="text-red-500" size={24} />,
            bgIcon: 'bg-red-50',
            button: 'bg-red-600 hover:bg-red-700 text-white shadow-red-200',
        },
        warning: {
            icon: <AlertTriangle className="text-amber-500" size={24} />,
            bgIcon: 'bg-amber-50',
            button: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200',
        },
        info: {
            icon: <AlertTriangle className="text-blue-500" size={24} />,
            bgIcon: 'bg-blue-50',
            button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200',
        }
    };

    const currentVariant = variants[variant] || variants.danger;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                {/* Overlay */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
                >
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className={cn("p-3 rounded-2xl", currentVariant.bgIcon)}>
                                {currentVariant.icon}
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-2 mb-8">
                            <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                {title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed">
                                {message}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-1 px-6 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className={cn(
                                    "flex-1 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50",
                                    currentVariant.button
                                )}
                            >
                                {isLoading ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                ) : (
                                    confirmText
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
