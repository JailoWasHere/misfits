import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Zap, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "free",
    icon: Zap,
    name: "Free",
    tagline: "Inizia adesso",
    price: { monthly: "0", yearly: "0" },
    description: "Per chi vuole esplorare e capire cos'è Misfits.",
    cta: "Inizia gratis",
    ctaVariant: "outline" as const,
    highlight: false,
    features: [
      "Accesso a 20 template base",
      "Guida alla burocrazia (livello 1)",
      "Accesso in sola lettura alla community",
      "1 sessione mentor al mese",
      "Supporto via email",
    ],
    missing: [
      "Template avanzati illimitati",
      "Mentor dedicato",
      "Canali community esclusivi",
    ],
  },
  {
    id: "pro",
    icon: Sparkles,
    name: "Pro",
    tagline: "Il più scelto",
    price: { monthly: "4", yearly: "3" },
    description: "Per il rappresentante che vuole davvero fare la differenza.",
    cta: "Inizia gratis 14 giorni",
    ctaVariant: "default" as const,
    highlight: true,
    features: [
      "Tutti i template (300+)",
      "Guida completa alla burocrazia",
      "Community attiva + canali riservati",
      "Mentor illimitate",
      "Priorità nelle risposte",
      "Archivio mandati precedenti",
      "Badge rappresentante verificato",
    ],
    missing: [],
  },
  {
    id: "scuola",
    icon: GraduationCap,
    name: "Scuola",
    tagline: "Per istituti",
    price: { monthly: "19", yearly: "15" },
    description: "Per scuole che vogliono supportare tutti i loro rappresentanti.",
    cta: "Contatta il team",
    ctaVariant: "outline" as const,
    highlight: false,
    features: [
      "Pro per tutti i rappresentanti dell'istituto",
      "Dashboard per il referente scolastico",
      "Onboarding guidato per i nuovi eletti",
      "Reportistica e storico mandati",
      "Supporto dedicato prioritario",
      "Personalizzazione con logo scuola",
    ],
    missing: [],
  },
];

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
            Prezzi
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Semplice.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">
              Trasparente.
            </span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed mb-8">
            Inizia gratis. Passa a Pro quando sei pronto. Nessun costo nascosto.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full border border-white/10 bg-card/60 backdrop-blur-sm">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                !yearly ? "bg-primary text-white shadow-lg" : "text-white/50 hover:text-white"
              }`}
              data-testid="billing-monthly"
            >
              Mensile
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                yearly ? "bg-primary text-white shadow-lg" : "text-white/50 hover:text-white"
              }`}
              data-testid="billing-yearly"
            >
              Annuale
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5">
                −25%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} yearly={yearly} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-white/30 text-sm mt-10"
        >
          Tutti i piani includono SSL, aggiornamenti automatici e backup. Disdici quando vuoi.
        </motion.p>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  yearly,
  index,
  isInView,
}: {
  plan: (typeof plans)[0];
  yearly: boolean;
  index: number;
  isInView: boolean;
}) {
  const Icon = plan.icon;
  const price = yearly ? plan.price.yearly : plan.price.monthly;
  const isScuola = plan.id === "scuola";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className={`relative rounded-3xl border p-7 flex flex-col gap-6 transition-all duration-300 ${
        plan.highlight
          ? "border-primary/60 bg-primary/8 shadow-[0_0_60px_-15px_rgba(19,55,244,0.5)] scale-[1.03]"
          : "border-white/10 bg-card/60 hover:border-white/20"
      }`}
      data-testid={`pricing-card-${plan.id}`}
    >
      {plan.highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-primary/30">
            Più popolare
          </span>
        </div>
      )}

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`p-2.5 rounded-xl ${
              plan.highlight ? "bg-primary/25" : "bg-white/8"
            }`}
          >
            <Icon className={`h-5 w-5 ${plan.highlight ? "text-primary" : "text-white/60"}`} />
          </div>
          <div>
            <div className="font-black text-white text-lg leading-none">{plan.name}</div>
            <div className="text-xs text-white/40 mt-0.5">{plan.tagline}</div>
          </div>
        </div>

        <div className="flex items-end gap-1 mb-1">
          {isScuola ? (
            <span className="text-4xl font-black text-white">Su misura</span>
          ) : (
            <>
              <span className="text-4xl font-black text-white">
                €{price}
              </span>
              <span className="text-white/40 text-sm mb-1.5">/mese</span>
            </>
          )}
        </div>
        {yearly && !isScuola && price !== "0" && (
          <p className="text-xs text-emerald-400">Fatturato annualmente</p>
        )}
        <p className="text-sm text-white/55 mt-2 leading-relaxed">{plan.description}</p>
      </div>

      <Button
        className={`w-full rounded-xl h-11 font-semibold transition-all ${
          plan.highlight
            ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
            : "border-white/15 text-white hover:bg-white/8 hover:text-white bg-transparent border"
        }`}
        data-testid={`pricing-cta-${plan.id}`}
      >
        {plan.cta}
      </Button>

      <div className="space-y-2.5">
        {plan.features.map((f) => (
          <div key={f} className="flex items-start gap-2.5 text-sm">
            <Check
              className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                plan.highlight ? "text-primary" : "text-white/50"
              }`}
            />
            <span className="text-white/75">{f}</span>
          </div>
        ))}
        {plan.missing.map((f) => (
          <div key={f} className="flex items-start gap-2.5 text-sm opacity-35">
            <div className="h-4 w-4 mt-0.5 flex-shrink-0 flex items-center justify-center">
              <div className="h-px w-3 bg-white/40 rounded-full" />
            </div>
            <span className="text-white/50 line-through">{f}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
