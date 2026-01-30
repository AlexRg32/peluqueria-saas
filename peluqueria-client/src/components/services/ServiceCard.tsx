import React from 'react';
import { ServiceOffering } from '../../services/serviceOfferingService';

interface ServiceCardProps {
    service: ServiceOffering;
    onDelete?: (id: number) => void;
    isAdmin: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onDelete, isAdmin }) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group flex flex-col h-full">
            <div className="h-48 overflow-hidden relative">
                 <img
                    src={service.image && service.image.startsWith('http') ? service.image : "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=2669&ixlib=rb-4.0.3"}
                    alt={service.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-slate-800 font-bold text-sm shadow-sm flex items-center gap-1">
                    <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {service.duration} min
                </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <div>
                         <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-2 py-1 rounded-full">{service.category}</span>
                         <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{service.name}</h3>
                    </div>
                    <span className="text-xl font-bold text-slate-800">${service.price}</span>
                </div>
                
                <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-1">
                    {service.description}
                </p>

                {isAdmin && onDelete && service.id && (
                    <button 
                        onClick={() => onDelete(service.id!)}
                        className="w-full py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm flex items-center justify-center gap-2 mt-auto"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        Eliminar Servicio
                    </button>
                )}
            </div>
        </div>
    );
};
