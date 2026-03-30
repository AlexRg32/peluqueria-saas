import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Building2,
  ExternalLink,
  Globe2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Search,
} from 'lucide-react';

import { Enterprise, enterpriseService } from '@/services/enterpriseService';

const hasText = (value?: string | null) => Boolean(value?.trim());

const getMissingPublicProfile = (enterprise: Enterprise) => {
  const missing: string[] = [];

  if (!hasText(enterprise.slug)) {
    missing.push('Sin slug');
  }
  if (!hasText(enterprise.address)) {
    missing.push('Sin dirección');
  }
  if (!hasText(enterprise.description)) {
    missing.push('Sin descripción');
  }
  if (!hasText(enterprise.phone) && !hasText(enterprise.email) && !hasText(enterprise.whatsapp)) {
    missing.push('Sin canal público');
  }

  return missing;
};

const SuperAdminEnterprisesPage = () => {
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadEnterprises = async () => {
      try {
        const data = await enterpriseService.getAll();
        if (mounted) {
          setEnterprises(data);
        }
      } catch {
        if (mounted) {
          setError('No se pudieron cargar las empresas globales.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadEnterprises();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredEnterprises = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return enterprises;
    }

    return enterprises.filter((enterprise) =>
      [enterprise.name, enterprise.slug, enterprise.email, enterprise.phone, enterprise.address]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery))
    );
  }, [enterprises, query]);

  const stats = useMemo(() => {
    const publicReadyCount = enterprises.filter((enterprise) => getMissingPublicProfile(enterprise).length === 0).length;
    const withSlugCount = enterprises.filter((enterprise) => hasText(enterprise.slug)).length;
    const withContactCount = enterprises.filter(
      (enterprise) => hasText(enterprise.phone) || hasText(enterprise.email) || hasText(enterprise.whatsapp)
    ).length;

    return [
      { label: 'Empresas totales', value: enterprises.length },
      { label: 'Listas para directorio', value: publicReadyCount },
      { label: 'Con slug público', value: withSlugCount },
      { label: 'Con contacto público', value: withContactCount },
    ];
  }, [enterprises]);

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-primary">
            <Building2 size={16} />
            Super Admin
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Panel de Empresas</h1>
          <p className="mt-1 text-slate-500">
            Vista global para revisar qué negocios ya están publicables y cuáles siguen incompletos.
          </p>
        </div>

        <label className="relative block w-full xl:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre, slug, email o dirección"
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 shadow-sm outline-none transition-colors focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/10"
          />
        </label>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">{stat.label}</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-[2rem] border border-slate-200 bg-white text-slate-400 shadow-sm">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-100 bg-red-50 p-5 text-red-700">
          <div className="flex items-center gap-3">
            <AlertCircle size={20} />
            <span className="font-medium">{error}</span>
          </div>
        </div>
      ) : filteredEnterprises.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">No hay resultados</h2>
          <p className="mt-2 text-slate-500">Prueba con otro nombre, slug o contacto para encontrar una empresa.</p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {filteredEnterprises.map((enterprise) => {
            const missingPublicProfile = getMissingPublicProfile(enterprise);
            const publicReady = missingPublicProfile.length === 0;

            return (
              <article key={enterprise.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-black text-slate-900">{enterprise.name}</h2>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${
                          publicReady ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {publicReady ? 'Lista para directorio' : 'Perfil incompleto'}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">
                      {hasText(enterprise.slug) && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                          <Globe2 size={14} />
                          /b/{enterprise.slug}
                        </span>
                      )}
                      {hasText(enterprise.cif) && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                          CIF {enterprise.cif}
                        </span>
                      )}
                    </div>
                  </div>

                  {hasText(enterprise.slug) && (
                    <a
                      href={`/b/${enterprise.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <ExternalLink size={16} />
                      Ver perfil público
                    </a>
                  )}
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
                    <span>{enterprise.address || 'Sin dirección pública'}</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <Mail size={16} className="mt-0.5 shrink-0 text-slate-400" />
                    <span>{enterprise.email || 'Sin email público'}</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <Phone size={16} className="mt-0.5 shrink-0 text-slate-400" />
                    <span>{enterprise.phone || enterprise.whatsapp || 'Sin teléfono o WhatsApp público'}</span>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Descripción</p>
                    <p className="mt-1">{enterprise.description || 'Todavía no tiene copy público'}</p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">Chequeo rápido</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {publicReady ? (
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                        Perfil público listo
                      </span>
                    ) : (
                      missingPublicProfile.map((item) => (
                        <span key={item} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                          {item}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SuperAdminEnterprisesPage;
