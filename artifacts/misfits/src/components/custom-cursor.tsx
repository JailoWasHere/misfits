import { useEffect, useRef, useState } from "react";
import { useCursor } from "@/contexts/cursor-context";

/**
 * Dimensione del riquadro (in px) che ospita la macchia d'inchiostro.
 * Il filtro gooey rasterizza solo quest'area (che segue il cursore),
 * non l'intero schermo: così l'effetto resta leggero e fluido.
 */
const FIELD = 900;
const CENTER = FIELD / 2;

/**
 * I "blob" che compongono la macchia. Ognuno insegue il cursore con un
 * `ease` diverso: i più lenti restano indietro e formano code/tentacoli
 * (effetto piovra/inchiostro). `wob`/`spd`/`phase` danno un'oscillazione
 * continua, così la macchia è viva anche a cursore fermo.
 */
const BLOBS = [
  { ease: 0.32, size: 130, wob: 8, spd: 1.4, phase: 0.0 },
  { ease: 0.22, size: 116, wob: 16, spd: 1.1, phase: 1.1 },
  { ease: 0.16, size: 104, wob: 24, spd: 0.85, phase: 2.3 },
  { ease: 0.115, size: 92, wob: 32, spd: 0.7, phase: 3.5 },
  { ease: 0.08, size: 80, wob: 40, spd: 0.55, phase: 4.6 },
  { ease: 0.055, size: 68, wob: 48, spd: 0.42, phase: 5.7 },
];

export function CustomCursor() {
  const { enabled } = useCursor();
  const dotRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mouse = useRef({ x: -2000, y: -2000 });
  const prevMouse = useRef({ x: -2000, y: -2000 });
  // Offset locale di ogni blob rispetto al centro del riquadro (per il trailing).
  const offsets = useRef(BLOBS.map(() => ({ x: 0, y: 0 })));
  // Scala target letta dal loop rAF senza ri-registrare i listener.
  const interact = useRef({ hovered: false, pressed: false });
  const scale = useRef(1);
  const rafRef = useRef<number>(0);

  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Nasconde il cursore di sistema solo quando quello custom è attivo.
  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.setAttribute("data-custom-cursor", "");
    } else {
      root.removeAttribute("data-custom-cursor");
    }
    return () => root.removeAttribute("data-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      // Al primo movimento allinea la posizione precedente per evitare
      // un delta enorme (che farebbe partire la macchia dall'angolo).
      if (mouse.current.x === -2000) {
        prevMouse.current = { x: e.clientX, y: e.clientY };
      }
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onDown = () => {
      interact.current.pressed = true;
      setPressed(true);
    };
    const onUp = () => {
      interact.current.pressed = false;
      setPressed(false);
    };
    const onEnter = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [data-cursor-hover]")) {
        interact.current.hovered = true;
        setHovered(true);
      }
    };
    const onLeave = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [data-cursor-hover]")) {
        interact.current.hovered = false;
        setHovered(false);
      }
    };

    const tick = () => {
      const t = performance.now() / 1000;
      const m = mouse.current;

      // Il riquadro segue esattamente il cursore (rasterizzazione locale del filtro).
      if (fieldRef.current) {
        fieldRef.current.style.transform = `translate3d(${m.x - CENTER}px, ${m.y - CENTER}px, 0)`;
      }

      // Scala fluida verso il target (hover ingrandisce, click contrae).
      const targetScale = interact.current.pressed
        ? 0.75
        : interact.current.hovered
          ? 1.4
          : 1;
      scale.current += (targetScale - scale.current) * 0.15;

      // Spostamento del cursore da compensare per creare il trailing.
      const dx = m.x - prevMouse.current.x;
      const dy = m.y - prevMouse.current.y;
      prevMouse.current = { x: m.x, y: m.y };

      for (let i = 0; i < BLOBS.length; i++) {
        const b = BLOBS[i];
        const o = offsets.current[i];
        // Compensa il salto del riquadro: il blob "resta indietro" nel viewport.
        o.x -= dx;
        o.y -= dy;
        // Oscillazione organica continua + rientro morbido verso il centro.
        const wobX = Math.cos(t * b.spd + b.phase) * b.wob;
        const wobY = Math.sin(t * b.spd * 1.25 + b.phase) * b.wob;
        o.x += (wobX - o.x) * b.ease;
        o.y += (wobY - o.y) * b.ease;

        const el = blobRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${o.x}px, ${o.y}px, 0) scale(${scale.current})`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Filtro gooey (metaball): fonde i blob in un'unica macchia organica. */}
      <svg aria-hidden="true" style={{ position: "fixed", width: 0, height: 0 }}>
        <defs>
          <filter id="cursor-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="6" />
          </filter>
        </defs>
      </svg>

      {/* Riquadro che segue il cursore e porta il filtro + fusione dei blob. */}
      <div
        ref={fieldRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: FIELD,
          height: FIELD,
          pointerEvents: "none",
          zIndex: 99990,
          filter: "url(#cursor-goo)",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      >
        {BLOBS.map((b, i) => (
          <div
            key={i}
            ref={(el) => {
              blobRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              left: CENTER,
              top: CENTER,
              width: b.size,
              height: b.size,
              marginLeft: -b.size / 2,
              marginTop: -b.size / 2,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(120,200,255,0.95) 0%, rgba(60,140,255,0.6) 55%, rgba(19,55,244,0) 72%)",
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* Punto azzurrino — cursore preciso. */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: hovered ? "#a5e8ff" : "#7dcfff",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "background 0.15s ease, box-shadow 0.15s ease, width 0.15s ease, height 0.15s ease",
          boxShadow: hovered
            ? "0 0 14px 4px rgba(160,230,255,0.6)"
            : "0 0 8px 2px rgba(125,207,255,0.45)",
          ...(pressed ? { width: "8px", height: "8px" } : {}),
        }}
      />
    </>
  );
}
