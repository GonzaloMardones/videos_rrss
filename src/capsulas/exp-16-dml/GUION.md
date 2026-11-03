# El mapa de la experimentación · 16/17 · Double machine learning

Composición: `Exp16-DML` · 1080×1920 · 30 fps · ~2:18.
Nota de voz: Frisch–Waugh–Lovell se escribe `Frish, Uó y Lóvel`; cross-fitting `cross fíting`; Neyman `Néyman`.

## Guion (lo que dice la voz)

1. **gancho.** La regresión dice 0,9 por peso de descuento; con controles, 0,91. El real es 0,5. El problema es cómo controlas.
2. **titulo.** Idea 16: double machine learning.
3. **problema.** El historial influye en descuento y gasto de forma no lineal; la regresión lineal no quita esa confusión. ML directo optimiza para predecir, regulariza (sesgo) y no da intervalo.
4. **residuos.** Frisch–Waugh–Lovell: un modelo predice el descuento, otro el gasto; pendiente entre residuos = efecto (0,55 en la corrida mostrada).
5. **formula.** θ̂ = Σ D̃ᵢ Ỹᵢ / Σ D̃ᵢ², con D̃ = D − m̂(X) y Ỹ = Y − ℓ̂(X); m̂ y ℓ̂ pueden ser bosques, boosting, lasso.
6. **ortogonal.** Ortogonalidad de Neyman: el sesgo depende del producto de los errores. O(n^−1/4) × O(n^−1/4) = O(n^−1/2).
7. **cruzado.** Cross-fitting en 5 partes: cada fila predicha por un modelo que no la vio; rotando se usan todos los datos.
8. **resultado.** 300 simulaciones: ingenua 0,90; controles lineales 0,91; DML 0,50; cobertura del IC 95 % = 95 %.
9. **cuando.** Muchos controles o no linealidad. No arregla confusores no medidos (ideas 14 y 15).
10. **cierre.** ML limpia la confusión; la estadística estima. Próxima: mediación.

## Cuentas y fuentes

- Simulación propia (300 repeticiones, n = 1.000): X ~ U(−2, 2)³; D = sin(2X₁) + 0,5X₂² + N(0,1);
  Y = 0,5·D + 2cos(X₁) + X₂² + 0,5X₃ + N(0,1).
  - Ingenua (Y ~ D): media 0,898 (de 0,041). Con X lineal: 0,907 (de 0,039).
  - DML con cross-fitting de 5 partes y aprendiz aditivo flexible (splines cúbicos por variable + ridge, λ = 1):
    media 0,499 (de 0,031), error estándar medio 0,031, cobertura del IC 95 % = 95,3 %.
  - Corrida mostrada en la escena de residuos (semilla 3): ingenua 0,894; DML 0,554.
- Chernozhukov, Chetverikov, Demirer, Duflo, Hansen, Newey y Robins (2018). "Double/debiased machine learning for
  treatment and structural parameters". The Econometrics Journal 21(1). Condición de tasas: producto de errores
  de los modelos auxiliares o(n^−1/2), p. ej. cada uno o(n^−1/4).
- Frisch y Waugh (1933), Econometrica; Lovell (1963), JASA.
- Implementaciones: DoubleML (Bach et al., Python y R), EconML (Microsoft).
