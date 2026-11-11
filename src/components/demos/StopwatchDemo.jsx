import { useEffect, useRef, useState } from "react";

function format(ms) {
  const m = String(Math.floor(ms / 60000)).padStart(2, "0");
  const s = String(Math.floor(ms / 1000) % 60).padStart(2, "0");
  const cs = String(Math.floor(ms / 10) % 100).padStart(2, "0");
  return `${m}:${s}.${cs}`;
}

export default function StopwatchDemo() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const startRef = useRef(0);   // momento en que se pulsó "Iniciar"
  const baseRef = useRef(0);    // tiempo acumulado antes de la última pausa

  useEffect(() => {
    if (!running) return;
    startRef.current = performance.now();
    let id;
    const tick = () => {
      setTime(baseRef.current + performance.now() - startRef.current);
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(id);
      baseRef.current += performance.now() - startRef.current;
    };
  }, [running]);

  const reset = () => {
    setRunning(false);
    // esperar a que el efecto limpie antes de poner a cero
    setTimeout(() => { baseRef.current = 0; setTime(0); setLaps([]); });
  };

  return (
    <>
      <div className="timer" style={{ color: running ? "var(--ink)" : "var(--muted)" }}>{format(time)}</div>
      <div className="row center">
        <button className="btn btn-solid" type="button" onClick={() => setRunning(!running)}>
          {running ? "Pausar" : time ? "Reanudar" : "Iniciar"}
        </button>
        <button className="btn btn-line" type="button" disabled={!running}
                onClick={() => setLaps([time, ...laps])}>Vuelta</button>
        <button className="btn btn-line" type="button" onClick={reset}>Reiniciar</button>
      </div>
      {laps.length > 0 && (
        <ul className="laps">
          {laps.map((l, i) => (
            <li key={laps.length - i}><span>Vuelta {laps.length - i}</span><span>{format(l)}</span></li>
          ))}
        </ul>
      )}
    </>
  );
}
