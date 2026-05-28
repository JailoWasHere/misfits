import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, FileX, Users2, BookX } from "lucide-react";

const problems = [
  {
    icon: FileX,
    title: "Zero template, zero guida",
    desc: "Il tuo predecessore se ne è andato senza lasciarti nulla. Ogni richiesta alla presidenza la devi scrivere da zero.",
  },
  {
    icon: BookX,
    title: "La burocrazia è un labirinto",
    desc: "RSU, consigli d'istituto, commissioni, OO.CC. — nessuno ti ha spiegato come funziona davvero.",
  },
  {
    icon: Users2,
    title: "Ogni anno si ricomincia da zero",
    desc: "La continuità è zero. Ogni nuovo rappresentante riparte dalla casella di partenza. La memoria istituzionale sparisce.",
  },
  {
    icon: AlertTriangle,
    title: "Sei solo contro tutti",
    desc: "Non c'è nessuna rete. Nessun mentor. Nessuna community di rappresentanti con cui confrontarti.",
  },
];

function ProblemCard({ icon: Icon, title, desc, index }: { icon: React.ElementType; title: string; desc: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative p-6 rounded-2xl border border-red-500/20 bg-red-950/10 group hover:border-red-500/40 hover:bg-red-950/20 transition-all"
      data-testid={`problem-card-${index}`}
    >
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-red-500/15 text-red-400 flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-white mb-2 text-lg">{title}</h3>
          <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-red-950/5 to-background pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm text-red-400 mb-6">
            Il Problema
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Eletto oggi.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Solo domani.
            </span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">
            Ogni anno, migliaia di studenti vengono eletti rappresentanti e si trovano davanti
            allo stesso muro. Nessuna guida. Nessun playbook. Nessun supporto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {problems.map((p, i) => (
            <ProblemCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
