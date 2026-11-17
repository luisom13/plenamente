import { BookingButton } from "./Booking";

export function BookingCta() {
  return (
    <section id="agendar" className="section section--terracota">
      <div className="container cta">
        <div>
          <h2 className="section__title">Agenda tu cita en un minuto.</h2>
          <p className="section__lead">
            Respondes cuatro preguntas breves, revisas el mensaje ya redactado y lo envías tú por WhatsApp. Sin
            cuentas, sin formularios largos.
          </p>
        </div>
        <ol className="cta__steps" aria-label="Pasos para solicitar tu cita">
          <li>Tipo de consulta</li>
          <li>Días y horario</li>
          <li>Motivo general, si quieres</li>
          <li>Nombre y teléfono</li>
        </ol>
        <BookingButton className="btn btn--light">Agendar cita</BookingButton>
      </div>
    </section>
  );
}
