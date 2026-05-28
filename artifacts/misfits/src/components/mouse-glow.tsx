import { useEffect, useRef } from "react";

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -9999, y: -9999 });
  const current = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.07);
      current.current.y = lerp(current.current.y, pos.current.y, 0.07);

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={glowRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle at center, rgba(100,180,255,0.13) 0%, rgba(60,140,255,0.08) 30%, rgba(19,55,244,0.04) 60%, transparent 75%)",
          filter: "blur(30px)",
          borderRadius: "50%",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
