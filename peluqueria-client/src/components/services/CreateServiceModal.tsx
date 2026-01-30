import React, { useState } from 'react';
import { ServiceOffering } from '../../services/serviceOfferingService';

interface CreateServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (service: ServiceOffering, imageFile?: File) => Promise<void>;
    enterpriseId: number;
}

export const CreateServiceModal: React.FC<CreateServiceModalProps> = ({ isOpen, onClose, onSubmit, enterpriseId }) => {
    const [formData, setFormData] = useState<Partial<ServiceOffering>>({
        name: '',
        description: '',
        price: 0,
        duration: 30,
        category: 'Corte',
        image: ''
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // 5MB limit
            if (file.size > 5 * 1024 * 1024) {
                alert("El archivo es demasiado grande. El máximo permitido son 5MB.");
                e.target.value = ""; // Reset input
                return;
            }

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({ ...formData, enterprise: { id: enterpriseId } } as ServiceOffering, selectedFile || undefined);
            setFormData({
                name: '',
                description: '',
                price: 0,
                duration: 30,
                category: 'Corte',
                image: ''
            });
            setSelectedFile(null);
            setPreviewUrl(null);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">Nuevo Servicio</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del Servicio</label>
                        <input 
                            type="text" 
                            required
                            className="w-full rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all p-2.5 border"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Ej: Corte Clásico"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Precio ($)</label>
                             <input 
                                type="number" 
                                required
                                min="0"
                                className="w-full rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                             />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Duración (min)</label>
                             <input 
                                type="number" 
                                required
                                min="5"
                                step="5"
                                className="w-full rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border"
                                value={formData.duration}
                                onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})}
                             />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
                        <select 
                            className="w-full rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="Corte">Corte</option>
                            <option value="Barba">Barba</option>
                            <option value="Color">Color</option>
                            <option value="Tratamiento">Tratamiento</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Imagen del Servicio</label>
                        <div className="flex items-center gap-4">
                            {previewUrl && (
                                <img src={previewUrl} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-slate-200" />
                            )}
                            <input 
                                type="file" 
                                accept="image/*"
                                className="block w-full text-sm text-slate-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-indigo-50 file:text-indigo-700
                                  hover:file:bg-indigo-100
                                "
                                onChange={handleFileChange}
                            />
                        </div>
                        <p className="mt-1 text-xs text-slate-500">PNG, JPG, GIF hasta 5MB</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                        <textarea 
                            className="w-full rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border h-24 resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder="Describe brevemente el servicio..."
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition-colors disabled:opacity-50 shadow-lg shadow-indigo-200"
                        >
                            {loading ? 'Guardando...' : 'Crear Servicio'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
