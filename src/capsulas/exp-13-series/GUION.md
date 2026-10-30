# El mapa de la experimentación · 13/17 · Series de tiempo interrumpidas y CausalImpact

Composición: `Exp13-Series` · 1080×1920 · 30 fps · ~2:07.
Nota de voz: en `dice` la variable D se escribe "la variable de"; "beta tres mide" evita que se oiga "trece".

## Guion (lo que dice la voz)

1. **gancho.** Subes el precio de tu app. En los meses siguientes vendes 11 más al día que antes. ¿Te fue bien? No: pierdes unas 33 ventas diarias.
2. **titulo.** Idea 13: series de tiempo interrumpidas.
3. **idea.** Sin grupo de control ni donantes, el control es tu propio pasado: aprendes tendencia y estacionalidad antes del cambio y las proyectas.
4. **formula.** Regresión segmentada: Y_t = β0 + β1·t + β2·D_t + β3·(t − T0)·D_t + s(t) + ε. β1 = +1,5/mes (tendencia previa), D = 0 antes y 1 después, β2 = −23 (salto de nivel), β3 = −0,8/mes (cambio de pendiente), s(t) estacionalidad.
5. **lectura.** La línea punteada sigue la tendencia previa; la real cae de golpe y sube más lento. Efecto medio: −33/día. El antes/después ingenuo (+11) engaña porque ignora la tendencia.
6. **impacto.** CausalImpact (Google): modelo bayesiano estructural de series de tiempo que además usa series de control no afectadas; pronostica el contrafactual con una banda que se abre con el horizonte. Efecto acumulado = suma de las brechas.
7. **real.** Italia, 2005, prohibición de fumar en lugares públicos: ingresos por eventos coronarios en menores de 70 años ≈ −4 %.
8. **cuidado.** Otro evento en la misma fecha, autocorrelación (intervalos falsamente estrechos), pocos meses, anticipación o efecto gradual. Si hay grupo de control, usar DiD o control sintético.
9. **cierre.** Sin control, tu pasado es el control. Próxima: grafos causales.

## Cuentas y fuentes

- **Ilustrativo (simulado):** 60 meses (36 antes, 24 después). Verdad simulada: tendencia +1,5/mes, salto −25, pendiente
  −0,8/mes, estacionalidad de amplitud 12 y ruido ±7 (hash seno). Ajuste MCO con senos/cosenos de 12 meses:
  β0 = 200,7; β1 = 1,47; β2 = −23,2; β3 = −0,84; σ = 4,0. Promedio antes 226,4 y después 237,7 (+11,3).
  Efecto medio vs. contrafactual: −32,8/día; suma de brechas −787 (≈ −23.600 ventas en 24 meses de 30 días).
- La banda del gráfico de CausalImpact es ilustrativa (±1,96·σ·√(1 + h/6)), no salida del paquete.
- Brodersen, Gallusser, Koehler, Remy y Scott (2015). "Inferring causal impact using Bayesian structural time-series
  models". Annals of Applied Statistics 9(1).
- Bernal, Cummins y Gasparrini (2017). "Interrupted time series regression for the evaluation of public health
  interventions: a tutorial". International Journal of Epidemiology 46(1).
- Barone-Adesi et al. (2011). "Effects of Italian smoking regulation on rates of hospital admission for acute coronary
  events: a country-wide study". PLoS ONE 6(3): e17419 (≈ 4 % menos en menores de 70 años).
- Los datos de Sicilia del tutorial no estuvieron accesibles desde este entorno; por eso la serie del video es simulada.
