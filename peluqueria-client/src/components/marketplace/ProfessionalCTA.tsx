import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Users, Calendar } from 'lucide-react';

const ProfessionalCTA = () => {
  const benefits = [
    { icon: <Calendar className="text-brand-primary" />, text: "Agenda digital inteligente" },
    { icon: <Users className="text-brand-primary" />, text: "Gestión de clientes y fidelización" },
    { icon: <TrendingUp className="text-brand-primary" />, text: "Reportes de ventas y facturación" },
    { icon: <CheckCircle2 className="text-brand-primary" />, text: "Recordatorios automáticos por Email" },
  ];

  return (
    <section className="py-24 bg-slate-900 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-primary opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-primary opacity-5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
              Lleva tu negocio al <br />
              <span className="text-brand-primary">siguiente nivel</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-lg font-medium leading-relaxed">
              Únete a cientos de barberías y peluquerías que gestionan todo su negocio desde una sola plataforma. Ahorra tiempo y ofrece una experiencia premium a tus clientes.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-12">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4 text-white/90 font-bold group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                    {benefit.icon}
                  </div>
                  <span className="text-sm tracking-tight">{benefit.text}</span>
                </div>
              ))}
            </div>

            <Link 
              to="/pro/register" 
              className="inline-flex items-center justify-center px-10 py-5 bg-brand-primary text-slate-900 font-black rounded-2xl hover:bg-brand-secondary transition-all hover:scale-105 shadow-xl shadow-brand/20 uppercase tracking-widest text-sm"
            >
              Registrar mi Negocio Gratis
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl overflow-hidden shadow-brand/10">
              <img 
                src="https://images.unsplash.com/photo-1599351431202-1e0f01318992?w=800&auto=format&fit=crop&q=80" 
                alt="Admin Dashboard Preview" 
                className="rounded-2xl w-full shadow-2xl"
              />
            </div>
            
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl hidden md:block">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Citas hoy</div>
              <div className="text-3xl font-black text-slate-900">+24</div>
              <div className="text-emerald-500 text-xs font-bold mt-1">↑ 12% vs ayer</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalCTA;
