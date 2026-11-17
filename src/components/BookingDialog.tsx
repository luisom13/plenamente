"use client";

import { useEffect, useId, useRef, useState } from "react";
import { bookingOptions } from "@/lib/site";
import { buildBookingMessage, buildWhatsAppUrl, emptyBooking, type BookingData } from "@/lib/whatsapp";

const STEP_TITLES = [
  "¿Qué tipo de consulta necesitas?",
  "¿Qué días y horario te convienen?",
  "¿Quieres contarnos el motivo?",
  "¿Cómo te contactamos?",
  "Revisa tu mensaje",
];
const FORM_STEPS = 4;
const PREVIEW = 4;
const NOTE_MAX = 200;

/** Devuelve el mensaje de error del paso, o una cadena vacía si puede avanzar. */
function validate(step: number, data: BookingData): string {
  if (step === 0 && !data.type) return "Elige el tipo de consulta para continuar.";
  if (step === 1 && !data.slot) return "Elige un horario de preferencia para continuar.";
  if (step === 3) {
    if (data.name.trim().length < 2) return "Escribe tu nombre para continuar.";
    if (data.phone.replace(/\D/g, "").length < 8) return "Escribe un teléfono de al menos 8 dígitos.";
  }
  return "";
}

type Props = { isOpen: boolean; onClose: () => void };

