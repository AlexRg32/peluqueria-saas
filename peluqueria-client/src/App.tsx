import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import EnterprisePage from './pages/Enterprises';
import ServicesPage from './pages/Services';
import UsersPage from './pages/Users';
import CalendarPage from './pages/CalendarPage';
import { AuthProvider } from './features/auth/context/AuthContext';
import RequireAuth from './features/auth/components/RequireAuth';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
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
              
              {/* Common Routes */}
              <Route path="empresas" element={<EnterprisePage />} />
              
              {/* Admin & Super Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="servicios" element={<ServicesPage />} />
                <Route path="usuarios" element={<UsersPage />} />
                <Route path="citas" element={<CalendarPage />} />
              </Route>

              {/* Super Admin Only Routes */}
              <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']} />}>
                <Route path="superadmin/empresas" element={<div>Super Admin: All Enterprises</div>} />
              </Route>
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
