import { Calendar, Search } from 'lucide-react';

interface BillingFiltersProps {
    dateRange: { start: string; end: string };
    onDateRangeChange: (range: { start: string; end: string }) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export const BillingFilters = ({ dateRange, onDateRangeChange, searchTerm, onSearchChange }: BillingFiltersProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 w-full md:w-auto">
                <Search size={18} className="text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Buscar cliente..." 
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-400 w-full"
                />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200">
                    <Calendar size={18} className="text-slate-400" />
                    <input 
                        type="date" 
                        value={dateRange.start.split('T')[0]}
                        onChange={(e) => onDateRangeChange({ ...dateRange, start: `${e.target.value}T00:00:00` })}
                        className="bg-transparent border-none focus:ring-0 text-sm p-0"
                    />
                    <span className="text-slate-300">to</span>
                    <input 
                        type="date" 
                        value={dateRange.end.split('T')[0]}
                        onChange={(e) => onDateRangeChange({ ...dateRange, end: `${e.target.value}T23:59:59` })}
                        className="bg-transparent border-none focus:ring-0 text-sm p-0"
                    />
                </div>
            </div>
        </div>
    );
};
