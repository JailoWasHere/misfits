import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  FileX, BookX, Users2, AlertTriangle, ArrowRight,
  Clock, Frown, TrendingDown, Lightbulb,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/reveal-text";

/* ─── Data ─────────────────────────────────────────────── */

const coreProblems = [
  {
    icon: FileX,
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    title: "Zero template, zero guida",
    short: "Scrivi tutto da zero.",
    body: "Succede sempre: nessuno ti spiega cosa devi fare e come farlo correttamente. Ogni richiesta alla presidenza, ogni verbale, ogni comunicato: li devi inventare da capo. Non esiste un archivio, non esiste un modello. Esisti tu, una tastiera e tanta ansia.",
  },
  {
    icon: BookX,
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    title: "La burocrazia è un labirinto",
    short: "Nessuno ti spiega le regole.",
    body: "RSU, Consigli d'Istituto, Commissioni, OO.CC., Statuto degli Studenti. Parole che senti ma che nessuno ti ha mai spiegato per davvero. Il Preside spesso fa lo stesso — conta sul fatto che tu non sappia i tuoi diritti per dirti semplicemente di no.",
  },
  {
    icon: Users2,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    title: "Ogni anno si ricomincia da zero",
    short: "La memoria istituzionale sparisce.",
    body: "Ogni settembre, un nuovo eletto riparte dalla casella di partenza. Le conquiste del mandato precedente vanno perse, i contatti svaniscono, le battaglie vinte si dimenticano. La continuità è zero e la presidenza lo sa — aspetta soltanto che voi vi arrendiate.",
  },
  {
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    title: "Sei solo contro tutti",
    short: "Nessun supporto, nessun network.",
    body: "Non esiste una rete di rappresentanti. Non c'è un mentor che ti dica 'è normale, anche a me è capitato'. Non c'è una community dove confrontarsi. Sei un'isola, e nel momento più difficile — quando la presidenza ti manda un legale o minaccia sospensioni — non sai a chi rivolgerti.",
  },
];

const stats = [
  { value: "90%", label: "dei rappresentanti non conosce tutti i propri diritti" },
  { value: "1/3", label: "delle assemblee viene negata illegittimamente ogni anno" },
  { value: "0", label: "ore di formazione obbligatoria previste dallo Stato per i nuovi eletti" },
  { value: "4 anni", label: "il tempo che un rappresentante spreca a 'imparare sul campo'" },
];

const timeline = [
  { icon: Clock, label: "Settembre", text: "Vieni eletto. Sei contento. Non sai da dove cominciare." },
  { icon: Frown, label: "Ottobre", text: "Fai la prima richiesta. La presidenza dice no. Non sai perché, non sai come rispondere." },
  { icon: TrendingDown, label: "Gennaio", text: "Hai perso le prime battaglie. La motivazione cala. La tua classe ti guarda deluso." },
  { icon: Lightbulb, label: "Giugno", text: "Finalmente hai imparato. Ma il mandato è finito — e non lasci nulla a chi viene dopo." },
];

/* ─── Components ────────────────────────────────────────── */

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="p-6 rounded-2xl border border-white/8 bg-white/3 text-center"
    >
      <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-3">
        {value}
      </div>
      <p className="text-white/55 text-sm leading-relaxed">{label}</p>
    </motion.div>
  );
}

function ProblemBlock({
  icon: Icon, color, bg, title, short, body, index,
}: (typeof coreProblems)[0] & { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col md:flex-row gap-6 items-start p-7 rounded-3xl border ${bg}`}
    >
      <div className={`p-4 rounded-2xl bg-white/5 flex-shrink-0`}>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
      <div>
        <p className={`text-xs font-black uppercase tracking-widest mb-1 ${color} opacity-70`}>{short}</p>
        <h3 className="text-2xl font-black text-white mb-3">{title}</h3>
        <p className="text-white/60 leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}

function TimelineItem({
  icon: Icon, label, text, index,
}: (typeof timeline)[0] & { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isLast = index === timeline.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="flex gap-5 relative"
    >
      {/* Line */}
      {!isLast && (
        <div className="absolute left-5 top-12 bottom-0 w-px bg-white/8" />
      )}
      <div className="flex-shrink-0 p-2.5 rounded-xl bg-white/6 border border-white/10 h-fit z-10">
        <Icon className="h-5 w-5 text-white/50" />
      </div>
      <div className="pb-8">
        <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-white/75 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function IlProblema() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-red-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500 rounded-full mix-blend-screen filter blur-[120px] opacity-15" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
            />
          </div>

          <div ref={heroRef} className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm text-red-400 mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-red-400 mr-2 animate-pulse" />
              Il Problema
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-tight">
              {["Eletto", "oggi."].map((w, i) => (
                <motion.span
                  key={w}
                  className="inline-block mr-[0.22em]"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              ))}
              <br />
              {["Solo", "domani."].map((w, i) => (
                <motion.span
                  key={w}
                  className="inline-block mr-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.42 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl mx-auto"
            >
              Ogni anno in Italia, oltre <strong className="text-white/90">30.000 studenti</strong> vengono
              eletti rappresentanti d'istituto e si trovano davanti allo stesso muro invisibile.
              Nessuna guida. Nessun playbook. Nessun supporto. Solo tanta buona volontà che si scontra
              con una burocrazia pensata per scoraggiarti.
            </motion.p>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-16 border-y border-white/6">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((s, i) => (
                <StatCard key={s.label} {...s} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Core problems ── */}
        <section className="py-24 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-red-950/4 to-background pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-5 tracking-tight">
                <RevealText>I quattro muri che ogni rappresentante incontra</RevealText>
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-white/55 text-lg leading-relaxed"
              >
                Non è colpa tua. È un sistema che non ti prepara e non ti supporta.
              </motion.p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {coreProblems.map((p, i) => (
                <ProblemBlock key={p.title} {...p} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                  L'anno tipo di un rappresentante
                </h2>
                <p className="text-white/50">Come va a finire, quasi sempre.</p>
              </div>
              <div className="space-y-0">
                {timeline.map((t, i) => (
                  <TimelineItem key={t.label} {...t} index={i} />
                ))}
              </div>

              {/* Bottom note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-4 p-5 rounded-2xl border border-primary/25 bg-primary/8"
              >
                <p className="text-white/75 leading-relaxed text-sm">
                  <strong className="text-white">Con Misfits</strong>, questo ciclo si spezza.
                  Ti diamo subito gli strumenti, il network e il supporto che avresti dovuto avere
                  dal primo giorno — così puoi usare il tuo mandato per fare davvero la differenza,
                  non per imparare a sopravvivere alla burocrazia.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 border-t border-white/6">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5 tracking-tight">
                Basta ricominciare da zero.
              </h2>
              <p className="text-white/55 mb-8 leading-relaxed">
                Abbiamo costruito ciò che nessun predecessore ti ha lasciato.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/">
                  <Button
                    size="lg"
                    className="h-13 px-8 text-lg bg-primary hover:bg-primary/90 text-white rounded-full shadow-[0_0_40px_-10px_rgba(19,55,244,0.8)] group transition-all"
                  >
                    Scopri la soluzione
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 px-8 text-lg rounded-full border-white/20 text-white hover:bg-white/8"
                  >
                    Torna alla home
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
