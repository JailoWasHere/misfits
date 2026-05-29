import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/reveal-text";

export function Cta() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cta" className="py-24 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] animate-blob" />
        <div className="absolute top-1/2 right-1/3 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={ref} className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              delay: 0.05,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Inizia oggi — gratis per sempre
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
            <RevealText className="text-white">Il tuo predecessore</RevealText>{" "}
            <br className="hidden md:block" />
            <RevealText
              delay={0.3}
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-300"
            >
              non ti ha lasciato nulla?
            </RevealText>
            <br />
            <RevealText delay={1.0} className="text-white">
              Siamo qui per cambiare le cose.
            </RevealText>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Unisciti a 12.000 rappresentanti che hanno scelto di fare la
            differenza. Il tuo mandato inizia adesso.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 text-white rounded-full shadow-[0_0_60px_-10px_rgba(19,55,244,0.8)] group transition-all hover:shadow-[0_0_80px_-10px_rgba(19,55,244,0.9)]"
              data-testid="cta-primary-button"
            >
              Inizia gratis
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-white/40 text-sm">
              Nessuna carta di credito. Nessun obbligo.
            </p>
          </motion.div>

          {/* Staggered trust badges */}
          <div className="flex items-center justify-center gap-8 mt-16 flex-wrap">
            {[
              "500+ scuole",
              "12.000+ rappresentanti",
              "300+ template",
              "Gratis per sempre",
            ].map((badge, i) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.07, duration: 0.4 }}
                className="flex items-center gap-2 text-white/40 text-sm"
              >
                <span className="h-1 w-1 rounded-full bg-primary" />
                {badge}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
