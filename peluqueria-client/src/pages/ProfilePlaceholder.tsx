import { User, Settings, Bell, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePlaceholder = () => {
    const items = [
        { icon: User, label: 'Datos personales' },
        { icon: Heart, label: 'Favoritos' },
        { icon: Bell, label: 'Notificaciones' },
        { icon: Settings, label: 'Ajustes' },
    ];

    return (
        <div className="max-w-lg mx-auto py-10 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-3"
            >
                <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto flex items-center justify-center">
                    <User className="text-slate-300" size={40} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Mi Perfil</h1>
                <p className="text-slate-500 text-sm">Próximamente podrás gestionar tu perfil aquí.</p>
            </motion.div>

            <div className="space-y-3">
                {items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 text-slate-400 cursor-not-allowed"
                        >
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                                <Icon size={20} />
                            </div>
                            <span className="font-medium text-slate-600">{item.label}</span>
                            <span className="ml-auto text-xs bg-slate-100 text-slate-400 px-2 py-1 rounded-lg font-medium">
                                Próximamente
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfilePlaceholder;
