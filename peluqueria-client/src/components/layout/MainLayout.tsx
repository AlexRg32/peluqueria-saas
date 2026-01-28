
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
    return (
        <div className="flex bg-slate-50 min-h-screen text-slate-900 font-sans">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-full">
                  <header className="mb-6 pb-4 border-b border-slate-100">
                    <h1 className="text-xl font-medium text-slate-800">Panel de Control</h1>
                  </header>
                  <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
