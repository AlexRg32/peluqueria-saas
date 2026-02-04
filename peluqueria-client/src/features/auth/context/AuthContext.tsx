import React, { createContext, useCallback, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authApi } from '../api/authApi';
import { LoginPayload, RegisterPayload, User } from '../types';
import { enterpriseService, Enterprise } from '@/services/enterpriseService';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  enterprise: Enterprise | null;
  token: string | null;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
  updateBranding: (primary?: string, secondary?: string) => void;
}

export const applyBranding = (primary?: string, secondary?: string) => {
  const root = document.documentElement;
  const defaultPrimary = '#c5a059';
  const defaultSecondary = '#1e293b';

  const p = primary || defaultPrimary;
  const s = secondary || defaultSecondary;

  root.style.setProperty('--color-brand-primary', p);
  root.style.setProperty('--color-brand-secondary', s);
  
  // Calculate shadow with opacity if it's a hex color
  if (p.startsWith('#')) {
    root.style.setProperty('--shadow-brand', `0 10px 15px -3px ${p}33`);
  }
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const processToken = useCallback((newToken: string) => {
    try {
      const decoded = jwtDecode<User>(newToken);
      setUser(decoded);
      setToken(newToken);
      localStorage.setItem('token', newToken);
      applyBranding(decoded.primaryColor, decoded.secondaryColor);
    } catch (error) {
      console.error('Invalid token', error);
      logout();
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setEnterprise(null);
    localStorage.removeItem('token');
  }, []);

  // Initialize auth state and handle unauthorized global events
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      processToken(storedToken);
    }
    setIsLoading(false);

    const handleUnauthorized = () => {
      logout();
      localStorage.setItem('auth_error', 'Su sesión ha expirado o no tiene permisos. Por favor, identifíquese de nuevo.');
    };

    window.addEventListener('auth-unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth-unauthorized', handleUnauthorized);
  }, [processToken, logout]);

  // Apply branding when user changes (e.g. after refresh)
  useEffect(() => {
    if (user) {
      // First apply from token (immediate)
      applyBranding(user.primaryColor, user.secondaryColor);
      
      // Then fetch live data if enterpriseId exists to overcome stale token issues
      if (user.enterpriseId) {
        enterpriseService.getById(user.enterpriseId)
          .then(ent => {
            setEnterprise(ent);
            applyBranding(ent.primaryColor, ent.secondaryColor);
          })
          .catch(err => {
            console.error('Error fetching live branding:', err);
            // If fetch fails, we still have the token's fallback
          });
      }
    } else {
      setEnterprise(null);
      applyBranding(); // Apply defaults
    }
  }, [user]);

  const login = async (data: LoginPayload) => {
    try {
      const response = await authApi.login(data);
      processToken(response.token);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterPayload) => {
    try {
      const response = await authApi.register(data);
      processToken(response.token);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        isLoading,
        user,
        enterprise,
        token,
        login,
        register,
        logout,
        updateBranding: applyBranding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
