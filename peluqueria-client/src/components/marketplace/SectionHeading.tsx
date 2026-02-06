import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeading = ({ title, subtitle, centered = false }: SectionHeadingProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1.5 w-20 bg-brand-primary rounded-full ${centered ? 'mx-auto' : ''}`} />
    </motion.div>
  );
};

export default SectionHeading;
