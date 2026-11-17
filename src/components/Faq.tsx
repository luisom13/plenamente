const faqs = [
  {
    question: "¿Cuál es la diferencia entre un psiquiatra y un psicólogo?",
    answer:
      "El psiquiatra es un médico especialista en salud mental: evalúa también la parte física, puede diagnosticar y, si hace falta, indicar medicamentos. El psicólogo trabaja principalmente con psicoterapia. Muchas veces ambos se complementan.",
  },
  {
    question: "¿Necesito que otro médico me refiera?",
    answer: "No. Puedes agendar directamente. Si ya tienes una referencia o exámenes previos, tráelos a tu cita.",
  },
  {
    question: "¿Lo que cuente en consulta es confidencial?",
    answer:
      "Sí. La consulta está protegida por el secreto médico. Tu información solo se comparte con tu autorización, salvo las excepciones que establece la ley, como un riesgo grave e inmediato para tu vida o la de otra persona.",
  },
  {
    question: "¿Puedo ir acompañado?",
    answer:
      "Sí, si eso te hace sentir más tranquilo. Tú decides si la persona que te acompaña entra a la consulta o te espera afuera.",
  },
  {
    question: "¿La consulta puede ser en línea?",
    answer:
      "Por ahora la atención es presencial, en El Salvador. Si tienes una situación particular, coméntala al escribir por WhatsApp.",
  },
  {
    question: "¿Cómo agendo, cambio o cancelo una cita?",
    answer:
      "Todo se coordina por WhatsApp. Usa el botón «Agendar cita» para enviar tu solicitud y, si necesitas mover tu cita, escribe al mismo número con la mayor anticipación posible.",
  },
  {
    question: "¿Qué hago si tengo una emergencia?",
    answer:
      "Este sitio y el WhatsApp de agendamiento no atienden emergencias. Si tú o alguien cercano está en peligro inmediato, llama al 132 (emergencias médicas) o al 911, o acude al hospital más cercano.",
  },
];

export function Faq() {
  return (
    <section id="preguntas" className="section">
      <div className="container faq">
        <h2 className="section__title">Preguntas frecuentes</h2>
        <div className="faq__list">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq__item" name="faq">
              <summary>
                <span>{faq.question}</span>
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
