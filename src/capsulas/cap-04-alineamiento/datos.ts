// Números de juguete de la cápsula 4 (verificados con numpy en .trabajo; ver GUION.md).

// Previo π_ref sobre tres respuestas y su recompensa.
export const PRIOR = [0.5, 0.3, 0.2];
export const RECOMPENSA = [0, 1, 2];

// Posterior π* ∝ π_ref · exp(r / β). β = 1 → [0.179, 0.292, 0.529]; β = 0.5 → [0.037, 0.163, 0.801].
export const posterior = (beta: number) => {
  const q = PRIOR.map((p, i) => p * Math.exp(RECOMPENSA[i] / beta));
  const z = q.reduce((a, b) => a + b, 0);
  return q.map((v) => v / z);
};

// 16 puntajes de un modelo de recompensa, pseudoaleatorios: −1 + 3·frac(sin((i+400)·12.9898 + 78.233)·43758.5453).
const azar = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};
export const CANDIDATOS = Array.from({ length: 16 }, (_, i) => Math.round((-1 + 3 * azar(i + 400)) * 10) / 10);

// KL del best-of-n respecto del modelo base: log n − (n − 1)/n (nats).
export const KL_BON: Record<number, number> = { 1: 0, 4: 0.636, 16: 1.835, 64: 3.175, 256: 4.549 };
