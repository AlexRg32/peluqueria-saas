import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Enterprise, enterpriseService } from '../services/enterpriseService';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Calendar, MapPin, Phone, Globe, Facebook, Instagram, MessageCircle, Loader2, ChevronRight, User } from 'lucide-react';
import { apiClient } from '../lib/axios';

interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  duration: number;
  category: string;
}

interface Employee {
  id: number;
  name: string;
  role: string;
}

const BarbershopProfilePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (slug) {
      loadData();
    }
  }, [slug]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await enterpriseService.getBySlug(slug!);
      setEnterprise(data);

      // Fetch services and employees
      const [servicesRes, employeesRes] = await Promise.all([
        apiClient.get<Service[]>(`/api/public/enterprises/${data.id}/services`),
        apiClient.get<Employee[]>(`/api/public/enterprises/${data.id}/employees`)
      ]);

      setServices(servicesRes.data);
      setEmployees(employeesRes.data);
    } catch (err: any) {
      if (err.response?.status !== 404) {
        console.error("Error fetching enterprise data:", err);
      }
      setError("No pudimos encontrar la barbería que buscas.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        <p className="text-gray-500 font-medium">Cargando barbería...</p>
      </div>
    );
  }

  if (error || !enterprise) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-red-50 p-4 rounded-full mb-4">
           <MapPin size={48} className="text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Ups!</h2>
        <p className="text-gray-600 mb-6">{error || "Barbería no encontrada."}</p>
        <Link to="/" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  const primaryColor = enterprise.primaryColor || '#4f46e5';

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Banner */}
      <div className="h-48 md:h-64 lg:h-80 w-full bg-gray-300 relative overflow-hidden">
        {enterprise.banner ? (
          <img 
            src={enterprise.banner} 
            alt={`Banner de ${enterprise.name}`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center">
            <span className="text-white/10 text-6xl md:text-9xl font-black uppercase tracking-tighter select-none">
              {enterprise.name}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start">
          
          {/* Logo */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-white shadow-lg overflow-hidden bg-white rotate-3">
              {enterprise.logo ? (
                <img 
                  src={enterprise.logo} 
                  alt={`Logo de ${enterprise.name}`} 
                  className="w-full h-full object-cover -rotate-3"
                />
              ) : (
                <div className="w-full h-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-4xl -rotate-3">
                  {enterprise.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Info Header */}
          <div className="flex-1 text-center md:text-left pt-2 md:pt-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900">{enterprise.name}</h1>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
              </div>
            </div>
            <p className="text-slate-500 text-lg mb-6 max-w-2xl leading-relaxed">
              {enterprise.description || "Tu barbería de confianza para un look impecable."}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium text-slate-600 mb-8 border-t border-slate-100 pt-6">
              {enterprise.address && (
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-slate-100 rounded-lg text-slate-400"><MapPin size={16} /></div>
                  <span>{enterprise.address}</span>
                </div>
              )}
              {enterprise.phone && (
                 <div className="flex items-center gap-2">
                   <div className="p-1.5 bg-slate-100 rounded-lg text-slate-400"><Phone size={16} /></div>
                   <span>{enterprise.phone}</span>
                 </div>
              )}
            </div>

            {/* Social & Web */}
            <div className="flex justify-center md:justify-start gap-3">
               {[
                 { show: enterprise.website, icon: <Globe size={20} />, href: enterprise.website, hover: 'hover:bg-blue-50 hover:text-blue-600' },
                 { show: enterprise.instagram, icon: <Instagram size={20} />, href: enterprise.instagram, hover: 'hover:bg-pink-50 hover:text-pink-600' },
                 { show: enterprise.facebook, icon: <Facebook size={20} />, href: enterprise.facebook, hover: 'hover:bg-indigo-50 hover:text-indigo-600' },
                 { show: enterprise.whatsapp, icon: <MessageCircle size={20} />, href: `https://wa.me/${enterprise.whatsapp}`, hover: 'hover:bg-green-50 hover:text-green-600' }
               ].filter(s => s.show).map((social, idx) => (
                 <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className={`p-2.5 bg-slate-100 rounded-xl transition-all text-slate-400 ${social.hover}`}>
                   {social.icon}
                 </a>
               ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="md:pt-4 flex flex-col gap-3 min-w-[240px]">
             <button 
                className="w-full py-4 px-8 rounded-2xl shadow-lg font-bold text-white transition-all hover:translate-y-[-2px] active:translate-y-0 flex items-center justify-center gap-3 text-lg"
                style={{ backgroundColor: primaryColor }}
             >
                <Calendar size={22} />
                Reservar Ahora
             </button>
             {!isAuthenticated && (
               <p className="text-center text-xs text-slate-400 font-medium">Inicia sesión para ganar puntos</p>
             )}
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Services Column (Main) */}
            <div className="md:col-span-2 space-y-8">
                <section>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-black text-slate-900">Servicios Disponibles</h3>
                      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{services.length} Servicios</span>
                    </div>
                    
                    <div className="grid gap-4">
                        {services.length === 0 ? (
                          <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-slate-100">
                             <p className="text-slate-400 font-medium">No hay servicios publicados todavía.</p>
                          </div>
                        ) : (
                          services.map((service) => (
                            <div 
                              key={service.id} 
                              className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer flex justify-between items-center group relative overflow-hidden"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md">{service.category}</span>
                                      <span className="text-[10px] font-bold text-slate-400">{service.duration} min</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-800">{service.name}</h4>
                                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">{service.description || 'Consulta con el especialista'}</p>
                                </div>
                                <div className="flex items-center gap-6 ml-4">
                                    <div className="text-right">
                                      <span className="block text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{service.price.toFixed(2)}€</span>
                                    </div>
                                    <div className="p-3 bg-slate-900 text-white rounded-xl group-hover:bg-indigo-600 transition-colors shadow-lg">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </div>
                          ))
                        )}
                    </div>
                </section>

                <section>
                   <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-black text-slate-900">Nuestro Equipo</h3>
                   </div>
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {employees.length === 0 ? (
                           <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-slate-100 italic text-slate-400">
                              No hay miembros registrados.
                           </div>
                        ) : (
                          employees.map((emp) => (
                              <div key={emp.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all text-center group">
                                  <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all">
                                     <User size={32} />
                                  </div>
                                  <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{emp.name}</h4>
                                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-1">Especialista</p>
                              </div>
                          ))
                        )}
                   </div>
                </section>
            </div>

            {/* Sidebar info */}
            <div className="space-y-8">
                {/* Hours */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                    <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                       <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                       Horarios
                    </h3>
                    <div className="space-y-4">
                        {[
                          { day: 'Lunes - Viernes', hours: '09:00 - 20:00' },
                          { day: 'Sábado', hours: '09:00 - 14:00' },
                          { day: 'Domingo', hours: 'Cerrado', closed: true }
                        ].map((h, i) => (
                          <div key={i} className={`flex justify-between items-center py-3 ${i !== 2 ? 'border-b border-white/10' : ''}`}>
                              <span className="text-slate-400 text-sm font-medium">{h.day}</span>
                              <span className={`text-sm font-bold ${h.closed ? 'text-indigo-400' : 'text-white'}`}>{h.hours}</span>
                          </div>
                        ))}
                    </div>
                </div>

                {/* Map/Location */}
                <div className="bg-white rounded-3xl shadow-sm p-6 border border-slate-100">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-4">Ubicación</h3>
                    <div className="h-48 bg-slate-100 rounded-2xl w-full flex flex-col items-center justify-center text-slate-300 mb-4 group cursor-pointer hover:bg-slate-50 transition-colors border-2 border-dashed border-slate-200">
                        <MapPin size={40} className="group-hover:text-indigo-400 transition-colors group-hover:animate-bounce" />
                        <span className="text-xs font-bold uppercase tracking-widest mt-2">Ver en Google Maps</span>
                    </div>
                    <div className="flex gap-3">
                       <MapPin size={24} className="text-indigo-500 flex-shrink-0" />
                       <p className="text-sm font-bold text-slate-700 leading-relaxed">{enterprise.address}</p>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default BarbershopProfilePage;
