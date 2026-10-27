# Métodos causales · Diferencias en diferencias

Serie **Métodos causales** (sin número). Composición: `Causal-DiD` · 1080×1920 · 30 fps.
Estilo vacío con fórmulas que se arman término por término (`src/estilos/vacio/mate.tsx` y `causal.tsx`).
Va de una historia simple a la fórmula, con un caso clásico, el supuesto clave y sus límites.

## Guion (lo que dice la voz)

1. **gancho.** En 1992, Nueva Jersey subió el salario mínimo. Pensilvania, su vecino, no. ¿Se perdieron empleos? Si solo miras el antes y el después, te engañas.
2. **titulo.** Métodos causales: diferencias en diferencias.
3. **trampas.** Primero, la idea simple. Comparar antes y después mezcla el efecto con todo lo que cambió en el tiempo: la temporada, la economía. Y comparar un estado con otro mezcla el efecto con lo que ya los hacía distintos.
4. **idea.** Diferencias en diferencias resta las dos cosas. Mide cuánto cambió el grupo tratado, y le resta cuánto cambió el control. El cambio del control es lo que habría pasado sin la medida: el contrafactual.
5. **formula.** En fórmula: el cambio de los tratados, menos el cambio del control. La primera resta borra lo que es fijo en cada grupo. Y la segunda borra lo que les pasó a los dos al mismo tiempo.
6. **ejemplo.** Con los datos de Card y Krueger: en Nueva Jersey, el empleo por local subió 0,59. En Pensilvania, bajó 2,16. La diferencia en diferencias da casi 2,8 empleos más por local. No hubo pérdida de empleo. Ese trabajo es parte del Nobel de Economía 2021 que recibió David Card.
7. **regresion.** En una regresión, es un término de interacción: tratado por después. Su coeficiente, β₃, es exactamente la diferencia en diferencias.
8. **supuesto.** El supuesto clave: sin la medida, los dos grupos habrían seguido tendencias paralelas. No se puede probar después, pero sí antes: si las tendencias previas ya se separaban, desconfía.
9. **cuidado.** Ojo también con efectos que se anticipan, con contagios al grupo de control, y con tratamientos que llegan en fechas distintas: ahí usa estimadores modernos.
10. **cierre.** Dos restas y un supuesto. Compártelo y sígueme para el siguiente método.

## Fuentes y verificación

- **Card y Krueger (1994)**, "Minimum Wages and Employment: A Case Study of the Fast-Food Industry in New Jersey
  and Pennsylvania", *American Economic Review* 84(4), 772–793. El salario mínimo de Nueva Jersey subió de
  US$ 4,25 a US$ 5,05 el 1 de abril de 1992; Pensilvania no lo cambió.
- **Tabla 3** (empleo equivalente a tiempo completo por local): Pensilvania 23,33 → 21,17; Nueva Jersey
  20,44 → 21,03; diferencia en diferencias 2,76 (error estándar 1,36). Los valores coinciden en varias réplicas
  públicas (Kuroda, Mams, MPRA 25181); el PDF original no se pudo abrir desde este entorno. Con los valores
  redondeados la cuenta da 2,75; el video lo dice así y aclara que el paper reporta 2,76.
- **Regresión:** β₀ = 23,33 (control antes), β₁ = 20,44 − 23,33 = −2,89, β₂ = 21,17 − 23,33 = −2,16,
  β₃ = 2,75. Con dos grupos y dos periodos, β₃ coincide con la diferencia en diferencias.
- **Contrafactual en el gráfico:** 20,44 + (21,17 − 23,33) = 18,28.
- **Nobel 2021:** David Card, "por sus contribuciones empíricas a la economía laboral".
- **Estimadores con adopción escalonada:** Callaway y Sant'Anna (2021), Sun y Abraham (2021); la regresión de
  efectos fijos en dos vías puede mezclar efectos cuando el tratamiento llega en fechas distintas.
- **Ilustrativo:** las tendencias de la escena del supuesto.
