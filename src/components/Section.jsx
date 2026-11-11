import { useReveal } from "../hooks.js";

// Sección con cabecera grande. Cuando entra en pantalla recibe la clase "visible",
// que dispara las animaciones del título (línea a línea) y de los hijos con .stagger
export default function Section({ id, label, title, count, children }) {
  const [ref, visible] = useReveal();
  const lines = Array.isArray(title) ? title : [title];
  return (
    <section id={id} ref={ref} className={`section ${visible ? "visible" : ""}`}>
      <div className="wrap">
        <header className="section-head">
          <div>
            <span className="label fade">{label}</span>
            <h2>
              {lines.map((l, i) => (
                <span className="line" key={i}><span className="line-in" style={{ "--i": i + 1 }}>{l}</span></span>
              ))}
            </h2>
          </div>
          {count && <span className="count fade" style={{ "--d": "300ms" }}>({count})</span>}
        </header>
        {typeof children === "function" ? children(visible) : children}
      </div>
    </section>
  );
}
