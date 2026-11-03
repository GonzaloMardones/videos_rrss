# El mapa de la experimentación · 03/17 · Mirar antes de tiempo

Composición: `Exp03-Peeking` · 1080×1920 · 30 fps · ~1:36.

## Guion (lo que dice la voz)

1. **gancho.** Imagina que miras tu experimento cada mañana. El día 9 sale significativo, y lo detienes. Acabas de más que triplicar tu probabilidad de equivocarte.
2. **titulo.** Idea 3 del mapa de la experimentación: mirar antes de tiempo (peeking).
3. **paseo.** Aunque el tratamiento no haga nada, el estadístico sube y baja con el azar, como un paseo aleatorio. El umbral de 1,96 está pensado para mirar una sola vez. Cada vistazo extra es otra oportunidad de cruzarlo por suerte.
4. **cuanto.** ¿Cuánto crece el error? Con una mirada, 5%. Con cinco, 14%. Con diez, 19%. Y mirando todos los días durante un mes, casi 30%.
5. **fijo.** La primera solución es la más simple: calcula el tamaño de muestra antes, con el MDE, y mira una sola vez al final.
6. **grupos.** La segunda: un diseño secuencial por grupos. Decides de antemano cuántas veces vas a mirar, y repartes el 5% entre esas miradas. Con O'Brien-Fleming y cinco miradas, el umbral parte en 4,56 y baja hasta 2,04 al final. Muy exigente al principio, casi normal al final. Así puedes detener temprano solo si el efecto es enorme.
7. **pocock.** Pocock, en cambio, usa el mismo umbral en cada mirada: 2,41.
8. **siempre.** La tercera: p-valores siempre válidos (como mSPRT). Te dejan mirar cuando quieras, a cambio de un poco menos de poder.
9. **regla.** La regla práctica: antes de lanzar, escribe cuánto dura, cuántas veces miras, y qué te hace parar. Y corre semanas completas, para no confundir el efecto con el día de la semana.
10. **cierre.** Mirar no es el problema. Decidir mirando, sí. En la próxima idea: qué pasa cuando mides 20 métricas a la vez. Compártelo y sígueme.

## Cuentas y fuentes

- Inflación del error tipo I al mirar K veces con umbral 1,96 en cada mirada (miradas equiespaciadas), verificada con
  200.000 simulaciones: K = 1 → 5,0 %; 2 → 8,2 %; 5 → 14,1 %; 9 → 18,4 %; 10 → 19,3 %; 20 → 24,7 %; 30 → 28,0 %
  (coincide con la tabla clásica de Armitage, McPherson y Rowe, 1969). "Más que triplicar" en el gancho: 18,4 % / 5 % = 3,7.
- O'Brien-Fleming con 5 miradas: z_k = 2,04·√(5/k) = 4,56; 3,23; 2,63; 2,28; 2,04. Pocock: 2,41 constante.
  Ambas suman α = 5 % (simulación: 5,00 % y 5,01 %).
- p-valores siempre válidos (mSPRT): Johari, Koomen, Pekelis y Walsh (2017), "Peeking at A/B Tests", KDD.
- **Ilustrativo:** los p-valores diarios del gancho, el paseo del estadístico y la banda del intervalo siempre válido.
