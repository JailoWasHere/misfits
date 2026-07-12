import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FileText, Map, UserCheck, Network } from "lucide-react";
import { RevealText } from "@/components/reveal-text";

const features = [
  {
    icon: FileText,
    color: "from-blue-500 to-primary",
    glow: "rgba(19,55,244,0.3)",
    tag: "Template",
    title: "Template pronti all'uso",
    desc: "Oltre 300 template per ogni situazione: richiesta assemblee, comunicazioni alla presidenza, verbali, ricorsi. Copia, personalizza, invia.",
    items: ["Assemblea di istituto", "Richieste alla presidenza", "Verbali e comunicati", "Ricorsi e istanze"],
  },
  {
    icon: Map,
    color: "from-indigo-400 to-purple-500",
    glow: "rgba(99,102,241,0.3)",
    tag: "Guida",
    title: "La mappa della burocrazia",
    desc: "Guida pratica passo-passo a tutto quello che devi sapere: consigli d'istituto, OO.CC., diritti degli studenti, statuto degli studenti.",
    items: ["Consiglio d'istituto", "Organi Collegiali", "Diritti studenteschi", "Regolamenti scolastici"],
  },
  {
    icon: UserCheck,
    color: "from-emerald-400 to-teal-500",
    glow: "rgba(52,211,153,0.3)",
    tag: "Mentorship",
    title: "Mentor ex-rappresentanti",
    desc: "Connettiti con chi ci è già passato. Ex rappresentanti che ti guidano, rispondono alle tue domande e ti aiutano a navigare le situazioni difficili.",
    items: ["Sessioni 1:1", "Risposte in 24 ore", "Network di alumni", "Casi reali risolti"],
    comingSoon: true,
  },
  {
    icon: Network,
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.3)",
    tag: "Community",
    title: "La rete dei rappresentanti",
    desc: "Una community esclusiva di rappresentanti di tutta Italia. Condividi esperienze, chiedi consiglio, organizza azioni comuni.",
    items: ["Chat per scuola", "Forum tematici", "Eventi nazionali", "Campagne condivise"],
  },
];

function TiltCard({
  icon: Icon, color, glow, tag, title, desc, items, index, comingSoon,
}: {
  icon: React.ElementType; color: string; glow: string; tag: string;
  title: string; desc: string; items: string[]; index: number; comingSoon?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * -12, y: cx * 12 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`feature-card-${index}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }); }}
        animate={{
          rotateX: comingSoon ? 0 : tilt.x,
          rotateY: comingSoon ? 0 : tilt.y,
          scale: !comingSoon && hovering ? 1.025 : 1,
          boxShadow: !comingSoon && hovering ? `0 30px 60px -10px ${glow}` : "0 0 0 0 transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ transformStyle: "preserve-3d", perspective: "800px" }}
        className={`relative p-7 rounded-3xl border bg-card cursor-default overflow-hidden h-full ${
          comingSoon ? "border-white/6 opacity-60 grayscale" : "border-white/10"
        }`}
      >
        {/* Hover glow blob */}
        {!comingSoon && (
          <motion.div
            className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
            animate={{ opacity: hovering ? 0.12 : 0 }}
            style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }}
          />
        )}

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${color} shadow-lg`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">{tag}</span>
              {comingSoon && (
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-white/50 border border-white/10">
                  Coming soon
                </span>
              )}
            </div>
          </div>
          <h3 className="text-2xl font-black text-white mb-3">{title}</h3>
          <p className="text-white/60 mb-6 leading-relaxed">{desc}</p>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${color} flex-shrink-0`} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={ref} className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-6"
          >
            Funzionalità
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            <RevealText>Tutto quello che ti serve per guidare</RevealText>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/60 leading-relaxed"
          >
            Quattro pilastri costruiti da ex rappresentanti per i nuovi rappresentanti.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <TiltCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
