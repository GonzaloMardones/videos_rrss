# El mapa de la experimentación · 04/17 · Comparaciones múltiples

Composición: `Exp04-Multiples` · 1080×1920 · 30 fps · ~1:43.

## Guion (lo que dice la voz)

1. **gancho.** Imagina que tienes 20 métricas, y una salió significativa. ¿Celebras? Probablemente es puro azar.
2. **titulo.** Idea 4 del mapa de la experimentación: comparaciones múltiples.
3. **cuenta.** Cada prueba tiene un 5% de falso positivo. Con 20 pruebas, esperas uno solo por azar: 20 × 0,05 = 1. Y la probabilidad de ver al menos uno es 1 − 0,95²⁰ = 64%.
4. **curva.** Con 5 métricas, 23%. Con 10, 40%. Con 50, 92%. Y ojo: cada segmento que miras, por país o por dispositivo, también cuenta como una prueba.
5. **bonferroni.** La corrección más simple es Bonferroni: divide el 5% por el número de pruebas. Con 20, cada una necesita p ≤ 0,0025. Así, la probabilidad de cualquier falso positivo queda bajo 5%. El precio: pierdes poder.
6. **holm.** Holm mejora eso: ordenas los p-valores, comparas el menor con α/m, el siguiente con α/(m − 1), y te detienes en el primero que falla.
7. **bh.** Y Benjamini-Hochberg cambian la pregunta: en vez de evitar cualquier error, controlan qué proporción de tus descubrimientos son falsos. Ordenas los p-valores, y el de posición k se compara con k·α/m.
8. **ejemplo.** Un ejemplo con 10 métricas. Sin corregir, 5 salen significativas. Con Bonferroni, 1. Con Holm, 1. Con Benjamini-Hochberg, 3.
9. **cual.** ¿Cuál usar? Si un solo falso positivo es caro, como decidir un lanzamiento, controla el error familiar (Holm). Si estás explorando muchas métricas, controla la tasa de falsos descubrimientos (BH).
10. **principal.** Y lo mejor: elige una métrica principal antes de lanzar. Las demás son secundarias, o de guarda.
11. **cierre.** Más métricas no es más evidencia. En la próxima idea, cómo saber si tu experimento está roto antes de mirarlo. Compártelo y sígueme.

## Cuentas y fuentes

- Falsos positivos esperados con m pruebas independientes: m·α; con 20, 1. P(al menos uno) = 1 − (1 − α)^m:
  m = 5 → 22,6 %; 10 → 40,1 %; 20 → 64,2 %; 50 → 92,3 %; 60 → 95,4 %.
- Bonferroni: α/m = 0,05/20 = 0,0025 por prueba; controla el error familiar (FWER) ≤ α.
- Holm (1979): umbral α/(m − k + 1) para el k-ésimo p-valor ordenado, se detiene en el primer fallo; controla FWER y es al menos tan potente como Bonferroni.
- Benjamini y Hochberg (1995): el mayor k con p_(k) ≤ k·α/m; controla la tasa de falsos descubrimientos (FDR).
- Ejemplo con 10 p-valores ilustrativos (0,001; 0,008; 0,012; 0,029; 0,041; 0,09; 0,2; 0,35; 0,6; 0,8):
  sin corregir 5, Bonferroni 1, Holm 1, Benjamini-Hochberg 3 (verificado).
- **Ilustrativo:** los p-valores, el p = 0,03 del gancho y la barra de poder de Bonferroni (80 % → 44 %).
