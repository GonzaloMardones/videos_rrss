# El mapa de la experimentación · 09/17 · Efectos heterogéneos (HTE / CATE)

Composición: `Exp09-HTE` · 1080×1920 · 30 fps · ~1:43.

## Guion (lo que dice la voz)

1. **gancho.** Imagina que tu campaña sube las ventas +3,3 en promedio. Pero en jóvenes sube +8, y en mayores baja −1. El promedio te escondía a quién le sirve.
2. **titulo.** Idea 9 del mapa de la experimentación: efectos heterogéneos (HTE).
3. **cate.** El objeto se llama CATE: el efecto esperado, dadas tus características. τ(x). x puede ser la edad, el país, o cuánto compraste el mes pasado. Siempre algo medido antes del tratamiento.
4. **interaccion.** La forma más simple: una regresión con interacción. Y = β₀ + β₁T + β₂x + β₃·T·x. β₃ dice cuánto cambia el efecto por cada unidad de x. Si β₃ = −0,25, cada año de edad le quita un cuarto de punto al efecto.
5. **trampa.** Cuidado con buscar subgrupos a mano: si pruebas 20 cortes, alguno sale por azar. Es la idea 04 otra vez.
6. **slearner.** Con muchas variables, se usan meta-learners. El S-learner entrena un solo modelo, con T como una variable más, y resta su predicción con y sin tratamiento.
7. **tlearner.** El T-learner entrena dos modelos: μ₁ con los tratados, μ₀ con el control. τ(x) = μ₁(x) − μ₀(x).
8. **xlearner.** El X-learner imputa el efecto de cada persona usando el modelo del otro grupo, y luego aprende ese efecto. Funciona mejor cuando un grupo es mucho más chico.
9. **bosque.** El bosque causal (Wager y Athey, 2018) hace árboles que no buscan predecir ventas, sino dividir donde el efecto cambia más. Y estima con datos distintos a los que usó para dividir: honestidad.
10. **validar.** ¿Cómo validas algo que nunca observas? Ordenas a las personas por su efecto predicho, las agrupas, y comparas el efecto real de cada grupo en datos nuevos. Si sube en escalera, el modelo encontró algo.
11. **cierre.** El promedio dice si funciona. El CATE dice para quién. En la próxima idea: cómo usar eso para decidir a quién tratar (uplift). Compártelo y sígueme.

## Cuentas y fuentes

- CATE: τ(x) = E[Y(1) − Y(0) | X = x], con x previo al tratamiento.
- Interacción: Y = β₀ + β₁T + β₂x + β₃·T·x ⇒ efecto(x) = β₁ + β₃x. Ilustrativo: τ(edad) = 13 − 0,25·edad (20 → 8; 56 → −1).
- Promedio de los grupos ilustrativos (+8, +3, −1, de igual tamaño) = +3,3.
- Meta-learners S, T y X: Künzel, Sekhon, Bickel y Yu (2019), "Metalearners for estimating heterogeneous treatment
  effects using machine learning", *PNAS*. X-learner: τ̂(x) = e(x)·τ̂₀(x) + (1 − e(x))·τ̂₁(x).
- Bosques causales y honestidad: Wager y Athey (2018), *JASA*; Athey, Tibshirani y Wager (2019), "Generalized random forests".
- Validación por cuantiles del efecto predicho (GATES): Chernozhukov, Demirer, Duflo y Fernández-Val (2018).
- **Ilustrativo:** los valores del árbol, la nube de puntos, los 20 cortes y las barras por quintil.
