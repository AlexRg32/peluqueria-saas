import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Scissors, Smartphone, Star, Clock } from 'lucide-react';

const features = [
  {
    icon: <Scissors className="w-6 h-6 text-brand-primary" />,
    title: "Estilo a tu Medida",
    description: "Encuentra especialistas para todo tipo de cortes, desde clásicos hasta las últimas tendencias."
  },
  {
    icon: <Zap className="w-6 h-6 text-brand-primary" />,
    title: "Reserva Instantánea",
    description: "Olvídate de esperar al teléfono. Reserva tu cita en menos de 1 minuto 24/7."
  },
  {
    icon: <Star className="w-6 h-6 text-brand-primary" />,
    title: "Reseñas Verificadas",
    description: "Opiniones reales de clientes reales para que elijas siempre con total confianza."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-brand-primary" />,
    title: "App Responsive",
    description: "Accede, gestiona y modifica tus citas desde cualquier dispositivo de forma fácil."
  },
  {
    icon: <Clock className="w-6 h-6 text-brand-primary" />,
    title: "Sin Esperas",
    description: "Llega a tu hora y sé atendido de inmediato. Valoramos tu tiempo tanto como tú."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-brand-primary" />,
    title: "Pagos Seguros",
    description: "Opción de pago en el local o gestión simplificada de cobros para una experiencia fluida."
  }
];

const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group lg:even:bg-slate-50/50"
        >
          <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6 border border-brand-primary/20 group-hover:bg-brand-primary/20 transition-colors">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed italic">
            "{feature.description}"
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default Features;
