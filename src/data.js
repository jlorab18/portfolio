// =====================================================
//  ✏️ EDITA AQUÍ TUS DATOS — el resto de la web se genera solo
// =====================================================

export const profile = {
  name: "Juan Carlos Lora",
  initials: "JCL",
  location: "Madrid, España",
  education: "DAM · AWS",
  email: "joelora.bueriberi@gmail.com",
  github: null, // pon aquí la URL de tu GitHub cuando quieras mostrarlo
  linkedin: "https://www.linkedin.com/in/juancarloslorab",
};

// Palabras de la cinta que se desplaza bajo la portada
export const marquee = ["Python", "Java", "JavaScript", "React", "HTML", "CSS", "Backend", "Frontend"];

// Stack agrupado. level: 1 a 5
export const stack = [
  {
    group: "Backend & lógica",
    note: "Donde más cómodo me siento: estructurar programas, modelar datos y resolver problemas.",
    items: [
      { name: "Python", level: 5, label: "Avanzado" },
      { name: "Java", level: 4, label: "Sólido" },
    ],
  },
  {
    group: "Frontend",
    note: "Interfaces claras, accesibles y que funcionen bien en cualquier pantalla.",
    items: [
      { name: "JavaScript", level: 4, label: "Sólido" },
      { name: "React", level: 3, label: "Intermedio" },
      { name: "HTML", level: 4, label: "Sólido" },
      { name: "CSS", level: 4, label: "Sólido" },
    ],
  },
];

export const principles = [
  ["Primero que funcione", "Después, que sea claro. Al final, que sea rápido."],
  ["Datos separados de la vista", "Cambiar contenido no debería requerir tocar componentes."],
  ["Aprender construyendo", "Cada proyecto de esta página me obligó a aprender algo nuevo."],
];

// Proyectos — cada uno abre un caso de estudio
const shot = (f) => `${import.meta.env.BASE_URL}shots/${f}`;

