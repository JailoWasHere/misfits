import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";

export function Mission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="mission" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/4 to-background pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
              <Heart className="h-3.5 w-3.5 mr-2" />
              La nostra mission
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative p-8 md:p-12 rounded-3xl border border-white/10 bg-card/40 backdrop-blur-sm overflow-hidden"
          >
            {/* Decorative quote mark */}
            <div className="absolute top-6 left-8 text-[8rem] leading-none font-black text-primary/10 select-none pointer-events-none">
              "
            </div>

            <div className="relative z-10">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed md:leading-snug tracking-tight">
                Siamo stati{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">
                  rappresentanti d'istituto come te
                </span>
                , sappiamo le difficoltà di questo ruolo e la tua volontà di voler far funzionare tutto.
              </p>

              <p className="mt-6 text-xl md:text-2xl text-white/70 leading-relaxed font-medium">
                Per questo abbiamo creato una rete di rappresentanti sparsi per tutta l'Italia, per condividere questo percorso ed aiutarsi a vicenda.
              </p>
            </div>

            {/* Bottom accent line */}
            <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["bg-blue-600", "bg-indigo-600", "bg-violet-600", "bg-blue-500"].map((c, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full ${c} border-2 border-card flex items-center justify-center text-[10px] font-bold text-white`}
                  >
                    {["G", "M", "S", "L"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/40">
                Fondato da ex rappresentanti d'istituto
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
