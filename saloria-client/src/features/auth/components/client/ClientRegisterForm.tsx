import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const registerSchema = z.object({
  name: z.string().min(2, 'Cuéntanos cómo te llamas'),
  email: z.string().email('Introduce un email válido'),
  password: z.string().min(4, 'Mínimo 4 caracteres'),
  confirmPassword: z.string().min(4, 'Repite la contraseña'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type ClientRegisterFormValues = z.infer<typeof registerSchema>;

export const ClientRegisterForm: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientRegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: ClientRegisterFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        enterpriseName: '', // Envío vacío para indicar que es un CLIENTE
      });
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Algo ha ido mal. Prueba de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Únete a nosotros</h2>
        <p className="text-slate-500 font-medium">Reserva en tus sitios favoritos en segundos</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-bold text-slate-700 ml-1 mb-1">
            Nombre completo
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`block w-full px-5 py-4 bg-slate-50 border ${
              errors.name ? 'border-red-500' : 'border-slate-200'
            } rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all duration-200 placeholder:text-slate-400`}
            placeholder="Ej: Marc García"
          />
          {errors.name && <p className="mt-1 text-xs font-bold text-red-500 pr-2 text-right">{errors.name.message}</p>}
        </div>

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
          {errors.email && <p className="mt-1 text-xs font-bold text-red-500 pr-2 text-right">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-slate-700 ml-1 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`block w-full px-5 py-3.5 bg-slate-50 border ${
                errors.password ? 'border-red-500' : 'border-slate-200'
              } rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all duration-200 placeholder:text-slate-400`}
              placeholder="••••"
            />
            {errors.password && <p className="mt-1 text-xs font-bold text-red-500">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-700 ml-1 mb-1">
              Repetir
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className={`block w-full px-5 py-3.5 bg-slate-50 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-slate-200'
              } rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all duration-200 placeholder:text-slate-400`}
              placeholder="••••"
            />
            {errors.confirmPassword && <p className="mt-1 text-xs font-bold text-red-500">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-4 px-6 border border-transparent rounded-2xl shadow-xl text-lg font-bold text-slate-900 bg-brand-primary hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-brand-primary/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Crear mi cuenta'
          )}
        </button>
      </form>

      <div className="text-center mt-8 space-y-3">
        <p className="text-slate-500 font-medium">
          ¿Ya tienes cuenta?{' '}
          <Link to="/auth/login" className="font-bold text-slate-900 hover:text-brand-primary transition-colors">
            Inicia sesión
          </Link>
        </p>
        <div className="pt-4 border-t border-slate-100">
          <Link to="/pro/register" className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
            Soy una peluquería: Registro profesional
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientRegisterForm;
