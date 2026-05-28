import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Map, UserCheck, Network } from "lucide-react";

const features = [
  {
    icon: FileText,
    color: "from-blue-500 to-primary",
    glow: "shadow-blue-500/20",
    tag: "Template",
    title: "Template pronti all'uso",
    desc: "Oltre 300 template per ogni situazione: richiesta assemblee, comunicazioni alla presidenza, verbali delle riunioni, ricorsi. Copia, personalizza, invia.",
    items: ["Assemblea di istituto", "Richieste alla presidenza", "Verbali e comunicati", "Ricorsi e istanze"],
  },
  {
    icon: Map,
    color: "from-indigo-400 to-purple-500",
    glow: "shadow-indigo-500/20",
    tag: "Guida",
    title: "La mappa della burocrazia",
    desc: "Guida pratica passo-passo a tutto quello che devi sapere: consigli d'istituto, OO.CC., diritti degli studenti, statuto degli studenti.",
    items: ["Consiglio d'istituto", "Organi Collegiali", "Diritti studenteschi", "Regolamenti scolastici"],
  },
  {
    icon: UserCheck,
    color: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-500/20",
    tag: "Mentorship",
    title: "Mentor ex-rappresentanti",
    desc: "Connettiti con chi ci è già passato. Ex rappresentanti che ti guidano, rispondono alle tue domande e ti aiutano a navigare le situazioni difficili.",
    items: ["Sessioni 1:1", "Risposte in 24 ore", "Network di alumni", "Casi reali risolti"],
  },
  {
    icon: Network,
    color: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/20",
    tag: "Community",
    title: "La rete dei rappresentanti",
    desc: "Una community esclusiva di rappresentanti di tutta Italia. Condividi esperienze, chiedi consiglio, organizza azioni comuni.",
    items: ["Chat per scuola", "Forum tematici", "Eventi nazionali", "Campagne condivise"],
  },
];

function FeatureCard({
  icon: Icon, color, glow, tag, title, desc, items, index,
}: {
  icon: React.ElementType; color: string; glow: string; tag: string;
  title: string; desc: string; items: string[]; index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative p-7 rounded-3xl border border-white/10 bg-card hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:${glow} overflow-hidden`}
      data-testid={`feature-card-${index}`}
    >
      <div className="absolute top-0 right-0 w-40 h-40 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${color} blur-2xl`}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${color} shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">{tag}</span>
        </div>

        <h3 className="text-2xl font-black text-white mb-3">{title}</h3>
        <p className="text-white/60 mb-6 leading-relaxed">{desc}</p>

        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-white/70">
              <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${color} flex-shrink-0`}></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
            Funzionalità
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Tutto quello che{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">
              ti serve per guidare
            </span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">
            Quattro pilastri costruiti da ex rappresentanti per i nuovi rappresentanti.
            Niente teorie — solo strumenti che funzionano.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
