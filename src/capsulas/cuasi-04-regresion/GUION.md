# Cuasi-experimentos · 04 · Regresión a la media (seguridad minera)

Composición: `Cuasi04-Regresion` · 1080×1920 · 30 fps · ~2:00.
Nota de voz: Hauer como `Jáuer`; Galton como `Gálton`.

## Guion (resumen)

1. **gancho.** Tras su peor año, una faena lanza un programa de seguridad y los accidentes bajan 20 %. En la simulación, sin programa, las faenas con peor año también bajan 20 %.
2. **idea.** Resultado = parte estable + suerte; un año extremo trae suerte que no se repite. Galton (1886).
3. **formula.** E[X₂ | X₁] = μ + ρ(X₁ − μ). ρ = 1: no hay regresión; ρ = 0: vuelves entero a la media.
4. **simulacion.** 2.000 faenas sin intervención: el 10 % con peor año 1 pasa de 19,4 a 15,6 accidentes (−20 %).
5. **bayes.** Encogimiento: θ̂ = w·X + (1 − w)·μ, con w = τ²/(τ² + σ²) = 0,55 → 15,2 (observado 15,6). Bayes empírico de Hauer.
6. **ia.** Reentrenar tras la peor semana o reescribir los peores prompts: mejoran en parte solos. Defensa: comparación también elegida por mal desempeño, o sorteo entre los peores.

## Cuentas (simulación propia, semilla 4)

- Tasa real por faena λ ~ Gamma(forma 8, escala 1,25) (media 10, varianza 12,5); accidentes ~ Poisson(λ) en dos años independientes; K = 2.000.
- Peor 10 % (200 faenas) en el año 1: media 19,4; año 2: 15,6 (−19,8 %).
- Bayes empírico por momentos: μ̂ = 10,0; τ̂² = Var(y₁) − μ̂; w = τ̂²/(τ̂² + μ̂) = 0,55; predicción media para las peores = 15,2.
- El diagrama de Galton usa datos ilustrativos con correlación 0,5.

## Fuentes

- Galton F (1886). "Regression towards mediocrity in hereditary stature". *Journal of the Anthropological Institute* 15:246–263.
- Barnett AG, van der Pols JC, Dobson AJ (2005). "Regression to the mean: what it is and how to deal with it". *International Journal of Epidemiology* 34(1):215–220.
- Hauer E (1997). *Observational Before-After Studies in Road Safety*. Pergamon.
- NCHRP 17-18(3), sección 6.3: ilustración de la regresión a la media en evaluaciones viales (TRB).
- Efron B, Morris C (1977). "Stein's paradox in statistics". *Scientific American* 236(5):119–127.
- Kahneman D (2011). *Thinking, Fast and Slow*, cap. 17 (regresión a la media).
