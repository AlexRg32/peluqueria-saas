import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';

// Mock useAuth
vi.mock('@/features/auth/hooks/useAuth', () => ({
    useAuth: vi.fn(),
}));

import { useAuth } from '@/features/auth/hooks/useAuth';
const mockUseAuth = vi.mocked(useAuth);

const renderWithRouter = (ui: React.ReactElement) =>
    render(<BrowserRouter>{ui}</BrowserRouter>);

describe('BottomTabBar', () => {
    it('renders Home and Explore tabs always', () => {
        mockUseAuth.mockReturnValue({ isAuthenticated: false } as any);
        renderWithRouter(<BottomTabBar />);
        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Explorar')).toBeInTheDocument();
    });

    it('renders Acceder tab when not authenticated', () => {
        mockUseAuth.mockReturnValue({ isAuthenticated: false } as any);
        renderWithRouter(<BottomTabBar />);
        expect(screen.getByText('Acceder')).toBeInTheDocument();
        expect(screen.queryByText('Mis Citas')).not.toBeInTheDocument();
        expect(screen.queryByText('Perfil')).not.toBeInTheDocument();
    });

    it('renders Citas and Perfil tabs when authenticated', () => {
        mockUseAuth.mockReturnValue({ isAuthenticated: true } as any);
        renderWithRouter(<BottomTabBar />);
        expect(screen.getByText('Mis Citas')).toBeInTheDocument();
        expect(screen.getByText('Perfil')).toBeInTheDocument();
        expect(screen.queryByText('Acceder')).not.toBeInTheDocument();
    });
});
