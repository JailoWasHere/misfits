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
      fast.current.x = lerp(fast.current.x, pos.current.x, 0.1);
      fast.current.y = lerp(fast.current.y, pos.current.y, 0.1);
      slow.current.x = lerp(slow.current.x, pos.current.x, 0.038);
      slow.current.y = lerp(slow.current.y, pos.current.y, 0.038);

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
      {/* SVG filter: turbulence distorce la forma in modo organico/casuale */}
      <svg
        aria-hidden="true"
        style={{ position: "fixed", width: 0, height: 0, overflow: "hidden", zIndex: -1 }}
      >
        <defs>
          <filter id="ink-distort" x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.022"
              numOctaves="4"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="140"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="18" />
          </filter>
          <filter id="ink-distort-trail" x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.014 0.019"
              numOctaves="3"
              seed="13"
              result="noise2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise2"
              scale="180"
              xChannelSelector="G"
              yChannelSelector="R"
              result="displaced2"
            />
            <feGaussianBlur in="displaced2" stdDeviation="28" />
          </filter>
        </defs>
      </svg>

      {/* Glow principale — si muove rapido, distorto dal filtro turbolenza */}
      <div
        ref={mainRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          width: "520px",
          height: "420px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle at 45% 55%, rgba(80,170,255,0.70) 0%, rgba(40,110,255,0.40) 30%, rgba(19,55,244,0.15) 60%, transparent 80%)",
          filter: "url(#ink-distort)",
          mixBlendMode: "screen",
          willChange: "left, top",
        }}
      />

      {/* Scia lenta — più grande, distorsione diversa, effetto vapore/inchiostro */}
      <div
        ref={trailRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9998,
          width: "700px",
          height: "560px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle at 55% 45%, rgba(60,150,255,0.45) 0%, rgba(30,90,230,0.20) 40%, transparent 72%)",
          filter: "url(#ink-distort-trail)",
          mixBlendMode: "screen",
          willChange: "left, top",
        }}
      />
    </>
  );
}
