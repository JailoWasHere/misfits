import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLocation } from "wouter";
import { Check, Shield, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

const plans = [
  {
    id: "free",
    icon: Shield,
    name: "Il Kit di Sopravvivenza",
    tag: "Free",
    price: "0€",
    priceSub: "per sempre",
    payNote: null,
    description: "I fondamentali per non annegare nel primo mese da rappresentante.",
    cta: "Scarica gratis",
    highlight: false,
    accentColor: "text-blue-400",
    borderColor: "border-white/10",
    comingSoon: false,
    groups: [
      {
        label: "I 3 Moduli Base",
        features: [
          "Template PDF: Richiesta Assemblea",
          "Template PDF: Richiesta Comitato",
          "Template PDF: Verbale d'istituto",
          "Linguaggio legale perfetto, pronti da firmare",
        ],
      },
      {
        label: "Wiki Burocratica (Sola lettura)",
        features: [
          "Diritti base dello Statuto degli Studenti",
          "Cosa fare se il Preside nega l'assemblea",
          "Guide pratiche ai tuoi diritti",
        ],
      },
      {
        label: "Canale Telegram Misfits Alert",
        features: [
          "News e aggiornamenti ministeriali",
          "Pillole di leadership scolastica",
          "Canale di sola lettura",
        ],
      },
    ],
  },
  {
    id: "pro",
    icon: Users,
    name: "Il Collettivo",
    tag: "PRO",
    price: "???",
    priceSub: "",
    payNote: null,
    description: "",
    cta: "Disponibile presto",
    highlight: true,
    accentColor: "text-primary",
    borderColor: "border-primary/30",
    comingSoon: true,
    groups: [],
  },
];

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
            Piani
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Scegli il tuo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">
              livello
            </span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">
            Pagato da voi, per voi. Zero burocrazia con la scuola.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto items-start">
          {plans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  index,
  isInView,
}: {
  plan: (typeof plans)[0];
  index: number;
  isInView: boolean;
}) {
  const Icon = plan.icon;
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (plan.comingSoon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.12 }}
        className={`relative rounded-3xl border p-7 flex flex-col items-center justify-center gap-5 min-h-[320px] opacity-50 grayscale ${plan.borderColor} bg-card/60`}
      >
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-white/10 text-white/60 text-xs font-bold px-4 py-1 rounded-full border border-white/15 whitespace-nowrap">
            Coming soon
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/6">
            <Clock className="h-8 w-8 text-white/30" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/30 block mb-1">{plan.tag}</span>
            <div className="font-black text-white/40 text-2xl">{plan.name}</div>
          </div>
          <p className="text-white/30 text-sm max-w-[200px]">
            In arrivo. Tieniti pronto.
          </p>
        </div>

        <Button
          disabled
          className="w-full rounded-xl h-11 font-semibold bg-transparent border border-white/10 text-white/30 cursor-not-allowed"
        >
          {plan.cta}
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className={`relative rounded-3xl border p-7 flex flex-col gap-5 transition-all duration-300 ${plan.borderColor} bg-card/60 hover:bg-card/80`}
      data-testid={`pricing-card-${plan.id}`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-white/8">
            <Icon className={`h-5 w-5 ${plan.accentColor}`} />
          </div>
          <div>
            <span className={`text-xs font-bold uppercase tracking-widest ${plan.accentColor}`}>
              {plan.tag}
            </span>
            <div className="font-black text-white text-lg leading-tight">{plan.name}</div>
          </div>
        </div>

        <div className="mb-3">
          <span className="text-4xl font-black text-white">{plan.price}</span>
          {plan.priceSub && (
            <span className="text-white/40 text-sm ml-2">{plan.priceSub}</span>
          )}
        </div>

        {plan.payNote && (
          <p className="text-xs text-white/45 leading-relaxed p-3 rounded-xl bg-white/4 border border-white/8 mb-3">
            {plan.payNote}
          </p>
        )}

        {plan.description && (
          <p className="text-sm text-white/60 leading-relaxed">{plan.description}</p>
        )}
      </div>

      {/* CTA */}
      <Button
        onClick={() => navigate(isAuthenticated ? "/scarica" : "/signup")}
        className="w-full rounded-xl h-11 font-semibold bg-transparent border border-white/15 text-white hover:bg-white/8 transition-all"
        data-testid={`pricing-cta-${plan.id}`}
      >
        {plan.cta}
      </Button>

      {/* Feature groups */}
      <div className="space-y-5 pt-1">
        {plan.groups.map((group) => (
          <div key={group.label}>
            <p className={`text-xs font-bold uppercase tracking-widest mb-2.5 ${plan.accentColor} opacity-80`}>
              {group.label}
            </p>
            {group.features.length > 0 && (
              <ul className="space-y-2">
                {group.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${plan.accentColor}`} />
                    <span className="text-white/75">{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
