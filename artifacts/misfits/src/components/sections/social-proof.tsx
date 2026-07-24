/*
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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
    <section id="stats" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-3 gap-6 md:gap-12 max-w-2xl mx-auto p-8 rounded-3xl border border-white/10 bg-card/50 backdrop-blur-sm"
        >
          <StatCounter target={500} suffix="+" label="Scuole" />
          <StatCounter target={12000} suffix="+" label="Rappresentanti" />
          <StatCounter target={300} suffix="+" label="Template" />
        </motion.div>
      </div>
    </section>
  );
}
*/
