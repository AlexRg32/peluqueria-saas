import { motion } from 'framer-motion';
import { TrendingUp, Calendar, CreditCard, Activity } from 'lucide-react';
import { BillingSummary } from '@/services/appointmentService';

interface BillingStatsProps {
    summary: BillingSummary;
    loading: boolean;
}

const StatCard = ({ title, value, icon: Icon, color, delay = 0 }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4"
    >
        <div className={`p-4 rounded-2xl ${color} bg-opacity-10`}>
            <Icon className={color.replace('bg-', 'text-')} size={24} />
        </div>
        <div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        </div>
    </motion.div>
);

export const BillingStats = ({ summary, loading }: BillingStatsProps) => {
    if (loading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-slate-100 rounded-3xl" />
            ))}
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                title="Hoy" 
                value={`${summary.revenueToday.toLocaleString()}€`} 
                icon={TrendingUp} 
                color="bg-emerald-500" 
                delay={0.1}
            />
            <StatCard 
                title="Esta Semana" 
                value={`${summary.revenueThisWeek.toLocaleString()}€`} 
                icon={Calendar} 
                color="bg-brand-primary" 
                delay={0.2}
            />
            <StatCard 
                title="Este Mes" 
                value={`${summary.revenueThisMonth.toLocaleString()}€`} 
                icon={Activity} 
                color="bg-blue-500" 
                delay={0.3}
            />
            <StatCard 
                title="Transacciones" 
                value={summary.transactionsCount} 
                icon={CreditCard} 
                color="bg-amber-500" 
                delay={0.4}
            />
        </div>
    );
};
