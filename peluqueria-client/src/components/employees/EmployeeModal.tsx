import { useState, useEffect } from 'react';
import { User } from '../../services/userService';
import { X, Save, User as UserIcon, Mail, Phone, Lock, Shield } from 'lucide-react';

interface EmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (user: Partial<User>) => Promise<void>;
    employee?: User | null;
}

export const EmployeeModal = ({ isOpen, onClose, onSubmit, employee }: EmployeeModalProps) => {
    const [formData, setFormData] = useState<Partial<User>>({
        name: '',
        email: '',
        phone: '',
        role: 'EMPLEADO',
        password: '',
        active: true
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (employee) {
            setFormData({
                ...employee,
                password: '' // Don't show password
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                role: 'EMPLEADO',
                password: '',
                active: true
            });
        }
    }, [employee, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await onSubmit(formData);
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            {employee ? 'Editar Empleado' : 'Añadir Nuevo Empleado'}
                        </h2>
                        <p className="text-sm text-slate-500">Configura los detalles del miembro de tu equipo.</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-slate-600 transition-all active:scale-95"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <UserIcon size={14} className="text-[#c5a059]" />
                                Nombre completo
                            </label>
                            <input 
                                required
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]/20 focus:border-[#c5a059] outline-none transition-all"
                                placeholder="Ej. Juan Pérez"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Mail size={14} className="text-[#c5a059]" />
                                    Email
                                </label>
                                <input 
                                    required
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]/20 focus:border-[#c5a059] outline-none transition-all"
                                    placeholder="juan@ejemplo.com"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Phone size={14} className="text-[#c5a059]" />
                                    Teléfono
                                </label>
                                <input 
                                    type="tel"
                                    value={formData.phone || ''}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]/20 focus:border-[#c5a059] outline-none transition-all"
                                    placeholder="+34 600 000 000"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Shield size={14} className="text-[#c5a059]" />
                                Rol en la empresa
                            </label>
                            <select 
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]/20 focus:border-[#c5a059] outline-none transition-all appearance-none cursor-pointer"
                            >
                                <option value="EMPLEADO">Empleado (Barbero/Peluquero)</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Lock size={14} className="text-[#c5a059]" />
                                Contraseña {employee && <span className="text-slate-400 font-normal">(opcional)</span>}
                            </label>
                            <input 
                                required={!employee}
                                type="password"
                                value={formData.password || ''}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]/20 focus:border-[#c5a059] outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {employee && (
                             <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <input 
                                    type="checkbox"
                                    id="active"
                                    checked={!!formData.active}
                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                    className="w-5 h-5 accent-[#c5a059] rounded-md cursor-pointer"
                                />
                                <label htmlFor="active" className="text-sm font-medium text-slate-700 cursor-pointer">
                                    Empleado activo
                                </label>
                             </div>
                        )}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all active:scale-95"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-[#c5a059] text-white font-semibold rounded-xl hover:bg-[#b38f4a] shadow-lg shadow-[#c5a059]/30 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Save size={18} />
                                    {employee ? 'Guardar Cambios' : 'Crear Empleado'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
