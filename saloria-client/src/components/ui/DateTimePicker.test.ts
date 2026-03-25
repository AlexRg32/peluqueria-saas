import { describe, expect, it } from 'vitest';

import { buildAvailableTimeSlots, isDateTimeWithinWorkingHours, type WorkingHour } from './DateTimePicker';

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
        const selectedDate = new Date(2026, 2, 30, 10, 0, 0);

        const slots = buildAvailableTimeSlots(selectedDate, workingHours, 60);
        const formattedSlots = slots.map((slot) => `${slot.getHours()}:${slot.getMinutes().toString().padStart(2, '0')}`);

        expect(formattedSlots).toContain('19:00');
        expect(formattedSlots).not.toContain('19:30');
    });

    it('matches backend-style end-time validation for a selected appointment', () => {
        expect(isDateTimeWithinWorkingHours(new Date(2026, 2, 30, 19, 0, 0), workingHours, 60)).toBe(true);
        expect(isDateTimeWithinWorkingHours(new Date(2026, 2, 30, 19, 30, 0), workingHours, 60)).toBe(false);
    });
});
