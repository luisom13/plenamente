"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { BookingDialog } from "./BookingDialog";

type BookingContextValue = { open: () => void };

const BookingContext = createContext<BookingContextValue | null>(null);

/** Monta el diálogo de cita una sola vez y permite abrirlo desde cualquier botón. */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingDialog isOpen={isOpen} onClose={close} />
    </BookingContext.Provider>
  );
}

type BookingButtonProps = {
  children?: React.ReactNode;
  className?: string;
};

/** Botón que abre el flujo de cita. */
export function BookingButton({ children = "Agendar cita", className = "btn btn--primary" }: BookingButtonProps) {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("BookingButton debe usarse dentro de BookingProvider");

  return (
    <button type="button" className={className} aria-haspopup="dialog" onClick={ctx.open}>
      {children}
    </button>
  );
}
