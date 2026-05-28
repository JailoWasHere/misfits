import { motion } from "framer-motion";

const items = [
  "Template Legali",
  "Wiki Burocratica",
  "Mentor su WhatsApp",
  "Community Nazionale",
  "Statuto degli Studenti",
  "Assemblee d'Istituto",
  "Rappresentanti Uniti",
  "Co-gestione",
  "Comitato Studentesco",
  "Misfits Network",
];

interface MarqueeStripProps {
  reverse?: boolean;
  dim?: boolean;
}

export function MarqueeStrip({ reverse = false, dim = false }: MarqueeStripProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`relative overflow-hidden py-4 border-y border-white/6 ${dim ? "opacity-40" : "opacity-70"}`}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: reverse ? ["0%", "50%"] : ["-50%", "0%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 pr-8 text-sm font-semibold tracking-wide text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
