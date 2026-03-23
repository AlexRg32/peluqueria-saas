import { Calendar, CheckCircle, Clock, XCircle, User } from 'lucide-react';
import { AppointmentSummary } from '../../services/customerService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface AppointmentTimelineProps {
  appointments: AppointmentSummary[];
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'COMPLETED': return { icon: <CheckCircle size={16} />, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' };
    case 'CANCELLED': return { icon: <XCircle size={16} />, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' };
    case 'PENDING': return { icon: <Clock size={16} />, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' };
    default: return { icon: <Calendar size={16} />, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100' };
  }
};

export const AppointmentTimeline = ({ appointments }: AppointmentTimelineProps) => {
  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500">
        <Calendar size={48} className="text-slate-200 mb-4" />
        <p>No hay citas registradas para este cliente.</p>
      </div>
    );
  }

  return (
    <div className="relative pl-8 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
      {appointments.map((appt) => {
        const styles = getStatusStyles(appt.status);
        return (
          <div key={appt.id} className="relative">
            <div className={`absolute -left-[31px] top-1 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center z-10 ${styles.bg} ${styles.color}`}>
              {styles.icon}
            </div>
            
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-bold text-slate-800">{appt.serviceName}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <User size={12} />
                    <span>{appt.employeeName}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-primary">{appt.price}€</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles.bg} ${styles.color} ${styles.border}`}>
                    {appt.status}
                  </span>
                </div>
              </div>
              
              <div className="mt-2 text-xs text-slate-400 font-medium">
                {format(new Date(appt.date), "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
