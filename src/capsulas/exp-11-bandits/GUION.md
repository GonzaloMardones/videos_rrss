# El mapa de la experimentación · 11/17 · Bandits y muestreo de Thompson

Composición: `Exp11-Bandits` · 1080×1920 · 30 fps · ~1:50.
Nota de voz: en el campo `dice` se escribe `bándit`, `Thómpson` y "prueba a be" (A/B solo se oye como "una vez").

## Guion (lo que dice la voz)

1. **gancho.** Imagina que una versión convierte 5 % y otra 6 %. Con un A/B fijo de 20.000 visitas regalas 100 conversiones a la peor. Con un bandit, unas 25.
2. **titulo.** Idea 11 del mapa de la experimentación: bandits y muestreo de Thompson.
3. **dilema.** El nombre viene de las tragamonedas ("bandidos de un brazo"): cada palanca paga distinto y no sabes cuál es la mejor. Solo explorar cuesta plata; solo explotar puede dejarte con la equivocada.
4. **regret.** Arrepentimiento = Σ(p* − p_elegida). En un A/B 50/50, 10.000 visitas × (0,06 − 0,05) = 100 conversiones perdidas.
5. **thompson.** Para cada versión, θ ~ Beta(éxitos + 1, fracasos + 1). En cada visita sacas un número de cada curva y muestras la que sacó el más alto. Cada versión se muestra en proporción a la probabilidad de ser la mejor.
6. **aprende.** Con 100 visitas por versión las curvas se tapan: P(B > A) ≈ 62 %. Con 1.000 se separan: ≈ 84 %.
7. **resultado.** En la simulación, el bandit manda 87 % del tráfico a la mejor y pierde ~25 conversiones en vez de 100.
8. **cuando.** El bandit optimiza, no mide: la peor versión recibe poco tráfico, el efecto queda impreciso y las métricas de guarda casi no se miden. Úsalo para decisiones cortas (titulares, creatividades, promociones); usa A/B cuando necesitas saber cuánto vale el cambio o el efecto tarda en aparecer.
9. **cierre.** Un A/B te dice cuánto. Un bandit te hace ganar mientras aprendes. Próxima idea: control sintético.

## Cuentas y fuentes

- Regret del A/B fijo: 20.000 visitas, 10.000 a la versión de 5 %, pérdida = 10.000 × 0,01 = 100 conversiones esperadas.
- Simulación propia (300 repeticiones, p_A = 0,05, p_B = 0,06, N = 20.000, priors Beta(1,1)): regret medio ≈ 25,
  ≈ 87 % del tráfico a B.
- P(B > A) con tasas observadas iguales a las verdaderas y priors Beta(1,1): ≈ 62 % con 100 visitas por brazo y
  ≈ 84 % con 1.000 (integración numérica de las dos betas).
- Thompson, W. R. (1933). "On the likelihood that one unknown probability exceeds another in view of the evidence of
  two samples". Biometrika 25(3/4).
- Russo, Van Roy, Kazerouni, Osband y Wen (2018). "A Tutorial on Thompson Sampling". Foundations and Trends in ML.
- **Ilustrativo:** la forma exacta de las barras de reparto de tráfico por tramo.
