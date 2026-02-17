import { Calendar, Clock } from 'lucide-react';

interface AppointmentCardProps {
    serviceName: string;
    date: string;
    time: string;
    status: string;
    salonName?: string;
}

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
    PENDING: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Pendiente' },
    COMPLETED: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Completada' },
    CANCELED: { bg: 'bg-red-50', text: 'text-red-500', label: 'Cancelada' },
    NO_SHOW: { bg: 'bg-slate-100', text: 'text-slate-500', label: 'No Show' },
};

const AppointmentCard = ({ serviceName, date, time, status, salonName }: AppointmentCardProps) => {
    const style = statusStyles[status] || statusStyles.PENDING;

    return (
        <div className="flex-shrink-0 w-[280px] bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate group-hover:text-brand-primary transition-colors">
                        {serviceName}
                    </h4>
                    {salonName && (
                        <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">
                            {salonName}
                        </p>
                    )}
                </div>
                <span
                    className={`${style.bg} ${style.text} px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ml-2`}
                >
                    {style.label}
                </span>
            </div>

            <div className="flex gap-3">
                <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-3 py-2 rounded-xl text-xs font-medium">
                    <Calendar size={14} className="text-brand-primary" />
                    <span>{date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-3 py-2 rounded-xl text-xs font-medium">
                    <Clock size={14} className="text-brand-primary" />
                    <span>{time}</span>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;
