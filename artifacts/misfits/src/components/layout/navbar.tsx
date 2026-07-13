import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/immagine_1779966467564.png";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-50">
          <img src={logoPath} alt="Misfits Logo" className="h-8 md:h-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#problem"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Il Problema
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Funzionalità
          </Link>
          <Link
            href="#community"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Community
          </Link>

          
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* MODIFICATO: Avvolto nel Link di wouter con asChild */}
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <a>Accedi</a>
            </Button>
          </Link>

          <Link href="/register">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20" asChild>
              <a>Inizia gratis</a>
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-white/10 py-6 px-4 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-4 text-center">
              <Link
                href="#problem"
                className="text-lg font-medium text-white/80 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Il Problema
              </Link>
              <Link
                href="#features"
                className="text-lg font-medium text-white/80 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Funzionalità
              </Link>
              <Link
                href="#community"
                className="text-lg font-medium text-white/80 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </Link>
            </nav>
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              {/* MODIFICATO: Bottone Accedi Mobile */}
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full text-white justify-center"
                  asChild
                >
                  <a>Accedi</a>
                </Button>
              </Link>

              {/* MODIFICATO: Bottone Registrazione Mobile */}
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground" asChild>
                  <a>Inizia gratis</a>
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}