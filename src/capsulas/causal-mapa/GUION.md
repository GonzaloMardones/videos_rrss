# Métodos causales · El mapa de la experimentación

Serie **Métodos causales** (sin número). Composición: `Causal-Mapa` · 1080×1920 · 30 fps · ~2:20.
Un recorrido de 17 ideas en tres bloques, una escena por idea con su fórmula o su visual. Sirve de tráiler de
las cápsulas individuales que vienen.

## Guion (lo que dice la voz)

1. **gancho.** Antes de lanzar un experimento, hay 17 ideas que separan un resultado real de un falso positivo. Este es el mapa, en tres partes.
2. **titulo.** Métodos causales: el mapa de la experimentación.
3. **mde.** 1. El efecto mínimo detectable (MDE). Con 5% de significancia y 80% de poder, necesitas unas 16·σ²/δ² observaciones por grupo. Detectar la mitad del efecto exige el cuádruple de datos.
4. **cuped.** 2. CUPED. Restas lo que ya predecía el comportamiento previo, y la varianza baja en (1 − ρ²). Es como tener más tráfico, gratis.
5. **peeking.** 3. No mires el resultado todos los días. Cada vistazo es otra oportunidad de un falso positivo. Usa pruebas secuenciales.
6. **multiples.** 4. Con 20 métricas al 5%, esperas un falso positivo solo por azar. Corrige con Bonferroni, o controla la tasa de falsos descubrimientos.
7. **srm.** 5. Si pediste mitad y mitad, y llegó otra proporción, el experimento puede estar roto (SRM). Revísalo con χ² antes de mirar nada más.
8. **guardas.** 6. Define métricas de guarda, que no pueden empeorar. Y en métricas de razón, calcula la varianza con el método delta.
9. **interferencia.** 7. Si tratar a uno afecta a otro, como en un marketplace, aleatoriza por grupos, por zonas, o alternando en el tiempo.
10. **zoo.** 8. El zoológico de efectos: ATE en todos, ATT en los tratados, LATE en quienes el instrumento movió, y CATE en un subgrupo.
11. **hte.** 9. Efectos heterogéneos (HTE): el efecto, dado quién eres. Se estima con meta-learners, o con bosques causales.
12. **uplift.** 10. Uplift: usas ese efecto para tratar solo a quien cambia gracias al tratamiento, y lo mides con la curva Qini.
13. **bandits.** 11. Bandits: en vez de dividir fijo, el algoritmo manda más tráfico a la variante que va ganando, mientras sigue explorando.
14. **sintetico.** 12. Control sintético: si solo una región recibe la política, construyes su gemelo ponderando otras regiones.
15. **impacto.** 13. Series de tiempo interrumpidas (CausalImpact): predices qué habría pasado sin la campaña, y lo comparas con lo que pasó.
16. **dags.** 14. Grafos causales (DAGs): te dicen qué variables controlar, y cuáles no tocar, como un mediador o un colisionador.
17. **sensibilidad.** 15. Análisis de sensibilidad: el E-value dice qué tan fuerte tendría que ser un confusor oculto para borrar tu efecto.
18. **dml.** 16. Double machine learning: limpias el tratamiento y el resultado con modelos, y estimas el efecto con lo que queda.
19. **mediacion.** 17. Mediación: separas cuánto del efecto pasa por un mecanismo, y cuánto va directo.
20. **cierre.** 17 ideas, una cápsula para cada una. Dime cuál quieres primero, compártelo y sígueme.

## Cuentas y fuentes

- **MDE:** n por grupo ≈ 2·(z₀,₉₇₅ + z₀,₈)²·σ²/δ² = 2·(1,96 + 0,84)²·σ²/δ² ≈ 15,7·σ²/δ² ≈ 16·σ²/δ² (regla de Lehr).
  La mitad del efecto exige el cuádruple de datos porque n ∝ 1/δ².
- **CUPED:** Deng, Xu, Kohavi y Walker (2013). Y′ = Y − θ(X − X̄), θ = Cov(Y,X)/Var(X); la varianza se
  multiplica por (1 − ρ²). Con ρ = 0,7: 1 − 0,49 = 0,51.
- **Comparaciones múltiples:** 20 × 0,05 = 1 falso positivo esperado; 1 − 0,95²⁰ = 0,64; Bonferroni 0,05/20 = 0,0025.
- **SRM:** 50.800 y 49.200 sobre 50.000 esperados: χ² = 2·800²/50.000 = 25,6; p ≈ 4·10⁻⁷.
- **E-value:** VanderWeele y Ding (2017). E = RR + √(RR(RR − 1)); con RR = 2, E = 2 + √2 = 3,41.
- **Mediación:** en el caso lineal, efecto total = c′ + a·b = 0,3 + 0,5·0,4 = 0,5 (números ilustrativos).
- **Métodos citados:** bosques causales (Wager y Athey, 2018), meta-learners (Künzel y otros, 2019), control sintético
  (Abadie, Diamond y Hainmueller, 2010), CausalImpact (Brodersen y otros, 2015), double machine learning
  (Chernozhukov y otros, 2018).
- **Ilustrativo:** las series de p-valores, los efectos por edad, la curva Qini, las asignaciones del bandit, las
  series del control sintético y de la campaña, y las métricas de guarda.
