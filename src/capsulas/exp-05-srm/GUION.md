# El mapa de la experimentación · 05/17 · Desbalance de muestra (SRM)

Composición: `Exp05-SRM` · 1080×1920 · 30 fps · ~1:30.

## Guion (lo que dice la voz)

1. **gancho.** Imagina que pediste mitad y mitad, y llegaron 50.800 usuarios a un grupo y 49.200 al otro. ¿Azar? No. Tu experimento está roto.
2. **titulo.** Idea 5 del mapa de la experimentación: el desbalance de muestra (SRM, sample ratio mismatch).
3. **que.** Ocurre cuando la proporción de usuarios que llegó a cada grupo no es la que diseñaste.
4. **prueba.** Se detecta con una prueba de χ². Para cada grupo, restas lo esperado a lo observado, lo elevas al cuadrado, y lo divides por lo esperado. 800² / 50.000, por dos grupos: χ² = 25,6. Un p-valor de 4 en 10 millones.
5. **intuicion.** La intuición: con 100.000 usuarios, el azar mueve la proporción en apenas 0,16 puntos. 0,8 son cinco veces eso. 50,1 contra 49,9 es normal (p = 0,53). 50,8, no.
6. **porque.** ¿Por qué importa tanto? Porque los usuarios que faltan no faltan al azar. Si tu variante carga más lento, los impacientes se van antes de ser contados. Quedan solo los pacientes, y la variante parece mejor de lo que es.
7. **causas.** Las causas típicas: una variante más lenta, redirecciones, bots filtrados distinto en cada grupo, errores en la asignación, o datos que se pierden en el camino.
8. **hacer.** ¿Qué hacer? No lo analices. El efecto que veas está sesgado. Busca la causa, corrígela, y vuelve a correr el experimento. Y revisa el SRM primero, en cada experimento, de forma automática. Un umbral común: p < 0,001.
9. **cierre.** Antes de leer el resultado, cuenta a la gente. En la próxima idea, las métricas que no pueden empeorar. Compártelo y sígueme.

## Cuentas y fuentes

- 100.000 usuarios, 50/50 esperado: E = 50.000 por grupo. Observado 50.800 y 49.200:
  χ² = 800²/50.000 + 800²/50.000 = 12,8 + 12,8 = 25,6 (1 grado de libertad), p ≈ 4,2·10⁻⁷.
- Desviación estándar de la proporción: √(0,25/100.000) = 0,158 puntos; 0,8 puntos son z = 5,06, y z² = 25,6 = χ².
- 50,1/49,9 → χ² = 0,4, p = 0,53 (normal). 50,3/49,7 → p = 0,058.
- Umbral de alarma usado en la industria: p < 0,001 (Fabijan y otros, 2019, "Diagnosing Sample Ratio Mismatch in Online
  Controlled Experiments", KDD; Kohavi, Tang y Xu, 2020, *Trustworthy Online Controlled Experiments*).
- **Ilustrativo:** los conteos 50.800 / 49.200 y la animación de usuarios impacientes.
