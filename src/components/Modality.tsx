export function Modality() {
  return (
    <section id="modalidad" className="section">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">Consulta presencial en El Salvador.</h2>
          <p className="section__lead">
            La atención es en persona, en un consultorio privado. La dirección exacta y los horarios disponibles se
            comparten por WhatsApp al confirmar tu cita.
          </p>
        </div>

        <div className="modality">
          <article className="modality__block">
            <h3>Antes de tu cita</h3>
            <ol className="modality__list modality__list--steps">
              <li>Envías tu solicitud por WhatsApp desde este sitio.</li>
              <li>Confirmamos contigo el día, la hora y la dirección.</li>
              <li>
                Llegas unos minutos antes. Si los tienes, trae exámenes recientes y la lista de medicamentos que tomas.
              </li>
            </ol>
          </article>

          <article className="modality__block">
            <h3>Confidencialidad</h3>
            <ul className="modality__list">
              <li>Lo que hablas en consulta está protegido por el secreto médico.</li>
              <li>Tu información no se comparte con familiares, empleadores ni terceros sin tu autorización.</li>
              <li>Este sitio no almacena los datos que escribes al solicitar tu cita.</li>
            </ul>
          </article>

          <article className="modality__block">
            <h3>Políticas de atención</h3>
            <ul className="modality__list">
              <li>La consulta es únicamente con cita previa.</li>
              <li>Si necesitas reprogramar, avisa por WhatsApp con la mayor anticipación posible.</li>
              <li>WhatsApp es para agendar, no para atender emergencias ni dar indicaciones médicas.</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
