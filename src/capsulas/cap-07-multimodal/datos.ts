// Números de juguete de la cápsula 7 (verificados con numpy; ver GUION.md).

// Similitud coseno ilustrativa imagen (fila) × texto (columna) en un lote de 4 pares.
export const SIM = [
  [0.82, 0.21, 0.1, 0.15],
  [0.18, 0.77, 0.25, 0.05],
  [0.12, 0.3, 0.71, 0.2],
  [0.08, 0.11, 0.22, 0.85],
];
export const TEXTOS = ["a dog on grass", "a red car", "snowy mountains", "a cup of coffee"];

// Softmax por fila con temperatura τ = 0,2 → diagonal (0.901, 0.867, 0.794, 0.918).
export const TAU = 0.2;
export const filaSoftmax = (i: number, tau = TAU) => {
  const e = SIM[i].map((s) => Math.exp(s / tau));
  const z = e.reduce((a, b) => a + b, 0);
  return e.map((v) => v / z);
};
