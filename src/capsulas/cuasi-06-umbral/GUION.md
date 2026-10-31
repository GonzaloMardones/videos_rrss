# Cuasi-experimentos · 06 · Umbrales y regresión discontinua (alarma de fatiga)

Composición: `Cuasi06-Umbral` · 1080×1920 · 30 fps · ~1:47.
Nota de voz: Thistlethwaite y Campbell como `Tíslthueit y Cámpbel`.

## Guion (resumen)

1. **gancho.** Una cámara mide la fatiga del operador de un camión; si el puntaje ≥ 0,6 suena una alarma. Comparando horas con y sin alarma, con alarma hay más incidentes (+4 pts): la alarma suena cuando hay más fatiga.
2. **idea.** Thistlethwaite y Campbell (1960): en el umbral, 0,59 y 0,61 son casi iguales; la regla actúa como un sorteo.
3. **salto.** El salto en el corte es el efecto. Ingenuo +4,0 pts; discontinuidad −6,3 pts; real −6,0 pts.
4. **formula.** τ = lím_{x↓c} E[Y|X=x] − lím_{x↑c} E[Y|X=x]; rectas locales con ancho de banda h (sesgo vs. varianza).
5. **trampa.** Manipulación del puntaje; prueba de densidad de McCrary (2008).
6. **ia.** Umbrales de confianza y de riesgo en sistemas de IA: guardar el puntaje continuo.

## Cuentas (simulación propia, semilla 6)

- 200.000 horas; puntaje s ~ U(0,1); alarma si s ≥ 0,6; P(incidente) = 0,04 + 0,20·s − 0,06·alarma.
- Diferencia ingenua (con − sin alarma): +0,0395. Regresión local lineal: h = 0,05 → −0,068; h = 0,1 → −0,063; h = 0,2 → −0,061. Real: −0,060 (de 0,16 a 0,10 en el corte).
- El histograma de manipulación es **ilustrativo**. El sistema de cámara y los umbrales de IA (0,7) son ejemplos ilustrativos.

## Fuentes

- Thistlethwaite DL, Campbell DT (1960). "Regression-discontinuity analysis: an alternative to the ex post facto experiment". *Journal of Educational Psychology* 51(6):309–317.
- Imbens GW, Lemieux T (2008). "Regression discontinuity designs: a guide to practice". *Journal of Econometrics* 142(2):615–635.
- Lee DS, Lemieux T (2010). "Regression discontinuity designs in economics". *Journal of Economic Literature* 48(2):281–355.
- McCrary J (2008). "Manipulation of the running variable in the regression discontinuity design: a density test". *Journal of Econometrics* 142(2):698–714.
- Calonico S, Cattaneo MD, Titiunik R (2014). "Robust nonparametric confidence intervals for regression-discontinuity designs". *Econometrica* 82(6):2295–2326.
