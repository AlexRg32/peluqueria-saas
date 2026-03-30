import { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useAuth } from '../features/auth/hooks/useAuth';
import { enterpriseService } from '../services/enterpriseService';
import { appointmentService, AppointmentStatus, CreateAppointmentRequest, Appointment } from '../services/appointmentService';
import { CreateAppointmentModal } from '../components/appointments/CreateAppointmentModal';
import { AppointmentDetailsModal } from '../components/appointments/AppointmentDetailsModal';
import { Plus, Scissors } from 'lucide-react';
import { getEmployeeColor } from '../utils/colors';
import { SearchableSelect, Option } from '../components/ui/SearchableSelect';

const CalendarPage = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
    const [events, setEvents] = useState<any[]>([]);
    const [employees, setEmployees] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | ''>('');
    const [calendarFeedback, setCalendarFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [isDraggingAppointment, setIsDraggingAppointment] = useState(false);

    const employeeOptions: Option[] = employees.map((employee) => ({
        value: employee.id,
        label: employee.name
    }));

    const isAppointmentMovable = (appointment: Appointment | null | undefined) => (
        !!appointment && (
            appointment.status === AppointmentStatus.PENDING || appointment.status === AppointmentStatus.CONFIRMED
        )
    );

    const loadAppointments = useCallback(async () => {
        try {
            let data: Appointment[];
            if (selectedEmployeeId) {
                data = await appointmentService.getByEmployee(Number(selectedEmployeeId));
            } else if (!isAdmin && user?.userId) {
                // Employee: only their appointments
                data = await appointmentService.getByEmployee(user.userId);
            } else if (user?.enterpriseId) {
                // Admin: all enterprise appointments
                data = await appointmentService.getAll(user.enterpriseId);
            } else {
                return;
            }
            const mappedEvents = data.map(app => {
                const color = getEmployeeColor(app.employeeName);
                const movable = isAppointmentMovable(app);
                return {
                    id: app.id.toString(),
                    title: `${app.customerName} - ${app.serviceName}`,
                    start: app.date,
                    end: new Date(new Date(app.date).getTime() + (app.duration || 30) * 60000),
                    backgroundColor: color,
                    borderColor: color,
                    allDay: false,
                    editable: isAdmin && movable,
                    startEditable: isAdmin && movable,
                    durationEditable: false,
                    classNames: [
                        'calendar-appointment-card',
                        isAdmin && movable ? 'calendar-appointment-draggable' : 'calendar-appointment-locked'
                    ],
                    extendedProps: {
                        ...app
                    }
                };
            });
            const shouldShowOccupancyOverlay = !isAdmin || Boolean(selectedEmployeeId);
            const occupancyEvents = shouldShowOccupancyOverlay
                ? data
                    .filter((app) => app.status === AppointmentStatus.PENDING || app.status === AppointmentStatus.CONFIRMED)
                    .map((app) => ({
                        id: `busy-${app.id}`,
                        start: app.date,
                        end: new Date(new Date(app.date).getTime() + (app.duration || 30) * 60000),
                        display: 'background',
                        backgroundColor: app.status === AppointmentStatus.CONFIRMED
                            ? 'rgba(59, 130, 246, 0.12)'
                            : 'rgba(245, 158, 11, 0.16)',
                        classNames: [
                            'appointment-occupied-slot',
                            app.status === AppointmentStatus.CONFIRMED
                                ? 'appointment-occupied-slot-confirmed'
                                : 'appointment-occupied-slot-pending'
                        ]
                    }))
                : [];
            setEvents([...occupancyEvents, ...mappedEvents]);
            
            setSelectedAppointment((current) => {
                if (!current) {
                    return current;
                }

                const updated = data.find((appointment) => appointment.id === current.id);
                return updated || current;
            });
        } catch (err) {
            console.error(err);
        }
    }, [user?.enterpriseId, user?.userId, isAdmin, selectedEmployeeId]);

    useEffect(() => {
        if (!isAdmin || !user?.enterpriseId) {
            return;
        }

        enterpriseService.getEmployees(user.enterpriseId)
            .then((data) => setEmployees(data.sort((left, right) => left.name.localeCompare(right.name))))
            .catch((error) => console.error('Error loading employees:', error));
    }, [isAdmin, user?.enterpriseId]);

    useEffect(() => {
        loadAppointments();
    }, [loadAppointments]);

    const handleDateSelect = (selectInfo: any) => {
        setSelectedDate(selectInfo.start);
        setIsModalOpen(true);
        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();
    };

    const handleEventClick = (clickInfo: any) => {
        if (clickInfo.event.display === 'background') {
            return;
        }

        setSelectedAppointment(clickInfo.event.extendedProps);
        setIsDetailsOpen(true);
    };

    const handleCreateAppointment = async (data: CreateAppointmentRequest) => {
        try {
            await appointmentService.create(data);
            setIsModalOpen(false);
            setCalendarFeedback({ type: 'success', message: 'Cita creada correctamente.' });
            loadAppointments();
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.message || 'Error al crear la cita';
            alert(message);
        }
    };

    const handleEventDrop = async (dropInfo: any) => {
        const appointment = dropInfo.event.extendedProps as Appointment | undefined;
        const nextStart = dropInfo.event.start as Date | null;

        if (!appointment || !nextStart || !isAppointmentMovable(appointment)) {
            dropInfo.revert();
            return;
        }

        try {
            setIsDraggingAppointment(true);
            setCalendarFeedback(null);
            await appointmentService.reschedule(appointment.id, {
                date: nextStart.toISOString()
            });
            setCalendarFeedback({ type: 'success', message: 'Cita reprogramada desde la agenda.' });
            await loadAppointments();
        } catch (error: any) {
            dropInfo.revert();
            const message = error?.response?.data?.message || 'No se pudo mover la cita a ese hueco.';
            setCalendarFeedback({ type: 'error', message });
        } finally {
            setIsDraggingAppointment(false);
        }
    };

    const handleEventAllow = (dropInfo: any, draggedEvent: any) => {
        if (!isAdmin || draggedEvent.display === 'background') {
            return false;
        }

        const appointment = draggedEvent.extendedProps as Appointment | undefined;
        if (!isAppointmentMovable(appointment)) {
            return false;
        }

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        return dropInfo.start >= todayStart;
    };

    return (
        <section className="space-y-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {isAdmin ? 'Agenda de Citas' : 'Mi Agenda'}
                    </h1>
                    <p className="text-slate-500 mt-1">
                        {isAdmin ? 'Gestión profesional de turnos para tu negocio.' : 'Tus citas programadas.'}
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                    {isAdmin && (
                        <div className="w-full sm:w-72">
                            <SearchableSelect
                                label="Profesional en foco"
                                placeholder="Todas las agendas"
                                icon={Scissors}
                                options={employeeOptions}
                                value={selectedEmployeeId}
                                onChange={(value) => setSelectedEmployeeId(value === '' ? '' : Number(value))}
                            />
                        </div>
                    )}

                    {isAdmin && (
                        <button
                            onClick={() => { setSelectedDate(new Date()); setIsModalOpen(true); }}
                            className="flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2.5 rounded-xl font-semibold shadow-brand transition-all active:scale-95"
                        >
                            <Plus size={18} />
                            Nueva Cita
                        </button>
                    )}
                </div>
            </header>

            {(!isAdmin || selectedEmployeeId) && (
                <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600">
                    <span className="inline-flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        Pendiente bloquea hueco
                    </span>
                    <span className="inline-flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                        Confirmada bloquea hueco
                    </span>
                    {isAdmin && selectedEmployeeId && (
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Vista filtrada para selección precisa
                        </span>
                    )}
                </div>
            )}

            {isAdmin && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
                    Arrastra una cita pendiente o confirmada para reprogramarla directamente en la semana.
                </div>
            )}

            {calendarFeedback && (
                <div
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                        calendarFeedback.type === 'success'
                            ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                            : 'border border-rose-100 bg-rose-50 text-rose-700'
                    }`}
                >
                    {calendarFeedback.message}
                </div>
            )}

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
                    selectable={isAdmin}
                    editable={isAdmin}
                    eventStartEditable={isAdmin}
                    eventDurationEditable={false}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                    eventDrop={handleEventDrop}
                    eventAllow={handleEventAllow}
                    slotMinTime="08:00:00"
                    slotMaxTime="21:00:00"
                    allDaySlot={false}
                    slotDuration="00:15:00"
                    snapDuration="00:15:00"
                    nowIndicator={true}
                    height="auto"
                    eventDragMinDistance={8}
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        meridiem: false,
                        hour12: false
                    }}
                    eventContent={(eventInfo) => {
                        if (eventInfo.event.display === 'background') {
                            return null;
                        }

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
                                        {!isDraggingAppointment && app.paid && (
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
                    initialEmployeeId={selectedEmployeeId || undefined}
                />
            )}

            <AppointmentDetailsModal 
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                appointment={selectedAppointment}
                onStatusUpdate={loadAppointments}
                isAdmin={isAdmin}
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
                .fc .appointment-occupied-slot {
                    opacity: 1;
                }
                .fc .appointment-occupied-slot-confirmed {
                    background-color: rgba(59, 130, 246, 0.12) !important;
                }
                .fc .appointment-occupied-slot-pending {
                    background-color: rgba(245, 158, 11, 0.16) !important;
                }
                .fc .calendar-appointment-draggable {
                    cursor: grab;
                }
                .fc .calendar-appointment-draggable:active {
                    cursor: grabbing;
                }
                .fc .calendar-appointment-locked {
                    cursor: default;
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
