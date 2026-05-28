import { useEffect, useRef } from "react";

export function MouseGlow() {
  const mainRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -2000, y: -2000 });
  const fast = useRef({ x: -2000, y: -2000 });
  const slow = useRef({ x: -2000, y: -2000 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      fast.current.x = lerp(fast.current.x, pos.current.x, 0.12);
      fast.current.y = lerp(fast.current.y, pos.current.y, 0.12);
      slow.current.x = lerp(slow.current.x, pos.current.x, 0.045);
      slow.current.y = lerp(slow.current.y, pos.current.y, 0.045);

      if (mainRef.current) {
        mainRef.current.style.left = `${fast.current.x}px`;
        mainRef.current.style.top = `${fast.current.y}px`;
      }
      if (trailRef.current) {
        trailRef.current.style.left = `${slow.current.x}px`;
        trailRef.current.style.top = `${slow.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Glow principale — ellisse orizzontale, si muove veloce */}
      <div
        ref={mainRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          width: "800px",
          height: "320px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(80,170,255,0.55) 0%, rgba(40,110,255,0.28) 35%, rgba(19,55,244,0.10) 65%, transparent 80%)",
          filter: "blur(45px)",
          mixBlendMode: "screen",
          willChange: "left, top",
        }}
      />
      {/* Scia lenta — più ampia, crea la sensazione di inchiostro che si diffonde */}
      <div
        ref={trailRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9998,
          width: "1100px",
          height: "380px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(60,140,255,0.30) 0%, rgba(30,80,220,0.12) 45%, transparent 70%)",
          filter: "blur(70px)",
          mixBlendMode: "screen",
          willChange: "left, top",
        }}
      />
    </>
  );
}
