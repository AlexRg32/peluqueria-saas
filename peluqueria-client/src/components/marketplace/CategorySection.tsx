import { Scissors, User, Sparkles, Coffee } from 'lucide-react';
import CategoryCard from './CategoryCard';

const categories = [
    {
        title: "Corte & Estilo",
        description: "Degradados, cortes clásicos y las últimas tendencias.",
        icon: Scissors,
        image: "/assets/marketplace/cat-haircut.png"
    },
    {
        title: "Cuidado de Barba",
        description: "Perfilado, afeitado tradicional y tratamientos.",
        icon: User,
        image: "/assets/marketplace/cat-beard.png"
    },
    {
        title: "Tratamientos Premium",
        description: "Faciales, masajes capilares y spa masculino.",
        icon: Sparkles,
        image: "/assets/marketplace/cat-treatment.png"
    },
    {
        title: "Experiencia Total",
        description: "Servicios combinados con el mejor ambiente.",
        icon: Coffee,
        image: "https://images.unsplash.com/photo-1542060717-640985287e0b?w=800&auto=format&fit=crop&q=80"
    }
];

const CategorySection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
                        Explora por <span className="text-brand-primary">Categorías</span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                        Sea cual sea tu estilo, tenemos al profesional perfecto esperando para darte tu mejor versión.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat, index) => (
                        <CategoryCard 
                            key={cat.title}
                            {...cat}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
