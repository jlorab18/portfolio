import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Diálogo a pantalla completa con la documentación de un proyecto
export default function CaseStudy({ project: p, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [onClose]);

  const tryDemo = () => {
    onClose();
    window.dispatchEvent(new CustomEvent("open-demo", { detail: p.demo }));
    setTimeout(() => document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <article className="modal" role="dialog" aria-modal="true" aria-labelledby="cs-title"
               onClick={(e) => e.stopPropagation()}>
        <div className="modal-bar">
          <span className="label">Caso de estudio — {p.kind}</span>
          <button ref={closeRef} className="icon-btn" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <div className="modal-body">
          <h2 id="cs-title" className="cs-title">
            <span className="line"><span className="line-in">{p.title}<span style={{ color: p.color }}>.</span></span></span>
          </h2>
          <p className="cs-summary">{p.summary}</p>

          <dl className="cs-facts">
            <div><dt className="label">Rol</dt><dd>{p.role}</dd></div>
            <div><dt className="label">Año</dt><dd>{p.year}</dd></div>
            <div><dt className="label">Tipo</dt><dd>{p.kind}</dd></div>
            <div><dt className="label">Stack</dt><dd>{p.tags.join(", ")}</dd></div>
          </dl>

          <figure className="cs-figure">
            <img src={p.gallery[0].src} alt={p.gallery[0].caption} />
            <figcaption>Fig. 1 — {p.gallery[0].caption}</figcaption>
          </figure>

          <div className="cs-grid"><h3>El reto</h3><p>{p.challenge}</p></div>
          <div className="cs-grid"><h3>La solución</h3><p>{p.solution}</p></div>
          <div className="cs-grid">
            <h3>Funcionalidades</h3>
            <ul className="cs-list">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>

          {p.gallery.slice(1).map((g, i) => (
            <figure className="cs-figure" key={g.src}>
              <img src={g.src} alt={g.caption} loading="lazy" />
              <figcaption>Fig. {i + 2} — {g.caption}</figcaption>
            </figure>
          ))}

          <div className="cs-grid">
            <h3>Decisiones técnicas</h3>
            <div className="cs-decisions">
              {p.decisions.map(([t, d]) => <div key={t}><h4>{t}</h4><p>{d}</p></div>)}
            </div>
          </div>
          <div className="cs-grid"><h3>Qué aprendí</h3><p>{p.learned}</p></div>

          <div className="cs-actions">
            {p.demo && <button className="btn btn-accent" onClick={tryDemo}>Probar la demo <span className="arrow">→</span></button>}
            <button className="btn btn-line" onClick={onClose}>Volver a proyectos</button>
          </div>
        </div>
      </article>
    </div>,
    document.body
  );
}
