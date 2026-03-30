import React, { useEffect, useMemo, useState } from 'react';
import { 
    format, 
    addMonths, 
    subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  eachDayOfInterval, 
    startOfToday,
    isBefore,
    isAfter,
    setHours,
    setMinutes,
    isSameMinute,
    addMinutes
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type BusySlot } from '../../services/appointmentService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface WorkingHour {
    id?: number;
    day: string;
    startTime: string;
    endTime: string;
    dayOff: boolean;
    enterpriseId: number;
    userId?: number | null;
}

interface DateTimePickerProps {
    value?: string; // ISO String
    onChange: (value: string) => void;
    workingHours: WorkingHour[];
    busySlots?: BusySlot[];
    appointmentDurationMinutes?: number;
    label?: string;
    required?: boolean;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
}

const dayNameMap: Record<number, string> = {
    1: 'LUNES',
    2: 'MARTES',
    3: 'MIERCOLES',
    4: 'JUEVES',
    5: 'VIERNES',
    6: 'SABADO',
    0: 'DOMINGO',
};

const normalizeDate = (date: Date) => {
    const nextDate = new Date(date);
    nextDate.setSeconds(0);
    nextDate.setMilliseconds(0);
    return nextDate;
};

const buildDayWindow = (selectedDate: Date, dayConfig: WorkingHour) => {
    const [startH, startM] = dayConfig.startTime.split(':').map(Number);
    const [endH, endM] = dayConfig.endTime.split(':').map(Number);

    const startTime = normalizeDate(setMinutes(setHours(new Date(selectedDate), startH), startM));
    const endTime = normalizeDate(setMinutes(setHours(new Date(selectedDate), endH), endM));

    return { startTime, endTime };
};

const hasTimeOverlap = (
    slotStart: Date,
    slotEnd: Date,
    busyStart: Date,
    busyEnd: Date
) => slotStart < busyEnd && slotEnd > busyStart;

export const isDateTimeWithinWorkingHours = (
    selectedDate: Date,
    workingHours: WorkingHour[],
    appointmentDurationMinutes = 30
) => {
    const apiDayName = dayNameMap[selectedDate.getDay()];
    const dayConfig = workingHours.find((wh) => wh.day === apiDayName);

    if (!dayConfig || dayConfig.dayOff) {
        return false;
    }

    const normalizedDate = normalizeDate(selectedDate);
    const appointmentEnd = normalizeDate(addMinutes(normalizedDate, appointmentDurationMinutes));
    const { startTime, endTime } = buildDayWindow(selectedDate, dayConfig);

    return !isBefore(normalizedDate, startTime) && !isAfter(appointmentEnd, endTime);
};

export const isDateTimeBlocked = (
    selectedDate: Date,
    busySlots: BusySlot[],
    appointmentDurationMinutes = 30
) => {
    const normalizedDate = normalizeDate(selectedDate);
    const appointmentEnd = normalizeDate(addMinutes(normalizedDate, appointmentDurationMinutes));

    return busySlots.some((busySlot) => {
        const busyStart = normalizeDate(new Date(busySlot.start));
        const busyEnd = normalizeDate(new Date(busySlot.end));
        return hasTimeOverlap(normalizedDate, appointmentEnd, busyStart, busyEnd);
    });
};

export const buildTimeSlotStates = (
    selectedDate: Date | null,
    workingHours: WorkingHour[],
    busySlots: BusySlot[] = [],
    appointmentDurationMinutes = 30
) => {
    const slots = buildAvailableTimeSlots(selectedDate, workingHours, appointmentDurationMinutes);

    return slots.map((time) => ({
        time,
        isBusy: isDateTimeBlocked(time, busySlots, appointmentDurationMinutes),
    }));
};

