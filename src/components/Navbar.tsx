"use client";

import Image from "next/image";
import { useState } from "react";
import { asset, navLinks, site } from "@/lib/site";
import { BookingButton } from "./Booking";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a className="brand" href="#inicio" aria-label={`${site.name}, ${site.doctor}. Ir al inicio`}>
          <Image src={asset("/images/isotipo-terracota.png")} alt="" width={240} height={161} className="brand__mark" priority />
          <span className="brand__text">
            <span className="brand__name">{site.name}</span>
            <span className="brand__doctor">{site.doctor}</span>
          </span>
        </a>

        <nav id="menu-principal" className={`nav__links${menuOpen ? " is-open" : ""}`} aria-label="Principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <BookingButton className="btn btn--primary btn--small" />
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
