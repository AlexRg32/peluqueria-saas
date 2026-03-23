import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { dashboardService, DashboardStats } from '@/services/dashboardService';
import { 
    TrendingUp, 
    Users, 
    Calendar, 
    Clock, 
    Loader2, 
    AlertCircle,
    Scissors
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer
} from 'recharts';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard';

const StatCard = ({ title, value, icon: Icon, color, subtitle, delay = 0 }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-4"
    >
        <div className="flex items-center justify-between">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
                <Icon className={color.replace('bg-', 'text-')} size={24} />
            </div>
            {subtitle && (
                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                    {subtitle}
                </span>
            )}
        </div>
        <div>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{value}</h3>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const { user } = useAuth();

    if (user?.role === 'EMPLEADO') {
        return <EmployeeDashboard />;
    }

    return <AdminDashboard />;
};

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.enterpriseId) {
            loadStats(user.enterpriseId);
        }
    }, [user?.enterpriseId]);

    const loadStats = async (id: number) => {
        try {
            const data = await dashboardService.getStats(id);
            setStats(data);
        } catch (error) {
            console.error('Error loading dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="animate-spin text-brand-primary" size={48} />
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="p-8 text-center text-slate-500">
                <AlertCircle className="mx-auto mb-4 opacity-20" size={64} />
                <p>No se pudieron cargar las estadísticas.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Resumen de Negocio
                </h1>
                <p className="text-slate-500 mt-1">
                    Bienvenido, aquí tienes el rendimiento de tu peluquería.
                </p>
            </header>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Ingresos Totales" 
                    value={`${stats.totalRevenue.toLocaleString()}€`} 
                    icon={TrendingUp} 
                    color="bg-emerald-500" 
                    subtitle="+12.5%"
                    delay={0.1}
                />
                <StatCard 
                    title="Citas Totales" 
                    value={stats.totalAppointments} 
                    icon={Calendar} 
                    color="bg-brand-primary" 
                    delay={0.2}
                />
                <StatCard 
                    title="Clientes Registrados" 
                    value={stats.totalCustomers} 
                    icon={Users} 
                    color="bg-blue-500" 
                    delay={0.3}
                />
                <StatCard 
                    title="Citas Pendientes" 
                    value={stats.pendingAppointments} 
                    icon={Clock} 
                    color="bg-amber-500" 
                    delay={0.4}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Histórico de Ingresos</h3>
                            <p className="text-sm text-slate-500">Facturación diaria (citas completadas)</p>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.revenueChart}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#c5a059" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#c5a059" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="label" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        borderRadius: '16px', 
                                        border: 'none', 
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                        padding: '12px'
                                    }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    name="Euros"
                                    stroke="#c5a059" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorRevenue)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Top Services */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Scissors size={20} className="text-brand-primary" />
                        Servicios Top
                    </h3>
                    <div className="space-y-6">
                        {stats.popularServices.slice(0, 5).map((service) => (
                            <div key={service.name} className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-slate-700">{service.name}</span>
                                    <span className="text-slate-400">{service.count} citas</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(service.count / stats.totalAppointments) * 100}%` }}
                                        className="h-full bg-brand-primary"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Employee Performance */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Rendimiento del Equipo</h3>
                            <p className="text-sm text-slate-500">Citas gestionadas por empleado</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.employeePerformance.map((emp) => (
                            <div key={emp.name} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                    {emp.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{emp.name}</p>
                                    <p className="text-xs text-slate-500">{emp.count} servicios completados</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
