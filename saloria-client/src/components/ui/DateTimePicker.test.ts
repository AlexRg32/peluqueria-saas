import { describe, expect, it } from 'vitest';

import { buildAvailableTimeSlots, buildTimeSlotStates, isDateTimeBlocked, isDateTimeWithinWorkingHours, type WorkingHour } from './DateTimePicker';

const workingHours: WorkingHour[] = [
    {
        day: 'LUNES',
        startTime: '09:00',
        endTime: '20:00',
        dayOff: false,
        enterpriseId: 1,
        userId: 5,
    },
];

describe('DateTimePicker availability helpers', () => {
    it('omits slots that would finish after closing time', () => {
        const selectedDate = new Date(2026, 3, 6, 10, 0, 0);

        const slots = buildAvailableTimeSlots(selectedDate, workingHours, 60);
        const formattedSlots = slots.map((slot) => `${slot.getHours()}:${slot.getMinutes().toString().padStart(2, '0')}`);

        expect(formattedSlots).toContain('19:00');
        expect(formattedSlots).not.toContain('19:30');
    });

    it('matches backend-style end-time validation for a selected appointment', () => {
        expect(isDateTimeWithinWorkingHours(new Date(2026, 2, 30, 19, 0, 0), workingHours, 60)).toBe(true);
        expect(isDateTimeWithinWorkingHours(new Date(2026, 2, 30, 19, 30, 0), workingHours, 60)).toBe(false);
    });

    it('marks overlapping busy slots as blocked', () => {
        const busySlots = [
            {
                appointmentId: 12,
                start: '2026-04-06T10:00:00',
                end: '2026-04-06T11:00:00',
                status: 'CONFIRMED',
            },
        ];

        expect(isDateTimeBlocked(new Date(2026, 3, 6, 10, 30, 0), busySlots, 30)).toBe(true);
        expect(isDateTimeBlocked(new Date(2026, 3, 6, 11, 0, 0), busySlots, 30)).toBe(false);
    });

    it('keeps occupied slots visible for visual feedback', () => {
        const selectedDate = new Date(2026, 3, 6, 9, 0, 0);
        const busySlots = [
            {
                appointmentId: 18,
                start: '2026-04-06T10:00:00',
                end: '2026-04-06T10:30:00',
                status: 'PENDING',
            },
        ];

        const slotStates = buildTimeSlotStates(selectedDate, workingHours, busySlots, 30);
        const occupied = slotStates.find((slot) => slot.time.getHours() === 10 && slot.time.getMinutes() === 0);

        expect(occupied?.isBusy).toBe(true);
        expect(slotStates.some((slot) => slot.isBusy)).toBe(true);
    });
});
