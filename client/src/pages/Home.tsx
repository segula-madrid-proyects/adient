import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionTimer from "../components/SessionTimer";

const mockUser = {
  displayName: "Juan",
  initials: "JP",
  puesto: "Responsable",
  proximasVacaciones: "15 días",
  horario: "7:30 - 15:30",
  proximaNomina: "En 20 días",
};

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Horario", href: "#" },
  { label: "Nómina", href: "#" },
  { label: "Contrato", href: "#" },
  { label: "Vacaciones", href: "#" },
  { label: "Manuales", href: "#" },
];

const newsSlides = [
  {
    image: `${import.meta.env.BASE_URL}noticia1.jpg`,
    caption:
      "Pie de la noticia donde se puede hacer un pequeño resumen de esta",
  },
  {
    image: `${import.meta.env.BASE_URL}noticia2.jpg`,
    caption: "Segunda noticia de ejemplo para el carrusel",
  },
];

const tabsData = [
  {
    label: "Prevención y Calidad",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    items: [
      {
        title: "Prevención de Riesgos Laborales",
        description: "Consulta normativas, protocolos de seguridad y formaciones obligatorias",
        href: "https://soluciones.segulagrp.es/Prevencion%20y%20Riesgos%20Laborales/",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        ),
      },
      {
        title: "Sistema de Gestión de Calidad",
        description: "Accede a los procedimientos, auditorías y estándares de calidad",
        href: "https://soluciones.segulagrp.es/Calidad/",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        ),
      },
      {
        title: "Política de Protección de Datos",
        description: "Revisa las políticas RGPD y normativas de tratamiento de datos personales",
        href: "https://soluciones.segulagrp.es/RGPD/",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        ),
      },
      {
        title: "Código Ético y Conducta",
        description: "Revisa las políticas RGPD y normativas de tratamiento de datos personales",
        href: "https://soluciones.segulagrp.es/Codigo%20Etico/",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        ),
      },
      {
        title: "Comunicación de condiciones inseguras",
        description: "Reporta situaciones de riesgo o condiciones inseguras en el entorno de trabajo",
        href: "https://devala.segulagrp.es/Shared/asuntoInterno?tipo=condiciones",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Plataformas",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    items: [
      {
        title: "Servicio de Retribución Flexible - Benefits",
        description: "Gestiona tu plan de retribución flexible y beneficios sociales disponibles",
        href: "https://www.ebenefits.es/fps/public/publicSite/view/segula?_ps_rf=LTE0NDoyMDI2LTAzLTA1-a47795461e7b093b8010fc0adb7fab47966f9899a9922c53b07e8fdb227232b4&_ps_em=false",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        ),
      },
      {
        title: "Portal de Contratación",
        description: "Accede al sistema de solicitudes y gestión de contratación de personal",
        href: "https://soluciones.segulagrp.es/Error.aspx?error=No%20tiene%20permiso%20para%20acceder%20a%20la%20aplicaci%c3%b3n%20de%20solicitudes%20de%20contrataci%c3%b3n.%20Por%20favor,%20contacte%20con%20el%20departamento%20de%20sistemas%20para%20que%20se%20le%20otorguen%20los%20permisos%20necesarios",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        ),
      },
      {
        title: "Selección de Personal - ePreSelec",
        description: "Gestiona procesos de selección, candidaturas y entrevistas de personal",
        href: "https://segula.admin.epreselec.com/Login.aspx?ReturnUrl=%2f",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
      {
        title: "Panel Comercial - CRM",
        description: "Accede al panel de gestión comercial, clientes y oportunidades de negocio",
        href: "https://sts1.abgam.es/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2fcrm365ext.abgam.es%2f&wctx=rm%3d1%26id%3d9c1f6afa-41ed-4ca4-89d2-747885c4951f%26ru%3dhttps%253a%252f%252fcrm365ext.abgam.es%252fdefault.aspx%26crmorgid%3d3d72c0d1-bb01-e811-80d4-0050568562c4&wct=2026-03-05T08%3a38%3a00Z&wauth=urn%3aoasis%3anames%3atc%3aSAML%3a1.0%3aam%3apassword",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Recursos Corporativos",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    items: [
      {
        title: "Imagen Corporativa",
        description: "Accede a los recursos de marca, logotipos, plantillas y guías de estilo corporativo",
        href: "https://login.microsoftonline.com/7b5b1b1f-4ae5-4704-b539-211725af1655/oauth2/authorize?client%5Fid=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&response%5Fmode=form%5Fpost&response%5Ftype=code%20id%5Ftoken&resource=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&scope=openid&nonce=9C11B6CCE00F54727A5740EF13662A868C8ABD7B5967A1A2%2DA43625D201AEA2AFC7D028D8725F5FBE24198582E4923CA117CA81C86BE4678A&redirect%5Furi=https%3A%2F%2Fsegulagrp%2Esharepoint%2Ecom%2F%5Fforms%2Fdefault%2Easpx&state=OD0w&claims=%7B%22id%5Ftoken%22%3A%7B%22xms%5Fcc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&wsucxt=1&cobrandid=11bd8083%2D87e0%2D41b5%2Dbb78%2D0bc43c8a8e8a&client%2Drequest%2Did=4df5fca1%2D005d%2Df000%2Dd5d5%2D6e79551c4884&sso_reload=true",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        ),
      },
      {
        title: "Portal IT",
        description: "Solicita soporte técnico, gestiona incidencias y accede a recursos informáticos",
        href: "https://login.microsoftonline.com/7b5b1b1f-4ae5-4704-b539-211725af1655/oauth2/authorize?client%5Fid=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&response%5Fmode=form%5Fpost&response%5Ftype=code%20id%5Ftoken&resource=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&scope=openid&nonce=E7D0D90C9A705B45B7A8C3F498895A73171DB0664EAA9016%2D0A51A89E437BBA2FA1A166473BA8E7233D33A2347B8E055B0E805F3F19984788&redirect%5Furi=https%3A%2F%2Fsegulagrp%2Esharepoint%2Ecom%2F%5Fforms%2Fdefault%2Easpx&state=OD0w&claims=%7B%22id%5Ftoken%22%3A%7B%22xms%5Fcc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&wsucxt=1&cobrandid=11bd8083%2D87e0%2D41b5%2Dbb78%2D0bc43c8a8e8a&client%2Drequest%2Did=54f5fca1%2D6036%2Df000%2Dd5d5%2D66bb884edba9",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        ),
      },
      {
        title: "Buzón de sugerencias",
        description: "Envía tus ideas, propuestas de mejora y sugerencias de forma anónima",
        href: "https://devala.segulagrp.es/Shared/asuntoInterno?tipo=sugerencias",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
      {
        title: "Ofertas de empleo",
        description: "Consulta las vacantes disponibles y oportunidades laborales en la empresa",
        href: "https://segula.epreselec.com/Ofertas/Ofertas.aspx",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        ),
      },
    ],
  },
];

