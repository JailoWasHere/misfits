import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Download } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/contexts/auth-context";

export default function Scarica() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // Pagina riservata: chi non è registrato viene mandato alla registrazione.
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signup", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />

      <main>
        <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
          </div>

          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center justify-center h-16 w-16 rounded-2xl border border-primary/30 bg-primary/10 mb-8 mx-auto"
            >
              <Download className="h-7 w-7 text-primary" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-black tracking-tight text-white mb-8 leading-tight"
            >
              Area{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">
                download
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-lg md:text-xl text-white/50 leading-relaxed"
            >
              Contenuto in arrivo.
            </motion.p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
