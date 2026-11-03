// Cápsula técnica 1: anatomía de un proyecto de IA. Parámetros de referencia de un pipeline RAG real,
// generalizados: no se nombran productos, proyectos ni proveedores.

export const capas = [
  { n: 1, nombre: "Ingesta", detalle: "PDF · DOCX · transcripciones → texto limpio" },
  { n: 2, nombre: "Conocimiento", detalle: "RAG: chunks · embeddings · base vectorial" },
  { n: 3, nombre: "Orquestación", detalle: "agente como grafo de estados" },
  { n: 4, nombre: "Integraciones", detalle: "herramientas · APIs · otros agentes · auth" },
  { n: 5, nombre: "Persistencia", detalle: "metadatos · memoria por tema · fallbacks" },
];

export const rag = {
  chunkSize: 800, // caracteres por trozo
  chunkOverlap: 150, // traslape entre trozos consecutivos
  dimensiones: 768, // tamaño del vector de embedding
  topK: 3, // trozos que se pasan al modelo como contexto
  umbral: 0.87, // similitud coseno mínima para considerar "el mismo tema"
  lotes: 5, // embeddings por lote al ingerir
  // Modos de embedding: el mismo modelo produce vectores distintos según la tarea.
  modos: ["documento", "consulta", "similitud"],
  // Búsqueda coseno en memoria: razonable hasta unos miles de vectores por usuario; después, base vectorial dedicada.
  limiteMemoria: "~miles de vectores",
};

export const agente = {
  nodos: ["reunir contexto", "razonar", "guardar"],
  // Cada nodo tiene un plan B: RAG → contexto vacío · grafo → llamada directa · clasificación → hash determinístico.
  fallbacks: ["RAG falla → sin contexto", "grafo falla → llamada directa", "detector falla → hash"],
  salida: "JSON con esquema validado",
};

export const acelera = {
  // Comparación de orden de magnitud, no una medición: reentrenar un modelo con documentos propios vs. ingestarlos en un RAG.
  sinRAG: { etiqueta: "reentrenar", tiempo: "semanas" },
  conRAG: { etiqueta: "ingestar", tiempo: "minutos" },
};
