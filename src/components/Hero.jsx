import { useEffect, useRef, useState } from "react";
import { marquee } from "../data.js";

// Cinta que avanza sola y se acelera / cambia de sentido según el scroll
function Marquee() {
  const track = useRef(null);
  const words = [...marquee, ...marquee]; // duplicado para que el bucle sea continuo

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0, last = window.scrollY, velocity = 0, dir = 1, id;
    const loop = () => {
      const y = window.scrollY;
      const delta = y - last;
      last = y;
      if (delta) dir = delta > 0 ? 1 : -1;
      velocity += (Math.abs(delta) - velocity) * 0.1;      // suavizado
      x -= (0.5 + velocity * 0.35) * dir;
      const half = track.current.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.current.style.transform = `translate3d(${x}px, 0, 0)`;
      id = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={track}>
        {words.map((w, i) => <span key={i}>{w}<b>/</b></span>)}
      </div>
    </div>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <section id="inicio" className={`hero ${loaded ? "loaded" : ""}`}>
        <div className="wrap">
          <div className="hero-top">
            <span className="label fade">Desarrollador de software — Python · Java · React</span>
            <span className="status fade" style={{ "--d": "150ms" }}><i /> Disponible para nuevos proyectos</span>
          </div>
          <h1>
            <span className="line"><span className="line-in" style={{ "--i": 0 }}>Código limpio,</span></span>
            <span className="line indent"><span className="line-in em" style={{ "--i": 1 }}>ideas que</span></span>
            <span className="line"><span className="line-in" style={{ "--i": 2 }}>funcionan<span className="dot">.</span></span></span>
          </h1>
          <div className="hero-bottom">
            <p className="fade" style={{ "--d": "500ms" }}>
              Soy <strong>Juan Carlos Lora</strong>. Construyo software con <strong>Python</strong> y{" "}
              <strong>Java</strong>, e interfaces web con <strong>React</strong>. Me gusta que las cosas
              funcionen bien y se entiendan a la primera.
            </p>
            <div className="hero-cta fade" style={{ "--d": "650ms" }}>
              <a href="#proyectos" className="btn btn-accent">Ver proyectos <span className="arrow">→</span></a>
              <a href="#demos" className="btn btn-line">Probar demos</a>
            </div>
          </div>
        </div>
      </section>
      <Marquee />
    </>
  );
}
