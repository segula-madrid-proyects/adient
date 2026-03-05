import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="icon">🏢</div>
      <h1>Kiosko Corporativo</h1>
      <p className="subtitle">Sistema de Validación SAML</p>

      <button onClick={handleLogin} className="btn login-btn">
        🔐 Iniciar Sesión con Workday
      </button>
    </div>
  );
}

export default Login;
