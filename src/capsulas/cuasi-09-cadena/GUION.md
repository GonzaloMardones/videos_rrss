# Cuasi-experimentos · 09 · ¿Qué agente causó la mejora? (banca: flujo de créditos)

Composición: `Cuasi09-Cadena` · 1080×1920 · 30 fps · ~1:38.
Nota de voz: Avin, Shpitser y Pearl como `Ávin, Shpítser y Perl`.

## Guion (resumen)

1. **gancho.** Nuevo agente de verificación de identidad: la conversión sube 5 puntos. ¿Por la rapidez o por algo más?
2. **cadena.** Orquestador → verificación → riesgo → oferta, por A2A. Las trazas (quién pidió, cuánto tardó, qué devolvió) son datos para un análisis de mediación.
3. **mediacion.** Indirecto vía tiempo de decisión: a = −30 min, b = −0,1 pts/min → 3; directo c′ = 2; total 5.
4. **confusor.** La complejidad del cliente alarga el proceso y baja la conversión. Sin incluirla: indirecto 8,5, directo −3,5. Con ella: 3,1 y 1,9.
5. **caminos.** Con más agentes, efectos específicos por camino (Avin, Shpitser y Pearl, 2005), cada uno con su supuesto.
6. **practica.** Propagar el trace_id, guardar duraciones y los atributos de cliente que usa cada agente.

## Cuentas (simulación propia, semilla 9, n = 200.000)

- T ~ Bernoulli(0,5); complejidad C ~ N(0,1); M = 60 − 30T + 10C + N(0, 8²); Y = 20 + 2T − 0,1M − 3C + N(0, 5²).
- Total 4,96; a = −29,9. Sin C: b = −0,284 → indirecto 8,49; directo −3,53. Con C: b = −0,102 → indirecto 3,06; directo 1,92.
- **Ilustrativo:** la traza dibujada y el JSON de ejemplo.

## Fuentes

- Baron RM, Kenny DA (1986). *Journal of Personality and Social Psychology* 51(6):1173–1182.
- Imai K, Keele L, Tingley D (2010). "A general approach to causal mediation analysis". *Psychological Methods* 15(4):309–334.
- Avin C, Shpitser I, Pearl J (2005). "Identifiability of path-specific effects". *IJCAI* 2005:357–363.
- VanderWeele TJ (2015). *Explanation in Causal Inference*. Oxford University Press.
- W3C (2021). *Trace Context* (Recommendation); OpenTelemetry: propagación de contexto entre servicios.
