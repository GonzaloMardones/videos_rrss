# Cuasi-experimentos · 02 · ¿Qué es un cuasi-experimento?

Serie **Cuasi-experimentos**. Composición: `Cuasi02-Definicion` · 1080×1920 · 30 fps · ~2:25.
Nota de voz: "hash" se escribe `jash`; Shadish, Cook y Campbell como `Shádish, Cuk y Cámpbel`.

## Guion (lo que dice la voz)

1. **gancho.** Crédito solo con puntaje ≥ 650; ley que rige desde el 1 de marzo; función lanzada en Chile antes que en Perú. Ninguno se sorteó, pero en los tres se puede medir un efecto causal.
2. **titulo.** Cuasi-experimentos, capítulo 2.
3. **definicion.** Tratamiento y comparación como un experimento; falta el sorteo. La asignación la decide una regla, una fecha o las personas (Shadish, Cook y Campbell).
4. **mecanismo.** Mecanismo de asignación P(T = 1 | X, Y(0), Y(1)). Experimento: lo fijas (0,5) y no depende de nada. Cuasi: depende de algo, y hay que saber de qué.
5. **sesgo.** E[Y|T=1] − E[Y|T=0] = ATT + (E[Y(0)|T=1] − E[Y(0)|T=0]). Ejemplo ilustrativo: agente de IA en regiones de alta demanda: +12 observado = +5 efecto + 7 sesgo de selección.
6. **mapa.** Según de qué depende la asignación: fecha → series interrumpidas; grupo y fecha → DiD; umbral → RDD; empujón externo → IV; una unidad → control sintético. Cada uno con su supuesto.
7. **asignacion.** En la nube la asignación es código: hash(usuario + sal) mod 100 < 10 es experimento; región, umbral de confianza o fecha son cuasi-experimentos. Registrar regla, puntaje y fecha es guardar la mitad del diseño.
8. **bayes.** Rubin (1978): si P(T | X, Y(0), Y(1)) = P(T | X), la asignación es ignorable y el posterior del efecto no depende de ella. El sorteo lo garantiza; en un cuasi hay que argumentarlo o modelar la regla.
9. **cierre.** Cuasi no es «casi»: es un supuesto que defiendes. Próximo: amenazas a la validez.

## Fuentes

- Shadish WR, Cook TD, Campbell DT (2002). *Experimental and Quasi-Experimental Designs for Generalized Causal Inference*. Houghton Mifflin. Definición de cuasi-experimento: hay manipulación, pero sin asignación aleatoria.
- Rubin DB (1978). "Bayesian inference for causal effects: the role of randomization". *Annals of Statistics* 6(1):34–58.
- Imbens GW, Rubin DB (2015). *Causal Inference for Statistics, Social, and Biomedical Sciences*. Cambridge University Press (mecanismo de asignación, caps. 1–3).
- Angrist JD, Pischke J-S (2009). *Mostly Harmless Econometrics*. Princeton University Press, cap. 2 (descomposición en efecto + sesgo de selección).
- Kohavi R, Tang D, Xu Y (2020). *Trustworthy Online Controlled Experiments*. Cambridge University Press (asignación por hash y unidad de aleatorización).
- Diseños del mapa: ver las cápsulas *Métodos causales* (DiD, RDD, IV) y las ideas 12 y 13 del *Mapa de la experimentación*.
- **Ilustrativo:** el ejemplo de 12 = 5 + 7 y las líneas de código.
