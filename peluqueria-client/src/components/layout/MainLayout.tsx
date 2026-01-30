
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const MainLayout = () => {
    return (
        <div className="flex bg-slate-50 min-h-screen text-slate-900 font-sans relative">
            <Navigation />
            
            <main className="flex-1 p-4 lg:p-10 pt-24 lg:pt-10 overflow-y-auto h-screen">
                <div className="max-w-7xl mx-auto bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-200/60 min-h-full">
                    <header className="mb-8 pb-5 border-b border-slate-100 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
                            Panel de Control
                        </h1>
                    </header>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;


