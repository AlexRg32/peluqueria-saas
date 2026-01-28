import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

const Sidebar = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        { name: 'Empresas', path: '/empresas' },
        { name: 'Servicios', path: '/servicios' },
        { name: 'Usuarios', path: '/usuarios' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-8 text-center text-slate-100 border-b border-slate-700 pb-4">
                Peluquería SaaS
            </h2>
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
                    <div className="px-4 py-2 bg-slate-800/50 rounded-lg">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Sesión como</p>
                        <p className="text-sm text-slate-200 truncate">{user.sub}</p>
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