export const projects = [
  {
    id: "portfolio",
    title: "Portfolio personal",
    kind: "Diseño & desarrollo",
    year: "2026",
    color: "#FF5A36",
    tags: ["React", "Vite", "CSS", "Diseño UI"],
    cover: shot("portfolio.svg"),
    summary: "La web que estás viendo: identidad visual propia, una SPA en React sin librerías de UI y casos de estudio documentados.",
    role: "Diseño, desarrollo y contenido",
    challenge:
      "Tenía experiencia programando, pero casi ninguna web publicada. Necesitaba un sitio que demostrara lo que sé hacer sin depender de proyectos de clientes.",
    solution:
      "Una página de una sola vista en React con demos funcionales integradas, de modo que el propio portfolio sea la prueba. Todo el contenido vive en un único archivo de datos.",
    features: [
      "Tema claro / oscuro que se recuerda entre visitas, sin parpadeo al cargar.",
      "Animaciones de entrada con IntersectionObserver que se desactivan si el sistema pide menos movimiento.",
      "Casos de estudio en un diálogo accesible: se cierra con Esc, bloquea el scroll y devuelve el foco.",
      "Diseño adaptable de móvil a escritorio, con menú a pantalla completa en móvil.",
    ],
    decisions: [
      ["Sin librería de componentes", "CSS propio con variables: el diseño es único y el bundle pesa ~50 kB comprimido."],
      ["data.js como única fuente", "Proyectos, stack y enlaces se editan en un sitio; los componentes solo pintan."],
      ["Vite con base relativa", "La carpeta dist se puede subir tal cual a GitHub Pages o Netlify."],
    ],
    learned:
      "A pensar la web como un producto: identidad visual, jerarquía tipográfica y accesibilidad pesan tanto como el código.",
    gallery: [
      { src: shot("portfolio.svg"), caption: "Portada en escritorio: titular tipográfico y cinta con el stack." },
      { src: shot("portfolio-mobile.svg"), caption: "Versión móvil en tema claro y menú abierto en tema oscuro." },
    ],
    demo: null,
  },
  {
    id: "taskly",
    title: "Taskly",
    kind: "App web",
    year: "2026",
    color: "#C8F169",
    tags: ["React", "Hooks", "localStorage"],
    cover: shot("taskly.svg"),
    summary: "Gestor de tareas minimalista que persiste en el navegador. Un ejercicio de estado inmutable y hooks propios.",
    role: "Desarrollo",
    challenge:
      "Una lista de tareas parece trivial, pero obliga a resolver bien lo básico de React: estado, listas con keys, formularios controlados y persistencia.",
    solution:
      "El estado vive en un hook propio, useLocalStorage, que funciona como useState pero sincroniza cada cambio con el almacenamiento del navegador.",
    features: [
      "Añadir, completar y eliminar tareas.",
      "Contador de pendientes en tiempo real.",
      "Las tareas sobreviven a recargar la página o cerrar el navegador.",
      "Funciona aunque el navegador bloquee el almacenamiento (modo privado).",
    ],
    decisions: [
      ["Actualizaciones inmutables", "map y filter en lugar de mutar el array: React detecta el cambio y el código es predecible."],
      ["Lectura perezosa", "useState(() => …) lee localStorage solo una vez, en el primer render."],
      ["IDs estables", "Cada tarea tiene un id propio; usar el índice como key rompe la lista al borrar."],
    ],
    learned: "Que un hook bien diseñado convierte un problema repetido en una sola línea reutilizable.",
    gallery: [
      { src: shot("taskly.svg"), caption: "Lista con tareas completadas y pendientes." },
      { src: shot("taskly-flow.svg"), caption: "Flujo de datos: de la acción del usuario al almacenamiento y de vuelta a la vista." },
    ],
    demo: "todo",
  },
  {
    id: "keyforge",
    title: "KeyForge",
    kind: "Herramienta",
    year: "2026",
    color: "#7B61FF",
    tags: ["JavaScript", "Web Crypto", "React"],
    cover: shot("keyforge.svg"),
    summary: "Generador de contraseñas seguras con medidor de fuerza basado en entropía real, no en reglas arbitrarias.",
    role: "Desarrollo",
    challenge:
      "Muchos generadores usan Math.random(), que no es criptográficamente seguro, y miden la fuerza con reglas como «tiene un símbolo».",
    solution:
      "Los caracteres se eligen con crypto.getRandomValues() y la fuerza se calcula como bits de entropía: longitud × log₂(tamaño del alfabeto).",
    features: [
      "Longitud ajustable de 6 a 40 caracteres.",
      "Mayúsculas, números y símbolos activables.",
      "Medidor de fuerza en bits con tres niveles de color.",
      "Copiar al portapapeles con un clic.",
    ],
    decisions: [
      ["Web Crypto API", "Aleatoriedad del sistema operativo, disponible en todos los navegadores modernos sin dependencias."],
      ["Entropía como métrica", "Un número objetivo y explicable en lugar de una puntuación opaca."],
      ["Regenerar al cambiar opciones", "useCallback + useEffect: la contraseña siempre refleja la configuración visible."],
    ],
    learned: "La diferencia entre aleatorio y aleatorio seguro, y cómo explicar una métrica técnica en una interfaz.",
    gallery: [
      { src: shot("keyforge.svg"), caption: "Contraseña de 20 caracteres con todos los conjuntos activos." },
      { src: shot("keyforge-entropy.svg"), caption: "La fórmula de entropía y los umbrales del medidor." },
    ],
    demo: "pass",
  },
  {
    id: "lapso",
    title: "Lapso",
    kind: "App web",
    year: "2026",
    color: "#FFD23F",
    tags: ["React", "requestAnimationFrame", "useRef"],
    cover: shot("lapso.svg"),
    summary: "Cronómetro preciso con vueltas y pausa. Pequeño, pero lleno de detalles de temporización.",
    role: "Desarrollo",
    challenge:
      "Un cronómetro con setInterval se desajusta: los intervalos no son exactos y el error se acumula, sobre todo con la pestaña en segundo plano.",
    solution:
      "En lugar de sumar ticks, el tiempo se calcula en cada fotograma a partir de marcas de tiempo absolutas con performance.now().",
    features: [
      "Iniciar, pausar y reanudar sin perder precisión.",
      "Registro de vueltas.",
      "Formato mm:ss.cc con centésimas.",
      "Limpieza correcta del bucle al desmontar el componente.",
    ],
    decisions: [
      ["requestAnimationFrame", "Se sincroniza con el refresco de pantalla y se pausa solo cuando la pestaña no es visible."],
      ["useRef para el tiempo base", "Guarda valores entre renders sin provocar renders extra."],
      ["Limpieza en el efecto", "El cleanup acumula el tiempo transcurrido al pausar: una sola fuente de verdad."],
    ],
    learned: "A pensar en el tiempo como un cálculo y no como un contador, y a usar bien el ciclo de vida de los efectos.",
    gallery: [
      { src: shot("lapso.svg"), caption: "Cronómetro en marcha con tres vueltas registradas." },
      { src: shot("lapso-timeline.svg"), caption: "Cálculo del tiempo con pausas: base acumulada más el tramo actual." },
    ],
    demo: "timer",
  },
];
