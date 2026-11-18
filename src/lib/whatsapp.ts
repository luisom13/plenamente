import { site } from "./site";

export type BookingData = {
  type: string;
  days: string[];
  slot: string;
  reason: string;
  note: string;
  name: string;
  phone: string;
};

export const emptyBooking: BookingData = {
  type: "",
  days: [],
  slot: "",
  reason: "",
  note: "",
  name: "",
  phone: "",
};

/** Mensaje ordenado que recibe la doctora. Los asteriscos son negritas de WhatsApp. */
export function buildBookingMessage(data: BookingData): string {
  const lines = [
    `Hola, ${site.doctor}. Me gustaría agendar una cita.`,
    "",
    `*Tipo de consulta:* ${data.type}`,
    `*Días de preferencia:* ${site.hours
      .filter((h) => data.days.includes(h.day))
      .map((h) => `${h.day} (${h.label})`)
      .join(", ")}`,
  ];

  if (data.slot) lines.push(`*Preferencia el sábado:* ${data.slot}`);

  if (data.reason) lines.push(`*Motivo general:* ${data.reason}`);
  if (data.note.trim()) lines.push(`*Comentario:* ${data.note.trim()}`);

  lines.push("", `*Nombre:* ${data.name.trim()}`, `*Teléfono:* ${data.phone.trim()}`);
  lines.push("", "Enviado desde el sitio web de PLENAMENTE.");

  return lines.join("\n");
}

/** Enlace a WhatsApp con el mensaje (opcional) codificado en la URL. */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
