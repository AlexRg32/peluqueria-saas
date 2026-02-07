import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres'),
});

type ClientLoginFormValues = z.infer<typeof loginSchema>;

export const ClientLoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientLoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: ClientLoginFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await login({ ...data, requiredRole: 'CLIENTE' });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Hola de nuevo</h2>
        <p className="text-slate-500 font-medium">Entra para gestionar tus citas</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-700 ml-1 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`block w-full px-5 py-4 bg-slate-50 border ${
              errors.email ? 'border-red-500' : 'border-slate-200'
            } rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all duration-200 placeholder:text-slate-400`}
            placeholder="tu@email.com"
          />
          {errors.email && <p className="mt-1.5 text-xs font-bold text-red-500 pr-2 text-right">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold text-slate-700 ml-1 mb-1">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={`block w-full px-5 py-4 bg-slate-50 border ${
              errors.password ? 'border-red-500' : 'border-slate-200'
            } rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all duration-200 placeholder:text-slate-400`}
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-1.5 text-xs font-bold text-red-500 pr-2 text-right">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-4 px-6 border border-transparent rounded-2xl shadow-xl text-lg font-bold text-slate-900 bg-brand-primary hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-brand-primary/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Entrar ahora'
          )}
        </button>
      </form>

      <div className="text-center mt-8 space-y-3">
        <p className="text-slate-500 font-medium">
          ¿Aún no tienes cuenta?{' '}
          <Link to="/auth/register" className="font-bold text-slate-900 hover:text-brand-primary transition-colors">
            Crea una aquí
          </Link>
        </p>
        <div className="pt-4 border-t border-slate-100">
          <Link to="/pro/login" className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
            ¿Eres un profesional? Acceso empresas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientLoginForm;
