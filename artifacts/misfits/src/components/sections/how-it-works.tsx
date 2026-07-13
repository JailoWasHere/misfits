import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, PackageOpen, Users, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Registrati gratis",
    desc: "Crea il tuo profilo in 2 minuti. Inserisci la tua scuola e il tuo ruolo. Zero burocrazia.",
    comingSoon: false,
  },
  {
    icon: PackageOpen,
    step: "02",
    title: "Ottieni il tuo toolkit",
    desc: "Accesso immediato a tutti i template, guide e risorse organizzate per situazione.",
    comingSoon: false,
  },
  {
    icon: Users,
    step: "03",
    title: "Connettiti con i mentor",
    desc: "Scegli un ex rappresentante come mentor. Prenota una sessione. Fai le domande giuste.",
    comingSoon: true,
  },
  {
    icon: Rocket,
    step: "04",
    title: "Entra nella community",
    desc: "Unisciti alla rete di rappresentanti. Condividi, chiedi, cresci. E quando finisce il tuo mandato, diventa tu il mentor.",
    comingSoon: false,
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
            Come funziona
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Da zero a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">
              rappresentante completo
            </span>{" "}
            in 4 passi
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <StepItem key={step.step} step={step} Icon={Icon} index={i} isLeft={isLeft} comingSoon={step.comingSoon} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({
  step,
  Icon,
  index,
  isLeft,
  comingSoon,
}: {
  step: { step: string; title: string; desc: string };
  Icon: React.ElementType;
  index: number;
  isLeft: boolean;
  comingSoon: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex items-center gap-6 md:gap-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
      data-testid={`step-${index}`}
    >
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
        <div
          className={`inline-block p-6 rounded-3xl border transition-all duration-300 group ${
            comingSoon
              ? "border-white/6 bg-card/40 opacity-50 grayscale cursor-default"
              : "border-white/10 bg-card/80 backdrop-blur-sm hover:border-primary/30"
          }`}
        >
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
            <span className="text-primary/50 text-sm font-bold font-mono">{step.step}</span>
            {comingSoon && (
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-white/45 border border-white/10">
                Coming soon
              </span>
            )}
          </div>
          <h3 className={`text-xl font-black text-white mb-2 ${!comingSoon && "group-hover:text-primary transition-colors"}`}>
            {step.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">{step.desc}</p>
        </div>
      </div>

      <div className="relative hidden md:flex flex-shrink-0">
        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg z-10 ${
          comingSoon
            ? "bg-white/10 shadow-none"
            : "bg-gradient-to-br from-primary to-blue-600 shadow-primary/30"
        }`}>
          <Icon className={`h-6 w-6 ${comingSoon ? "text-white/30" : "text-white"}`} />
        </div>
      </div>

      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}
