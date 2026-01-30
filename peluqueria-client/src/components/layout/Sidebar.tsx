import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

const Sidebar = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        { name: user?.role === 'ADMIN' ? 'Mi Peluquería' : 'Empresas', path: '/empresas' },
        { name: 'Servicios', path: '/servicios' },
        { name: 'Usuarios', path: '/usuarios' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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
            
            <div className="mt-auto space-y-4">
                {user && (
                    <div className="px-4 py-3 bg-slate-800/40 border border-slate-700/30 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300 border border-slate-600">
                                {user.sub[0].toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-slate-200 truncate">{user.sub}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] bg-[#c5a059]/10 text-[#c5a059] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider border border-[#c5a059]/20">
                                        {user.role}
                                    </span>
                                    <p className="text-[10px] text-slate-500 truncate">Empresa: {user.enterpriseName || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-red-400 border border-red-400/20 rounded-lg hover:bg-red-400/10 transition-colors duration-200"
                >
                    Cerrar Sesión
                </button>

                <div className="pt-4 border-t border-slate-700 text-xs text-center text-slate-500">
                  © 2026 Admin Panel
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
