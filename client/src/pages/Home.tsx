import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  HelpCircle,
  Shield,
  CircleCheck,
  Lock,
  BookCheck,
  AlertTriangle,
  LayoutGrid,
  DollarSign,
  FileText,
  Users,
  BarChart2,
  BookOpen,
  Image,
  Monitor,
  MessageSquare,
  Briefcase,
  Globe,
  Mail,
  Send,
  Calendar,
  ChevronRight,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import SessionTimer from "../components/SessionTimer";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "../components/ui/navigation-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";

const mockUser = {
  displayName: "Juan",
  initials: "JP",
  puesto: "Responsable",
  proximasVacaciones: "15 días",
  horario: "7:30 - 15:30",
  proximaNomina: "En 20 días",
};

const navLinks = [
  { label: "Home", href: "/home" },
  { label: "Horario", href: "/horario" },
  { label: "Nómina", href: "/nomina" },
  { label: "Contrato", href: "/contrato" },
  { label: "Vacaciones", href: "/vacaciones" },
  { label: "Manuales", href: "/manuales" },
];

const newsSlides = [
  {
    image: `${import.meta.env.BASE_URL}noticia1.jpg`,
    caption: "Pie de la noticia donde se puede hacer un pequeño resumen de esta",
  },
  {
    image: `${import.meta.env.BASE_URL}noticia2.jpg`,
    caption: "Segunda noticia de ejemplo para el carrusel",
  },
];