const quickAccess = [
  {
    label: "Workday",
    href: "#",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: "Mensajes",
    href: "#",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Enviar mensaje",
    href: "#",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    label: "Solicitar vacaciones",
    href: "#",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

function Home() {
  const navigate = useNavigate();
  const user = mockUser;
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  const handleLogout = () => {
    navigate("/");
  };

  const prevSlide = () =>
    setCurrentSlide((s) => (s === 0 ? newsSlides.length - 1 : s - 1));
  const nextSlide = () =>
    setCurrentSlide((s) => (s === newsSlides.length - 1 ? 0 : s + 1));

  return (
    <div className="min-h-screen bg-[#f5f5f0] overflow-y-auto">
      {/* ── Navbar ── */}
      <nav className="flex items-center justify-between bg-white px-8 h-15 shadow-[0_1px_4px_rgba(0,0,0,0.06)] sticky top-0 z-100">
        <div className="flex items-center gap-8">
          <img
            src={`${import.meta.env.BASE_URL}logo-adient.png`}
            alt="ADIENT"
            className="h-8 object-contain"
          />
          <ul className="flex list-none gap-1 m-0 p-0">
            {navLinks.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`no-underline text-[0.9rem] font-medium px-3.5 py-2 transition-colors ${
                    i === activeNavIndex
                      ? "text-[#2c3e2d] font-bold border-b-2 border-b-[#2c3e2d] rounded-none"
                      : "text-[#5a5a5a] rounded-md hover:bg-[#f0ede5] hover:text-[#2c3e2d]"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNavIndex(i);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#f5f5f0] rounded-lg px-3.5 py-2 text-[#9a9a8e]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Buscar..." className="border-none outline-none bg-transparent text-[0.85rem] text-[#2c3e2d] w-30 placeholder:text-[#aaa89e]" />
          </div>
          <SessionTimer />
          <button className="bg-transparent border-none cursor-pointer text-[#5a5a5a] flex p-1.5 rounded-full transition-colors hover:bg-[#f0ede5]" aria-label="Ayuda">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>
          <button
            className="w-9 h-9 rounded-full bg-[#1a3a4a] text-white text-[0.8rem] font-bold border-none cursor-pointer flex items-center justify-center transition-opacity hover:opacity-85"
            onClick={handleLogout}
            title="Cerrar sesión"
          >
            {user.initials}
          </button>
        </div>
      </nav>

      {/* ── Main content ── */}
      <div className="grid grid-cols-[1fr_340px] max-[900px]:grid-cols-1 gap-6 max-w-300 mx-auto my-7 px-8 max-[900px]:px-4">
        <div>
          {/* ── Carrusel de noticias ── */}
          <div className="mb-7">
            <div className="relative rounded-[14px] overflow-hidden aspect-16/7 bg-[#d0d0c8]">
              {newsSlides[currentSlide].image ? (
                <img
                  src={newsSlides[currentSlide].image}
                  alt="Noticia"
                  className="w-full h-full object-cover block"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-[#8a9a6a] to-[#5a6a4a]" />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[rgba(0,0,0,0.65)] to-transparent">
                <span className="bg-[#c0392b] text-white text-[0.7rem] font-bold px-[10px] py-1 rounded uppercase tracking-[0.5px]">
                  NOTICIAS
                </span>
                <p className="text-white text-[0.95rem] mt-[10px] leading-[1.4]">
                  {newsSlides[currentSlide].caption}
                </p>
              </div>
              <button
                className="absolute top-1/2 -translate-y-1/2 left-[14px] w-9 h-9 rounded-full bg-white/90 border-none cursor-pointer flex items-center justify-center text-[#2c3e2d] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-white"
                onClick={prevSlide}
                aria-label="Anterior"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="absolute top-1/2 -translate-y-1/2 right-[14px] w-9 h-9 rounded-full bg-white/90 border-none cursor-pointer flex items-center justify-center text-[#2c3e2d] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-white"
                onClick={nextSlide}
                aria-label="Siguiente"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-[14px]">
              {newsSlides.map((_, i) => (
                <button
                  key={i}
                  className={`w-[10px] h-[10px] rounded-full border-none cursor-pointer p-0 transition-colors ${i === currentSlide ? "bg-[#1a3a4a]" : "bg-[#c8c4b8]"}`}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── Tabs ── */}
          <div>
            <div className="flex gap-1 border-b border-b-[#e0ddd5] mb-2">
              {tabsData.map((tab, i) => (
                <button
                  key={tab.label}
                  className={`flex items-center gap-[6px] bg-transparent border-none px-4 py-3 text-[0.88rem] cursor-pointer border-b-2 transition-colors font-medium ${
                    i === activeTab
                      ? "text-[#2c3e2d] font-bold border-b-[#2c3e2d]"
                      : "text-[#7a7a6e] border-b-transparent hover:text-[#2c3e2d]"
                  }`}
                  onClick={() => setActiveTab(i)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col">
              {tabsData[activeTab].items.length === 0 ? (
                <p className="text-[#9a9a8e] px-6 py-6 text-center text-[0.9rem]">
                  No hay elementos en esta sección.
                </p>
              ) : (
                tabsData[activeTab].items.map((item) => (
                  <a
                    href={item.href}
                    className="flex items-center gap-4 px-5 py-[18px] no-underline text-inherit border-b border-b-[#eeeee8] transition-colors last:border-b-0 hover:bg-[#faf9f6]"
                    key={item.title}
                  >
                    <span className="text-[#7a7a6e] shrink-0 flex">{item.icon}</span>
                    <div className="flex-1 flex flex-col gap-[2px]">
                      <strong className="text-[0.92rem] text-[#2c3e2d]">{item.title}</strong>
                      <span className="text-[0.82rem] text-[#9a9a8e]">{item.description}</span>
                    </div>
                    <svg className="text-[#c8c4b8] shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ── Sidebar derecha ── */}
        <aside className="flex flex-col gap-5">
          {/* Bienvenida */}
          <div className="bg-white rounded-[14px] px-6 py-7 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <h2 className="text-[1.3rem] text-[#2c3e2d] m-0 mb-[10px]">Bienvenido, {user.displayName}</h2>
            <span className="inline-flex items-center gap-[6px] text-[0.75rem] font-semibold text-[#2e7d32] bg-[#e8f5e9] px-3 py-1 rounded-[20px]">
              <span className="w-[7px] h-[7px] rounded-full bg-[#2e7d32]" />
              Activo
            </span>
            <p className="text-[0.85rem] text-[#7a7a6e] mt-[14px] mb-[18px] leading-[1.5]">
              Consulta tu información personal, horarios, nóminas y más desde Workday.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[0.85rem]">
                <span className="text-[#7a7a6e]">Puesto</span>
                <strong className="text-[#2c3e2d]">{user.puesto}</strong>
              </div>
              <div className="flex justify-between items-center text-[0.85rem]">
                <span className="text-[#7a7a6e]">Próximas vacaciones</span>
                <strong className="text-[#2c3e2d]">{user.proximasVacaciones}</strong>
              </div>
              <div className="flex justify-between items-center text-[0.85rem]">
                <span className="text-[#7a7a6e]">Horario</span>
                <strong className="text-[#2c3e2d]">{user.horario}</strong>
              </div>
              <div className="flex justify-between items-center text-[0.85rem]">
                <span className="text-[#7a7a6e]">Próxima nómina</span>
                <strong className="text-[#2c3e2d]">{user.proximaNomina}</strong>
              </div>
            </div>
          </div>

          {/* Accesos rápidos */}
          <div className="bg-white rounded-[14px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <h3 className="text-base text-[#2c3e2d] m-0 mb-[18px]">Accesos rápidos</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickAccess.map((item) => (
                <a
                  href={item.href}
                  className="flex flex-col items-center gap-2 py-[18px] px-[10px] border border-[#eeeee8] rounded-xl no-underline text-[#2c3e2d] text-[0.8rem] font-medium transition-colors hover:bg-[#f5f5f0] hover:border-[#c8c4b8] [&>svg]:text-[#1a3a4a]"
                  key={item.label}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;
