// Números de la cápsula 5 (verificados con Python; ver GUION.md).

// Memoria por GPU (GB), modelo de 7,5 B parámetros, Adam en precisión mixta (K = 12), N = 64 GPUs:
// base 16Ψ; ZeRO-1 (4 + 12/N)Ψ; ZeRO-2 (2 + 14/N)Ψ; ZeRO-3 16Ψ/N.
export const ZERO = [120, 31.4, 16.6, 1.9];

// Burbuja del pipeline (p − 1)/(m + p − 1) con p = 4.
export const BURBUJA: [number, number][] = [
  [4, 3 / 7],
  [32, 3 / 35],
];
