import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import EnterprisePage from './pages/Enterprises';
import ServicesPage from './pages/Services';
import UsersPage from './pages/Users';
import { AuthProvider } from './features/auth/context/AuthContext';
import RequireAuth from './features/auth/components/RequireAuth';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/empresas" replace />} />
              <Route path="empresas" element={<EnterprisePage />} />
              <Route path="servicios" element={<ServicesPage />} />
              <Route path="usuarios" element={<UsersPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