export const buildAvailableTimeSlots = (
    selectedDate: Date | null,
    workingHours: WorkingHour[],
    appointmentDurationMinutes = 30
) => {
    if (!selectedDate || !workingHours.length) {
        return [];
    }

    const apiDayName = dayNameMap[selectedDate.getDay()];
    const dayConfig = workingHours.find((wh) => wh.day === apiDayName);

    if (!dayConfig || dayConfig.dayOff) {
        return [];
    }

    const { startTime, endTime } = buildDayWindow(selectedDate, dayConfig);
    const now = new Date();
    const slots: Date[] = [];
    let current = new Date(startTime);

    while (!isAfter(addMinutes(current, appointmentDurationMinutes), endTime)) {
        if (!isSameDay(selectedDate, now) || !isBefore(current, now)) {
            slots.push(new Date(current));
        }
        current = addMinutes(current, 30);
    }

    return slots;
};

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
    value,
    onChange,
    workingHours,
    busySlots = [],
    appointmentDurationMinutes = 30,
    label,
    required,
    placeholder = 'Seleccionar fecha y hora',
    error,
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [view, setView] = useState<'date' | 'time'>('date');
    const [pendingDate, setPendingDate] = useState<Date | null>(null);

    const selectedDate = value ? new Date(value) : null;
    const activeDate = pendingDate ?? selectedDate;

    // Calendar logic
    const days = useMemo(() => {
        const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
        const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end });
    }, [currentMonth]);

    const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    // Time slots logic
    const timeSlotStates = useMemo(
        () => buildTimeSlotStates(activeDate, workingHours, busySlots, appointmentDurationMinutes),
        [activeDate, appointmentDurationMinutes, busySlots, workingHours]
    );

    useEffect(() => {
        if (!selectedDate || !workingHours.length) {
            return;
        }

        if (
            !isDateTimeWithinWorkingHours(selectedDate, workingHours, appointmentDurationMinutes)
            || isDateTimeBlocked(selectedDate, busySlots, appointmentDurationMinutes)
        ) {
            onChange('');
        }
    }, [appointmentDurationMinutes, busySlots, onChange, selectedDate, workingHours]);

    useEffect(() => {
        if (disabled) {
            setIsOpen(false);
        }
    }, [disabled]);

    useEffect(() => {
        if (!isOpen) {
            setPendingDate(null);
            setView('date');
        }
    }, [isOpen]);

    const handleDateSelect = (date: Date) => {
        if (isBefore(date, startOfToday())) return;

        setPendingDate(normalizeDate(date));
        setView('time');
    };

    const handleTimeSelect = (time: Date) => {
        onChange(time.toISOString());
        setPendingDate(null);
        setIsOpen(false);
    };

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const availableSlotCount = timeSlotStates.filter((slot) => !slot.isBusy).length;
    const busySlotCount = timeSlotStates.filter((slot) => slot.isBusy).length;

    return (
        <div className="relative space-y-1.5 w-full">
            {label && (
                <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
                    <CalendarIcon size={14} className="text-brand-primary" />
                    {label}
                    {required && <span className="text-rose-500">*</span>}
                </label>
            )}

            <div 
                onClick={() => {
                    if (!disabled) {
                        setIsOpen(!isOpen);
                    }
                }}
                className={cn(
                    "relative w-full cursor-pointer transition-all bg-white rounded-xl border border-slate-200 hover:border-slate-300 px-4 py-3 min-h-[50px] flex items-center",
                    isOpen && "ring-2 ring-brand-primary/20 border-brand-primary shadow-sm",
                    error && "border-rose-500 ring-rose-500/10",
                    disabled && "cursor-not-allowed bg-slate-50 text-slate-400 hover:border-slate-200"
                )}
            >
                <div className="flex-1 overflow-hidden">
                    {selectedDate ? (
                        <div className="flex flex-col">
                            <span className="text-slate-900 font-medium capitalize">
                                {format(selectedDate, "eeee, d 'de' MMMM", { locale: es })}
                            </span>
                            <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                                <Clock size={10} />
                                {format(selectedDate, "HH:mm")}
                            </span>
                        </div>
                    ) : (
                        <span className={disabled ? "text-slate-300" : "text-slate-400"}>{placeholder}</span>
                    )}
                </div>
                <CalendarIcon size={18} className={disabled ? "text-slate-300" : "text-slate-400"} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[70] bg-slate-900/10 backdrop-blur-[1px]"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: -4, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute z-[80] left-0 right-0 bottom-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col min-w-[320px]"
                        >
                            {/* Header Toggle */}
                            <div className="flex border-b border-slate-100">
                                <button 
                                    type="button"
                                    onClick={() => setView('date')}
                                    className={cn(
                                        "flex-1 py-3 text-sm font-bold transition-all border-b-2",
                                        view === 'date' ? "text-brand-primary border-brand-primary bg-brand-primary/5" : "text-slate-400 border-transparent hover:text-slate-600"
                                    )}
                                >
                                    Fecha
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setView('time')}
                                    disabled={!selectedDate}
                                    className={cn(
                                        "flex-1 py-3 text-sm font-bold transition-all border-b-2 disabled:opacity-30",
                                        view === 'time' ? "text-brand-primary border-brand-primary bg-brand-primary/5" : "text-slate-400 border-transparent hover:text-slate-600"
                                    )}
                                >
                                    Hora
                                </button>
                            </div>

                            <div className="p-4">
                                {view === 'date' ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-bold text-slate-900 capitalize px-2">
                                                {format(currentMonth, 'MMMM yyyy', { locale: es })}
                                            </h4>
                                            <div className="flex gap-1">
                                                <button type="button" onClick={prevMonth} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                                                    <ChevronLeft size={20} />
                                                </button>
                                                <button type="button" onClick={nextMonth} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                                                    <ChevronRight size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-7 gap-1">
                                            {weekDays.map(d => (
                                                <div key={d} className="text-center py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    {d}
                                                </div>
                                            ))}
                                            {days.map((day, idx) => {
                                                const isCurrentMonth = isSameMonth(day, currentMonth);
                                                const isToday = isSameDay(day, new Date());
                                                const isPast = isBefore(day, startOfToday());
                                                const isSelected = activeDate && isSameDay(day, activeDate);

                                                return (
                                                    <button
                                                        type="button"
                                                        key={idx}
                                                        onClick={() => handleDateSelect(day)}
                                                        disabled={isPast}
                                                        className={cn(
                                                            "aspect-square flex items-center justify-center text-sm rounded-xl transition-all relative font-medium",
                                                            !isCurrentMonth && "text-slate-300",
                                                            isPast && "text-slate-200 cursor-not-allowed",
                                                            !isPast && isCurrentMonth && "text-slate-600 hover:bg-brand-primary/10 hover:text-brand-primary",
                                                            isToday && "text-brand-primary font-bold",
                                                            isSelected && "bg-brand-primary !text-slate-900 shadow-md shadow-brand-primary/20 scale-105 z-10"
                                                        )}
                                                    >
                                                        {format(day, 'd')}
                                                        {isToday && !isSelected && (
                                                            <div className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-primary" />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-1 px-2">
                                            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Disponibilidad</span>
                                            <span className="text-sm font-bold text-slate-900 capitalize">
                                                {activeDate ? format(activeDate, "eeee, d 'de' MMMM", { locale: es }) : 'Selecciona un día'}
                                            </span>
                                            {busySlotCount > 0 && (
                                                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-semibold">
                                                    <span className="text-emerald-600">{availableSlotCount} libres</span>
                                                    <span className="text-rose-500">{busySlotCount} ocupados</span>
                                                </div>
                                            )}
                                        </div>

                                        {timeSlotStates.length > 0 ? (
                                            <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                                {timeSlotStates.map(({ time, isBusy }, idx) => {
                                                    const isSelected = selectedDate && isSameMinute(time, selectedDate);
                                                    return (
                                                        <button
                                                            type="button"
                                                            key={idx}
                                                            onClick={() => handleTimeSelect(time)}
                                                            disabled={isBusy}
                                                            className={cn(
                                                                "py-2.5 px-3 rounded-xl text-sm font-bold transition-all border",
                                                                isSelected && !isBusy
                                                                    ? "bg-brand-primary border-brand-primary text-slate-900 shadow-lg shadow-brand-primary/20 scale-105" 
                                                                    : isBusy
                                                                        ? "border-rose-100 bg-rose-50 text-rose-300 cursor-not-allowed"
                                                                        : "border-slate-100 text-slate-600 hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5"
                                                            )}
                                                        >
                                                            {format(time, 'HH:mm')}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 mb-3">
                                                    <X size={24} />
                                                </div>
                                                <p className="text-sm font-bold text-slate-600">Sin huecos disponibles</p>
                                                <p className="text-xs text-slate-400 mt-1">
                                                    No hay horarios libres para esta fecha.
                                                </p>
                                                <button 
                                                    type="button"
                                                    onClick={() => setView('date')}
                                                    className="mt-4 text-xs font-bold text-brand-primary hover:underline"
                                                >
                                                    Elegir otro día
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {error && <p className="text-xs font-semibold text-rose-500 ml-1">{error}</p>}
        </div>
    );
};
