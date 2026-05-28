import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
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
      const target = e.target as Element;
      if (target.closest("a, button, [data-cursor-hover]")) {
        setHovered(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [data-cursor-hover]")) {
        setHovered(false);
      }
    };

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x - 18}px`;
        ringRef.current.style.top = `${ring.current.y - 18}px`;
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
  const dotColor = hovered ? "#4fc3f7" : "#1337f4";
  const ringBorder = hovered ? "1.5px solid rgba(79,195,247,0.7)" : "1.5px solid rgba(19,55,244,0.6)";

  return (
    <>
      {/* Punto principale — segue il mouse istantaneamente */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: dotColor,
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          transform: dotScale,
          transition: "transform 0.15s ease, background 0.15s ease",
          boxShadow: hovered ? `0 0 12px 3px rgba(79,195,247,0.5)` : `0 0 8px 2px rgba(19,55,244,0.4)`,
        }}
      />

      {/* Ring — segue con lerp */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          width: "36px",
          height: "36px",
          border: ringBorder,
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
