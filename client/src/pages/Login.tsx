import { useState } from 'react';
import '../styles/login.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `${API_URL}/login`;
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          {/* Reemplaza este placeholder con el logo de Adient */}
          <img src={`${import.meta.env.BASE_URL}logo-adient.png`} alt="ADIENT" className="logo-img" />
        </div>

        <h1 className="login-title">Iniciar Sesión</h1>
        <p className="login-subtitle">Accede a tu cuenta de empleado ADIENT</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <span className="input-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Nombre de usuario o correo corporativo"
              className="login-input"
            />
          </div>
          <a href="#" className="forgot-link">¿Olvidaste tu nombre de usuario?</a>

          <div className="input-group">
            <span className="input-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              className="login-input"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                </svg>
              )}
            </button>
          </div>
          <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>

          <button type="submit" className="login-btn">Entrar</button>
        </form>

        <p className="login-legal">
          Al iniciar sesión, aceptas nuestros <a href="#">Términos de Servicio</a> y la <a href="#">Política de Protección de Datos</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
