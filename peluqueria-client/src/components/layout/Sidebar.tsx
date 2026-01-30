import { NavLink } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

const Sidebar = () => {
    const { user } = useAuth();

    const navItems = [
        { name: user?.role === 'ADMIN' ? 'Mi Peluquería' : 'Empresas', path: '/empresas' },
        { name: 'Servicios', path: '/servicios' },
        { name: 'Usuarios', path: '/usuarios' },
    ];



    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col">
            <div className="flex flex-col items-center mb-8 border-b border-slate-700/50 pb-6">
                <div className="w-12 h-12 bg-gradient-to-tr from-[#c5a059] to-[#ecd3a5] rounded-xl flex items-center justify-center shadow-lg shadow-[#c5a059]/10 mb-3">
                    <span className="text-slate-900 font-bold text-xl">
                        {user?.enterpriseName?.[0]?.toUpperCase() || 'P'}
                    </span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight text-center">
                    {user?.enterpriseName || 'Peluquería SaaS'}
                </h2>
                <p className="text-[10px] text-[#c5a059] uppercase font-bold tracking-[0.2em] mt-1">
                    Panel Admin
                </p>
            </div>
            <nav className="flex-1">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `block px-4 py-3 rounded-lg transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-md'
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
            
            <div className="mt-auto pt-4 border-t border-slate-700 text-xs text-center text-slate-500">
                  © 2026 Admin Panel
            </div>
        </aside>
    );
};

export default Sidebar;
