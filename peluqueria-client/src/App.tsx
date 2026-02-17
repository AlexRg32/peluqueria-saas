import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ClientPortalLayout from './components/layout/ClientPortalLayout';
import EnterprisePage from './pages/Enterprises';
import ServicesPage from './pages/Services';
import UsersPage from './pages/Users';
import CalendarPage from './pages/CalendarPage';
import CustomersPage from './pages/Customers';
import DashboardPage from './pages/Dashboard';
import ClientPortalPage from './pages/ClientPortal';
import BillingPage from './pages/Billing';
import SearchPage from './pages/SearchPage';
import ProfilePlaceholder from './pages/ProfilePlaceholder';
import { AuthProvider } from './features/auth/context/AuthContext';
import RequireAuth from './features/auth/components/RequireAuth';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import ClientLoginPage from './features/auth/pages/client/ClientLoginPage';
import ClientRegisterPage from './features/auth/pages/client/ClientRegisterPage';
import ProLoginPage from './features/auth/pages/pro/ProLoginPage';
import ProRegisterPage from './features/auth/pages/pro/ProRegisterPage';
import { useAuth } from './features/auth/hooks/useAuth';

const RoleRedirect = () => {
  const { user } = useAuth();
  if (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || user?.role === 'EMPLEADO') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <Navigate to="/portal" replace />;
};

const SmartHome = () => {
  const { user, isAuthenticated } = useAuth();
  if (isAuthenticated && (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || user?.role === 'EMPLEADO')) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <ClientPortalPage />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Unified Client Experience - Public at root */}
          <Route element={<ClientPortalLayout />}>
            <Route path="/" element={<SmartHome />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/b/:slug" element={<div className="p-10 text-center">Perfil de Barbería próximamente</div>} />
            
            {/* Protected Client Routes */}
            <Route element={<RequireAuth />}>
              <Route path="/citas" element={<div>Próximamente: Historial de Citas</div>} />
              <Route path="/perfil" element={<ProfilePlaceholder />} />
            </Route>
          </Route>

          {/* Public Auth Routes - Clients */}
          <Route path="/auth/login" element={<ClientLoginPage />} />
          <Route path="/auth/register" element={<ClientRegisterPage />} />

          {/* Public Auth Routes - Professionals */}
          <Route path="/pro/login" element={<ProLoginPage />} />
          <Route path="/pro/register" element={<ProRegisterPage />} />

          {/* Legacy Redirects */}
          <Route path="/login" element={<Navigate to="/auth/login" replace />} />
          <Route path="/register" element={<Navigate to="/auth/register" replace />} />
          <Route path="/portal" element={<Navigate to="/" replace />} />

          <Route path="/admin" element={<RequireAuth />}>
            <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN', 'EMPLEADO']} />}>
              <Route element={<MainLayout />}>
                <Route index element={<RoleRedirect />} />
                <Route path="dashboard" element={<DashboardPage />} />
                
                {/* Shared Routes: ADMIN, SUPER_ADMIN, EMPLEADO */}
                <Route path="citas" element={<CalendarPage />} />
                <Route path="servicios" element={<ServicesPage />} />
                <Route path="clientes" element={<CustomersPage />} />
                
                {/* Admin & Super Admin Only Routes */}
                <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
                  <Route path="usuarios" element={<UsersPage />} />
                  <Route path="facturacion" element={<BillingPage />} />
                  <Route path="empresas" element={<EnterprisePage />} />
                </Route>

                {/* Super Admin Only Routes */}
                <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']} />}>
                  <Route path="superadmin/empresas" element={<div>Super Admin: All Enterprises</div>} />
                </Route>
              </Route>
            </Route>
          </Route>

          {/* Global Redirects */}
          <Route path="/admin/inicio" element={<Navigate to="/" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
