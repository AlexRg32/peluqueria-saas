import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  enterpriseName: z.string().min(1, 'El nombre de la empresa es obligatorio'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        enterpriseName: data.enterpriseName,
      });
      navigate('/empresas', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrarse. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-sm">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white tracking-tight">Crear Cuenta</h2>
        <p className="mt-2 text-slate-400">Únete a nuestra plataforma SaaS</p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300">
            Nombre Completo
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`mt-1 block w-full px-4 py-3 bg-slate-900/50 border ${
              errors.name ? 'border-red-500' : 'border-slate-700'
            } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all duration-200`}
            placeholder="Juan Pérez"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

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
          <label htmlFor="enterpriseName" className="block text-sm font-medium text-slate-300">
            Empresa
          </label>
          <input
            id="enterpriseName"
            type="text"
            {...register('enterpriseName')}
            className={`mt-1 block w-full px-4 py-3 bg-slate-900/50 border ${
              errors.enterpriseName ? 'border-red-500' : 'border-slate-700'
            } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all duration-200`}
            placeholder="Nombre de tu peluquería"
          />
          {errors.enterpriseName && <p className="mt-1 text-xs text-red-500">{errors.enterpriseName.message}</p>}
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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className={`mt-1 block w-full px-4 py-3 bg-slate-900/50 border ${
              errors.confirmPassword ? 'border-red-500' : 'border-slate-700'
            } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all duration-200`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-[#0f172a] bg-[#c5a059] hover:bg-[#b08d4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c5a059] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-[#0f172a] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Crear Cuenta'
          )}
        </button>
      </form>

      <div className="text-center pt-4">
        <p className="text-sm text-slate-400">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-semibold text-[#c5a059] hover:text-[#b08d4a] transition-colors">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
