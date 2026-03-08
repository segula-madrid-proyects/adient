import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `${API_URL}/login`;
  };

  return (
    <div className="fixed inset-0 flex">
      {/* ── Panel izquierdo — marca ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1a3a4a] flex-col justify-between p-12 relative overflow-hidden">
        {/* Círculos decorativos */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-16 w-[480px] h-[480px] rounded-full bg-[#8b9a3a]/20" />
        <div className="absolute top-1/2 -right-12 w-48 h-48 rounded-full bg-white/5" />

        {/* Logo */}
        <div className="relative z-10">
          <img
            src={`${import.meta.env.BASE_URL}logo-adient.png`}
            alt="ADIENT"
            className="h-10 object-contain brightness-0 invert"
          />
        </div>

        {/* Texto central */}
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Tu portal de
            <br />
            empleado,
            <br />
            <span className="text-[#a8bb5a]">todo en uno.</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-xs">
            Accede a tu nómina, horario, vacaciones y recursos corporativos
            desde un solo lugar.
          </p>
        </div>

        {/* Footer izquierdo */}
        <div className="relative z-10">
          <p className="text-white/30 text-sm">
            © 2026 Adient. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* ── Panel derecho — formulario ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-[#f5f4f0] px-8">
        {/* Logo visible solo en móvil */}
        <div className="lg:hidden mb-10">
          <img
            src={`${import.meta.env.BASE_URL}logo-adient.png`}
            alt="ADIENT"
            className="h-10 object-contain"
          />
        </div>

        <div className="w-full max-w-sm space-y-8">
          {/* Encabezado */}
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-[#1a1a1a] tracking-tight">
              Bienvenido de nuevo
            </h2>
            <p className="text-sm text-[#7a7a6e]">
              Inicia sesión con tu cuenta corporativa de Workday
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="username"
                className="text-[#2c3e2d] text-sm font-medium"
              >
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="correo@empresa.com"
                className="h-11 bg-white border-[#e0ddd5] text-[#1a1a1a] placeholder:text-[#b0ae9e] focus-visible:ring-[#8b9a3a]/40 focus-visible:border-[#8b9a3a]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-[#2c3e2d] text-sm font-medium"
                >
                  Contraseña
                </Label>
                <a
                  href="#"
                  className="text-xs text-[#8b9a3a] hover:text-[#6d7a2a] font-medium transition-colors"
                >
                  ¿La olvidaste?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 bg-white border-[#e0ddd5] text-[#1a1a1a] placeholder:text-[#b0ae9e] focus-visible:ring-[#8b9a3a]/40 focus-visible:border-[#8b9a3a] pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a9a8e] hover:text-[#5a5a4e] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-[#2c3e2d] hover:bg-[#1e2e1f] text-white font-medium text-sm transition-colors mt-2 group"
            >
              Iniciar sesión
              <ArrowRight
                size={16}
                className="ml-2 transition-transform group-hover:translate-x-0.5"
              />
            </Button>
          </form>

          {/* Divider + SSO */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e0ddd5]" />
              <span className="text-xs text-[#9a9a8e]">o continúa con</span>
              <div className="h-px flex-1 bg-[#e0ddd5]" />
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-[#e0ddd5] bg-white hover:bg-[#f5f4f0] text-[#2c3e2d] text-sm font-medium"
              onClick={() => {
                window.location.href = `${API_URL}/login`;
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}logo-workday.png`}
                alt="Workday"
                className="w-6 h-6 mr-0"
              />
              Workday SSO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
