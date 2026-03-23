import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchPage = () => {
    return (
        <div className="max-w-2xl mx-auto py-10 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto flex items-center justify-center">
                    <Search className="text-slate-300" size={40} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Buscador</h1>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Próximamente podrás buscar peluquerías por nombre, servicio, ubicación y más.
                </p>
            </motion.div>
        </div>
    );
};

export default SearchPage;
