import { BookingProvider } from "@/components/Booking";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { About } from "@/components/About";
import { Consultation } from "@/components/Consultation";
import { Modality } from "@/components/Modality";
import { BookingCta } from "@/components/BookingCta";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <BookingProvider>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Philosophy />
        <About />
        <Consultation />
        <Modality />
        <BookingCta />
        <Faq />
      </main>
      <Footer />
    </BookingProvider>
  );
}
