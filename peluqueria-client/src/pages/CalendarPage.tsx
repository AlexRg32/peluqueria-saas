import { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useAuth } from '../features/auth/hooks/useAuth';
import { appointmentService, CreateAppointmentRequest, Appointment } from '../services/appointmentService';
import { CreateAppointmentModal } from '../components/appointments/CreateAppointmentModal';
import { AppointmentDetailsModal } from '../components/appointments/AppointmentDetailsModal';
import { Plus } from 'lucide-react';
import { getEmployeeColor } from '../utils/colors';

const CalendarPage = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    const loadAppointments = useCallback(async () => {
        if (user?.enterpriseId) {
            try {
                const data = await appointmentService.getAll(user.enterpriseId);
                const mappedEvents = data.map(app => {
                    const color = getEmployeeColor(app.employeeName);
                    return {
                        id: app.id.toString(),
                        title: `${app.customerName} - ${app.serviceName}`,
                        start: app.date,
                        end: new Date(new Date(app.date).getTime() + (app.duration || 30) * 60000),
                        backgroundColor: color,
                        borderColor: color,
                        allDay: false,
                        extendedProps: {
                            ...app
                        }
                    };
                });
                setEvents(mappedEvents);
                
                if (selectedAppointment) {
                    const updated = data.find(a => a.id === selectedAppointment.id);
                    if (updated) setSelectedAppointment(updated);
                }
            } catch (err) {
                console.error(err);
            }
        }
    }, [user?.enterpriseId, selectedAppointment]);

    useEffect(() => {
        loadAppointments();
    }, [user?.enterpriseId]);

    const handleDateSelect = (selectInfo: any) => {
        setSelectedDate(selectInfo.start);
        setIsModalOpen(true);
        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();
    };

    const handleEventClick = (clickInfo: any) => {
        setSelectedAppointment(clickInfo.event.extendedProps);
        setIsDetailsOpen(true);
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
                        Gestión profesional de turnos para tu negocio.
                    </p>
                </div>
                
                <button
                    onClick={() => { setSelectedDate(new Date()); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2.5 rounded-xl font-semibold shadow-brand transition-all active:scale-95"
                >
                    <Plus size={18} />
                    Nueva Cita
                </button>
            </header>

            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[700px]">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    locale="es"
                    events={events}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                    slotMinTime="08:00:00"
                    slotMaxTime="21:00:00"
                    allDaySlot={false}
                    slotDuration="00:15:00"
                    snapDuration="00:15:00"
                    nowIndicator={true}
                    height="auto"
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        meridiem: false,
                        hour12: false
                    }}
                    eventContent={(eventInfo) => {
                        const app = eventInfo.event.extendedProps;
                        const color = eventInfo.backgroundColor;
                        return (
                            <div className="flex h-full w-full overflow-hidden rounded-md border border-slate-200/50 bg-white shadow-sm">
                                <div className="w-1.5 h-full shrink-0" style={{ backgroundColor: color }} />
                                <div className="p-1.5 flex flex-col justify-center min-w-0 flex-1">
                                    <div className="font-bold truncate text-[11px] text-slate-800 leading-tight">
                                        {app.customerName}
                                    </div>
                                    <div className="text-slate-500 truncate text-[10px] leading-tight font-medium">
                                        {app.serviceName}
                                    </div>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter truncate">
                                            {app.employeeName}
                                        </span>
                                        {app.paid && (
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                />
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

            <AppointmentDetailsModal 
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                appointment={selectedAppointment}
                onStatusUpdate={loadAppointments}
            />
...
            <style>{`
                .fc {
                    --fc-border-color: #f1f5f9;
                    --fc-daygrid-event-dot-width: 8px;
                    --fc-today-bg-color: #f8fafc;
                    font-family: inherit;
                }
                .fc .fc-toolbar-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #0f172a;
                    text-transform: capitalize;
                }
                .fc .fc-button-primary {
                    background-color: white;
                    border-color: #e2e8f0;
                    color: #475569;
                    font-weight: 600;
                    text-transform: capitalize;
                    padding: 0.5rem 1rem;
                    border-radius: 0.75rem;
                }
                .fc .fc-button-primary:hover {
                    background-color: #f8fafc;
                    border-color: #cbd5e1;
                    color: #1e293b;
                }
                .fc .fc-button-primary:not(:disabled).fc-button-active {
                    background-color: #f1f5f9;
                    border-color: #cbd5e1;
                    color: #0f172a;
                }
                .fc-event {
                    background: transparent !important;
                    border: none !important;
                    padding: 0 !important;
                    margin: 2px !important;
                }
                .fc-event:hover {
                    z-index: 5;
                }
                .fc-timegrid-slot {
                    height: 3.5em !important;
                }
                .fc-timegrid-now-indicator-line {
                    border-color: #ef4444;
                }
                .fc-theme-standard td, .fc-theme-standard th {
                    border-color: #f1f5f9;
                }
                .fc-col-header-cell {
                    padding: 1rem 0 !important;
                    background: #f8fafc;
                }
                .fc-col-header-cell-cushion {
                    color: #64748b;
                    font-weight: 600;
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    letter-spacing: 0.05em;
                }
            `}</style>
        </section>
    );
};

export default CalendarPage;
