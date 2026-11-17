const pillars = [
  {
    name: "Mente",
    text: "Tus pensamientos, tu atención, tu memoria y tu descanso. Cómo interpretas lo que te pasa.",
  },
  {
    name: "Emociones",
    text: "Lo que sientes y la forma en que lo vives: aprender a reconocerlo, sin miedo ni culpa.",
  },
  {
    name: "Salud física",
    text: "El cuerpo también habla. Energía, sueño, apetito y dolor son parte de la misma historia.",
  },
];

export function Philosophy() {
  return (
    <section id="filosofia" className="section section--arena">
      <div className="container philosophy">
        <div className="philosophy__copy">
          <h2 className="section__title">Plenamente: cuando mente, emociones y cuerpo viven en armonía.</h2>
          <p className="section__lead">
            PLENAMENTE simboliza un compromiso: acompañar a cada paciente hacia una vida más plena. La salud mental no
            ocurre aparte del resto de tu vida, por eso la consulta mira las tres cosas a la vez.
          </p>
          <dl className="pillars">
            {pillars.map((pillar) => (
              <div key={pillar.name} className="pillars__item">
                <dt>{pillar.name}</dt>
                <dd>{pillar.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <svg
          className="philosophy__diagram"
          viewBox="0 0 460 430"
          role="img"
          aria-label="Tres círculos que se superponen: mente, emociones y salud física. En el centro, donde coinciden, está la plenitud."
        >
          <circle cx="160" cy="150" r="130" />
          <circle cx="300" cy="150" r="130" />
          <circle cx="230" cy="272" r="130" />
          <text x="104" y="118">Mente</text>
          <text x="356" y="118">Emociones</text>
          <text x="230" y="352">Salud física</text>
          <text x="230" y="196" className="philosophy__center">
            plenitud
          </text>
        </svg>
      </div>
    </section>
  );
}
