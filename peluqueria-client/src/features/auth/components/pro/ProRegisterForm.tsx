import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  enterpriseName: z.string().min(1, 'El nombre de la empresa es obligatorio'),
  password: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres'),
  confirmPassword: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type ProRegisterFormValues = z.infer<typeof registerSchema>;

export const ProRegisterForm: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProRegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: ProRegisterFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        enterpriseName: data.enterpriseName,
      });
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrarse. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-sm">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white tracking-tight">Registro Profesional</h2>
        <p className="mt-2 text-slate-400">Registra tu peluquería en la plataforma</p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300">
            Nombre del Propietario
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`mt-1 block w-full px-4 py-3 bg-slate-900/50 border ${
              errors.name ? 'border-red-500' : 'border-slate-700'
            } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200`}
            placeholder="Ej: Juan Pérez"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">
            Email Profesional
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`mt-1 block w-full px-4 py-3 bg-slate-900/50 border ${
              errors.email ? 'border-red-500' : 'border-slate-700'
            } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200`}
            placeholder="correo@empresa.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="enterpriseName" className="block text-sm font-medium text-slate-300">
            Nombre de la Peluquería
          </label>
          <input
            id="enterpriseName"
            type="text"
            {...register('enterpriseName')}
            className={`mt-1 block w-full px-4 py-3 bg-slate-900/50 border ${
              errors.enterpriseName ? 'border-red-500' : 'border-slate-700'
            } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200`}
            placeholder="Ej: Barbería Estilo"
          />
          {errors.enterpriseName && <p className="mt-1 text-xs text-red-500">{errors.enterpriseName.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
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
              } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200`}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
              Repetir
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className={`mt-1 block w-full px-4 py-3 bg-slate-900/50 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-slate-700'
              } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-slate-900 bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-[#0f172a] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Registrar Empresa'
          )}
        </button>
      </form>

      <div className="text-center pt-4">
        <p className="text-sm text-slate-400">
          ¿Ya tienes cuenta profesional?{' '}
          <Link to="/pro/login" className="font-semibold text-brand-primary hover:opacity-80 transition-colors">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ProRegisterForm;
