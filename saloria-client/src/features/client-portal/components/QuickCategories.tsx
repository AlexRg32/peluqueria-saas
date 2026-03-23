import { Scissors, Paintbrush, User, Sparkles, MapPinned } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

const categories: Category[] = [
    { id: 'corte', name: 'Corte', icon: Scissors, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
    { id: 'coloracion', name: 'Coloración', icon: Paintbrush, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'barberia', name: 'Barbería', icon: User, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'tratamientos', name: 'Tratamientos', icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'cerca', name: 'Cerca de ti', icon: MapPinned, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

const QuickCategories = () => {
    return (
        <section>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                {categories.map(cat => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.id}
                            className="flex flex-col items-center gap-2 flex-shrink-0 group"
                        >
                            <div
                                className={`w-16 h-16 ${cat.bg} rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-lg`}
                            >
                                <Icon className={cat.color} size={24} />
                            </div>
                            <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                                {cat.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};

export default QuickCategories;
