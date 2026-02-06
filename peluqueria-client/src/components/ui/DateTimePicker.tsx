import React, { useState, useMemo } from 'react';
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
  setHours,
  setMinutes,
  isSameMinute
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
    label?: string;
    required?: boolean;
    placeholder?: string;
    error?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
    value,
    onChange,
    workingHours,
    label,
    required,
    placeholder = 'Seleccionar fecha y hora',
    error
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [view, setView] = useState<'date' | 'time'>('date');

    const selectedDate = value ? new Date(value) : null;

    // Calendar logic
    const days = useMemo(() => {
        const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
        const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end });
    }, [currentMonth]);

    const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    // Time slots logic
    const timeSlots = useMemo(() => {
        if (!selectedDate || !workingHours.length) return [];

        const dayNameMap: Record<number, string> = {
            1: 'LUNES', 2: 'MARTES', 3: 'MIERCOLES', 4: 'JUEVES', 5: 'VIERNES', 6: 'SABADO', 0: 'DOMINGO'
        };
        const dayOfWeek = selectedDate.getDay();
        const apiDayName = dayNameMap[dayOfWeek];

        const dayConfig = workingHours.find(wh => wh.day === apiDayName);
        if (!dayConfig || dayConfig.dayOff) return [];

        const slots: Date[] = [];
        const [startH, startM] = dayConfig.startTime.split(':').map(Number);
        const [endH, endM] = dayConfig.endTime.split(':').map(Number);

        // Clear time to avoid inheriting selectedDate's time too early
        let current = setMinutes(setHours(new Date(selectedDate), startH), startM);
        current.setSeconds(0);
        current.setMilliseconds(0);

        const endTime = setMinutes(setHours(new Date(selectedDate), endH), endM);
        endTime.setSeconds(0);
        endTime.setMilliseconds(0);

        // Don't show past times if today
        const now = new Date();

        while (isBefore(current, endTime)) {
            if (!isSameDay(selectedDate, now) || !isBefore(current, now)) {
                slots.push(new Date(current));
            }
            // Add 30 mins interval
            const nextMinutes = current.getMinutes() + 30;
            current.setMinutes(nextMinutes);
        }

        return slots;
    }, [selectedDate, workingHours]);

    const handleDateSelect = (date: Date) => {
        if (isBefore(date, startOfToday())) return;
        
        // If we already had a time selected, keep it if possible, else just move to time view
        const newDate = selectedDate ? 
            setMinutes(setHours(date, selectedDate.getHours()), selectedDate.getMinutes()) : 
            date;
            
        onChange(newDate.toISOString());
        setView('time');
    };

    const handleTimeSelect = (time: Date) => {
        onChange(time.toISOString());
        setIsOpen(false);
    };

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

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
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "relative w-full cursor-pointer transition-all bg-white rounded-xl border border-slate-200 hover:border-slate-300 px-4 py-3 min-h-[50px] flex items-center",
                    isOpen && "ring-2 ring-brand-primary/20 border-brand-primary shadow-sm",
                    error && "border-rose-500 ring-rose-500/10"
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
                        <span className="text-slate-400">{placeholder}</span>
                    )}
                </div>
                <CalendarIcon size={18} className="text-slate-400" />
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
                                    onClick={() => setView('date')}
                                    className={cn(
                                        "flex-1 py-3 text-sm font-bold transition-all border-b-2",
                                        view === 'date' ? "text-brand-primary border-brand-primary bg-brand-primary/5" : "text-slate-400 border-transparent hover:text-slate-600"
                                    )}
                                >
                                    Fecha
                                </button>
                                <button 
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
                                                <button onClick={prevMonth} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                                                    <ChevronLeft size={20} />
                                                </button>
                                                <button onClick={nextMonth} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
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
                                                const isSelected = selectedDate && isSameDay(day, selectedDate);

                                                return (
                                                    <button
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
                                            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Disponibles</span>
                                            <span className="text-sm font-bold text-slate-900 capitalize">
                                                {format(selectedDate!, "eeee, d 'de' MMMM", { locale: es })}
                                            </span>
                                        </div>

                                        {timeSlots.length > 0 ? (
                                            <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                                {timeSlots.map((time, idx) => {
                                                    const isSelected = selectedDate && isSameMinute(time, selectedDate);
                                                    return (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleTimeSelect(time)}
                                                            className={cn(
                                                                "py-2.5 px-3 rounded-xl text-sm font-bold transition-all border",
                                                                isSelected 
                                                                    ? "bg-brand-primary border-brand-primary text-slate-900 shadow-lg shadow-brand-primary/20 scale-105" 
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
                                                <p className="text-sm font-bold text-slate-600">Cerrado</p>
                                                <p className="text-xs text-slate-400 mt-1">
                                                    No hay horarios disponibles para esta fecha.
                                                </p>
                                                <button 
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
