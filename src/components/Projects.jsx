import { useCallback, useState } from "react";
import Section from "./Section.jsx";
import CaseStudy from "./CaseStudy.jsx";
import { projects } from "../data.js";

export default function Projects() {
  const [openId, setOpenId] = useState(null);
  const open = projects.find((p) => p.id === openId);
  const close = useCallback(() => setOpenId(null), []);

  return (
    <Section id="proyectos" label="01 — Trabajo" title={["Proyectos", "seleccionados"]}
             count={String(projects.length).padStart(2, "0")}>
      <div className="projects stagger">
        {projects.map((p, i) => (
          <button className="project" key={p.id} onClick={() => setOpenId(p.id)}
                  aria-label={`Ver caso de estudio: ${p.title}`}>
            <div className="project-media" style={{ background: p.color }}>
              <img src={p.cover} alt="" loading="lazy" />
              <span className="project-open">Ver caso <span>↗</span></span>
            </div>
            <div className="project-meta">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <span className="year">{p.year}</span>
            </div>
            <div className="project-tags">
              <span>{p.kind}</span>{p.tags.slice(0, 2).map((t) => <span key={t}>{t}</span>)}
            </div>
          </button>
        ))}
      </div>
      {open && <CaseStudy project={open} onClose={close} />}
    </Section>
  );
}
