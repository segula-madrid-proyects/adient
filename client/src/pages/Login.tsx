import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `${API_URL}/login`;
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#f0ede5]">
      <div className="bg-[#faf9f6] px-14 py-12 rounded-2xl text-center max-w-120 w-[90%] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <div className="mb-8">
          <img
            src={`${import.meta.env.BASE_URL}logo-adient.png`}
            alt="ADIENT"
            className="max-h-16 object-contain"
          />
        </div>

        <h1 className="text-[2rem] font-bold text-[#2c3e2d] m-0 mb-2">
          Iniciar Sesión
        </h1>
        <p className="text-base text-[#7a7a6e] m-0 mb-9">
          Accede con tu cuenta de Workday
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-stretch">
          <div className="flex items-center border-b border-b-[#c8c4b8] py-3 mt-3 gap-3 focus-within:border-b-[#8b9a3a]">
            <span className="text-[#9a9a8e] flex shrink-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Nombre de usuario o correo corporativo"
              className="flex-1 border-none outline-none text-base text-[#2c3e2d] bg-transparent py-1 placeholder:text-[#aaa89e]"
            />
          </div>

          <div className="flex items-center border-b border-b-[#c8c4b8] py-3 mt-3 gap-3 focus-within:border-b-[#8b9a3a]">
            <span className="text-[#9a9a8e] flex shrink-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="flex-1 border-none outline-none text-base text-[#2c3e2d] bg-transparent py-1 placeholder:text-[#aaa89e]"
            />
            <button
              type="button"
              className="bg-transparent border-none cursor-pointer text-[#9a9a8e] flex p-0 shrink-0 hover:text-[#5a5a4e]"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="mt-8 bg-transparent border-none text-[#8b9a3a] text-[1.1rem] font-semibold cursor-pointer py-3 transition-colors hover:text-[#6d7a2a]"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
