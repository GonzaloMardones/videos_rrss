// Cápsula técnica 2: el agente como grafo de estados y cómo conversa con frontend, backend y nube.
// Patrones generalizados de una arquitectura real; sin nombres de producto ni proveedores.

export const estado = ["petición", "usuario", "contexto RAG", "memoria del tema", "respuesta"];

export const nodos = [
  { nombre: "reunir contexto", detalle: "RAG + memoria, en paralelo" },
  { nombre: "razonar", detalle: "prompt → modelo → esquema" },
  { nombre: "guardar", detalle: "persiste si se cumple condición" },
];

export const respuesta = {
  // Campos del objeto tipado que recibe el frontend (ejemplo representativo).
  campos: [
    { k: "tipo", v: '"producto"' },
    { k: "confianza", v: "0.82" },
    { k: "recomendacion", v: '"modificar"' },
    { k: "fuentes", v: "[3]" },
  ],
};

export const rebanada = ["router · solo HTTP", "service · lógica + IA", "schema · tipos"];

export const nube = [
  { nombre: "modelo + embeddings", detalle: "servicios administrados · una región" },
  { nombre: "vectores", detalle: "base de documentos" },
  { nombre: "metadatos", detalle: "base relacional" },
  { nombre: "aplicación", detalle: "contenedores sin servidor" },
  { nombre: "identidad", detalle: "proxy que valida cada usuario" },
];

export const ambientes = ["local", "desarrollo", "producción"];
export const configurable = ["modelo", "umbral 0.87", "trozo 800/150"];
