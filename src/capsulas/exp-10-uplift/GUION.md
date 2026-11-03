# El mapa de la experimentación · 10/17 · Uplift y curva Qini

Composición: `Exp10-Uplift` · 1080×1920 · 30 fps · ~1:38.
Nota de voz: uplift se escribe `áplift` y Qini `Quini` en el campo `dice`.

## Guion (lo que dice la voz)

1. **gancho.** Imagina que mandar un cupón a tus 10.000 clientes te da 400 compras extra. Y mandarlo solo a 2.000 te da 600. Menos cupones, más ventas.
2. **titulo.** Idea 10 del mapa de la experimentación: uplift, tratar solo a quien cambia.
3. **segmentos.** Cada cliente cae en uno de cuatro grupos. Los persuadibles compran solo si les mandas el cupón. Los seguros compran igual: el cupón es plata regalada. Los perdidos no compran nunca. Y los de no molestar compran menos si los contactas: el mensaje los espanta.
4. **propension.** El error clásico: elegir a quién mandarle el cupón con un modelo que predice quién va a comprar. Ese modelo elige primero a los seguros, que compran igual.
5. **formula.** El uplift mide otra cosa: u(x) = P(compra | T = 1, x) − P(compra | T = 0, x). Es el CATE de la idea 09, usado para decidir.
6. **cuenta.** La cuenta: 2.000 persuadibles × 30% = +600. 1.000 de no molestar × −20% = −200. A todos: +400. Solo a persuadibles: +600.
7. **qini.** ¿Cómo sabes si tu modelo de uplift es bueno? Con la curva Qini. Ordenas a los clientes por uplift predicho, y vas sumando las compras extra a medida que tratas a más. Si eliges al azar, es una línea recta. Un buen modelo sube rápido al principio, se aplana, y cae al final, cuando llegas a los que no hay que molestar. El área entre la curva y la recta es el coeficiente Qini: cuánto mejor que el azar.
8. **datos.** Clave: para entrenar un modelo de uplift necesitas un experimento previo, con tratados y control al azar. Sin eso, el modelo aprende sesgos, no efectos.
9. **cierre.** No trates a quien va a comprar. Trata a quien cambia. En la próxima idea: experimentos que aprenden mientras corren (bandits). Compártelo y sígueme.

## Cuentas y fuentes

- Uplift: u(x) = P(Y = 1 | T = 1, x) − P(Y = 1 | T = 0, x), el CATE sobre una respuesta binaria.
- Segmentos (persuadibles, seguros, perdidos, no molestar): Radcliffe y Surry (2011); Gutierrez y Gérardy (2017),
  "Causal Inference and Uplift Modeling: A review of the literature".
- Ejemplo ilustrativo con 10.000 clientes: 2.000 persuadibles × 30 % = +600; 3.000 seguros y 4.000 perdidos × 0 = 0;
  1.000 no molestar × −20 % = −200. A todos: +400 con 10.000 cupones. Solo persuadibles: +600 con 2.000.
- Curva Qini: compras incrementales acumuladas al tratar por uplift predicho decreciente; la diagonal es la selección al
  azar; el coeficiente Qini es el área entre ambas (Radcliffe, 2007).
- **Ilustrativo:** los porcentajes del modelo de propensión y la forma exacta de la curva.
