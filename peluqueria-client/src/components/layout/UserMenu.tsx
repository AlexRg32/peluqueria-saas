import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User as UserIcon, 
  Settings, 
  LogOut, 
  ChevronDown,
  Building2,
  Shield
} from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';

const UserMenu = () => {
  const { user, enterprise, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-4 px-4 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-slate-900 font-bold text-sm shadow-inner">
          {user.sub[0].toUpperCase()}
        </div>
        <div className="hidden md:flex flex-col items-start leading-none gap-1">
          <span className="text-base font-bold text-slate-800">{user.sub.split('@')[0]}</span>
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{user.role}</span>
        </div>
        <ChevronDown size={18} className={`text-slate-400 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-2xl border border-slate-200/50 rounded-2xl shadow-2xl shadow-slate-200/50 overflow-hidden z-50"
          >
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                  <UserIcon size={24} />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-base font-bold text-slate-800 truncate">{user.sub}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Shield size={12} className="text-brand-primary" />
                    <span className="text-xs font-bold text-brand-primary uppercase tracking-tight">{user.role}</span>
                  </div>
                </div>
              </div>
              
              {(enterprise?.name || user.enterpriseName) && (
                <div className="mt-4 flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
                  <Building2 size={14} className="text-slate-400" />
                  <span className="text-sm text-slate-600 font-semibold truncate">
                    {enterprise?.name || user.enterpriseName}
                  </span>
                </div>
              )}
            </div>

            <div className="p-2.5">
              <button 
                onClick={() => {/* Navigate to settings */}}
                className="w-full flex items-center gap-4 px-3.5 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-white border border-transparent group-hover:border-slate-200 transition-all">
                  <Settings size={18} />
                </div>
                <span className="font-bold text-base">Configuración</span>
              </button>
            </div>

            <div className="p-2.5 border-t border-slate-100 bg-slate-50/50">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-3.5 py-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-white border border-red-100 group-hover:border-red-200 transition-all">
                  <LogOut size={18} />
                </div>
                <span className="font-bold text-base">Cerrar Sesión</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
