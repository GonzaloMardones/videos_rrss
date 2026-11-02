// Números de la cápsula 6 (verificados con numpy; ver GUION.md).

const azar = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Intensidades ilustrativas de un mapa de atención causal 12 × 12.
export const ATENCION = Array.from({ length: 12 }, (_, i) => Array.from({ length: 12 }, (_, j) => (j <= i ? 0.15 + 0.85 * azar(i * 12 + j + 900) : 0)));

// Enrutador de juguete: softmax de logits (2.0, 1.2, 0.3, −0.5, 0.8, −1.0, 0.1, −0.2).
export const LOGITS = [2.0, 1.2, 0.3, -0.5, 0.8, -1.0, 0.1, -0.2];
const ex = LOGITS.map((z) => Math.exp(z));
const suma = ex.reduce((a, b) => a + b, 0);
export const PROBS = ex.map((v) => v / suma); // 0.430, 0.193, 0.079, 0.035, 0.130, 0.021, 0.064, 0.048
export const TOP2 = [0, 1]; // renormalizados: 0.69 y 0.31

// Caché KV por token, Llama 2 70B (80 capas, d_h = 128, FP16): 2·80·h_kv·128·2 bytes.
export const KV_MIB = { mha: 2.5, gqa: 0.3125 };
