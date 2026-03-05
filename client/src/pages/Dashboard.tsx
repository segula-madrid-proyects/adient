import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionTimer from '../components/SessionTimer';
import '../styles/dashboard.css';

const mockUser = {
  displayName: 'Juan',
  initials: 'JP',
  puesto: 'Responsable',
  proximasVacaciones: '15 días',
  horario: '7:30 - 15:30',
  proximaNomina: 'En 20 días',
};

// ── Configuración de enlaces de navegación ──
const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Horario', href: '#' },
  { label: 'Nómina', href: '#' },
  { label: 'Contrato', href: '#' },
  { label: 'Vacaciones', href: '#' },
  { label: 'Manuales', href: '#' },
];

// ── Slides del carrusel de noticias ──
const newsSlides = [
  {
    image: `${import.meta.env.BASE_URL}noticia1.jpg`,
    caption: 'Pie de la noticia donde se puede hacer un pequeño resumen de esta',
  },
  {
    image: `${import.meta.env.BASE_URL}noticia2.jpg`,
    caption: 'Segunda noticia de ejemplo para el carrusel',
  },
];

// ── Tabs y sus items (con links configurables) ──
const tabsData = [
  {
    label: 'Prevención y Calidad',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    items: [
      {
        title: 'Prevención de Riesgos Laborales',
        description: 'Consulta normativas, protocolos de seguridad y formaciones obligatorias',
        href: 'https://soluciones.segulagrp.es/Prevencion%20y%20Riesgos%20Laborales/',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        ),
      },
      {
        title: 'Sistema de Gestión de Calidad',
        description: 'Accede a los procedimientos, auditorías y estándares de calidad',
        href: 'https://soluciones.segulagrp.es/Calidad/',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
        ),
      },
      {
        title: 'Política de Protección de Datos',
        description: 'Revisa las políticas RGPD y normativas de tratamiento de datos personales',
        href: 'https://soluciones.segulagrp.es/RGPD/',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        ),
      },
       {
        title: 'Código Ético y Conducta',
        description: 'Revisa las políticas RGPD y normativas de tratamiento de datos personales',
        href: 'https://soluciones.segulagrp.es/Codigo%20Etico/',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="m9 12 2 2 4-4"/></svg>
        ),
      },
        {
        title: 'Comunicación de condiciones inseguras',
        description: 'Reporta situaciones de riesgo o condiciones inseguras en el entorno de trabajo',
        href: 'https://devala.segulagrp.es/Shared/asuntoInterno?tipo=condiciones',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        ),
      },
    ],
  },
  {
    label: 'Plataformas',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    ),
    items: [
      {
        title: 'Servicio de Retribución Flexible - Benefits',
        description: 'Gestiona tu plan de retribución flexible y beneficios sociales disponibles',
        href: 'https://www.ebenefits.es/fps/public/publicSite/view/segula?_ps_rf=LTE0NDoyMDI2LTAzLTA1-a47795461e7b093b8010fc0adb7fab47966f9899a9922c53b07e8fdb227232b4&_ps_em=false',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        ),
      },
       {
        title: 'Portal de Contratación',
        description: 'Accede al sistema de solicitudes y gestión de contratación de personal',
        href: 'https://soluciones.segulagrp.es/Error.aspx?error=No%20tiene%20permiso%20para%20acceder%20a%20la%20aplicaci%c3%b3n%20de%20solicitudes%20de%20contrataci%c3%b3n.%20Por%20favor,%20contacte%20con%20el%20departamento%20de%20sistemas%20para%20que%20se%20le%20otorguen%20los%20permisos%20necesarios',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        ),
      },
      {
        title: 'Selección de Personal - ePreSelec',
        description: 'Gestiona procesos de selección, candidaturas y entrevistas de personal',
        href: 'https://segula.admin.epreselec.com/Login.aspx?ReturnUrl=%2f',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        ),
      },
         {
        title: 'Panel Comercial - CRM',
        description: 'Accede al panel de gestión comercial, clientes y oportunidades de negocio',
        href: 'https://sts1.abgam.es/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2fcrm365ext.abgam.es%2f&wctx=rm%3d1%26id%3d9c1f6afa-41ed-4ca4-89d2-747885c4951f%26ru%3dhttps%253a%252f%252fcrm365ext.abgam.es%252fdefault.aspx%26crmorgid%3d3d72c0d1-bb01-e811-80d4-0050568562c4&wct=2026-03-05T08%3a38%3a00Z&wauth=urn%3aoasis%3anames%3atc%3aSAML%3a1.0%3aam%3apassword',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        ),
      },
    ],
  },
  {
    label: 'Recursos Corporativos',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    ),
    items: [
   {
        title: 'Imagen Corporativa',
        description: 'Accede a los recursos de marca, logotipos, plantillas y guías de estilo corporativo',
        href: 'https://login.microsoftonline.com/7b5b1b1f-4ae5-4704-b539-211725af1655/oauth2/authorize?client%5Fid=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&response%5Fmode=form%5Fpost&response%5Ftype=code%20id%5Ftoken&resource=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&scope=openid&nonce=9C11B6CCE00F54727A5740EF13662A868C8ABD7B5967A1A2%2DA43625D201AEA2AFC7D028D8725F5FBE24198582E4923CA117CA81C86BE4678A&redirect%5Furi=https%3A%2F%2Fsegulagrp%2Esharepoint%2Ecom%2F%5Fforms%2Fdefault%2Easpx&state=OD0w&claims=%7B%22id%5Ftoken%22%3A%7B%22xms%5Fcc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&wsucxt=1&cobrandid=11bd8083%2D87e0%2D41b5%2Dbb78%2D0bc43c8a8e8a&client%2Drequest%2Did=4df5fca1%2D005d%2Df000%2Dd5d5%2D6e79551c4884&sso_reload=true',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        ),
      },
         {
        title: 'Portal IT',
        description: 'Solicita soporte técnico, gestiona incidencias y accede a recursos informáticos',
        href: 'https://login.microsoftonline.com/7b5b1b1f-4ae5-4704-b539-211725af1655/oauth2/authorize?client%5Fid=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&response%5Fmode=form%5Fpost&response%5Ftype=code%20id%5Ftoken&resource=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&scope=openid&nonce=E7D0D90C9A705B45B7A8C3F498895A73171DB0664EAA9016%2D0A51A89E437BBA2FA1A166473BA8E7233D33A2347B8E055B0E805F3F19984788&redirect%5Furi=https%3A%2F%2Fsegulagrp%2Esharepoint%2Ecom%2F%5Fforms%2Fdefault%2Easpx&state=OD0w&claims=%7B%22id%5Ftoken%22%3A%7B%22xms%5Fcc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&wsucxt=1&cobrandid=11bd8083%2D87e0%2D41b5%2Dbb78%2D0bc43c8a8e8a&client%2Drequest%2Did=54f5fca1%2D6036%2Df000%2Dd5d5%2D66bb884edba9',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        ),
      },
         {
        title: 'Buzón de sugerencias',
        description: 'Envía tus ideas, propuestas de mejora y sugerencias de forma anónima',
        href: 'https://devala.segulagrp.es/Shared/asuntoInterno?tipo=sugerencias',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        ),
      },
         {
        title: 'Ofertas de empleo',
        description: 'Consulta las vacantes disponibles y oportunidades laborales en la empresa',
        href: 'https://segula.epreselec.com/Ofertas/Ofertas.aspx',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        ),
      },

    ],
  },
];

