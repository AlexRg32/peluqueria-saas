import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface AppointmentMiniCardProps {
    salonName: string;
    address: string;
    date: string;
    time: string;
    status: string;
    imageUrl?: string;
}

const AppointmentMiniCard: React.FC<AppointmentMiniCardProps> = ({
    salonName, address, date, time, status, imageUrl
}) => {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 flex gap-6 items-start group"
        >
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img 
                    src={imageUrl || "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=200"} 
                    alt={salonName} 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-primary transition-colors">{salonName}</h3>
                        <p className="text-slate-500 font-medium flex items-center gap-1">
                            <MapPin size={14} /> {address}
                        </p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                        {status}
                    </span>
                </div>
                <div className="flex gap-4 pt-2">
                    <div className="flex items-center gap-2 text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                        <Calendar size={16} className="text-brand-primary" />
                        <span className="text-sm font-bold">{date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                        <Clock size={16} className="text-brand-primary" />
                        <span className="text-sm font-bold">{time}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AppointmentMiniCard;
