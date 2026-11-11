import { useEffect, useState } from "react";
import Section from "./Section.jsx";
import TodoDemo from "./demos/TodoDemo.jsx";
import PasswordDemo from "./demos/PasswordDemo.jsx";
import StopwatchDemo from "./demos/StopwatchDemo.jsx";

const tabs = [
  { id: "todo", name: "Taskly", hint: "Tareas", color: "#C8F169", Component: TodoDemo },
  { id: "pass", name: "KeyForge", hint: "Contraseñas", color: "#7B61FF", Component: PasswordDemo },
  { id: "timer", name: "Lapso", hint: "Cronómetro", color: "#FFD23F", Component: StopwatchDemo },
];

export default function Demos() {
  const [active, setActive] = useState("todo");
  const tab = tabs.find((t) => t.id === active);

  // Los casos de estudio pueden abrir una demo concreta
  useEffect(() => {
    const onOpen = (e) => tabs.some((t) => t.id === e.detail) && setActive(e.detail);
    window.addEventListener("open-demo", onOpen);
    return () => window.removeEventListener("open-demo", onOpen);
  }, []);

  return (
    <Section id="demos" label="04 — Laboratorio" title={<>Pruébalo <span className="em">tú mismo</span></>}>
      <div className="demos stagger">
        <div className="demo-tabs" role="tablist" aria-label="Demos">
          {tabs.map((t, i) => (
            <button key={t.id} role="tab" aria-selected={active === t.id}
                    className={`tab ${active === t.id ? "active" : ""}`} onClick={() => setActive(t.id)}>
              <span className="mono">0{i + 1}</span>
              {t.name}
              <span className="sw" style={{ background: t.color }} />
            </button>
          ))}
        </div>
        <div className="demo-panel" key={active} role="tabpanel">
          <div className="demo-head">
            <h3>{tab.name}<span style={{ color: tab.color }}>.</span></h3>
            <span className="label">{tab.hint}</span>
          </div>
          <tab.Component />
        </div>
      </div>
    </Section>
  );
}
