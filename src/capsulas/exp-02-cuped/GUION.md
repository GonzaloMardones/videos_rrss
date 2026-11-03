# El mapa de la experimentación · 02/17 · CUPED

Composición: `Exp02-CUPED` · 1080×1920 · 30 fps · ~1:40.
Nota de voz: CUPED se escribe `kiúped` y CUPAC `kiúpak` en el campo `dice`.

## Guion (lo que dice la voz)

1. **gancho.** Imagina que tu experimento necesita un mes. ¿Y si con los mismos usuarios pudieras terminarlo en dos semanas?
2. **titulo.** Idea 2 del mapa de la experimentación: CUPED, reducir la varianza con datos de antes del experimento.
3. **ruido.** ¿De dónde viene el ruido? De que las personas ya eran muy distintas antes del experimento. Unos compran todas las semanas, otros casi nunca. Esa diferencia previa no tiene nada que ver con tu tratamiento, pero esconde su efecto.
4. **idea.** La idea de CUPED (Microsoft, 2013): usa la misma métrica, medida antes del experimento, para restar la parte que ya era predecible.
5. **formula.** En fórmula: Y′ = Y − θ(X − X̄). X − X̄: cuánto más compraba esta persona que el resto, antes de empezar. θ = Cov(Y, X) / Var(X): la pendiente, cuánto de esa diferencia se repite después.
6. **varianza.** El resultado: la varianza se multiplica por (1 − ρ²), donde ρ es la correlación entre el antes y el durante.
7. **ejemplo.** Si ρ = 0,7: 1 − 0,49 = 0,51. La varianza queda en la mitad. Y como la muestra necesaria es proporcional a la varianza, el mes se convierte en dos semanas.
8. **sesgo.** ¿Y no sesga el resultado? No. Como X se midió antes, y el grupo se sorteó, en promedio los dos grupos tienen el mismo X. Solo quitas ruido, no efecto.
9. **cuidado.** Tres cuidados. Equis tiene que medirse antes del tratamiento, nunca durante. Los usuarios nuevos no tienen historia: necesitan otra covariable. Y funciona mejor con métricas estables, como compras o sesiones.
10. **extension.** Su versión moderna, CUPAC, usa la predicción de un modelo de machine learning como covariable.
11. **cierre.** Menos ruido, mismo experimento, la mitad del tiempo. En la próxima idea, por qué no debes mirar el resultado todos los días. Compártelo y sígueme.

## Cuentas y fuentes

- Deng, Xu, Kohavi y Walker (2013), "Improving the Sensitivity of Online Controlled Experiments by Utilizing
  Pre-Experiment Data", WSDM. Y′ = Y − θ(X − X̄), θ = Cov(Y, X)/Var(X).
- Var(Y − θX) = Var(Y) − Cov(Y, X)²/Var(X) = Var(Y)·(1 − ρ²) con el θ óptimo.
- ρ = 0,5 → 0,75; ρ = 0,7 → 0,51; ρ = 0,9 → 0,19. Como n ∝ σ², con ρ = 0,7 la muestra (y el tiempo) cae a la mitad.
- Sin sesgo: X es previo al tratamiento y la asignación es aleatoria, así que E[X̄_T − X̄_C] = 0.
- CUPAC: Tang y otros, DoorDash (2020), usa la predicción de un modelo como covariable.
- **Ilustrativo:** las compras por persona, la nube de puntos y las campanas.
