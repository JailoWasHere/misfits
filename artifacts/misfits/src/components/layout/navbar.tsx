import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, MousePointer2, Mouse } from "lucide-react";
import logoPath from "@assets/immagine_1779966467564.png";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/contexts/cursor-context";

const navLinks = [
  { label: "Il Problema", href: "#problem" },
  { label: "Funzionalità", href: "#features" },
  { label: "Community", href: "#community" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/" || location === "";
  const { enabled: cursorEnabled, toggle: toggleCursor } = useCursor();

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <img src={logoPath} alt="Misfits Logo" className="h-8 md:h-10" />
        </Link>

        {/* Desktop Nav — only on home */}
        {isHome && (
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cursor toggle */}
          <motion.button
            onClick={toggleCursor}
            title={cursorEnabled ? "Cursore normale" : "Cursore custom"}
            whileTap={{ scale: 0.88 }}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-300 ${
              cursorEnabled
                ? "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
                : "border-white/12 bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/70"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {cursorEnabled ? (
                <motion.span
                  key="custom"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5"
                >
                  <span className="flex h-2 w-2 rounded-full bg-primary shadow-[0_0_6px_2px_rgba(19,55,244,0.6)]" />
                  cursore
                </motion.span>
              ) : (
                <motion.span
                  key="default"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5"
                >
                  <MousePointer2 className="h-3 w-3" />
                  cursore
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <Link
            href="/login"
            className="text-sm font-semibold text-white/70 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/8"
          >
            Accedi
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-full shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
          >
            Inizia gratis
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden z-50 text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="absolute top-full left-0 w-full bg-background border-b border-white/10 py-6 px-4 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {isHome && (
              <nav className="flex flex-col gap-4 text-center">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-white/80 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-white/80 hover:text-white font-semibold py-3 rounded-xl border border-white/10 hover:bg-white/6 transition-all"
              >
                Accedi
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center font-semibold text-white bg-primary hover:bg-primary/90 py-3 rounded-xl transition-all shadow-lg shadow-primary/20"
              >
                Inizia gratis
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
