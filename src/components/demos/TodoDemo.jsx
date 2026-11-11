import { useState } from "react";
import { useLocalStorage } from "../../hooks.js";

const initialTodos = [
  { id: 1, text: "Diseñar la identidad visual", done: true },
  { id: 2, text: "Escribir los casos de estudio", done: false },
  { id: 3, text: "Publicar en GitHub Pages", done: false },
];

export default function TodoDemo() {
  const [todos, setTodos] = useLocalStorage("todos", initialTodos);
  const [input, setInput] = useState("");

  const add = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setInput("");
  };
  const toggle = (id) => setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id));

  const pending = todos.filter((t) => !t.done).length;

  return (
    <>
      <form className="row" onSubmit={add}>
        <input className="field" type="text" placeholder="Nueva tarea…" value={input}
               onChange={(e) => setInput(e.target.value)} autoComplete="off" aria-label="Nueva tarea" />
        <button className="btn btn-solid" type="submit">Añadir</button>
      </form>
      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t.id} className={t.done ? "done" : ""}>
            <span className="check" aria-hidden="true">{t.done ? "✓" : ""}</span>
            <span className="text" role="checkbox" aria-checked={t.done} tabIndex={0}
                  onClick={() => toggle(t.id)} onKeyDown={(e) => e.key === "Enter" && toggle(t.id)}>
              {t.text}
            </span>
            <button className="del" aria-label={`Eliminar ${t.text}`} onClick={() => remove(t.id)}>✕</button>
          </li>
        ))}
      </ul>
      <p className="demo-note">
        {pending} pendiente{pending === 1 ? "" : "s"} · {todos.length} en total · se guarda en tu navegador
      </p>
    </>
  );
}
