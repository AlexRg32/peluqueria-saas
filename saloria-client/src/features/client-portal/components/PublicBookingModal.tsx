import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Scissors, User, X } from 'lucide-react';

import { appointmentService, CreateAppointmentRequest } from '@/services/appointmentService';
import { WorkingHour } from '@/services/workingHourService';
import { SearchableSelect, Option } from '@/components/ui/SearchableSelect';
import { DateTimePicker } from '@/components/ui/DateTimePicker';

interface BookableService {
    id: number;
    name: string;
    price: number;
    duration: number;
    category: string;
}

interface BookableEmployee {
    id: number;
    name: string;
}

interface PublicBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    enterpriseId: number;
    userId: number;
    enterpriseName: string;
    services: BookableService[];
    employees: BookableEmployee[];
    workingHours: WorkingHour[];
    onBooked?: () => void;
}

export const PublicBookingModal = ({
    isOpen,
    onClose,
    enterpriseId,
    userId,
    enterpriseName,
    services,
    employees,
    workingHours,
    onBooked,
}: PublicBookingModalProps) => {
    const { control, handleSubmit, reset } = useForm<CreateAppointmentRequest>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const employeeOptions = useMemo<Option[]>(
        () =>
            employees.map((employee) => ({
                value: employee.id,
                label: employee.name,
            })),
        [employees]
    );

    const serviceOptions = useMemo<Option[]>(
        () =>
            services.map((service) => ({
                value: service.id,
                label: service.name,
                subLabel: `${service.price.toFixed(2)}€ · ${service.duration} min`,
            })),
        [services]
    );

    const handleClose = () => {
        setError(null);
        reset();
        onClose();
    };

    const submit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            setError(null);
            await appointmentService.create({
                enterpriseId,
                userId,
                employeeId: Number(data.employeeId),
                serviceId: Number(data.serviceId),
                date: data.date,
            });
            handleClose();
            onBooked?.();
        } catch (requestError: any) {
            setError(requestError?.response?.data?.message || 'No pudimos completar la reserva. Inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[80] flex items-start sm:items-center justify-center p-4 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.96 }}
                        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-2xl my-auto"
                    >
                        <div className="bg-slate-900 px-8 py-6 text-white relative">
                            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-brand-primary mb-2">
                                Reserva Online
                            </p>
                            <h2 className="text-2xl font-black tracking-tight">{enterpriseName}</h2>
                            <p className="text-slate-400 text-sm mt-1">Elige profesional, servicio y horario para confirmar tu cita.</p>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="absolute top-6 right-6 rounded-xl p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <form onSubmit={submit} className="p-8 space-y-6">
                            {error && (
                                <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                                    {error}
                                </div>
                            )}

                            {(services.length === 0 || employees.length === 0) ? (
                                <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
                                    <p className="text-lg font-bold text-slate-900">Todavía no se puede reservar online</p>
                                    <p className="text-sm text-slate-500 mt-2">
                                        Este negocio aún no ha publicado servicios o personal disponible para la reserva web.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <Controller
                                            control={control}
                                            name="employeeId"
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <SearchableSelect
                                                    label="Profesional"
                                                    placeholder="Selecciona profesional"
                                                    icon={User}
                                                    options={employeeOptions}
                                                    value={field.value || ''}
                                                    onChange={field.onChange}
                                                    required
                                                />
                                            )}
                                        />

                                        <Controller
                                            control={control}
                                            name="serviceId"
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <SearchableSelect
                                                    label="Servicio"
                                                    placeholder="Selecciona servicio"
                                                    icon={Scissors}
                                                    options={serviceOptions}
                                                    value={field.value || ''}
                                                    onChange={field.onChange}
                                                    required
                                                />
                                            )}
                                        />
                                    </div>

                                    <Controller
                                        control={control}
                                        name="date"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <DateTimePicker
                                                label="Fecha y hora"
                                                value={field.value}
                                                onChange={field.onChange}
                                                workingHours={workingHours}
                                                required
                                            />
                                        )}
                                    />
                                </>
                            )}

                            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="rounded-xl px-5 py-3 font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || services.length === 0 || employees.length === 0}
                                    className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-black text-slate-900 shadow-brand transition-all disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Calendar size={18} />
                                    {isSubmitting ? 'Reservando...' : 'Confirmar reserva'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
