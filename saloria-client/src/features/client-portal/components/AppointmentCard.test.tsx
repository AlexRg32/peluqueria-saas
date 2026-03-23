import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppointmentCard from './AppointmentCard';

describe('AppointmentCard', () => {
    it('renders service name', () => {
        render(
            <AppointmentCard serviceName="Corte Degradado" date="18 feb" time="10:00" status="PENDING" />
        );
        expect(screen.getByText('Corte Degradado')).toBeInTheDocument();
    });

    it('renders date and time', () => {
        render(
            <AppointmentCard serviceName="Corte" date="18 feb" time="10:00" status="PENDING" />
        );
        expect(screen.getByText('18 feb')).toBeInTheDocument();
        expect(screen.getByText('10:00')).toBeInTheDocument();
    });

    it('renders status badge', () => {
        render(
            <AppointmentCard serviceName="Corte" date="18 feb" time="10:00" status="PENDING" />
        );
        expect(screen.getByText('Pendiente')).toBeInTheDocument();
    });

    it('renders salon name when provided', () => {
        render(
            <AppointmentCard serviceName="Corte" date="18 feb" time="10:00" status="COMPLETED" salonName="Barbería Paco" />
        );
        expect(screen.getByText('Barbería Paco')).toBeInTheDocument();
        expect(screen.getByText('Completada')).toBeInTheDocument();
    });
});
