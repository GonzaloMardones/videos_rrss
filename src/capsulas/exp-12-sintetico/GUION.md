# El mapa de la experimentación · 12/17 · Control sintético

Composición: `Exp12-Sintetico` · 1080×1920 · 30 fps · ~2:23.
Nota de voz: en el campo `dice` se escribe `Iúta` (Utah) y `Conéticut` (Connecticut).

## Guion (lo que dice la voz)

1. **gancho.** En 1988 California aprobó la Proposición 99: 25 centavos más de impuesto por cajetilla. ¿Bajó el consumo por eso? No puedes repetir la historia sin el impuesto, pero sí puedes construirla.
2. **titulo.** Idea 12 del mapa de la experimentación: control sintético.
3. **problema.** Un solo estado tratado y ningún estado parecido. Contra el promedio de los otros 38 las curvas ya se separaban antes (−10 en 1975, −24 en 1988): no hay tendencias paralelas para un DiD.
4. **receta.** Si no existe un gemelo, se fabrica: mezcla de donantes que copia a California antes del impuesto. Utah 33 %, Nevada 23 %, Montana 20 %, Colorado 16 %, Connecticut 7 %.
5. **formula.** Ŷ_CA,t = Σ_j w_j · Y_j,t, con w_j ≥ 0 y Σ w_j = 1 (no extrapola). Los pesos minimizan el error antes de 1989: un problema cuadrático con J = 38 variables.
6. **ajuste.** Antes de 1989 el gemelo se equivoca en promedio menos de 2 cajetillas por persona al año.
7. **efecto.** En 2000: California 41,6 cajetillas por persona, sintético 67,3. Brecha −25,7 (≈ −38 %).
8. **placebo.** Mismo método en cada uno de los 38 donantes. En el estudio original, la razón de error post/pre de California es la mayor de los 39: p = 1/39 ≈ 2,6 %.
9. **cuidado.** Muchos años previos, donantes sin efecto (contagio por compras cruzadas), ningún otro cambio simultáneo. Si no calza antes, no confíes después.
10. **cierre.** Si no tienes control, constrúyelo. Próxima idea: series de tiempo interrumpidas.

## Cuentas y fuentes

- Abadie, Diamond y Hainmueller (2010). "Synthetic Control Methods for Comparative Case Studies: Estimating the Effect
  of California's Tobacco Control Program". JASA 105(490). Pesos publicados: Utah 0,334; Nevada 0,234; Montana 0,199;
  Colorado 0,164; Connecticut 0,069. Inferencia por placebos: California tiene la mayor razón MSPE post/pre de 39
  estados (p = 1/39 ≈ 0,026).
- Datos: ventas de cigarrillos per cápita (cajetillas), 39 estados, 1970–2000 (el panel del paper, copia en
  `python-causality-handbook/data/smoking.csv`).
- Cuentas propias con esos datos y los pesos publicados: RMSPE previo = 1,76; en 2000, real 41,6 vs sintético 67,3
  (brecha −25,7, −38 % del sintético); brecha media 1989–2000 = −19,0. Promedio de los otros 38: 136,9 en 1975 y 113,8
  en 1988 (California 127,1 y 90,1).
- Placebos del gráfico: ajuste propio solo con la variable de resultado (sin covariables), restringido a estados con
  MSPE previo ≤ 5× el de California (32 estados). Con este ajuste simple la brecha de California en 2000 es la más
  negativa de los 39, pero su razón post/pre queda 3.ª; por eso el 1/39 se atribuye al estudio original.
- Abadie (2021). "Using Synthetic Controls: Feasibility, Data Requirements, and Methodological Aspects". JEL 59(2):
  requisitos de buen ajuste previo, sin contagio a donantes y sin shocks simultáneos.
