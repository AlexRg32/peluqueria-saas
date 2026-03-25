import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProfilePlaceholder from './ProfilePlaceholder';

vi.mock('@/features/auth/hooks/useAuth', () => ({
    useAuth: () => ({
        isAuthenticated: true,
        user: {
            sub: 'alex@example.com',
            name: 'Alex',
            role: 'CLIENTE',
        },
    }),
}));

vi.mock('@/services/appointmentService', () => ({
    appointmentService: {
        getMine: vi.fn(() => Promise.resolve([])),
    },
}));

describe('ProfilePlaceholder', () => {
    it('renders page title', async () => {
        render(
            <BrowserRouter>
                <ProfilePlaceholder />
            </BrowserRouter>
        );
        expect(screen.getByText('Mi Perfil')).toBeInTheDocument();
        expect(await screen.findByText(/Mis citas/i)).toBeInTheDocument();
    });

    it('renders useful quick links', async () => {
        render(
            <BrowserRouter>
                <ProfilePlaceholder />
            </BrowserRouter>
        );
        expect(await screen.findByText(/Mis citas/i)).toBeInTheDocument();
        expect(await screen.findByText(/Explorar negocios/i)).toBeInTheDocument();
    });
});
