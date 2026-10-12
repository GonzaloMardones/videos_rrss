// Números en formato chileno: coma decimal y punto de miles.
export const fmt = (value: number, decimals = 1): string =>
  value.toLocaleString("es-CL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export const fmtSigned = (value: number, decimals = 1): string =>
  `${value > 0 ? "+" : value < 0 ? "−" : ""}${fmt(Math.abs(value), decimals)}`;
