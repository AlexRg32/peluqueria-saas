import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Welcome({ auth }) {
    useEffect(() => {
        // Simple reveal animation script
        const reveals = document.querySelectorAll('.reveal');
        
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 150;

            reveals.forEach((reveal) => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Trigger once on load
        
        return () => window.removeEventListener('scroll', revealOnScroll);
    }, []);

    return (
        <>
            <Head title="Peluquería SaaS | La Excelencia en Gestión" />
            
            <style>{`
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
                .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
                .reveal.active { opacity: 1; transform: translateY(0); }
                .stagger-1 { transition-delay: 100ms; }
                .stagger-2 { transition-delay: 200ms; }
                .stagger-3 { transition-delay: 300ms; }
                .text-gold-gradient {
                    background: linear-gradient(135deg, #b08d4b 0%, #d4b87a 50%, #99783d 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>

            <div className="font-sans antialiased text-[#2d2d2d] bg-[#fbf9f6] selection:bg-[#c5a059] selection:text-white min-h-screen scroll-smooth">
                {/* Navbar */}
                <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-[#fbf9f6]/80 border-b border-[#ede5da]/50">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <svg className="w-8 h-8 text-[#b08d4b]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7 6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V6zm2 1v10h6V7H9z" opacity="0.4"/>
                                <path fillRule="evenodd" d="M16.5 4a1.5 1.5 0 0 1 1.5 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18.5v-13A1.5 1.5 0 0 1 7.5 4h9zM8 6v12h8V6H8z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-2xl font-serif font-bold text-[#1a1a1a] tracking-tight">Peluquería<span className="text-[#b08d4b]"> SaaS</span></span>
                        </div>

                        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                            <a href="#features" className="hover:text-[#99783d] transition-colors">Características</a>
                            <a href="#solutions" className="hover:text-[#99783d] transition-colors">Soluciones</a>
                            <a href="#pricing" className="hover:text-[#99783d] transition-colors">Planes</a>
                        </div>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="text-sm font-semibold hover:text-[#99783d] transition-colors">Dashboard</Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="hidden md:block text-sm font-semibold hover:text-[#99783d] transition-colors">Iniciar Sesión</Link>
                                    <Link href={route('register')}
                                        className="px-6 py-2.5 bg-[#1a1a1a] text-white rounded-full text-sm font-medium hover:bg-[#b08d4b] transition-all duration-300 shadow-lg shadow-gray-200">
                                        Prueba Gratis
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative z-10 text-left reveal active">
                            <span className="inline-block py-1 px-3 border border-[#c5a059]/30 rounded-full text-xs font-bold uppercase tracking-widest text-[#99783d] mb-6 bg-[#f7f3ee]">
                                Gestión Premium para Salones
                            </span>
                            <h1 className="font-serif text-5xl md:text-7xl font-medium leading-[1.1] mb-8 text-[#1a1a1a]">
                                El arte de gestionar <br />
                                <span className="italic text-[#b08d4b]">tu salón.</span>
                            </h1>
                            <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed font-light">
                                Eleva la experiencia de tus clientes y optimiza tu negocio con la plataforma diseñada para la alta peluquería y estética.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href={route('register')}
                                    className="px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-medium text-lg hover:bg-[#b08d4b] transition-all duration-300 shadow-xl shadow-gray-200 flex items-center justify-center gap-3">
                                    Comenzar Ahora
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </Link>
                                <a href="#" className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-full font-medium text-lg hover:border-[#c5a059] hover:text-[#99783d] transition-all duration-300 flex items-center justify-center gap-3">
                                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                   Ver Demo
                                </a>
                            </div>
                        </div>

                        <div className="relative reveal stagger-2 active">
                            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50">
                                <img src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2000&auto=format&fit=crop" 
                                     alt="Salon Interior" 
                                     className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" />
                                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white max-w-xs">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-[#ede5da] overflow-hidden">
                                            <img src="https://i.pravatar.cc/100?img=5" alt="Client" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-[#1a1a1a]">Nueva Reserva</div>
                                            <div className="text-xs text-gray-500">Hace 2 minutos</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <span className="font-semibold text-[#b08d4b]">Corte & Styling</span> para mañana a las 10:00 AM confirmado.
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#ede5da] rounded-full blur-3xl opacity-50 -z-10"></div>
                            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#f7f3ee] rounded-full blur-3xl opacity-50 -z-10"></div>
                        </div>
                    </div>
                </section>

                <footer className="bg-[#1a1a1a] text-white py-12">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <span className="text-xl font-serif font-bold tracking-tight">Peluquería<span className="text-[#b08d4b]"> SaaS</span></span>
                        <p className="text-gray-500 mt-4 text-sm">&copy; {new Date().getFullYear()} Peluquería SaaS. Todos los derechos reservados.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
