import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, View, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../features/auth/hooks/useAuth';
import { appointmentService, CreateAppointmentRequest } from '../services/appointmentService';
import { CreateAppointmentModal } from '../components/appointments/CreateAppointmentModal';
import { Plus } from 'lucide-react';

const locales = {
    'es': es,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const messages = {
    allDay: 'Todo el día',
    previous: 'Anterior',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay citas en este rango',
    showMore: (total: number) => `+ Ver más (${total})`
};

interface CalendarEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    resource: any;
}

const CalendarPage = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [view, setView] = useState<View>(Views.WEEK);

    const loadAppointments = async () => {
        if (user?.enterpriseId) {
            try {
                const data = await appointmentService.getAll(user.enterpriseId);
                const mappedEvents = data.map(app => ({
                    id: app.id,
                    title: `${app.customerName} - ${app.serviceName} (${app.employeeName})`,
                    start: new Date(app.date),
                    end: new Date(new Date(app.date).getTime() + (app.duration || 30) * 60000),
                    resource: app
                }));
                setEvents(mappedEvents);
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        loadAppointments();
    }, [user?.enterpriseId]);

    const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
        setSelectedDate(slotInfo.start);
        setIsModalOpen(true);
    };

    const handleCreateAppointment = async (data: CreateAppointmentRequest) => {
        try {
            await appointmentService.create(data);
            setIsModalOpen(false);
            loadAppointments();
        } catch (error) {
            console.error(error);
            alert('Error al crear la cita');
        }
    };

    return (
        <section className="space-y-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Agenda de Citas
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Gestiona el calendario y las citas de tu negocio de forma visual.
                    </p>
                </div>
                
                <button
                    onClick={() => { setSelectedDate(undefined); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-[#c5a059] hover:bg-[#b38f4a] text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-[#c5a059]/30 transition-all active:scale-95"
                >
                    <Plus size={18} />
                    Nueva Cita
                </button>
            </header>

            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-[700px]">
                <div className="flex-1 min-h-0">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        messages={messages}
                        culture="es"
                        style={{ height: '100%' }}
                        view={view}
                        onView={setView}
                        selectable
                        onSelectSlot={handleSelectSlot}
                        eventPropGetter={() => ({
                            style: {
                                backgroundColor: '#c5a059',
                                borderRadius: '10px',
                                color: 'white',
                                border: 'none',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                padding: '4px 8px',
                                boxShadow: '0 4px 12px -2px rgba(197, 160, 89, 0.3)'
                            }
                        })}
                    />
                </div>
            </div>

            {user?.enterpriseId && (
                <CreateAppointmentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateAppointment}
                    enterpriseId={user.enterpriseId}
                    initialDate={selectedDate}
                />
            )}
        </section>
    );
};

export default CalendarPage;
