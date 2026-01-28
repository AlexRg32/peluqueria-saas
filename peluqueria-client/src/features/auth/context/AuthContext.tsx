import React, { createContext, useCallback, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authApi } from '../api/authApi';
import { LoginPayload, RegisterPayload, User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const processToken = useCallback((newToken: string) => {
    try {
      const decoded = jwtDecode<User>(newToken);
      setUser(decoded);
      setToken(newToken);
      localStorage.setItem('token', newToken);
    } catch (error) {
      console.error('Invalid token', error);
      logout();
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  // Initialize auth state
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      processToken(storedToken);
    }
    setIsLoading(false);
  }, [processToken, logout]);

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
        token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
