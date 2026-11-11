import Section from "./Section.jsx";
import { stack, principles } from "../data.js";

export default function Skills() {
  return (
    <Section id="stack" label="03 — Stack" title="Con qué trabajo">
      {(visible) => (
        <div className="stack stagger">
          {stack.map((g, gi) => (
            <div className="stack-card" key={g.group}>
              <h3>{g.group}</h3>
              <p>{g.note}</p>
              {g.items.map((s, si) => (
                <div className="skill" key={s.name}>
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-label">{s.label}</span>
                  <span className="skill-meter" role="img" aria-label={`${s.level} de 5`}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <i key={n} className={visible && n <= s.level ? "on" : ""}
                         style={{ transitionDelay: `${600 + gi * 200 + si * 120 + n * 80}ms` }} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          ))}
          <div className="principles">
            {principles.map(([title, text], i) => (
              <div className="principle" key={title}>
                <span className="mono">0{i + 1}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
