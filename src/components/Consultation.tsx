const doubts = [
  {
    question: "¿Tengo que sentirme muy mal para ir al psiquiatra?",
    answer:
      "No. Puedes consultar cuando algo te preocupa, cuando llevas tiempo sin sentirte como tú o simplemente cuando quieres una opinión profesional. Llegar a tiempo suele hacer el camino más corto.",
  },
  {
    question: "¿Todo lo que sentimos es normal?",
    answer:
      "Sentir tristeza, miedo o enojo es parte de estar vivos. Vale la pena revisarlo cuando dura semanas, se vuelve muy intenso o empieza a afectar tu sueño, tu trabajo o tus relaciones.",
  },
  {
    question: "¿Ir al psiquiatra significa tomar medicamentos?",
    answer:
      "No siempre. El tratamiento se decide contigo y puede incluir psicoterapia, cambios de hábitos o medicamentos cuando realmente hacen falta. Siempre te explico por qué y resolvemos tus dudas.",
  },
];

const firstVisit = [
  {
    title: "Conversamos sobre lo que te trae",
    text: "Empiezas por donde quieras. No hay respuestas correctas ni temas obligatorios.",
  },
  {
    title: "Revisamos tu historia y tu salud",
    text: "Sueño, energía, antecedentes médicos, tu entorno. Todo ayuda a ver el panorama completo.",
  },
  {
    title: "Te explico lo que observo",
    text: "Con palabras claras y sin etiquetas apresuradas. Puedes preguntar todo lo que necesites.",
  },
  {
    title: "Definimos un plan juntos",
    text: "Acordamos los siguientes pasos y cómo será el seguimiento, según lo que tú necesitas.",
  },
];

export function Consultation() {
  return (
    <section id="consulta" className="section section--arena">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">¿Qué pasa realmente en una consulta psiquiátrica?</h2>
          <p className="section__lead">
            Menos misterio del que imaginas. Es una consulta médica que se parece mucho a una buena conversación:
            privada, sin prisa y sin juicios.
          </p>
        </div>

        <ul className="doubts">
          {doubts.map((doubt) => (
            <li key={doubt.question} className="doubts__item">
              <h3>{doubt.question}</h3>
              <p>{doubt.answer}</p>
            </li>
          ))}
        </ul>

        <div className="visit">
          <h3 className="visit__title">Tu primera consulta, paso a paso</h3>
          <ol className="visit__steps">
            {firstVisit.map((step) => (
              <li key={step.title}>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