const tabsData = [
  {
    value: "prevencion",
    label: "Prevención y Calidad",
    icon: <Shield size={18} />,
    items: [
      {
        title: "Prevención de Riesgos Laborales",
        description: "Consulta normativas, protocolos de seguridad y formaciones obligatorias",
        href: "https://soluciones.segulagrp.es/Prevencion%20y%20Riesgos%20Laborales/",
        icon: <Shield size={20} />,
      },
      {
        title: "Sistema de Gestión de Calidad",
        description: "Accede a los procedimientos, auditorías y estándares de calidad",
        href: "https://soluciones.segulagrp.es/Calidad/",
        icon: <CircleCheck size={20} />,
      },
      {
        title: "Política de Protección de Datos",
        description: "Revisa las políticas RGPD y normativas de tratamiento de datos personales",
        href: "https://soluciones.segulagrp.es/RGPD/",
        icon: <Lock size={20} />,
      },
      {
        title: "Código Ético y Conducta",
        description: "Revisa las políticas RGPD y normativas de tratamiento de datos personales",
        href: "https://soluciones.segulagrp.es/Codigo%20Etico/",
        icon: <BookCheck size={20} />,
      },
      {
        title: "Comunicación de condiciones inseguras",
        description: "Reporta situaciones de riesgo o condiciones inseguras en el entorno de trabajo",
        href: "https://devala.segulagrp.es/Shared/asuntoInterno?tipo=condiciones",
        icon: <AlertTriangle size={20} />,
      },
    ],
  },
  {
    value: "plataformas",
    label: "Plataformas",
    icon: <LayoutGrid size={18} />,
    items: [
      {
        title: "Servicio de Retribución Flexible - Benefits",
        description: "Gestiona tu plan de retribución flexible y beneficios sociales disponibles",
        href: "https://www.ebenefits.es/fps/public/publicSite/view/segula?_ps_rf=LTE0NDoyMDI2LTAzLTA1-a47795461e7b093b8010fc0adb7fab47966f9899a9922c53b07e8fdb227232b4&_ps_em=false",
        icon: <DollarSign size={20} />,
      },
      {
        title: "Portal de Contratación",
        description: "Accede al sistema de solicitudes y gestión de contratación de personal",
        href: "https://soluciones.segulagrp.es/Error.aspx?error=No%20tiene%20permiso%20para%20acceder%20a%20la%20aplicaci%c3%b3n%20de%20solicitudes%20de%20contrataci%c3%b3n.%20Por%20favor,%20contacte%20con%20el%20departamento%20de%20sistemas%20para%20que%20se%20le%20otorguen%20los%20permisos%20necesarios",
        icon: <FileText size={20} />,
      },
      {
        title: "Selección de Personal - ePreSelec",
        description: "Gestiona procesos de selección, candidaturas y entrevistas de personal",
        href: "https://segula.admin.epreselec.com/Login.aspx?ReturnUrl=%2f",
        icon: <Users size={20} />,
      },
      {
        title: "Panel Comercial - CRM",
        description: "Accede al panel de gestión comercial, clientes y oportunidades de negocio",
        href: "https://sts1.abgam.es/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2fcrm365ext.abgam.es%2f&wctx=rm%3d1%26id%3d9c1f6afa-41ed-4ca4-89d2-747885c4951f%26ru%3dhttps%253a%252f%252fcrm365ext.abgam.es%252fdefault.aspx%26crmorgid%3d3d72c0d1-bb01-e811-80d4-0050568562c4&wct=2026-03-05T08%3a38%3a00Z&wauth=urn%3aoasis%3anames%3atc%3aSAML%3a1.0%3aam%3apassword",
        icon: <BarChart2 size={20} />,
      },
    ],
  },
  {
    value: "recursos",
    label: "Recursos Corporativos",
    icon: <BookOpen size={18} />,
    items: [
      {
        title: "Imagen Corporativa",
        description: "Accede a los recursos de marca, logotipos, plantillas y guías de estilo corporativo",
        href: "https://login.microsoftonline.com/7b5b1b1f-4ae5-4704-b539-211725af1655/oauth2/authorize?client%5Fid=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&response%5Fmode=form%5Fpost&response%5Ftype=code%20id%5Ftoken&resource=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&scope=openid&nonce=9C11B6CCE00F54727A5740EF13662A868C8ABD7B5967A1A2%2DA43625D201AEA2AFC7D028D8725F5FBE24198582E4923CA117CA81C86BE4678A&redirect%5Furi=https%3A%2F%2Fsegulagrp%2Esharepoint%2Ecom%2F%5Fforms%2Fdefault%2Easpx&state=OD0w&claims=%7B%22id%5Ftoken%22%3A%7B%22xms%5Fcc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&wsucxt=1&cobrandid=11bd8083%2D87e0%2D41b5%2Dbb78%2D0bc43c8a8e8a&client%2Drequest%2Did=4df5fca1%2D005d%2Df000%2Dd5d5%2D6e79551c4884&sso_reload=true",
        icon: <Image size={20} />,
      },
      {
        title: "Portal IT",
        description: "Solicita soporte técnico, gestiona incidencias y accede a recursos informáticos",
        href: "https://login.microsoftonline.com/7b5b1b1f-4ae5-4704-b539-211725af1655/oauth2/authorize?client%5Fid=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&response%5Fmode=form%5Fpost&response%5Ftype=code%20id%5Ftoken&resource=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&scope=openid&nonce=E7D0D90C9A705B45B7A8C3F498895A73171DB0664EAA9016%2D0A51A89E437BBA2FA1A166473BA8E7233D33A2347B8E055B0E805F3F19984788&redirect%5Furi=https%3A%2F%2Fsegulagrp%2Esharepoint%2Ecom%2F%5Fforms%2Fdefault%2Easpx&state=OD0w&claims=%7B%22id%5Ftoken%22%3A%7B%22xms%5Fcc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&wsucxt=1&cobrandid=11bd8083%2D87e0%2D41b5%2Dbb78%2D0bc43c8a8e8a&client%2Drequest%2Did=54f5fca1%2D6036%2Df000%2Dd5d5%2D66bb884edba9",
        icon: <Monitor size={20} />,
      },
      {
        title: "Buzón de sugerencias",
        description: "Envía tus ideas, propuestas de mejora y sugerencias de forma anónima",
        href: "https://devala.segulagrp.es/Shared/asuntoInterno?tipo=sugerencias",
        icon: <MessageSquare size={20} />,
      },
      {
        title: "Ofertas de empleo",
        description: "Consulta las vacantes disponibles y oportunidades laborales en la empresa",
        href: "https://segula.epreselec.com/Ofertas/Ofertas.aspx",
        icon: <Briefcase size={20} />,
      },
    ],
  },
];

const quickAccess = [
  { label: "Workday", href: "#", icon: <Globe size={28} /> },
  { label: "Mensajes", href: "#", icon: <Mail size={28} /> },
  { label: "Enviar mensaje", href: "#", icon: <Send size={28} /> },
  { label: "Solicitar vacaciones", href: "#", icon: <Calendar size={28} /> },
];