// ── Accesos rápidos (con links configurables) ──
const quickAccess = [
  {
    label: 'Workday',
    href: '#',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    ),
  },
  {
    label: 'Mensajes',
    href: '#',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    ),
  },
  {
    label: 'Enviar mensaje',
    href: '#',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
    ),
  },
  {
    label: 'Solicitar vacaciones',
    href: '#',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    ),
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const user = mockUser;
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  const handleLogout = () => {
    navigate('/');
  };

  const prevSlide = () => setCurrentSlide((s) => (s === 0 ? newsSlides.length - 1 : s - 1));
  const nextSlide = () => setCurrentSlide((s) => (s === newsSlides.length - 1 ? 0 : s + 1));

  return (
    <div className="dash-page">
      {/* ── Navbar ── */}
      <nav className="dash-nav">
        <div className="dash-nav-left">
          <img src={`${import.meta.env.BASE_URL}logo-adient.png`} alt="ADIENT" className="dash-nav-logo" />
          <ul className="dash-nav-links">
            {navLinks.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={i === activeNavIndex ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setActiveNavIndex(i); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="dash-nav-right">
          <div className="dash-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Buscar..." />
          </div>
          <SessionTimer />
          <button className="dash-icon-btn" aria-label="Ayuda">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </button>
          <button className="dash-avatar" onClick={handleLogout} title="Cerrar sesión">
            {user.initials}
          </button>
        </div>
      </nav>

      {/* ── Main content ── */}
      <div className="dash-main">
        <div className="dash-content">
          {/* ── Carrusel de noticias ── */}
          <div className="dash-carousel">
            <div className="carousel-slide">
              {newsSlides[currentSlide].image ? (
                <img src={newsSlides[currentSlide].image} alt="Noticia" className="carousel-img" />
              ) : (
                <div className="carousel-img carousel-placeholder" />
              )}
              <div className="carousel-overlay">
                <span className="carousel-badge">NOTICIAS</span>
                <p className="carousel-caption">{newsSlides[currentSlide].caption}</p>
              </div>
              <button className="carousel-arrow carousel-prev" onClick={prevSlide} aria-label="Anterior">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="carousel-arrow carousel-next" onClick={nextSlide} aria-label="Siguiente">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
            <div className="carousel-dots">
              {newsSlides.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="dash-tabs">
            <div className="dash-tabs-header">
              {tabsData.map((tab, i) => (
                <button
                  key={tab.label}
                  className={`dash-tab ${i === activeTab ? 'active' : ''}`}
                  onClick={() => setActiveTab(i)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="dash-tabs-content">
              {tabsData[activeTab].items.length === 0 ? (
                <p className="dash-tabs-empty">No hay elementos en esta sección.</p>
              ) : (
                tabsData[activeTab].items.map((item) => (
                  <a href={item.href} className="dash-list-item" key={item.title}>
                    <span className="dash-list-icon">{item.icon}</span>
                    <div className="dash-list-text">
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </div>
                    <svg className="dash-list-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ── Sidebar derecha ── */}
        <aside className="dash-sidebar">
          {/* Bienvenida */}
          <div className="dash-welcome-card">
            <h2>Bienvenido, {user.displayName}</h2>
            <span className="dash-status-badge">Activo</span>
            <p className="dash-welcome-desc">Consulta tu información personal, horarios, nóminas y más desde Workday.</p>
            <div className="dash-info-rows">
              <div className="dash-info-row"><span>Puesto</span><strong>{user.puesto}</strong></div>
              <div className="dash-info-row"><span>Próximas vacaciones</span><strong>{user.proximasVacaciones}</strong></div>
              <div className="dash-info-row"><span>Horario</span><strong>{user.horario}</strong></div>
              <div className="dash-info-row"><span>Próxima nómina</span><strong>{user.proximaNomina}</strong></div>
            </div>
          </div>

          {/* Accesos rápidos */}
          <div className="dash-quick-card">
            <h3>Accesos rápidos</h3>
            <div className="dash-quick-grid">
              {quickAccess.map((item) => (
                <a href={item.href} className="dash-quick-item" key={item.label}>
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

export default Dashboard;
