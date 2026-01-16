import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="flex h-screen bg-[#f8fafc]">
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
                <div className="p-6">
                    <ApplicationLogo className="h-8 w-auto fill-current text-[#b08d4b]" />
                </div>

                <nav className="flex-1 px-4 space-y-2 py-4">
                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Panel Control
                    </NavLink>
                    <NavLink href={route('appointments.index')} active={route().current('appointments.*')}>
                        Citas
                    </NavLink>

                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-2 py-3">
                        <div className="w-8 h-8 rounded-full bg-[#ede5da] flex items-center justify-center text-[#b08d4b] font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                            <Link href={route('logout')} method="post" as="button" className="text-xs text-gray-500 hover:text-red-600">
                                Cerrar sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ÁREA DE CONTENIDO */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Aquí va tu Header y el Main */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
