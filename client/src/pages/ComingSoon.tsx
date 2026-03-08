import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";

type SectionData = {
  label: string;
  description: string;
  features: { title: string; detail: string; icon: ReactNode }[];
};

const sections: Record<string, SectionData> = {
  horario: {
    label: "Horario",
    description:
      "Consulta y gestiona tu jornada laboral de forma clara y organizada.",
    features: [
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
          </svg>
        ),
        title: "Calendario semanal",
        detail: "Visualiza tu horario de entrada, salida y descansos por semana.",
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
        ),
        title: "Control de jornada",
        detail: "Registra y consulta tus horas trabajadas, horas extra y ausencias.",
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
          </svg>
        ),
        title: "Resumen mensual",
        detail: "Accede al historial completo de tu jornada mes a mes.",
      },
    ],
  },
  nomina: {
    label: "Nómina",
    description:
      "Accede a tus nóminas, retenciones y resúmenes salariales en un solo lugar.",
    features: [
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        ),
        title: "Nóminas descargables",
        detail: "Descarga tus recibos de sueldo en PDF de cualquier mes.",
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        ),
        title: "Desglose salarial",
        detail: "Consulta salario base, complementos, deducciones y retenciones.",
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        ),
        title: "Evolución salarial",
        detail: "Visualiza la evolución de tu salario a lo largo del tiempo.",
      },
    ],
  },
  contrato: {
    label: "Contrato",
    description:
      "Consulta los detalles de tu relación laboral y documentación contractual.",
    features: [
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        ),
        title: "Tipo y condiciones",
        detail: "Revisa el tipo de contrato, categoría profesional y jornada pactada.",
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        ),
        title: "Documentos firmados",
        detail: "Accede a los documentos contractuales firmados digitalmente.",
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
          </svg>
        ),
        title: "Historial de modificaciones",
        detail: "Consulta las actualizaciones y anexos de tu contrato a lo largo del tiempo.",
      },
    ],
  },
  vacaciones: {
    label: "Vacaciones",
    description:
      "Planifica y solicita tus días de descanso de forma sencilla.",
    features: [
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
          </svg>
        ),
        title: "Solicitud de días",
        detail: "Solicita tus vacaciones seleccionando fechas en el calendario.",
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        ),
        title: "Saldo disponible",
        detail: "Consulta los días disponibles, disfrutados y pendientes de aprobación.",
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
        title: "Estado de solicitudes",
        detail: "Seguimiento en tiempo real del estado de aprobación por parte de tu responsable.",
      },
    ],
  },
  manuales: {
    label: "Manuales",
    description:
      "Accede a toda la documentación corporativa y guías de procedimiento.",
    features: [
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        ),
        title: "Manuales de onboarding",
        detail: "Guías de bienvenida, cultura corporativa y primeros pasos en la empresa.",
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
          </svg>
        ),
        title: "Procedimientos internos",
        detail: "Consulta los procesos y protocolos operativos de tu área.",
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ),
        title: "Buscador de documentos",
        detail: "Localiza cualquier manual o documento de forma rápida por nombre o categoría.",
      },
    ],
  },
};

function ComingSoon() {
  const navigate = useNavigate();
  const location = useLocation();

  const key = location.pathname.replace("/", "");
  const section = sections[key];

  if (!section) {
    navigate("/home");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f4f0] flex flex-col">
      {/* Navbar mínimo */}
      <nav className="bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06)] px-8 h-15 flex items-center justify-between sticky top-0 z-50">
        <img
          src={`${import.meta.env.BASE_URL}logo-adient.png`}
          alt="ADIENT"
          className="h-8 object-contain"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/home")}
          className="text-[#5a5a5a] gap-1.5"
        >
          <ArrowLeft size={15} />
          Inicio
        </Button>
      </nav>

      {/* Contenido */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full space-y-10">
          {/* Cabecera */}
          <div className="space-y-3">
            <Badge className="bg-[#1a3a4a]/10 text-[#1a3a4a] hover:bg-[#1a3a4a]/10 font-medium">
              {section.label}
            </Badge>
            <h1 className="text-3xl font-bold text-[#1a1a1a] tracking-tight">
              {section.description}
            </h1>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {section.features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 space-y-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[#eeeee8]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#f5f4f0] flex items-center justify-center text-[#1a3a4a]">
                  {f.icon}
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[0.92rem] text-[#1a1a1a]">{f.title}</p>
                  <p className="text-[0.82rem] text-[#7a7a6e] leading-relaxed">{f.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-[0.8rem] text-[#aaa89e] text-center">
            Esta funcionalidad formará parte del portal del empleado de Adient.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
