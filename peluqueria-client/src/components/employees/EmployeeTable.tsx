import { User } from '../../services/userService';
import { Mail, Phone, Shield, UserCheck, UserX, MoreVertical, Edit2, Trash2 } from 'lucide-react';

interface EmployeeTableProps {
    employees: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

export const EmployeeTable = ({ employees, onEdit, onDelete }: EmployeeTableProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600">Empleado</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600">Contacto</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600">Rol</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600">Estado</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {employees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-lg">
                                            {employee.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">{employee.name}</div>
                                            <div className="text-xs text-slate-500">ID: #{employee.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Mail size={14} className="text-slate-400" />
                                            {employee.email}
                                        </div>
                                        {employee.phone && (
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Phone size={14} className="text-slate-400" />
                                                {employee.phone}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium w-fit border border-blue-100 uppercase tracking-wider">
                                        <Shield size={12} />
                                        {employee.role === 'ADMIN' ? 'Administrador' : 'Empleado'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {employee.active ? (
                                        <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                                            <UserCheck size={16} />
                                            Activo
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                                            <UserX size={16} />
                                            Inactivo
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <div className="flex items-center justify-end">
                                        {/* Actions - visible on hover */}
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                                            <button 
                                                onClick={() => onEdit(employee)}
                                                className="p-2 hover:bg-white hover:shadow-md rounded-lg text-slate-600 transition-all active:scale-90"
                                                title="Editar"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button 
                                                onClick={() => onDelete(employee.id)}
                                                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all active:scale-90"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        
                                        {/* Placeholder Icon - absolute to prevent layout shift */}
                                        <div className="absolute right-6 opacity-100 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none text-slate-300">
                                            <MoreVertical size={16} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
