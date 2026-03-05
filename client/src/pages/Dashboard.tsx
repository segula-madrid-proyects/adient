import { useNavigate } from 'react-router-dom';
import SessionTimer from '../components/SessionTimer';
import '../styles/dashboard.css';

const mockUser = {
  id: 'demo-001',
  email: 'empleado@adient.com',
  displayName: 'Empleado Demo',
  firstName: 'Empleado',
  lastName: 'Demo'
};

function Dashboard() {
  const navigate = useNavigate();
  const user = mockUser;

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      <div className="header">
        <h1>🏢 Kiosko Corporativo</h1>
        <button onClick={handleLogout} className="logout-btn">🚪 Cerrar Sesión</button>
      </div>

      <div className="container">
        <div className="welcome-card">
          <h2>¡Bienvenido, {user.displayName}! 👋</h2>
          <p className="subtitle">Has iniciado sesión correctamente mediante SAML 2.0</p>
          <span className="success-badge">✅ Autenticación exitosa</span>
        </div>

        <div className="user-info">
          <h3>📋 Información del Usuario</h3>

          <div className="info-row">
            <div className="info-label">ID de Usuario:</div>
            <div className="info-value">{user.id}</div>
          </div>

          <div className="info-row">
            <div className="info-label">Email:</div>
            <div className="info-value">{user.email}</div>
          </div>

          <div className="info-row">
            <div className="info-label">Nombre completo:</div>
            <div className="info-value">{user.displayName}</div>
          </div>

          <div className="info-row">
            <div className="info-label">Nombre:</div>
            <div className="info-value">{user.firstName}</div>
          </div>

          <div className="info-row">
            <div className="info-label">Apellido:</div>
            <div className="info-value">{user.lastName}</div>
          </div>

          <div className="auto-logout-warning">
            ⚠️ <strong>Importante para Kiosko:</strong> Por seguridad, la sesión se cerrará automáticamente tras 5 minutos de inactividad.
          </div>

          <SessionTimer />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
