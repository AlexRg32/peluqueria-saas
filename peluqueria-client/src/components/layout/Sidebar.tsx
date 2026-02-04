import { NavLink } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { X } from 'lucide-react';

interface SidebarProps {
    isMobile?: boolean;
    onClose?: () => void;
}

const Sidebar = ({ isMobile, onClose }: SidebarProps) => {
    const { user, enterprise } = useAuth();
    const enterpriseName = enterprise?.name || user?.enterpriseName || 'Peluquería SaaS';

    const allNavItems = [
        { name: 'Dashboard', path: '/dashboard', roles: ['ADMIN', 'EMPLEADO', 'SUPER_ADMIN'] },
        { name: 'Empresas Global', path: '/superadmin/empresas', roles: ['SUPER_ADMIN'] },
        { name: 'Mi Peluquería', path: '/empresas', roles: ['ADMIN'] },
        { name: 'Plataforma', path: '/empresas', roles: ['EMPLEADO'] },
        { name: 'Servicios', path: '/servicios', roles: ['ADMIN', 'EMPLEADO'] },
        { name: 'Agenda', path: '/citas', roles: ['ADMIN', 'SUPER_ADMIN'] },
        { name: 'Clientes', path: '/clientes', roles: ['ADMIN', 'EMPLEADO'] },
        { name: 'Personal', path: '/usuarios', roles: ['ADMIN'] },
    ];

    const navItems = allNavItems.filter(item => 
        item.roles.includes(user?.role || '')
    );

    const handleLinkClick = () => {
        if (isMobile && onClose) {
            onClose();
        }
    };

    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col relative">
            {isMobile && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <X size={20} />
                </button>
            )}

            <div className="flex flex-col items-center mb-8 border-b border-slate-700/50 pb-6">
                <div className="w-12 h-12 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center shadow-brand mb-3">
                    <span className="text-slate-900 font-bold text-xl">
                        {enterpriseName[0]?.toUpperCase()}
                    </span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight text-center px-4">
                    {enterpriseName}
                </h2>
                <p className="text-[10px] text-brand-primary uppercase font-bold tracking-[0.2em] mt-1">
                    Panel {user?.role || 'User'}
                </p>
            </div>

            <nav className="flex-1">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                onClick={handleLinkClick}
                                className={({ isActive }) =>
                                    `block px-4 py-3 rounded-lg transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-brand-primary text-slate-900 font-semibold shadow-brand'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            
            <div className="mt-auto pt-4 border-t border-slate-700 text-[10px] text-center text-slate-500 uppercase tracking-widest">
                  © 2026 Admin Panel
            </div>
        </aside>
    );
};

export default Sidebar;

