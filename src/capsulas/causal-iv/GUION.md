# Métodos causales · Variable instrumental

Serie **Métodos causales** (sin número). Composición: `Causal-IV` · 1080×1920 · 30 fps.
Estilo vacío con fórmulas que se arman término por término (`src/estilos/vacio/mate.tsx` y `causal.tsx`).
Va de una historia simple a la fórmula, con un caso clásico, el supuesto clave y sus límites.

## Guion (lo que dice la voz)

1. **gancho.** ¿Estudiar un año más sube tu sueldo? Parece fácil de medir: quienes estudian más, ganan más. Pero los más motivados estudian más, y también ganan más. La motivación no se ve, y lo confunde todo.
2. **titulo.** Métodos causales: variable instrumental.
3. **idea.** La idea: busca algo que empuje a estudiar más, pero que no toque el sueldo por ningún otro camino. Eso es un instrumento. Usas solo la parte de los estudios que el instrumento movió, y esa parte no viene de la motivación.
4. **condiciones.** Un buen instrumento cumple tres condiciones. Uno, relevancia: de verdad mueve el tratamiento. Dos, exclusión: afecta el resultado solo a través del tratamiento. Y tres, independencia: no está relacionado con lo que no ves.
5. **ejemplo.** Un ejemplo famoso, de Angrist y Krueger: el trimestre de nacimiento. Por las leyes de escolaridad obligatoria, según cuándo naciste podías dejar el colegio con un poco más o menos de estudios.
6. **wald.** La cuenta más simple es una división. Arriba, cuánto cambia el sueldo con el instrumento. Abajo, cuánto cambian los estudios con el instrumento. Si el instrumento sube el sueldo un 1%, y los estudios en 0,1 años, cada año vale un 10%.
7. **etapas.** En la práctica se hace en dos etapas. Primero, predices los estudios usando el instrumento. Después, explicas el sueldo con esa predicción. Por eso se llama mínimos cuadrados en dos etapas.
8. **debil.** Si el instrumento mueve poco el tratamiento, es débil, y el resultado se vuelve poco confiable. La regla clásica: estadístico F mayor que 10.
9. **late.** Un detalle fino: el efecto vale para quienes el instrumento hizo cambiar. Se llama efecto local (LATE). Por ideas como esa, Angrist e Imbens ganaron el Nobel 2021.
10. **cierre.** Un empujón limpio, tres condiciones, y una división. Compártelo y sígueme para el siguiente método.

## Fuentes y verificación

- **Ejemplo:** Angrist y Krueger (1991), "Does Compulsory School Attendance Affect Schooling and Earnings?",
  *Quarterly Journal of Economics* 106(4): el trimestre de nacimiento como instrumento de los años de estudio,
  por las leyes de escolaridad obligatoria que fijan una edad mínima para dejar el colegio. Las barras por
  trimestre del video son esquemáticas.
- **Condiciones:** relevancia, exclusión e independencia.
- **Estimador de Wald:** β_IV = (E[Y|Z=1] − E[Y|Z=0]) / (E[T|Z=1] − E[T|Z=0]). Ejemplo ilustrativo:
  1 % / 0,1 años = 10 % por año.
- **Mínimos cuadrados en dos etapas:** T̂ = π₀ + π₁Z; Y = β₀ + β₁T̂ + ε.
- **Instrumento débil:** regla clásica F > 10 en la primera etapa (Staiger y Stock, 1997). La literatura
  reciente propone correcciones de los intervalos cuando F es bajo; el video no cita un umbral nuevo.
- **LATE:** el efecto vale para quienes el instrumento hizo cambiar (cumplidores). Nobel 2021 a Angrist e Imbens
  "por sus contribuciones metodológicas al análisis de relaciones causales".
