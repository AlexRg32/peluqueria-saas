import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, User, LogIn } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface TabItem {
    name: string;
    path: string;
    icon: React.ElementType;
}

const BottomTabBar = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    const tabs: TabItem[] = [
        { name: 'Inicio', path: '/', icon: Home },
        { name: 'Explorar', path: '/search', icon: Search },
        ...(isAuthenticated
            ? [
                  { name: 'Mis Citas', path: '/citas', icon: Calendar },
                  { name: 'Perfil', path: '/perfil', icon: User },
              ]
            : [{ name: 'Acceder', path: '/auth/login', icon: LogIn }]),
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]">
            <div className="bg-white/80 backdrop-blur-xl border-t border-slate-200/80 px-2 py-1.5 flex justify-around items-center">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = location.pathname === tab.path;
                    return (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all ${
                                isActive
                                    ? 'text-brand-primary'
                                    : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={`text-[10px] font-semibold ${isActive ? 'font-bold' : ''}`}>
                                {tab.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomTabBar;
