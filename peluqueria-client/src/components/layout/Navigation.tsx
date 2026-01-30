import { useState } from 'react';
import { Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import UserMenu from './UserMenu';

const Navigation = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="contents">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex shrink-0">
                <Sidebar />
            </div>

            {/* Mobile Sidebar with AnimatePresence */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeSidebar}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] lg:hidden"
                        />
                        {/* Sidebar Content */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-[70] lg:hidden"
                        >
                            <Sidebar isMobile onClose={closeSidebar} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Mobile Top Bar */}
            <div className="lg:hidden absolute top-0 left-0 right-0 z-50 px-4 pt-4">
                <div className="flex items-center justify-between bg-white/80 backdrop-blur-xl p-3 rounded-2xl shadow-sm border border-slate-200/50">
                    <button
                        onClick={toggleSidebar}
                        className="p-2.5 hover:bg-slate-100 rounded-xl transition-all duration-200 text-slate-600 active:scale-95"
                    >
                        <Menu size={22} />
                    </button>
                    <div className="font-bold text-slate-800 text-xs uppercase tracking-[0.2em] opacity-80">Panel</div>
                    <div className="flex items-center">
                        <UserMenu />
                    </div>
                </div>
            </div>

            {/* Desktop User Menu - Positioned absolute relative to the layout but handled here for consistency */}
            <div className="absolute top-8 right-10 z-30 hidden lg:block">
                <UserMenu />
            </div>
        </div>
    );
};

export default Navigation;
