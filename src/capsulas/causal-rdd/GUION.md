# Métodos causales · Regresión discontinua

Serie **Métodos causales** (sin número). Composición: `Causal-RDD` · 1080×1920 · 30 fps.
Estilo vacío con fórmulas que se arman término por término (`src/estilos/vacio/mate.tsx` y `causal.tsx`).
Va de una historia simple a la fórmula, con un caso clásico, el supuesto clave y sus límites.

## Guion (lo que dice la voz)

1. **gancho.** Una beca se entrega a quien saca 600 puntos o más. ¿La beca mejora las notas en la universidad? Comparar becados con no becados no sirve: los becados ya eran mejores alumnos.
2. **titulo.** Métodos causales: regresión discontinua.
3. **idea.** Pero mira el borde. Un alumno con 599 puntos, y otra con 601, son casi idénticos. La única diferencia real es que una recibió la beca. Junto al corte, es casi como un sorteo.
4. **piezas.** Tres piezas. La variable de asignación: el puntaje. El corte: 600. Y el tratamiento, que se activa al cruzar el corte.
5. **salto.** Graficas la nota universitaria contra el puntaje. Si la beca tiene efecto, la curva salta justo en el corte. El efecto es ese salto: el límite por la derecha, menos el límite por la izquierda.
6. **estimar.** Para medirlo, ajustas una recta a cada lado, solo con datos cerca del corte. Ese ancho de ventana es un equilibrio: angosta, menos sesgo pero más ruido. Ancha, más datos pero más sesgo.
7. **difusa.** Si cruzar el corte no garantiza la beca, sino que solo la hace más probable, el diseño es difuso. Entonces divides el salto en la nota por el salto en la probabilidad de tener beca.
8. **pruebas.** Las pruebas: que nadie manipule su puntaje para quedar justo arriba. Si se amontonan en el borde, hay trampa. Y que las demás características no salten en el corte.
9. **limite.** Su límite: el efecto vale cerca del corte. Para quien sacó 400, no dice nada. El diseño nació en 1960, estudiando premios al mérito escolar.
10. **cierre.** Un corte, un salto, y mucha honestidad con el borde. Compártelo y sígueme para el siguiente método.

## Fuentes y verificación

- **Origen:** Thistlethwaite y Campbell (1960), *Journal of Educational Psychology* 51(6): certificados de
  mérito del National Merit según un puntaje de corte.
- **Efecto en el corte:** τ = lím_{x↓c} E[Y | X = x] − lím_{x↑c} E[Y | X = x], con D = 1[X ≥ c].
- **Estimación:** regresión lineal local a cada lado dentro de un ancho de ventana h; ventana angosta = menos
  sesgo y más varianza, ancha = lo contrario.
- **Diseño difuso:** τ = salto en Y / salto en la probabilidad de tratamiento (una variable instrumental en el
  corte). Ejemplo: 0,3 / 0,6 = 0,5.
- **Pruebas:** densidad de McCrary (manipulación del puntaje) y continuidad de covariables (placebo).
- **Ilustrativo:** la beca, el corte de 600, las notas, la nube de puntos y los saltos.
