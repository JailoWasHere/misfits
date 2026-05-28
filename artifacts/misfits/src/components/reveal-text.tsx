import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function RevealText({ children, className = "", delay = 0, once = true }: RevealTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const words = children.split(" ");

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.07,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
