import { useEffect, useRef } from "react";

// Cursor personalizado: un punto que sigue al ratón y un anillo que lo persigue con retardo.
// Solo se activa con ratón (no en táctil) y si no se ha pedido reducir el movimiento.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    let x = -100, y = -100, rx = x, ry = y, id;

    const move = (e) => {
      x = e.clientX; y = e.clientY;
      root.classList.add("has-cursor");
      dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };
    const over = (e) => {
      const interactive = e.target.closest("a, button, [role='checkbox'], label, input[type='range']");
      ring.current.classList.toggle("hover", !!interactive);
    };
    const leave = () => root.classList.remove("has-cursor");
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      id = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    loop();
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
