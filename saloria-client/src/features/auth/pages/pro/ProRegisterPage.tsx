import React, { useEffect } from 'react';
import ProRegisterForm from '../../components/pro/ProRegisterForm';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const ProRegisterPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-12 overflow-hidden relative">
      <Link 
        to="/" 
        className="absolute top-6 left-6 lg:top-10 lg:left-10 z-50 flex items-center gap-2 font-bold text-slate-400 hover:text-white transition-colors group"
      >
        <div className="p-2 rounded-xl bg-slate-800 group-hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="hidden sm:inline">Volver al inicio</span>
      </Link>

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px]"></div>
      
      {/* Textura sutil */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="hidden lg:block space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest">
            Registro Business
          </div>
          <h1 className="text-7xl font-black text-white leading-[1.1]">
            Digitaliza tu <span className="text-brand-primary">Pasión</span>.
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-md">
            Únete a la red de peluquerías que están transformando su gestión. Más clientes, menos estrés.
          </p>
          <div className="space-y-4">
            {[
              "Visibilidad para nuevos clientes",
              "Agenda inteligente y sincronizada",
              "Recordatorios vía Web/Email",
              "Panel de estadísticas detallado"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-400 font-bold">
                <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <ProRegisterForm />
        </div>
      </div>
    </div>
  );
};

export default ProRegisterPage;
