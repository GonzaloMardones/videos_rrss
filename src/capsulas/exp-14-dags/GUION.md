# El mapa de la experimentación · 14/17 · Grafos causales, puertas traseras y colisionadores

Composición: `Exp14-DAGs` · 1080×1920 · 30 fps · ~2:17.
Nota de voz: "DAG" se escribe `dag` en `dice`; las frases que empiezan con "En" o "Si" llevan "Y" delante para que Kokoro no corte la primera sílaba.

## Guion (lo que dice la voz)

1. **gancho.** Entre actores famosos, los más carismáticos parecen menos talentosos; en la población no hay relación. La correlación la crea mirar solo a los famosos.
2. **titulo.** Idea 14: grafos causales, puertas traseras y colisionadores.
3. **grafo.** Un DAG dibuja tus supuestos: flechas = causas, sin ciclos. Con tres variables hay tres piezas: cadena, bifurcación, colisionador.
4. **confusor.** El tamaño de la ciudad causa publicidad y ventas. Simulación: efecto real 0,5; regresión ingenua 1,47; controlando Z, 0,5.
5. **puerta.** X ← Z → Y es una puerta trasera. Criterio: bloquear todas las puertas traseras sin controlar descendientes de X. Fórmula de ajuste: P(Y | do(X)) = Σ_z P(Y | X, z) · P(z).
6. **colisionador.** T → F ← C. El colisionador bloquea por sí solo; condicionar en él abre el camino: correlación 0 → −0,68.
7. **mediador.** X → M → Y (y X → Y). Efecto total 0,5; controlando M queda 0,2 (solo el directo).
8. **regla.** Controla confusores (previos a X); nunca colisionadores ni nada que X produce. Verificar d-separación es lineal: O(V + E).
9. **cierre.** Más controles no es mejor; los correctos sí. Próxima: análisis de sensibilidad.

## Cuentas y fuentes

- Simulaciones propias (n = 200.000, semilla 7):
  - Confusor: Z ~ N(0,1); X = 0,8 Z + N(0, 0,6²); Y = 0,5 X + 1,2 Z + ε. Pendiente ingenua 1,466; con Z, 0,499.
  - Colisionador: T, C ~ N(0,1) independientes; famoso si T + C > 1,5 (14 %). corr total 0,001; entre famosos −0,681.
  - Mediador: M = 0,6 X + ε; Y = 0,2 X + 0,5 M + ε. Efecto total 0,501 (= 0,2 + 0,6·0,5); controlando M, 0,201.
- La nube del gancho es una muestra de 320 puntos (hash seno + Box-Muller) solo para dibujar; los r del rótulo son de la simulación grande.
- Pearl (2009). *Causality*, 2.ª ed. (criterio de la puerta trasera y fórmula de ajuste). Pearl, Glymour y Jewell (2016),
  *Causal Inference in Statistics: A Primer*.
- Elwert y Winship (2014). "Endogenous Selection Bias: The Problem of Conditioning on a Collider Variable". Annual Review
  of Sociology 40.
- d-separación en tiempo lineal: Shachter (1998), "Bayes-Ball"; Koller y Friedman (2009), algoritmo de alcanzabilidad.
