// Capítulo 5: la apuesta de las AFP (swaps de tasas y caída del fondo E). Corte: 19 de octubre de 2026.
// Lo marcado como "cálculo propio" sale de las cifras públicas de abajo; no son datos oficiales.

export const CORTE = "Datos al 19-10-2026";

export const apuesta = {
  // Bloomberg con datos de la Superintendencia de Pensiones (SP): valorización de derivados de tasas extranjeras.
  // La SP informa -US$7.735 millones a septiembre de 2026 y +US$1.348 millones en septiembre de 2025.
  ganabanMMUSD: 1400,
  pierdenMMUSD: 7700,
  // Bloomberg: nocional de los contratos cercano a US$700.000 millones; activos administrados ~US$229.000 millones.
  nocionalMMUSD: 700000,
  activosMMUSD: 229000,
  // Bono del Tesoro de EE.UU. a 10 años: algo bajo 4% antes de la guerra en Irán; 5,11% el 23-09-2026 (CNN), 5,25% en octubre (Bloomberg Línea).
  tasaAntes: 4.0,
  tasaDespues: 5.2,
  fuente: "Superintendencia de Pensiones vía Bloomberg · CNN · Bloomberg Línea",
};

export const fondos = {
  // SP, reporte de septiembre 2026: rentabilidad real acumulada enero–septiembre por fondo (sistema).
  real2026: { A: 8.61, B: 5.26, C: -1.5, D: -6.38, E: -10.39 },
  // SP: fondo E en 2021 (-13,11%), el peor año; 2026 es el segundo peor enero–septiembre (Señal DF).
  peor2021: -13.11,
  // DF con datos de la SP: 768.836 afiliados en el fondo E.
  afiliadosE: 768836,
  // La Tercera: tras los retiros 2020–2022 la duración del fondo E quedó bajo 8 años; con swaps llegó a ~14 a fines de 2024.
  duracionAntes: 8,
  duracionSwaps: 14,
  fuente: "Superintendencia de Pensiones (sept. 2026) · Señal DF · La Tercera",
};

export const alertas = {
  // Banco Central: Informes de Estabilidad Financiera 2S 2025 y 1S 2026. Bloomberg: ejecutivos de AFP pidieron límites en privado.
  // SP (abril 2026): pérdida máxima de 2% del fondo E ante un alza de 0,4 pp; vigente desde el 4 de noviembre. Alza real: 1,11 pp.
  limitePerdida: 2,
  escenarioPP: 0.4,
  alzaRealPP: 1.11,
  vigencia: "4 de noviembre de 2026",
  // Emol / SP: caída enero–septiembre del fondo E por AFP.
  porAFP: { Modelo: -10.93, Capital: -10.76, Uno: -9.91 },
  fuente: "Banco Central (IEF) · Superintendencia de Pensiones · Bloomberg · Emol",
};

// Cálculo propio.
export const calculo = {
  vecesActivos: Math.round(apuesta.nocionalMMUSD / apuesta.activosMMUSD), // 3
  // Ejemplo: $50 millones ahorrados × -10,39% ≈ -$5,2 millones.
  saldoEjemplo: 50_000_000,
  perdidaEjemplo: Math.round((50_000_000 * 10.39) / 100), // 5.195.000
  // Retiro programado: la pensión es proporcional al saldo (misma tasa y expectativa de vida), así que cae en la misma proporción.
  pensionAntes: 400_000,
  pensionDespues: Math.round(400_000 * (1 - 10.39 / 100)), // ~358.000
  // Regla de duración: caída ≈ duración × alza de tasa → 14 años × 1 pp ≈ 14%.
  caidaPorPunto: fondos.duracionSwaps,
  // El alza real (1,11 pp) fue 2,8 veces el escenario de estrés (0,4 pp) de la nueva norma.
  vecesEscenario: Math.round((alertas.alzaRealPP / alertas.escenarioPP) * 10) / 10, // 2.8
  fuente: "Cálculo propio con cifras públicas",
};
