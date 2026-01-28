import React, { useEffect } from 'react';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/empresas', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black px-4 py-12">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
