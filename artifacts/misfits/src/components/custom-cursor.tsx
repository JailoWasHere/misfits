import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -2000, y: -2000 });
  const ring = useRef({ x: -2000, y: -2000 });
  const glow = useRef({ x: -2000, y: -2000 });
  const rafRef = useRef<number>(0);
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 6}px`;
        dotRef.current.style.top = `${e.clientY - 6}px`;
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const onEnter = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [data-cursor-hover]")) setHovered(true);
    };
    const onLeave = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [data-cursor-hover]")) setHovered(false);
    };

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      glow.current.x += (mouse.current.x - glow.current.x) * 0.055;
      glow.current.y += (mouse.current.y - glow.current.y) * 0.055;

      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x - 18}px`;
        ringRef.current.style.top = `${ring.current.y - 18}px`;
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${glow.current.x}px`;
        glowRef.current.style.top = `${glow.current.y}px`;
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
  }, []);

  const dotScale = pressed ? "scale(0.6)" : hovered ? "scale(2.2)" : "scale(1)";
  const ringScale = pressed ? "scale(0.8)" : hovered ? "scale(1.5)" : "scale(1)";

  return (
    <>
      {/* Filtro SVG turbulenza — deforma il bagliore in forma organica */}
      <svg aria-hidden="true" style={{ position: "fixed", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id="cursor-ink" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.016 0.021" numOctaves="4" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="22" />
          </filter>
        </defs>
      </svg>

      {/* Bagliore senza forma — lerp lento, distorto dal filtro turbulenza */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99990,
          width: "460px",
          height: "380px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle at 48% 52%, rgba(90,180,255,0.52) 0%, rgba(50,130,255,0.24) 35%, rgba(19,55,244,0.08) 65%, transparent 80%)",
          filter: "url(#cursor-ink)",
          mixBlendMode: "screen",
          willChange: "left, top",
        }}
      />

      {/* Punto azzurrino */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: hovered ? "#a5e8ff" : "#7dcfff",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          transform: dotScale,
          transition: "transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease",
          boxShadow: hovered
            ? "0 0 14px 4px rgba(160,230,255,0.6)"
            : "0 0 8px 2px rgba(125,207,255,0.45)",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          width: "36px",
          height: "36px",
          border: hovered ? "1.5px solid rgba(160,230,255,0.75)" : "1.5px solid rgba(125,207,255,0.5)",
          borderRadius: "50%",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          transform: ringScale,
          transition: "transform 0.15s ease, border-color 0.15s ease",
        }}
      />
    </>
  );
}
