# Métodos causales · Emparejamiento

Serie **Métodos causales** (sin número). Composición: `Causal-Emparejamiento` · 1080×1920 · 30 fps.
Estilo vacío con fórmulas que se arman término por término (`src/estilos/vacio/mate.tsx` y `causal.tsx`).
Va de una historia simple a la fórmula, con un caso clásico, el supuesto clave y sus límites.

## Guion (lo que dice la voz)

1. **gancho.** Quienes hicieron un curso de capacitación ganan más. ¿Por el curso, o porque ya eran distintos? Si no puedes sortear, puedes buscar gemelos.
2. **titulo.** Métodos causales: emparejamiento.
3. **idea.** La idea: para cada persona que hizo el curso, buscas a alguien que no lo hizo, pero que se le parece en todo lo que puedes medir: edad, estudios, ingreso previo. Comparas cada pareja, y promedias las diferencias.
4. **formula.** En fórmula: el promedio, sobre los tratados, de su resultado menos el de su gemelo. Ese es el efecto en los tratados.
5. **dimension.** El problema: con muchas características, ya no hay gemelos exactos. Con 20 características de sí o no, hay más de un millón de combinaciones. La mayoría de las celdas quedan vacías.
6. **propension.** La solución de Rosenbaum y Rubin: el puntaje de propensión. La probabilidad de recibir el tratamiento, dadas tus características. Resume 20 columnas en un solo número entre 0 y 1, y emparejas por ese número.
7. **logistica.** Se estima con una regresión logística: una suma ponderada de tus características, pasada por una curva que la deja entre 0 y 1.
8. **costo.** Y el costo: buscar el vecino más cercano comparando contra todos es O(n_T · n_C). 1.000 por 10.000 son 10 millones de comparaciones. Si ordenas por el puntaje, cada búsqueda es binaria, y el costo baja a O(n log n).
9. **pruebas.** Las pruebas: el balance, con diferencias estandarizadas bajo 0,1, y el solapamiento: que existan gemelos para todos.
10. **limite.** El límite: solo empareja lo que mides. Si la motivación no está en tus datos, sigue sesgando. En 1986, LaLonde mostró que métodos sin experimento no lograban reproducir el resultado de un experimento de capacitación. Desde entonces, se valida con cuidado.
11. **cierre.** Gemelos, un puntaje, y una pregunta honesta sobre lo que no ves. Compártelo y sígueme para más métodos.

## Fuentes y verificación

- **ATT:** (1/n_T) Σ_{i∈T} (Y_i − Y_{j(i)}), con j(i) el control más parecido.
- **Maldición de la dimensión:** con k características binarias hay 2^k celdas; con 20, 1.048.576.
- **Puntaje de propensión:** Rosenbaum y Rubin (1983), *Biometrika* 70(1): e(x) = P(T = 1 | X = x),
  estimado con una regresión logística.
- **Costo:** vecino más cercano por fuerza bruta O(n_T · n_C) = 1.000 × 10.000 = 10.000.000 comparaciones;
  ordenar 10.000 controles y hacer 1.000 búsquedas binarias ≈ 10.000·log₂10.000 + 1.000·log₂10.000 ≈ 146.000.
- **Pruebas:** balance (SMD < 0,1) y solapamiento (soporte común).
- **LaLonde (1986)**, *American Economic Review* 76(4): con datos del experimento National Supported Work, los
  métodos sin experimento no recuperaban el efecto experimental. Dehejia y Wahba (1999) mostraron que el
  puntaje de propensión se acercaba más; el debate siguió (Smith y Todd, 2005).
- **Ilustrativo:** las personas, sus ingresos, los SMD y las curvas de solapamiento.
