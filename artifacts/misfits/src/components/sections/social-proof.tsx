import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marco Rossi",
    role: "Rappresentante d'istituto, Liceo Scientifico Volta — Milano",
    content:
      "Prima di Misfits, ogni mia richiesta alla presidenza sembrava scritta male. Con i template ho mandato la prima comunicazione professionale il giorno stesso.",
    avatar: "MR",
    color: "bg-blue-600",
  },
  {
    name: "Sofia Ferretti",
    role: "Delegata di classe, ITIS Fermi — Torino",
    content:
      "Il mentor che mi hanno assegnato aveva fatto la stessa lotta l'anno prima. Mi ha risposto in un'ora e mi ha salvato da una situazione con il preside che sembrava impossibile.",
    avatar: "SF",
    color: "bg-indigo-600",
  },
  {
    name: "Luca Benedetti",
    role: "Rappresentante, Liceo Classico Manzoni — Roma",
    content:
      "Non sapevo nemmeno cosa fosse il consiglio d'istituto. La guida di Misfits mi ha spiegato tutto in modo chiaro. Per la prima volta mi sono sentito preparato.",
    avatar: "LB",
    color: "bg-violet-600",
  },
  {
    name: "Giulia Marchetti",
    role: "Rappresentante d'istituto, IIS Majorana — Napoli",
    content:
      "La community è la cosa più preziosa. Avere 12.000 altri rappresentanti con cui confrontarsi fa sentire meno soli in un ruolo che spesso ti lascia senza risposte.",
    avatar: "GM",
    color: "bg-purple-600",
  },
  {
    name: "Alessandro Conti",
    role: "Delegato, Liceo Artistico Brera — Milano",
    content:
      "Ho usato il template per l'assemblea d'istituto e la presidenza l'ha approvata in 48 ore. Prima avevo impiegato settimane per ottenere una risposta.",
    avatar: "AC",
    color: "bg-blue-500",
  },
  {
    name: "Chiara Esposito",
    role: "Rappresentante di classe, Istituto Comprensivo — Bologna",
    content:
      "Misfits ha cambiato il modo in cui vedo il mio ruolo. Non sono più solo una firma su un documento. Sono parte di un movimento.",
    avatar: "CE",
    color: "bg-indigo-500",
  },
];

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center" data-testid={`stat-${label.replace(/\s/g, "-").toLowerCase()}`}>
      <div className="text-4xl md:text-5xl font-black text-white mb-1">
        {count.toLocaleString("it-IT")}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="text-white/50 text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
}

export function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Stats */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-3 gap-6 md:gap-12 max-w-2xl mx-auto mb-24 p-8 rounded-3xl border border-white/10 bg-card/50 backdrop-blur-sm"
        >
          <StatCounter target={500} suffix="+" label="Scuole" />
          <StatCounter target={12000} suffix="+" label="Rappresentanti" />
          <StatCounter target={300} suffix="+" label="Template" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
            Testimonianze
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Cosa dicono i <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">misfits</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name, role, content, avatar, color, index,
}: {
  name: string; role: string; content: string; avatar: string; color: string; index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="p-6 rounded-2xl border border-white/10 bg-card/60 hover:border-primary/20 hover:bg-card transition-all duration-300 flex flex-col gap-4"
      data-testid={`testimonial-card-${index}`}
    >
      <div className="flex gap-1">
        {[...Array(5)].map((_, j) => (
          <Star key={j} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>
      <p className="text-white/80 text-sm leading-relaxed flex-1">"{content}"</p>
      <div className="flex items-center gap-3 pt-2 border-t border-white/10">
        <div className={`h-9 w-9 rounded-full ${color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
          {avatar}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{name}</div>
          <div className="text-xs text-white/50">{role}</div>
        </div>
      </div>
    </motion.div>
  );
}
