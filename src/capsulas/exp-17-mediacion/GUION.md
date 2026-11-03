# El mapa de la experimentación · 17/17 · Análisis de mediación

Composición: `Exp17-Mediacion` · 1080×1920 · 30 fps · ~1:51.
Nota de voz: Baron y Kenny se escribe `Bárron y Kéni`; los coeficientes se dicen "la letra a", "la letra be", "ce prima" (a/b sueltos se pierden).

## Guion (lo que dice la voz)

1. **gancho.** La capacitación subió las ventas en 10 al mes. ¿Por qué: más llamadas o mejor en cada una? La respuesta cambia qué escalar.
2. **titulo.** Idea 17, la última: análisis de mediación.
3. **caminos.** Efecto total = indirecto (por el mediador: llamadas) + directo (todo lo demás).
4. **producto.** Baron y Kenny, caso lineal: a = 3 llamadas/día, b = 2 ventas por llamada, indirecto a·b = 6, directo c′ = 4, total 10 (60 % mediado).
5. **contrafactual.** Efecto indirecto natural = E[Y(1, M(1))] − E[Y(1, M(0))]; directo natural = E[Y(1, M(0))] − E[Y(0, M(0))]. Y(1, M(0)) nunca se observa.
6. **trampa.** Se aleatoriza T, no M. Si el talento (U) sube llamadas y ventas, M → Y está confundido. Simulación: total 10 (correcto), indirecto 10,5 y directo −0,5 (verdad 6 y 4).
7. **cuidado.** Medir confusores M–Y, sensibilidad, bootstrap para a·b, definiciones contrafactuales si hay interacción T × M.
8. **mapa.** Cierre de la serie: las 17 ideas.
9. **cierre.** Saber que funciona es el comienzo; saber por qué permite escalarlo.

## Cuentas y fuentes

- Simulación propia (n = 200.000, semilla 11), T ~ Bernoulli(0,5) aleatorizado:
  - Sin confusor: M = 20 + 3T + N(0, 2²); Y = 50 + 4T + 2M + N(0, 5²). Estimado: total 9,97; a = 2,98; b = 2,00;
    c′ = 4,02; a·b = 5,95.
  - Con confusor U ~ N(0,1): M = 20 + 3T + 1,5U + N(0, 1,3²); Y = 50 + 4T + 2M + 4U + N(0, 4²). Estimado: total 9,97;
    a = 2,99; b = 3,51; c′ = −0,53; a·b = 10,51 (verdad: indirecto 6, directo 4).
- Baron y Kenny (1986). "The moderator–mediator variable distinction in social psychological research". JPSP 51(6).
- Robins y Greenland (1992), Epidemiology 3(2); Pearl (2001), "Direct and indirect effects", UAI.
- Imai, Keele y Tingley (2010). "A general approach to causal mediation analysis". Psychological Methods 15(4)
  (ignorabilidad secuencial; sensibilidad).
- VanderWeele (2015). *Explanation in Causal Inference: Methods for Mediation and Interaction*. Oxford.
- Bootstrap para el efecto indirecto: Preacher y Hayes (2008), Behavior Research Methods 40(3).
