import { motion } from 'framer-motion';
import { Search, CalendarDays, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "1. Explora",
    description: "Busca las mejores barberías y peluquerías en tu ciudad por estilo o valoración."
  },
  {
    icon: <CalendarDays className="w-8 h-8" />,
    title: "2. Reserva",
    description: "Elige tu servicio favorito y selecciona el horario que mejor te convenga en segundos."
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "3. Disfruta",
    description: "Recibe recordatorios automáticos y disfruta de tu cita sin esperas ni llamadas."
  }
];

const HowItWorks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="relative text-center group"
        >
          {/* Connector Line (Desktop) */}
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 border-t-2 border-dashed border-slate-200 -z-10 translate-x-12" />
          )}
          
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-xl text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-2 border border-slate-50">
            {step.icon}
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
          <p className="text-slate-500 leading-relaxed">
            {step.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default HowItWorks;
