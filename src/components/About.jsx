import Section from "./Section.jsx";
import { profile } from "../data.js";

export default function About() {
  return (
    <Section id="sobre-mi" label="02 — Sobre mí" title="Quién hay detrás">
      <div className="about stagger">
        <div>
          <p className="about-lead">
            Programador que disfruta <span className="em">entendiendo</span> cómo funcionan las cosas
            por dentro y convirtiéndolas en <span className="hl">herramientas útiles</span>.
          </p>
          <p className="about-text">
            Mi base está en Python y Java: lógica, estructuras de datos y programas que resuelven
            problemas concretos. En los últimos meses he llevado eso a la web con JavaScript y React.
            Esta página es la prueba: diseño, código y contenido hechos por mí.
          </p>
        </div>
        <ul className="facts">
          <li><span>Ubicación</span><span>{profile.location}</span></li>
          <li><span>Formación</span><span>{profile.education}</span></li>
          <li><span>Enfoque</span><span>Backend & frontend</span></li>
          <li><span>Lenguajes</span><span>Python, Java, JS</span></li>
          <li><span>Estado</span><span>Abierto a oportunidades</span></li>
        </ul>
      </div>
    </Section>
  );
}
