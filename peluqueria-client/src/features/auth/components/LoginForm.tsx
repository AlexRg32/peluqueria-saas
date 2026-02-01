import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres'),

});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for session expiration errors
  React.useEffect(() => {
    const authError = localStorage.getItem('auth_error');
    if (authError) {
      setError(authError);
      localStorage.removeItem('auth_error');
    }
  }, []);

  const from = location.state?.from?.pathname || '/empresas';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-sm">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white tracking-tight">Bienvenido</h2>
        <p className="mt-2 text-slate-400">Inicia sesión en tu cuenta</p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`mt-1 block w-full px-4 py-3 bg-slate-900/50 border ${
              errors.email ? 'border-red-500' : 'border-slate-700'
            } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all duration-200`}
            placeholder="correo@ejemplo.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-300">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={`mt-1 block w-full px-4 py-3 bg-slate-900/50 border ${
              errors.password ? 'border-red-500' : 'border-slate-700'
            } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all duration-200`}
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-[#0f172a] bg-[#c5a059] hover:bg-[#b08d4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c5a059] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-[#0f172a] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Iniciar Sesión'
          )}
        </button>
      </form>

      <div className="text-center pt-4">
        <p className="text-sm text-slate-400">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="font-semibold text-[#c5a059] hover:text-[#b08d4a] transition-colors">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