function Home() {
  const navigate = useNavigate();
  const user = mockUser;
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] overflow-x-clip">
      {/* ── Navbar ── */}
      <nav className="bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06)] sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-8 h-15">
          {/* Logo + links desktop */}
          <div className="flex items-center gap-8">
            <img
              src={`${import.meta.env.BASE_URL}logo-adient.png`}
              alt="ADIENT"
              className="h-8 object-contain shrink-0"
            />
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-1">
                {navLinks.map((link, i) => (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveNavIndex(i);
                        navigate(link.href);
                      }}
                      className={`text-[0.9rem] font-medium px-3.5 py-2 transition-colors rounded-md ${
                        i === activeNavIndex
                          ? "text-[#2c3e2d] font-bold border-b-2 border-b-[#2c3e2d] rounded-none"
                          : "text-[#5a5a5a] hover:bg-[#f0ede5] hover:text-[#2c3e2d]"
                      }`}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Acciones derecha */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[#f5f5f0] rounded-lg px-3.5 py-2 text-[#9a9a8e]">
              <Search size={16} />
              <Input
                type="text"
                placeholder="Buscar..."
                className="border-none outline-none bg-transparent text-[0.85rem] text-[#2c3e2d] w-30 placeholder:text-[#aaa89e] shadow-none p-0 h-auto focus-visible:ring-0"
              />
            </div>
            <SessionTimer />
            <button
              className="hidden sm:flex bg-transparent border-none cursor-pointer text-[#5a5a5a] p-1.5 rounded-full transition-colors hover:bg-[#f0ede5]"
              aria-label="Ayuda"
            >
              <HelpCircle size={20} />
            </button>
            <button
              onClick={handleLogout}
              title="Cerrar sesión"
              className="flex items-center justify-center w-9 h-9 rounded-full text-[#5a5a5a] hover:bg-[#f0ede5] hover:text-[#c0392b] transition-colors"
              aria-label="Cerrar sesión"
            >
              <LogOut size={20} />
            </button>
            {/* Hamburguesa mobile */}
            <button
              className="lg:hidden flex items-center justify-center p-1.5 rounded-md text-[#5a5a5a] hover:bg-[#f0ede5] transition-colors"
              aria-label="Menú"
              onClick={() => setMobileMenuOpen((o) => !o)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Menú mobile desplegable */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#eeeee8] bg-white px-4 pb-4">
            {/* Búsqueda mobile */}
            <div className="flex items-center gap-2 bg-[#f5f5f0] rounded-lg px-3.5 py-2 mt-3 text-[#9a9a8e]">
              <Search size={16} />
              <Input
                type="text"
                placeholder="Buscar..."
                className="border-none outline-none bg-transparent text-[0.85rem] text-[#2c3e2d] w-full placeholder:text-[#aaa89e] shadow-none p-0 h-auto focus-visible:ring-0"
              />
            </div>
            {/* Links */}
            <ul className="mt-2 flex flex-col">
              {navLinks.map((link, i) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveNavIndex(i);
                      setMobileMenuOpen(false);
                      navigate(link.href);
                    }}
                    className={`block px-3 py-2.5 text-[0.9rem] font-medium rounded-md transition-colors ${
                      i === activeNavIndex
                        ? "text-[#2c3e2d] font-bold bg-[#f0ede5]"
                        : "text-[#5a5a5a] hover:bg-[#f0ede5] hover:text-[#2c3e2d]"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* ── Main content ── */}
      <div className="grid grid-cols-[1fr_340px] max-[900px]:grid-cols-1 gap-6 max-w-300 mx-auto my-7 px-8 max-[900px]:px-4">
        <div>
          {/* ── Carrusel de noticias ── */}
          <div className="mb-7">
            <Carousel className="relative rounded-[14px] overflow-hidden">
              <CarouselContent>
                {newsSlides.map((slide, i) => (
                  <CarouselItem key={i}>
                    <div className="relative aspect-16/7 bg-[#d0d0c8]">
                      {slide.image ? (
                        <img
                          src={slide.image}
                          alt="Noticia"
                          className="w-full h-full object-cover block"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-[#8a9a6a] to-[#5a6a4a]" />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-[rgba(0,0,0,0.65)] to-transparent">
                        <Badge className="bg-[#c0392b] hover:bg-[#c0392b] text-white text-[0.7rem] font-bold px-2.5 py-1 rounded uppercase tracking-[0.5px]">
                          NOTICIAS
                        </Badge>
                        <p className="text-white text-[0.95rem] mt-2.5 leading-[1.4]">
                          {slide.caption}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-3.5 w-9 h-9 rounded-full bg-white/90 border-none cursor-pointer flex items-center justify-center text-[#2c3e2d] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-white" />
              <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-3.5 w-9 h-9 rounded-full bg-white/90 border-none cursor-pointer flex items-center justify-center text-[#2c3e2d] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-white" />
            </Carousel>
          </div>

          {/* ── Tabs ── */}
          <Tabs defaultValue={tabsData[0].value}>
            <TabsList className="w-full justify-start bg-transparent border-b border-b-[#e0ddd5] rounded-none h-auto p-0 mb-2">
              {tabsData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-1.5 px-4 py-3 text-[0.88rem] font-medium rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-[#2c3e2d] data-[state=active]:text-[#2c3e2d] data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:bg-transparent text-[#7a7a6e] hover:text-[#2c3e2d]"
                >
                  {tab.icon}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabsData.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-0">
                <div className="flex flex-col">
                  {tab.items.length === 0 ? (
                    <p className="text-[#9a9a8e] px-6 py-6 text-center text-[0.9rem]">
                      No hay elementos en esta sección.
                    </p>
                  ) : (
                    tab.items.map((item, idx) => (
                      <div key={item.title}>
                        <a
                          href={item.href}
                          className="flex items-center gap-4 px-5 py-4.5 no-underline text-inherit transition-colors hover:bg-[#faf9f6]"
                        >
                          <span className="text-[#7a7a6e] shrink-0 flex">{item.icon}</span>
                          <div className="flex-1 flex flex-col gap-0.5">
                            <strong className="text-[0.92rem] text-[#2c3e2d]">{item.title}</strong>
                            <span className="text-[0.82rem] text-[#9a9a8e]">{item.description}</span>
                          </div>
                          <ChevronRight size={20} className="text-[#c8c4b8] shrink-0" />
                        </a>
                        {idx < tab.items.length - 1 && <Separator className="bg-[#eeeee8]" />}
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* ── Sidebar derecha ── */}
        <aside className="flex flex-col gap-5">
          {/* Bienvenida */}
          <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.04)] border-0">
            <CardHeader className="px-6 pt-7 pb-0">
              <CardTitle className="text-[1.3rem] text-[#2c3e2d] font-semibold">
                Bienvenido, {user.displayName}
              </CardTitle>
              <Badge className="w-fit flex items-center gap-1.5 text-[0.75rem] font-semibold text-[#2e7d32] bg-[#e8f5e9] hover:bg-[#e8f5e9] px-3 py-1 rounded-[20px] mt-2.5">
                <span className="w-1.75 h-1.75 rounded-full bg-[#2e7d32]" />
                Activo
              </Badge>
            </CardHeader>
            <CardContent className="px-6 pb-7">
              <p className="text-[0.85rem] text-[#7a7a6e] mt-3.5 mb-4.5 leading-normal">
                Consulta tu información personal, horarios, nóminas y más desde Workday.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Puesto", value: user.puesto },
                  { label: "Próximas vacaciones", value: user.proximasVacaciones },
                  { label: "Horario", value: user.horario },
                  { label: "Próxima nómina", value: user.proximaNomina },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center text-[0.85rem]">
                    <span className="text-[#7a7a6e]">{label}</span>
                    <strong className="text-[#2c3e2d]">{value}</strong>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Accesos rápidos */}
          <Card className="shadow-[0_2px_10px_rgba(0,0,0,0.04)] border-0">
            <CardHeader className="px-6 pt-6 pb-0">
              <CardTitle className="text-base text-[#2c3e2d] font-semibold">Accesos rápidos</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-4.5">
              <div className="grid grid-cols-2 gap-3">
                {quickAccess.map((item) => (
                  <a
                    href={item.href}
                    key={item.label}
                    className="flex flex-col items-center gap-2 py-4.5 px-2.5 border border-[#eeeee8] rounded-xl no-underline text-[#2c3e2d] text-[0.8rem] font-medium transition-colors hover:bg-[#f5f5f0] hover:border-[#c8c4b8] [&>svg]:text-[#1a3a4a]"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default Home;
