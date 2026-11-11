import { useReveal } from "../hooks.js";
import { profile } from "../data.js";

export default function Contact() {
  const [ref, visible] = useReveal();
  const lines = [
    "Construyamos",
    <>algo <span className="em">que valga</span></>,
    <>la pena<span className="dot">.</span></>,
  ];
  return (
    <section id="contacto" className={`contact ${visible ? "visible" : ""}`} ref={ref}>
      <div className="wrap">
        <span className="label fade">05 — Contacto</span>
        <h2>
          {lines.map((l, i) => (
            <span className="line" key={i}><span className="line-in" style={{ "--i": i + 1 }}>{l}</span></span>
          ))}
        </h2>
        <div className="contact-row fade" style={{ "--d": "500ms" }}>
          <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="socials">
            {profile.github && (
              <a className="btn btn-line" href={profile.github} target="_blank" rel="noopener">GitHub <span className="arrow">→</span></a>
            )}
            <a className="btn btn-line" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn <span className="arrow">→</span></a>
          </div>
        </div>
        <footer className="footer">
          <span className="label">© {new Date().getFullYear()} {profile.name}</span>
          <span className="label">Diseñado y programado a mano · React + Vite</span>
          <a className="label" href="#inicio">Volver arriba ↑</a>
        </footer>
      </div>
    </section>
  );
}
