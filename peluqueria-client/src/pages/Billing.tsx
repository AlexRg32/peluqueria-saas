import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { appointmentService, Appointment, BillingSummary } from '@/services/appointmentService';
import { BillingStats } from '@/components/billing/BillingStats';
import { BillingFilters } from '@/components/billing/BillingFilters';
import { TransactionTable } from '@/components/billing/TransactionTable';
import { ReceiptModal } from '@/components/billing/ReceiptModal';
import { Loader2, AlertCircle, FileText } from 'lucide-react';
import { startOfMonth, endOfMonth, formatISO } from 'date-fns';

const BillingPage = () => {
    const { user, enterprise } = useAuth();
    const [summary, setSummary] = useState<BillingSummary | null>(null);
    const [transactions, setTransactions] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [dateRange, setDateRange] = useState({
        start: formatISO(startOfMonth(new Date())),
        end: formatISO(endOfMonth(new Date()))
    });

    useEffect(() => {
        if (user?.enterpriseId) {
            loadBillingData();
        }
    }, [user?.enterpriseId, dateRange]);

    const loadBillingData = async () => {
        if (!user?.enterpriseId) return;
        try {
            setLoading(true);
            const [summaryData, transData] = await Promise.all([
                appointmentService.getBillingSummary(user.enterpriseId),
                appointmentService.getTransactions(user.enterpriseId, dateRange.start, dateRange.end)
            ]);
            setSummary(summaryData);
            setTransactions(transData);
            setError(null);
        } catch (err) {
            console.error('Error loading billing data:', err);
            setError('No se pudieron cargar los datos de facturación.');
        } finally {
            setLoading(false);
        }
    };

    const filteredTransactions = transactions.filter(t => 
        t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return (
            <div className="p-8 text-center text-slate-500">
                <AlertCircle className="mx-auto mb-4 text-red-400" size={64} />
                <p>{error}</p>
                <button 
                    onClick={loadBillingData}
                    className="mt-4 px-6 py-2 bg-brand-primary text-slate-900 rounded-xl font-bold"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                        <FileText className="text-brand-primary" size={32} />
                        Facturación y Caja
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Gestiona los ingresos y transacciones de tu negocio.
                    </p>
                </div>
            </header>

            {summary && <BillingStats summary={summary} loading={loading} />}

            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="p-8 space-y-6">
                    <BillingFilters 
                        dateRange={dateRange} 
                        onDateRangeChange={setDateRange}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />

                    {loading ? (
                        <div className="flex h-64 items-center justify-center">
                            <Loader2 className="animate-spin text-brand-primary" size={48} />
                        </div>
                    ) : (
                        <TransactionTable 
                            transactions={filteredTransactions} 
                            onViewReceipt={setSelectedAppointment}
                        />
                    )}
                </div>
            </div>

            <ReceiptModal 
                appointment={selectedAppointment} 
                onClose={() => setSelectedAppointment(null)}
                enterpriseName={enterprise?.name}
            />
        </div>
    );
};

export default BillingPage;
