import { X } from 'lucide-react';
import { WorkingHourSettings } from '../settings/WorkingHourSettings';
import { User } from '../../services/userService';

interface EmployeeScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: User | null;
}

export const EmployeeScheduleModal = ({ isOpen, onClose, employee }: EmployeeScheduleModalProps) => {
    if (!isOpen || !employee) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all overflow-y-auto custom-scrollbar">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-visible animate-in fade-in zoom-in duration-300 my-auto">
                <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between rounded-t-[24px]">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Horario de {employee.name}
                        </h2>
                        <p className="text-sm text-slate-500">Configura la disponibilidad semanal de este empleado.</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-slate-600 transition-all active:scale-95"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8">
                    {(employee.enterpriseId || employee.enterprise?.id) && (
                        <WorkingHourSettings 
                            enterpriseId={employee.enterpriseId || employee.enterprise!.id} 
                            userId={employee.id} 
                        />
                    )}
                </div>
                
                <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end rounded-b-[24px]">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-white border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all active:scale-95"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};
