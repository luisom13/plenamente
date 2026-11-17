import { site } from "@/lib/site";

export function About() {
  return (
    <section id="sobre-mi" className="section">
      <div className="container about">
        {/* PLACEHOLDER: reemplazar por una fotografía limpia del consultorio o un segundo retrato de la doctora. */}
        <div
          className="placeholder about__photo"
          role="img"
          aria-label="Espacio reservado para una fotografía del consultorio de la Dra. Natalia Barriere: sala de consulta cálida, con luz natural"
        >
          <span>Fotografía del consultorio</span>
        </div>

        <div className="about__copy">
          <h2 className="section__title">Soy Natalia Barriere, médico especialista en Psiquiatría.</h2>
          <p>
            Me alegra darte la bienvenida a este espacio dedicado al cuidado de la salud mental. Como psiquiatra, mi
            compromiso es acompañarte con respeto y con calma, a tu ritmo, para que entiendas qué te está pasando y
            qué opciones tienes.
          </p>
          <p>
            Trabajo con información basada en evidencia científica y la explico en palabras claras. Creo que ir al
            psiquiatra debería sentirse tan natural como ir a cualquier otro médico, y que hablar de salud mental sin
            mitos es la mejor forma de reducir el estigma.
          </p>
          <blockquote className="about__quote">
            <p>Pedir ayuda no es una señal de debilidad. Es una forma de cuidarte.</p>
          </blockquote>
          <p className="about__social">
            Comparto herramientas para comprender mejor la salud mental en Instagram:{" "}
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
              {site.instagram.handle}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
