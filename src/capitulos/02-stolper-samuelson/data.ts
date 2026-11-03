// Capítulo 2: el modelo es ilustrativo (no son datos reales de Chile). Explica el mecanismo del
// teorema de Stolper-Samuelson (1941) con dos bienes y dos factores y precios iguales a costos.
//
//   P_cobre   = 1·w + 4·r   (cobre: intensivo en capital)
//   P_cerezas = 3·w + 1·r   (cerezas: intensivas en trabajo)
//
// Con w = r = 1, P_cobre = 5 y P_cerezas = 4. Si P_cobre sube 10% (a 5,5) y P_cerezas no cambia:
//   w = 10,5 / 11 = 0,9545  → −4,5%
//   r = 4 − 3w    = 1,1364  → +13,6%

const cobre = { trabajo: 1, capital: 4 };
const cerezas = { trabajo: 3, capital: 1 };

const resolver = (pCobre: number, pCerezas: number) => {
  // Sistema 2×2: pCobre = a·w + b·r ; pCerezas = c·w + d·r
  const [a, b, c, d] = [cobre.trabajo, cobre.capital, cerezas.trabajo, cerezas.capital];
  const det = a * d - b * c;
  return { w: (pCobre * d - b * pCerezas) / det, r: (a * pCerezas - c * pCobre) / det };
};

const antes = resolver(5, 4);
const despues = resolver(5 * 1.1, 4);
const pct = (x: number, y: number) => Math.round(((y - x) / x) * 1000) / 10;

export const modelo = {
  cobre,
  cerezas,
  resultado: {
    precioCobre: 10,
    capital: pct(antes.r, despues.r), // +13,6
    salario: pct(antes.w, despues.w), // −4,5
  },
};

// Cochilco: máximo histórico de cierre en la Bolsa de Metales de Londres, agosto 2026.
export const cobreRecord = 6.59;

export const FUENTE_MODELO = "Ejemplo ilustrativo basado en Stolper y Samuelson (1941)";
