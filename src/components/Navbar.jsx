import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../hooks.js";
import { profile } from "../data.js";

const links = [
  ["proyectos", "Proyectos"],
  ["sobre-mi", "Sobre mí"],
  ["stack", "Stack"],
  ["demos", "Demos"],
  ["contacto", "Contacto", "only-mobile"], // en escritorio ya está el botón
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const progress = useRef(null);

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  // Fondo al bajar, se esconde al bajar y reaparece al subir, y barra de progreso
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 400 && y > last);
      last = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="progress" ref={progress} aria-hidden="true" />
      <header className={`nav ${scrolled || open ? "scrolled" : ""} ${hidden && !open ? "hidden" : ""}`}>
        <div className="wrap nav-inner">
          <a href="#inicio" className="logo" onClick={() => setOpen(false)}>
            {profile.initials}<sup>©</sup>
          </a>
          <nav className={`nav-links ${open ? "open" : ""}`}>
            {links.map(([id, label, cls = ""], i) => (
              <a key={id} href={`#${id}`} className={cls} onClick={() => setOpen(false)}>
                {label}<span className="num">0{i + 1}</span>
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="icon-btn theme-btn"
              aria-label={theme === "light" ? "Activar tema oscuro" : "Activar tema claro"}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? "☾" : "☀"}
            </button>
            <a href="#contacto" className="btn btn-solid">Contacto <span className="arrow">→</span></a>
            <button className="icon-btn menu-btn" aria-label="Menú" aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
