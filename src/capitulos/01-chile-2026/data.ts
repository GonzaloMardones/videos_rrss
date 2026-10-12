// Cifras del Capítulo 1, con su fuente oficial. Corte de información: 12 de octubre de 2026.
// Al actualizar un dato, cambia también su fuente y fecha.

export const CORTE = "Datos al 12 de octubre de 2026";

export const crecimiento = {
  // Banco Central de Chile, Cuentas Nacionales (publicadas el 18-03-2026; 2023 y 2024 revisados).
  historico: [
    { label: "2023", value: 0.7 },
    { label: "2024", value: 2.8 },
    { label: "2025", value: 2.5 },
  ],
  // Banco Central de Chile, IPoM septiembre 2026 (rango de proyección).
  proyeccion2026: { min: 0.25, max: 0.75 },
  proyeccion2027: { min: 2, max: 3 },
  proyeccion2028: { min: 2.25, max: 3.25 },
  fuente: "Fuente: Banco Central de Chile, Cuentas Nacionales (mar. 2026) e IPoM (sept. 2026).",
};

export const mineria = {
  // Cochilco: máximo histórico de cierre en la Bolsa de Metales de Londres, semana 10–14 ago. 2026.
  cobreRecord: 6.59,
  // Banco Central de Chile, Imacec de agosto 2026 (publicado el 01-10-2026), variación anual.
  imacec: -1.0,
  imacecMinero: -17.4,
  imacecNoMinero: 1.4,
  fuente: "Fuentes: Banco Central de Chile, Imacec agosto 2026; Cochilco (precio del cobre, ago. 2026).",
};

export const inflacion = {
  // INE, IPC: variación a 12 meses.
  serie: [
    { label: "Dic", value: 3.5 },
    { label: "Ene", value: 2.8 },
    { label: "Feb", value: 2.4 },
    { label: "Mar", value: 2.8 },
    { label: "Abr", value: 4.0 },
    { label: "May", value: 3.9 },
    { label: "Jun", value: 4.3 },
    { label: "Jul", value: 3.5 },
    { label: "Ago", value: 4.1 },
    { label: "Sep", value: 4.1 },
  ],
  meta: 3,
  rango: { min: 2, max: 4 },
  // Banco Central de Chile, IPoM septiembre 2026.
  proyeccionCierre2026: 4.3,
  fuente: "Fuentes: INE, IPC (dic. 2025 a sept. 2026); Banco Central de Chile, IPoM sept. 2026.",
};

export const tasa = {
  // Banco Central de Chile: recorte a 4,5% en diciembre de 2025; se mantuvo en abril, junio y septiembre de 2026.
  tpm: 4.5,
  desde: "dic. 2025",
  fuente: "Fuente: Banco Central de Chile, Reunión de Política Monetaria (8 sept. 2026) e IPoM sept. 2026.",
};

export const empleo = {
  // INE, Encuesta Nacional de Empleo, trimestres móviles 2026.
  serie: [
    { label: "Ene–Mar", value: 8.9 },
    { label: "Feb–Abr", value: 9.1 },
    { label: "Mar–May", value: 9.4 },
    { label: "Abr–Jun", value: 9.4 },
    { label: "May–Jul", value: 9.5 },
    { label: "Jun–Ago", value: 9.6 },
  ],
  alzaDoceMeses: 1.0, // puntos porcentuales vs. jun–ago 2025
  ocupados: -0.9, // % anual
  mujeres: 10.3,
  hombres: 9.1,
  fuente: "Fuente: INE, Encuesta Nacional de Empleo (trimestre jun–ago 2026, publicado el 30-09-2026).",
};

export const fiscal = {
  // Dipres, Informe de Finanzas Públicas del tercer trimestre de 2026.
  deficit2025: 2.8,
  deficit2026: 1.8,
  deuda2026: 42.7,
  nivelPrudente: 45,
  fuente: "Fuente: Dipres, Informe de Finanzas Públicas, tercer trimestre de 2026.",
};

export const reconstruccion = {
  // Ministerio de Hacienda / Congreso: Ley de Reconstrucción Nacional y Desarrollo Económico y Social (2026).
  impuestoDesde: 27,
  impuestoHasta: 23,
  fuente: "Fuentes: Banco Central de Chile, IPoM sept. 2026; Ministerio de Hacienda.",
};