export function BookingDialog({ isOpen, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>(emptyBooking);
  const [error, setError] = useState("");
  const id = useId();

  // Sincroniza el <dialog> nativo (foco atrapado y Esc incluidos) con el estado.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // Al cambiar de paso, el foco va al título para que se anuncie el nuevo contenido.
  useEffect(() => {
    if (isOpen) titleRef.current?.focus();
  }, [step, isOpen]);

  const update = (patch: Partial<BookingData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setError("");
  };

  const toggleDay = (day: string) =>
    update({ days: data.days.includes(day) ? data.days.filter((d) => d !== day) : [...data.days, day] });

  const next = () => {
    const message = validate(step, data);
    if (message) return setError(message);
    setError("");
    setStep((s) => s + 1);
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  };

  const handleSent = () => {
    onClose();
    setStep(0);
    setData(emptyBooking);
  };

  const message = buildBookingMessage(data);
  const isPreview = step === PREVIEW;

  return (
    <dialog
      ref={dialogRef}
      className="booking"
      aria-labelledby={`${id}-title`}
      onClose={onClose}
      onClick={(e) => {
        // Un clic en el fondo (fuera del panel) cierra el diálogo.
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <form
        className="booking__panel"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (!isPreview) next();
        }}
      >
        <header className="booking__header">
          <p className="booking__progress" aria-live="polite">
            {isPreview ? "Último paso" : `Paso ${step + 1} de ${FORM_STEPS}`}
          </p>
          <button type="button" className="booking__close" onClick={onClose} aria-label="Cerrar formulario de cita">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <div
            className="booking__bar"
            role="progressbar"
            aria-label="Avance del formulario"
            aria-valuemin={0}
            aria-valuemax={FORM_STEPS}
            aria-valuenow={Math.min(step + 1, FORM_STEPS)}
          >
            <span style={{ width: `${(Math.min(step + 1, FORM_STEPS) / FORM_STEPS) * 100}%` }} />
          </div>
        </header>

        <div className="booking__body">
          <h2 id={`${id}-title`} ref={titleRef} tabIndex={-1} className="booking__title">
            {STEP_TITLES[step]}
          </h2>

          {step === 0 && (
            <fieldset className="booking__fieldset">
              <legend className="visually-hidden">Tipo de consulta</legend>
              {bookingOptions.types.map((option) => (
                <label key={option.value} className="choice choice--block">
                  <input
                    type="radio"
                    name="type"
                    value={option.value}
                    checked={data.type === option.value}
                    onChange={() => update({ type: option.value })}
                  />
                  <span className="choice__box">
                    <span className="choice__label">{option.value}</span>
                    <span className="choice__hint">{option.hint}</span>
                  </span>
                </label>
              ))}
            </fieldset>
          )}

          {step === 1 && (
            <>
              <fieldset className="booking__fieldset">
                <legend className="booking__legend">
                  Días <span className="booking__optional">Elige los que te sirvan, o ninguno si eres flexible</span>
                </legend>
                <div className="choice-row">
                  {bookingOptions.days.map((day) => (
                    <label key={day} className="choice">
                      <input type="checkbox" checked={data.days.includes(day)} onChange={() => toggleDay(day)} />
                      <span className="choice__box">{day}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="booking__fieldset">
                <legend className="booking__legend">Horario</legend>
                <div className="choice-row">
                  {bookingOptions.slots.map((slot) => (
                    <label key={slot} className="choice">
                      <input
                        type="radio"
                        name="slot"
                        checked={data.slot === slot}
                        onChange={() => update({ slot })}
                      />
                      <span className="choice__box">{slot}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <p className="booking__note">
                La fecha y la hora exactas se confirman por WhatsApp según la disponibilidad de la agenda.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <fieldset className="booking__fieldset">
                <legend className="booking__legend">
                  Motivo general <span className="booking__optional">Opcional</span>
                </legend>
                <div className="choice-row">
                  {bookingOptions.reasons.map((reason) => (
                    <label key={reason} className="choice">
                      <input
                        type="radio"
                        name="reason"
                        checked={data.reason === reason}
                        onClick={() => data.reason === reason && update({ reason: "" })}
                        onChange={() => update({ reason })}
                      />
                      <span className="choice__box">{reason}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="field">
                <label htmlFor={`${id}-note`} className="field__label">
                  Algo breve que quieras agregar <span className="booking__optional">Opcional</span>
                </label>
                <textarea
                  id={`${id}-note`}
                  className="field__input"
                  rows={3}
                  maxLength={NOTE_MAX}
                  value={data.note}
                  onChange={(e) => update({ note: e.target.value })}
                  aria-describedby={`${id}-note-help`}
                />
                <p id={`${id}-note-help`} className="booking__note">
                  No hace falta dar detalles médicos aquí: eso se conversa en consulta, en privado.{" "}
                  {data.note.length}/{NOTE_MAX}
                </p>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="field">
                <label htmlFor={`${id}-name`} className="field__label">
                  Nombre
                </label>
                <input
                  id={`${id}-name`}
                  className="field__input"
                  type="text"
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => update({ name: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor={`${id}-phone`} className="field__label">
                  Teléfono de contacto
                </label>
                <input
                  id={`${id}-phone`}
                  className="field__input"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="7000 0000"
                  value={data.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                />
              </div>
              <p className="booking__note">
                Tus datos no se guardan en este sitio: solo se usan para armar el mensaje que tú envías por WhatsApp.
              </p>
            </>
          )}

          {isPreview && (
            <>
              <p className="booking__lead">
                Así llegará tu solicitud. Al abrir WhatsApp solo tienes que presionar enviar.
              </p>
              {/* Se muestra como lo verá WhatsApp: *texto* aparece en negrita. */}
              <p className="booking__preview" aria-label="Vista previa del mensaje">
                {message.split(/\*(.+?)\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}
              </p>
            </>
          )}

          <p className="booking__error" role="alert">
            {error}
          </p>
        </div>

        <footer className="booking__footer">
          {step > 0 ? (
            <button type="button" className="btn btn--quiet" onClick={back}>
              {isPreview ? "Editar" : "Atrás"}
            </button>
          ) : (
            <span />
          )}
          {isPreview ? (
            <a
              className="btn btn--primary"
              href={buildWhatsAppUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSent}
            >
              Abrir WhatsApp
            </a>
          ) : (
            <button type="submit" className="btn btn--primary">
              {step === FORM_STEPS - 1 ? "Ver mensaje" : "Continuar"}
            </button>
          )}
        </footer>
      </form>
    </dialog>
  );
}
