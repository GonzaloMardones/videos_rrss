# El mapa de la experimentación · 01/17 · Efecto mínimo detectable (MDE)

Composición: `Exp01-MDE` · 1080×1920 · 30 fps · ~1:57. Serie de 17 cápsulas, una por idea del mapa.

## Guion (lo que dice la voz)

1. **gancho.** Lanzaste un experimento, y no salió significativo. ¿Es que no funciona, o tu experimento era demasiado chico para verlo?
2. **titulo.** Idea 1 del mapa de la experimentación: el efecto mínimo detectable (MDE).
3. **errores.** Todo experimento puede equivocarse de dos formas. Falso positivo: dices que funciona, y no funciona. Su probabilidad es α, normalmente 5%. Y falso negativo: el efecto existe, y no lo ves. Su probabilidad es β. 1 − β es el poder: la probabilidad de detectar un efecto real.
4. **curvas.** Imagina dos campanas. Una, si no hay efecto. Otra, corrida en el tamaño del efecto. El umbral de significancia las corta. Lo que cae de la segunda campana a la izquierda del corte, es beta. Si las campanas están muy encimadas, el poder se cae.
5. **formula.** De ahí sale la fórmula del efecto mínimo detectable. Arriba, cuánta seguridad pides: z de α más z de β. Después, cuánto ruido tiene tu métrica: σ. Y al final, el tamaño de muestra, dentro de una raíz.
6. **regla.** Con 5% de significancia, 80% de poder y grupos iguales, todo se resume en 16: necesitas 16·σ²/δ² por grupo.
7. **ejemplo.** Un ejemplo. Tu conversión es 10%, y quieres detectar un punto más. La varianza es p(1 − p) = 0,09. 16 × 0,09 / 0,01² = 14.400 personas por grupo. Con 2.000 visitas al día, son unas dos semanas.
8. **cuadruple.** Y si quieres detectar medio punto, no necesitas el doble, sino el cuádruple: 57.600 por grupo. El efecto entra al cuadrado.
9. **palancas.** Para bajar el MDE tienes tres palancas: más muestra, menos ruido, y grupos parejos. Repartir 90/10 en vez de 50/50 te obliga a tener casi el triple de datos.
10. **trampa.** La trampa más común: no significativo no es lo mismo que no hay efecto. Con 14.400 por grupo, un efecto real de medio punto solo se detecta 3 de cada 10 veces.
11. **cierre.** Calcula el MDE antes de lanzar, no después. En la próxima idea: cómo bajar el ruido gratis (CUPED). Compártelo y sígueme.

## Cuentas verificadas

- z₀,₉₇₅ = 1,960 y z₀,₈₀ = 0,842; 2·(1,960 + 0,842)² = 15,70 ≈ 16 (regla de Lehr): n por grupo ≈ 16σ²/δ².
- MDE = (z₁₋α/₂ + z₁₋β)·σ·√(1/n_T + 1/n_C).
- Conversión 10 %: σ² = 0,1·0,9 = 0,09. Con δ = 0,01: n = 16·0,09/0,0001 = 14.400 por grupo (la fórmula exacta da 14.128).
  Con δ = 0,005: 57.600. Total 28.800 ÷ 2.000 al día = 14,4 días.
- Reparto 90/10 vs 50/50: (1/0,1 + 1/0,9)/(1/0,5 + 1/0,5) = 11,1/4 = 2,78.
- Poder con 14.400 por grupo: error estándar √(2·0,09/14.400) = 0,00354; para δ = 0,005, poder = 1 − Φ(1,96 − 0,005/0,00354) = 0,29;
  para δ = 0,01, 0,80.
- **Ilustrativo:** el p = 0,21 del gancho y las 2.000 visitas diarias.
