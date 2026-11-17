import Image from "next/image";
import { navLinks, site } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const greeting = `Hola, ${site.doctor}. Quisiera más información sobre la consulta.`;

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Image
            src="/images/logo-crema.png"
            alt={`${site.name}, ${site.doctor}`}
            width={640}
            height={666}
            className="footer__logo"
          />
        </div>

        <div className="footer__col">
          <h2>Consulta</h2>
          <p>
            {site.specialty}
            <br />
            Atención presencial en {site.location}
          </p>
          <ul>
            <li>
              <a href={buildWhatsAppUrl(greeting)} target="_blank" rel="noopener noreferrer">
                Escribir por WhatsApp
              </a>
            </li>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                Instagram {site.instagram.handle}
              </a>
            </li>
          </ul>
        </div>

        <nav className="footer__col" aria-label="Secciones del sitio">
          <h2>Secciones</h2>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href="#agendar">Agendar cita</a>
            </li>
          </ul>
        </nav>

        <div className="footer__col footer__notice">
          <h2>Si es una emergencia</h2>
          <p>
            Este sitio no atiende crisis. Ante un riesgo inmediato, llama al 132 o al 911, o acude al servicio de
            urgencias más cercano.
          </p>
        </div>
      </div>

      <div className="container footer__legal">
        <p>
          El contenido de este sitio es informativo y de orientación general. No sustituye una consulta médica ni
          constituye un diagnóstico.
        </p>
        <p>
          © {new Date().getFullYear()} {site.name}, {site.doctor}.
        </p>
      </div>
    </footer>
  );
}
