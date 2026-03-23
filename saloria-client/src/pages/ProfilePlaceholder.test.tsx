import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProfilePlaceholder from './ProfilePlaceholder';

describe('ProfilePlaceholder', () => {
    it('renders page title', () => {
        render(<ProfilePlaceholder />);
        expect(screen.getByText('Mi Perfil')).toBeInTheDocument();
    });

    it('renders Próximamente text', () => {
        render(<ProfilePlaceholder />);
        const badges = screen.getAllByText('Próximamente');
        expect(badges.length).toBeGreaterThan(0);
    });
});
