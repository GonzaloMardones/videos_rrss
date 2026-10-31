# Cuasi-experimentos · 03 · Amenazas a la validez (en una planta minera)

Serie **Cuasi-experimentos**. Composición: `Cuasi03-Amenazas` · 1080×1920 · 30 fps · ~2:12.
Nota de voz: Napier-Munn como `Nápier Mun`; Raglan como `Ráglan`; "prueba t" como `prueba te`.

## Guion (lo que dice la voz)

1. **gancho.** Una concentradora instala un control experto en el molino y procesa 8 % más t/h. Ese mismo mes llegó mineral más blando. ¿Fue el control o la mina?
2. **titulo.** Cuasi-experimentos, capítulo 3: amenazas a la validez, en una planta minera.
3. **amenazas.** Campbell y Stanley (1963), en una concentradora:
   1. historia (dureza, mezcla de la mina, agua);
   2. maduración (revestimientos que se gastan, operadores que aprenden);
   3. selección (la línea con el mejor mineral);
   4. regresión a la media (intervenir tras la peor semana; E[X₂|X₁] = μ + ρ(X₁ − μ));
   5. instrumentación (analizador recalibrado, modelo de ley reentrenado);
   6. desgaste de la muestra (descartar detenciones solo durante la prueba).
4. **autocorr.** Los datos de planta están autocorrelacionados: n_ef = n(1 − ρ)/(1 + ρ); con ρ = 0,7, 60 días ≈ 11 independientes. Napier-Munn y Meyer (1999) proponen una prueba t pareada modificada para esto.
5. **onoff.** Ensayo encendido/apagado en orden sorteado por pares de días: historia y maduración afectan por igual a ambos brazos. Raglan (níquel, Canadá): prueba de colector on-off con distribución de referencia, diseñada para bloquear la autocorrelación.
6. **agentes.** Un agente de control alterna los modos según un calendario sorteado y registra cada turno; el agente de planificación de la mina avisa por A2A los cambios de mezcla, y la amenaza de historia queda registrada.
7. **cierre.** El enemigo no es el ruido: es lo que cambia al mismo tiempo que la prueba. Próximo: regresión a la media.

## Cuentas

- n_ef = 60 · 0,3/1,7 = 10,6 ≈ 11 (fórmula de tamaño efectivo para una media con autocorrelación AR(1) de primer orden).
- La serie de recuperación del gráfico es simulada: AR(1) con ρ = 0,7 alrededor de 88 % (ilustrativa).
- El +8 % del gancho, el calendario on-off y el mensaje A2A («dureza +12 %») son **ilustrativos**.

## Fuentes

- Campbell DT, Stanley JC (1963). *Experimental and Quasi-Experimental Designs for Research*. Rand McNally.
- Shadish WR, Cook TD, Campbell DT (2002). *Experimental and Quasi-Experimental Designs for Generalized Causal Inference*, cap. 2 (validez interna y de conclusión estadística).
- Napier-Munn TJ (1995). "Detecting performance improvements in trials with time-varying mineral processes – three case studies". *Minerals Engineering* 8(8):843–858.
- Napier-Munn TJ, Meyer DH (1999). "A modified paired t-test for the analysis of plant trials with data autocorrelated in time". *Minerals Engineering* 12(9):1093–1100.
- Napier-Munn TJ (2014; ed. revisada 2025). *Statistical Methods for Mineral Engineers: How to Design Experiments and Analyse Data*. JKMRC Monograph Series, Universidad de Queensland (caps. 8 y 9: ensayos de planta y autocorrelación).
- Napier-Munn TJ (2008). "Some practical problems in running statistically valid plant trials, and their solution". MetPlant 2008, AusIMM (los diseños pareados como la mejor forma de comparar dos condiciones).
- "Plant Scale Trial of Isobutyl Xanthate at Raglan Concentrator Using Reference Distributions" (CIM, 2009; OneMine): ensayo on-off tras tres meses de distribución de referencia con PAX.
- Protocolo Agent2Agent (A2A): especificación abierta, hoy bajo la Linux Foundation.
