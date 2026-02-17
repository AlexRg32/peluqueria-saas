import React, { useEffect } from 'react';
import ClientRegisterForm from '../../components/client/ClientRegisterForm';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const ClientRegisterPage: React.FC = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12 overflow-hidden relative">
      <Link 
        to="/" 
        className="absolute top-6 left-6 lg:top-10 lg:left-10 z-50 flex items-center gap-2 font-bold text-slate-500 hover:text-slate-900 transition-colors group"
      >
        <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="hidden sm:inline">Volver al inicio</span>
      </Link>

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="hidden lg:block space-y-8">
          <h1 className="text-7xl font-black text-slate-900 leading-[1.1]">
            Tu Mejor <span className="text-brand-primary">Versión</span> Empieza Aquí.
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-md">
            Crea tu cuenta gratuita y accede a las mejores peluquerías de tu ciudad. Reserva en solo 3 clics.
          </p>
          <div className="space-y-4">
            {[
              "Descubre peluquerías cerca de ti",
              "Reserva 24/7 desde cualquier lugar",
              "Recibe recordatorios automáticos",
              "Gestiona tus citas fácilmente"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-700 font-bold">
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
          <ClientRegisterForm />
        </div>
      </div>
    </div>
  );
};

export default ClientRegisterPage;
