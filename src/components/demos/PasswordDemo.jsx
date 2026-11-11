import { useCallback, useEffect, useState } from "react";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  num: "0123456789",
  sym: "!@#$%^&*()-_=+[]{};:,.?",
};

export default function PasswordDemo() {
  const [length, setLength] = useState(20);
  const [opts, setOpts] = useState({ upper: true, num: true, sym: true });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const chars = SETS.lower + Object.keys(opts).filter((k) => opts[k]).map((k) => SETS[k]).join("");

  const generate = useCallback(() => {
    const random = crypto.getRandomValues(new Uint32Array(length)); // aleatoriedad criptográfica
    setPassword(Array.from(random, (n) => chars[n % chars.length]).join(""));
  }, [length, chars]);

  useEffect(generate, [generate]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(password); setCopied(true); setTimeout(() => setCopied(false), 1200); }
    catch {}
  };

  // Fuerza = bits de entropía: longitud × log2(tamaño del alfabeto)
  const bits = Math.round(length * Math.log2(chars.length));
  const [color, level] = bits < 50 ? ["#F87171", "débil"] : bits < 80 ? ["#FBBF24", "aceptable"] : ["#34D399", "muy fuerte"];

  return (
    <>
      <div className="row">
        <input className="field mono" type="text" readOnly value={password} aria-label="Contraseña generada" />
        <button className="btn btn-line" type="button" onClick={copy}>{copied ? "¡Copiada!" : "Copiar"}</button>
      </div>
      <label className="range">
        <span>Longitud: <strong style={{ color: "var(--ink)" }}>{length}</strong></span>
        <input type="range" min="6" max="40" value={length} onChange={(e) => setLength(+e.target.value)} />
      </label>
      <div className="checks">
        {[["upper", "Mayúsculas"], ["num", "Números"], ["sym", "Símbolos"]].map(([key, label]) => (
          <label key={key}>
            <input type="checkbox" checked={opts[key]} onChange={() => setOpts({ ...opts, [key]: !opts[key] })} />
            {label}
          </label>
        ))}
      </div>
      <div className="strength">
        <div style={{ width: `${Math.min(100, bits / 1.28)}%`, background: color }} />
      </div>
      <p className="strength-text">≈ {bits} bits de entropía · {level}</p>
      <button className="btn btn-solid" type="button" onClick={generate}>Generar otra</button>
    </>
  );
}
