// Configuración central del sitio. Los datos de contacto y las opciones del
// formulario de cita se cambian aquí (o en .env.local) y en ningún otro lugar.

/** Número de la consulta (+503 6267 5286). NEXT_PUBLIC_WHATSAPP_NUMBER lo reemplaza si está definida. */
const WHATSAPP_DEFAULT = "50362675286";

export const site = {
  name: "PLENAMENTE",
  doctor: "Dra. Natalia Barriere",
  specialty: "Psiquiatría y salud mental",
  location: "El Salvador",
  title: "PLENAMENTE — Dra. Natalia Barriere | Psiquiatra en El Salvador",
  description:
    "Consulta psiquiátrica presencial en El Salvador con la Dra. Natalia Barriere. Un espacio sereno y basado en evidencia para cuidar tu mente, tus emociones y tu salud física.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Solo dígitos, con código de país. */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? WHATSAPP_DEFAULT).replace(/\D/g, ""),

  instagram: {
    handle: "@plenamente.drabarriere",
    url: "https://www.instagram.com/plenamente.drabarriere/",
  },

  address: {
    lines: ["Col. Campestre, Calle A No. 13-76", "Ent. Av. Juan Ramón Molina", "San Salvador, El Salvador"],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Col. Campestre Calle A 13-76, Av. Juan Ramón Molina, San Salvador, El Salvador"),
  },

  /** Horario de consulta. Se usa en la página, el formulario de cita y los datos para buscadores. */
  hours: [
    { day: "Martes", from: "07:00", to: "09:00", label: "7:00 a 9:00 a. m." },
    { day: "Jueves", from: "07:00", to: "09:00", label: "7:00 a 9:00 a. m." },
    { day: "Sábado", from: "07:00", to: "15:00", label: "7:00 a. m. a 3:00 p. m." },
  ],
} as const;

/** Antepone el basePath (GitHub Pages sirve el sitio en /plenamente) a rutas de /public. */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const navLinks = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#consulta", label: "Consulta" },
  { href: "#preguntas", label: "Preguntas frecuentes" },
] as const;

// Opciones del flujo de cita. Los días salen de site.hours.
export const bookingOptions = {
  types: [
    { value: "Primera vez", hint: "Aún no has tenido consulta con la Dra. Barriere." },
    { value: "Seguimiento", hint: "Ya eres paciente y quieres continuar tu proceso." },
  ],
  /** Solo el sábado tiene horario suficiente para elegir franja. */
  saturdaySlots: ["Por la mañana", "Al mediodía o por la tarde", "Sin preferencia"],
  reasons: [
    "Ansiedad o estrés",
    "Estado de ánimo",
    "Problemas de sueño",
    "Otro motivo",
    "Prefiero contarlo en consulta",
  ],
} as const;
