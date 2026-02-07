import React, { useEffect } from 'react';
import ClientLoginForm from '../../components/client/ClientLoginForm';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const ClientLoginPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/portal', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 overflow-hidden relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px]"></div>
      
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="hidden lg:block space-y-8">
          <h1 className="text-7xl font-black text-slate-900 leading-[1.1]">
            Vuelve a <span className="text-brand-primary">Sentirte</span> Bien.
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-md">
            Accede a tu cuenta para gestionar tus próximas citas y descubrir nuevas peluquerías cerca de ti.
          </p>
          <div className="flex items-center gap-4 text-slate-400 font-bold uppercase tracking-widest text-sm">
            <span>Seguro</span>
            <span className="w-2 h-2 bg-slate-200 rounded-full"></span>
            <span>Rápido</span>
            <span className="w-2 h-2 bg-slate-200 rounded-full"></span>
            <span>Fácil</span>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <ClientLoginForm />
        </div>
      </div>
    </div>
  );
};

export default ClientLoginPage;
