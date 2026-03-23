import { Appointment } from '@/services/appointmentService';
import { CreditCard, Banknote, Eye, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface TransactionTableProps {
    transactions: Appointment[];
    onViewReceipt: (appointment: Appointment) => void;
}

export const TransactionTable = ({ transactions, onViewReceipt }: TransactionTableProps) => {
    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Fecha</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Cliente</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Servicio</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Importe</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Estado/Met.</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {transactions.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                <Clock className="mx-auto mb-3 opacity-20" size={48} />
                                No se encontraron transacciones en este periodo.
                            </td>
                        </tr>
                    ) : (
                        transactions.map((t) => (
                            <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-slate-900">
                                        {format(new Date(t.date), "d 'de' MMMM", { locale: es })}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {format(new Date(t.date), "HH:mm")}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-semibold text-slate-900">{t.customerName}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-slate-700">{t.serviceName}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-bold text-emerald-600">{t.price.toLocaleString()}€</div>
                                </td>
                                <td className="px-6 py-4">
                                    {t.paid ? (
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                            {t.paymentMethod === 'CARD' ? (
                                                <>
                                                    <CreditCard size={14} className="text-brand-primary" />
                                                    TARJETA
                                                </>
                                            ) : (
                                                <>
                                                    <Banknote size={14} className="text-emerald-500" />
                                                    EFECTIVO
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                                            PENDIENTE
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => onViewReceipt(t)}
                                        className="p-2 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-xl transition-all active:scale-90"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
