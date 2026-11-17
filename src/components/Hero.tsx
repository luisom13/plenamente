import Image from "next/image";
import { BookingButton } from "./Booking";

export function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">Cuidar tu mente también es cuidar tu vida.</h1>
          <p className="hero__lead">
            Consulta psiquiátrica presencial en El Salvador con la Dra. Natalia Barriere. Un espacio sereno y sin
            juicios para entender lo que sientes y avanzar, con respaldo científico, hacia una vida más plena.
          </p>
          <div className="hero__actions">
            <BookingButton />
            <a className="btn btn--link" href="#consulta">
              Conocer cómo es una consulta
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__frame">
            <Image
              src="/images/dra-natalia-barriere.jpg"
              alt="La Dra. Natalia Barriere sonríe sentada en un sofá claro, en un espacio luminoso"
              fill
              priority
              sizes="(min-width: 900px) 440px, 80vw"
            />
          </div>
          {/* Trazo continuo inspirado en el isotipo: se dibuja una sola vez al cargar. */}
          <svg className="hero__line" viewBox="0 0 520 240" aria-hidden="true">
            <path
              pathLength={1}
              d="M8 190 C 70 96, 168 92, 214 178 C 232 138, 268 136, 286 182 C 312 232, 396 214, 392 128 C 388 56, 452 28, 476 82 C 500 144, 410 176, 356 138"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
