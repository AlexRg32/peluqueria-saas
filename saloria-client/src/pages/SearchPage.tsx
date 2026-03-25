import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Search } from 'lucide-react';

import SalonCard from '@/features/client-portal/components/SalonCard';
import { marketplaceService } from '@/services/MarketplaceService';
import { EnterpriseSummary } from '@/types/Marketplace';

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [results, setResults] = useState<EnterpriseSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const currentQuery = searchParams.get('q') || '';
        setQuery(currentQuery);
    }, [searchParams]);

    useEffect(() => {
        let mounted = true;

        const loadResults = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await marketplaceService.search(query);
                if (mounted) {
                    setResults(data);
                }
            } catch (requestError) {
                if (mounted) {
                    setError('No pudimos cargar los resultados ahora mismo.');
                    setResults([]);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadResults();
        return () => {
            mounted = false;
        };
    }, [query]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmedQuery = query.trim();
        setSearchParams(trimmedQuery ? { q: trimmedQuery } : {});
    };

    return (
        <div className="max-w-7xl mx-auto py-10 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
            >
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.25em] text-brand-primary">
                    <Search size={14} />
                    Explorar negocios
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Buscador</h1>
                <p className="text-slate-500 text-sm sm:text-base max-w-2xl">
                    Busca por nombre, servicio o ubicación y entra directamente a reservar cuando encuentres tu sitio.
                </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Ej. degradado, barba, Madrid..."
                            className="w-full rounded-2xl border border-slate-200 py-4 pl-12 pr-4 text-slate-900 outline-none transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
                        />
                    </div>
                    <button
                        type="submit"
                        className="rounded-2xl bg-slate-900 px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-slate-800"
                    >
                        Buscar
                    </button>
                </div>
            </form>

            {loading ? (
                <div className="flex min-h-[30vh] items-center justify-center">
                    <Loader2 className="text-brand-primary animate-spin" size={40} />
                </div>
            ) : error ? (
                <div className="rounded-[2rem] border border-rose-100 bg-rose-50 px-6 py-10 text-center">
                    <p className="text-lg font-bold text-rose-700">{error}</p>
                    <p className="text-sm text-rose-600 mt-2">Prueba de nuevo en unos segundos.</p>
                </div>
            ) : results.length === 0 ? (
                <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
                        <Search className="text-slate-300" size={36} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">No encontramos resultados</h2>
                    <p className="text-slate-500 mt-3 max-w-md mx-auto">
                        Ajusta el término de búsqueda o vuelve al inicio para explorar negocios destacados.
                    </p>
                    <Link to="/" className="inline-flex mt-6 rounded-xl bg-brand-primary px-5 py-3 font-bold text-slate-900 shadow-brand">
                        Volver al inicio
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-500">
                            {results.length} resultado{results.length === 1 ? '' : 's'} {query.trim() ? `para "${query.trim()}"` : 'disponibles'}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {results.map((salon, index) => (
                            <SalonCard key={salon.id} salon={salon} index={index} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
