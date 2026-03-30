import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Controller, useForm } from 'react-hook-form';

import { DateTimePicker, type WorkingHour } from './DateTimePicker';

const workingHours: WorkingHour[] = [
  {
    day: 'MIERCOLES',
    startTime: '09:00',
    endTime: '20:00',
    dayOff: false,
    enterpriseId: 1,
    userId: 6,
  },
];

describe('DateTimePicker form behavior', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30T10:00:00+02:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not submit the parent form when navigating the calendar or picking a day', () => {
    const handleSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());

    const FormHarness = () => {
      const { control, watch } = useForm<{ date: string }>({
        defaultValues: { date: '' },
      });

      const dateValue = watch('date');

      return (
        <form onSubmit={handleSubmit}>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DateTimePicker
                value={field.value}
                onChange={(nextValue) =>
                  field.onChange({
                    target: {
                      name: field.name,
                      value: nextValue,
                    },
                  })
                }
                workingHours={workingHours}
                appointmentDurationMinutes={30}
              />
            )}
          />
          <output data-testid="date-value">{dateValue}</output>
          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<FormHarness />);

    fireEvent.click(screen.getByText('Seleccionar fecha y hora'));
    fireEvent.click(screen.getAllByRole('button', { name: '1', exact: true }).find((button) => !button.hasAttribute('disabled'))!);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Disponibilidad')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '09:00' })).toBeInTheDocument();
    expect(screen.queryByText('Sin huecos disponibles')).not.toBeInTheDocument();
    expect(screen.getByTestId('date-value').textContent).toBe('');
  });
});
