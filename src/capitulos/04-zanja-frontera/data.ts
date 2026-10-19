// Capítulo 4: la zanja de la frontera norte (Plan Escudo Fronterizo). Corte: 19 de octubre de 2026.
// Las cifras marcadas como "cálculo propio" salen de las cifras públicas de abajo; no son datos oficiales.

export const CORTE = "Datos al 19-10-2026";

export const zanja = {
  // Meganoticias, CNN Chile, The Clinic: zanja de 3 m de ancho por 3 m de profundidad, meta de 60 km.
  ancho: 3,
  profundidad: 3,
  metaKm: 60,
  // Ex-Ante: 169 km con Perú y unos 861 km con Bolivia.
  fronteraKm: 1030,
  fuente: "Gobierno de Chile vía Meganoticias, CNN Chile y The Clinic · Ex-Ante",
};

export const costo = {
  // The Clinic / CNN Chile: tope cercano a $4.000 millones para zanjas y barreras.
  obrasMM: 4000,
  // Senado, Comisión de Gobierno: operación de las obras, $6.000 millones al año.
  anualMM: 6000,
  // CIPER: unos 1.100 efectivos desplegados; su costo no se ha informado.
  militares: 1100,
  fuente: "The Clinic · CNN Chile · Senado (Comisión de Gobierno) · CIPER",
};

export const resultados = {
  // PDI, frontera norte, enero–agosto 2025 vs 2026 (The Clinic, Mi Radio, BioBio).
  detecciones: { antes: 4393, despues: 286 },
  colchane: { antes: 4087, despues: 85 },
  caida: 93,
  fuente: "PDI vía The Clinic, Mi Radio y BioBioChile (ene–ago 2025 vs 2026)",
};

export const denuncias = {
  // Informe migratorio de la PDI, enero–julio 2025 vs 2026 (Vilas Radio, Chicureo Hoy). En el mismo informe,
  // las detecciones en la macrozona norte bajaron 86%. La baja anual ya venía desde 2022 (Pauta, El Dínamo).
  antes: 16788,
  despues: 11242,
  caida: 33,
  fuente: "Informe PDI ene–jul 2026 · BioBioChile (ene–ago)",
};

// Cálculo propio.
const porKm = costo.obrasMM / zanja.metaKm; // ≈ 66,7 millones por km
export const calculo = {
  porKmMM: Math.round(porKm), // 67
  fronteraMM: Math.round((porKm * zanja.fronteraKm) / 1000) * 1000, // ≈ 69.000 → "casi 70 mil millones"
  cobertura: Math.round((zanja.metaKm / zanja.fronteraKm) * 100), // 6%
  // 5.546 denuncias menos en 7 meses → unas 9.507 al año. $6.000 millones / 9.507 ≈ $631 mil.
  menosAlAno: Math.round(((denuncias.antes - denuncias.despues) / 7) * 12),
  porIngresoMiles: Math.round((costo.anualMM * 1e6) / ((((denuncias.antes - denuncias.despues) / 7) * 12) * 1000)),
  fuente: "Cálculo propio con cifras públicas",
};
