import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as SamlStrategy, Profile, VerifiedCallback, VerifyWithoutRequest } from '@node-saml/passport-saml';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Modo desarrollo sin SAML (no requiere Docker/IdP)
const SKIP_SAML = true;

// Interfaz para el usuario autenticado
interface SamlUser {
  id: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any; // Signatura de índice para compatibilidad con Passport
}

// Extender el tipo de Request de Express para incluir user tipado
declare global {
  namespace Express {
    interface User extends SamlUser {}
  }
}

// Extender session para modo dev (usuario mock)
declare module 'express-session' {
  interface SessionData {
    user?: SamlUser;
  }
}

// Función auxiliar para convertir valores del profile a string
const getStringValue = (value: any): string => {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value) && value.length > 0) {
    return String(value[0]);
  }
  return '';
};

// Callback de verificación tipado
const verifyCallback: VerifyWithoutRequest = (
  profile: Profile | null | undefined,
  done: VerifiedCallback
): void => {
  if (!profile) {
    return done(new Error('No se recibió perfil del usuario'));
  }

  const user: SamlUser = {
    id: profile.nameID || '',
    email: getStringValue(profile.email) || profile.nameID || '',
    displayName: getStringValue(profile.displayName) || profile.nameID || '',
    firstName: getStringValue(profile.firstName) || undefined,
    lastName: getStringValue(profile.lastName) || undefined
  };

  return done(null, user);
};

// Callback de logout tipado
const logoutCallback: VerifyWithoutRequest = (
  profile: Profile | null | undefined,
  done: VerifiedCallback
): void => {
  // Convertir null a undefined para compatibilidad con Passport
  return done(null, profile || undefined);
};

// Configuración de SAML Strategy
const samlStrategy = new SamlStrategy(
  {
    // URL del IdP de prueba (SimpleSAMLphp en Docker)
    entryPoint: 'http://localhost:8080/simplesaml/saml2/idp/SSOService.php',
    
    // URL donde el IdP enviará la respuesta SAML
    callbackUrl: 'http://localhost:3000/login/callback',
    
    // Identificador único de tu aplicación
    issuer: 'portal-empleado-adient',
    
    // Certificado público del IdP (SimpleSAMLphp)
    cert: `MIIDXTCCAkWgAwIBAgIJALmVVuDWu4NYMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTYxMjMxMTQzNDQ3WhcNNDgxMjMxMTQzNDQ3WjBF
MQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEAzUCFozgNb1h1M0jzNRSCjhOBnR+uVbVpaWfXYIR+AhWDdEe5ryY+Cgav
Og8bfLybyzFdehlYdDRgkedEB/GjG8aJw06l0qF4jDOAw0kEygWCu2mcH7XOxRt+
YAH3TVHa/Hu1W3WjzkobqqqLQ8gkKWWM27fOgAZ6GieaJBN6VBSMMcPey3HWLBmc
+TYJmv1dbaO2jHhKh8pfKw0W12VM8P1PIO8gv4Phu/uuJYieBWKixBEyy0lHjyix
YFCR12xdh4CA47q958ZRGnnDUGFVE1QhgRacJCOZ9bd5t9mr8KLaVBYTCJo5ERE8
jymab5dPqe5qKfJsCZiqWglbjUo9twIDAQABo1AwTjAdBgNVHQ4EFgQUxpuwcs/C
YQOyui+r1G+3KxBNhxkwHwYDVR0jBBgwFoAUxpuwcs/CYQOyui+r1G+3KxBNhxkw
DAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAAiWUKs/2x/viNCKi3Y6b
lEuCtAGhzOOZ9EjrvJ8+COH3Rag3tVBWrcBZ3/uhhPq5gy9lqw4OkvEws99/5jFs
X1FJ6MKBgqfuy7yh5s1YfM0ANHYczMmYpZeAcQf2CGAaVfwTTfSlzNLsF2lW/ly7
yapFzlYSJLGoVE+OHEu8g5SlNACUEfkXw+5Eghh+KzlIN7R6Q7r2ixWNFBC/jWf7
NKUfJyX8qIG5md1YUeT6GBW9Bm2/1/RiO24JTaYlfLdKK9TYb8sG5B+OLab2DImG
99CJ25RkAcSobWNF5zD0O6lgOo3cEdB/ksCq3hmtlC/DlLZ/D8CJ+7VuZnS1rR2n
aQ==`,
    
    // Opciones adicionales (DEMO - validaciones desactivadas)
    acceptedClockSkewMs: -1,
    wantAssertionsSigned: false,
    signatureAlgorithm: 'sha256'
  },
  verifyCallback,
  logoutCallback
);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'kiosko-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 300000 // 5 minutos de inactividad para auto-logout (importante en kiosko)
  }
}));

if (!SKIP_SAML) {
  // Configurar Passport con SAML (requiere IdP en Docker)
  passport.use(samlStrategy);

  passport.serializeUser((user: Express.User, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });

  app.use(passport.initialize());
  app.use(passport.session());
}

// URL del frontend (React/Vite)
const CLIENT_URL = 'http://localhost:5173';

if (SKIP_SAML) {
  // ── Modo desarrollo: usuario mock, sin SAML ──

  const mockUser: SamlUser = {
    id: 'dev-user-001',
    email: 'dev@adient.com',
    displayName: 'Usuario de Desarrollo',
    firstName: 'Dev',
    lastName: 'Adient'
  };

  // Login simulado: crea sesión con usuario mock
  app.get('/login', (req: Request, res: Response) => {
    req.session.user = mockUser;
    res.redirect(`${CLIENT_URL}/dashboard`);
  });

  // API user: devuelve el mock de sesión
  app.get('/api/user', (req: Request, res: Response) => {
    if (req.session.user) {
      return res.json(req.session.user);
    }
    res.status(401).json({ error: 'No autenticado' });
  });

  // Logout
  app.get('/logout', (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.redirect(CLIENT_URL);
    });
  });

} else {
  // ── Modo producción: SAML real ──

  // Middleware para verificar autenticación (API)
  function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: 'No autenticado' });
  }

  // Endpoint para obtener datos del usuario autenticado
  app.get('/api/user', ensureAuthenticated, (req: Request, res: Response) => {
    res.json(req.user);
  });

  // Ruta para iniciar login SAML
  app.get('/login',
    passport.authenticate('saml', { failureRedirect: `${CLIENT_URL}/?error=auth_failed` })
  );

  // Callback de SAML (donde el IdP envía la respuesta)
  app.post('/login/callback',
    passport.authenticate('saml', { failureRedirect: `${CLIENT_URL}/?error=auth_failed` }),
    (req: Request, res: Response) => {
      res.redirect(`${CLIENT_URL}/dashboard`);
    }
  );

  app.get('/login/callback',
    passport.authenticate('saml', { failureRedirect: `${CLIENT_URL}/?error=auth_failed` }),
    (req: Request, res: Response) => {
      res.redirect(`${CLIENT_URL}/dashboard`);
    }
  );

  // Logout
  app.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy((destroyErr) => {
        if (destroyErr) {
          console.error('Error al destruir sesión:', destroyErr);
        }
        res.redirect(CLIENT_URL);
      });
    });
  });

  // Metadata de la aplicación (útil para configurar en Workday)
  app.get('/metadata', (req: Request, res: Response) => {
    res.type('application/xml');
    const metadata = samlStrategy.generateServiceProviderMetadata(null, null);
    res.send(metadata);
  });
}

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📋 Metadata disponible en http://localhost:${PORT}/metadata`);
});