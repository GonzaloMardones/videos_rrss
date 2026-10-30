// Capítulo 6: ¿quién gana cuando el fondo pierde? Corte: 19 de octubre de 2026.
// Lo marcado como "cálculo propio" sale de cifras públicas; no son datos oficiales. Las afirmaciones sobre
// personas e instituciones se limitan a hechos publicados por prensa y organismos, con la fuente a la vista.

export const CORTE = "Datos al 19-10-2026";

// Superintendencia de Pensiones: comisión mensual sobre remuneración imponible, vigente octubre 2026.
export const comisiones = {
  porAFP: [
    { afp: "Uno", pct: 0.46 },
    { afp: "Modelo", pct: 0.58 },
    { afp: "PlanVital", pct: 1.16 },
    { afp: "Habitat", pct: 1.27 },
    { afp: "Capital", pct: 1.44 },
    { afp: "Cuprum", pct: 1.44 },
    { afp: "Provida", pct: 1.45 },
  ],
  fuente: "Superintendencia de Pensiones (comisiones vigentes oct. 2026)",
};

// La Tercera con estados financieros al 30-06-2026: ingresos y ganancias de las siete AFP en el primer semestre.
export const resultadosAFP = {
  ingresosMM: 622296, // millones de pesos, +3,4% interanual
  utilidadesMM: 378085, // millones de pesos, +13,5% interanual (≈ US$410 millones)
  utilidadesUSD: 410,
  variacion: 13.5,
  encajeTotalMM: 2304402, // encaje administrado al 30-06-2026 (≈ US$2.499 millones)
  encajeRentoMM: 141533, // ganancia del encaje en el semestre (fondos A y B al alza)
  fuente: "La Tercera (estados financieros 1S 2026)",
};

// Emol con datos de la Superintendencia: rentabilidad real del fondo E por AFP, enero–septiembre 2026.
export const fondoEporAFP = [
  { afp: "Modelo", pct: -10.93 },
  { afp: "Capital", pct: -10.76 },
  { afp: "Cuprum", pct: -10.43 },
  { afp: "Provida", pct: -10.35 },
  { afp: "PlanVital", pct: -10.1 },
  { afp: "Habitat", pct: -10.02 },
  { afp: "Uno", pct: -9.91 },
];
export const fondoEfuente = "Superintendencia de Pensiones vía Emol (ene–sep 2026)";

// La Tercera / CNN Chile con la cartera al 30-09-2026: valorización negativa de swaps por contraparte (millones de US$).
export const contrapartes = {
  bancos: [
    { nombre: "Bank of America", mmusd: 1376 },
    { nombre: "Société Générale", mmusd: 1270 },
    { nombre: "BNP Paribas", mmusd: 1137 },
    { nombre: "Barclays", mmusd: 941 },
    { nombre: "Deutsche Bank", mmusd: 543 },
  ],
  totalExtranjero: 7718,
  fuente: "Superintendencia de Pensiones vía La Tercera y CNN Chile (30-09-2026)",
};

// Superintendencia de Pensiones (propiedad al 31-07-2026), DF y La Tercera: controladores de cada AFP.
export const duenos = [
  { afp: "Capital", grupo: "Sura" },
  { afp: "Provida", grupo: "MetLife" },
  { afp: "Cuprum", grupo: "Principal" },
  { afp: "Habitat", grupo: "Prudential · CChC" },
  { afp: "PlanVital", grupo: "Generali" },
  { afp: "Modelo", grupo: "Inv. Atlántico" },
  { afp: "Uno", grupo: "Tanza" },
];
export const duenosFuente = "Superintendencia de Pensiones · DF · La Tercera";

// Hechos públicos del lado político (todos con fuente en GUION.md).
export const politica = {
  // DF: Joaquín Cortez pasó por la gerencia de inversiones de AFP Provida (presidente del directorio 2011–2013, según Desenfoque)
  // y por directorios de empresas relacionadas con AFP Habitat; antes de asumir se desvinculó de filiales de Habitat (ContraPoder).
  superintendente: "Joaquín Cortez",
  // El Dínamo / BioBio: el biministro Daniel Mas atribuyó la caída a decisiones del gobierno anterior; Boric respondió.
  // Canal 9 / Cooperativa: denuncias por administración desleal (Montalva; Manouchehri y Cicardini) y comisión investigadora en trámite.
  fuente: "DF · Desenfoque · El Dínamo · BioBioChile · Cooperativa",
};

// Cálculo propio.
export const calculo = {
  // Encaje del fondo E ≈ 1% × US$26.903 millones (fondo E a dic. 2025) ≈ US$269 millones; × −10,39% ≈ −US$28 millones.
  fondoEUSD: 26903,
  encajeEUSD: Math.round(26903 * 0.01), // 269
  perdidaEncajeEUSD: Math.round(26903 * 0.01 * 0.1039), // 28
  // Diferencia entre la peor y la mejor AFP en el fondo E: 10,93 − 9,91 ≈ 1,0 punto.
  brecha: Math.round((10.93 - 9.91) * 10) / 10,
  fuente: "Cálculo propio con cifras públicas",
};
