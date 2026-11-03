// Capítulo 3: cifras y fuentes. Corte: 13 de octubre de 2026.

export const CORTE = "Datos al 13-10-2026";

export const inflacion = {
  // INE: IPC septiembre 2026, variación a 12 meses (publicado el 08-10-2026).
  hoy: 4.1,
  meta: 3,
  // Banco Central, IPoM sept. 2026: inflación sin volátiles entre 3,2% y 3,4%.
  sinVolatiles: { min: 3.2, max: 3.4 },
  fuente: "INE · IPC sept. 2026 · Banco Central, IPoM sept. 2026",
};

export const abril = {
  // INE: IPC de abril 2026 +1,3% mensual; combustibles para vehículos aportaron 0,978 pp
  // (gasolina +25,3%, diésel +45,7%).
  mensual: 1.3,
  incidenciaCombustibles: 0.978,
  gasolina: 25.3,
  diesel: 45.7,
  // Hacienda cambió el Mepco por decreto el 23-03-2026: bencina +$370 y diésel +$580 por litro.
  mepcoBencina: 370,
  mepcoDiesel: 580,
  fuente: "INE · IPC abril 2026 · Ministerio de Hacienda (decreto Mepco, mar. 2026)",
};

export const herramienta = {
  tpm: 4.5,
  crecimiento2026: { min: 0.25, max: 0.75 }, // Banco Central, IPoM sept. 2026
  desempleo: 9.6, // INE, jun–ago 2026
  fuente: "Banco Central · IPoM sept. 2026 · INE",
};

export const autonomia = {
  // Promedio de inflación anual 1940–1989 y en los 20 años hasta 2019 (La Tercera, en base a datos del Banco Central).
  antes: 55,
  despues: 3.2,
  ley: "Ley 18.840 (1989)",
  fuente: "Banco Central · La Tercera (2019)",
};

export const turquia = {
  // TurkStat: inflación anual de octubre 2022, máximo en 24 años, tras recortes de tasa pedidos por el presidente.
  inflacion: 85.5,
  fuente: "Instituto de Estadísticas de Turquía (oct. 2022)",
};
