# Cuasi-experimentos · 10 · El modelo de lenguaje como juez (banca: cumplimiento)

Composición: `Cuasi10-Juez` · 1080×1920 · 30 fps · ~1:43.
Nota de voz: Zheng como `Yeng`; Angelopoulos como `Angelópulos`.

## Guion (resumen)

1. **gancho.** Un modelo revisa 10.000 conversaciones: dice 84,6 % de cumplimiento; la cifra real es 80 %.
2. **juez.** Jueces fuertes coinciden con personas > 80 % de las veces (Zheng et al., 2023), pero con sesgos de posición, de largo y de autopreferencia.
3. **instrumento.** El juez es el instrumento de medición; cambiarlo a mitad de una prueba es la amenaza de instrumentación (cap. 3).
4. **ppi.** Inferencia potenciada por predicción: θ̂_PP = (1/N)Σ f(X̃ᵢ) − (1/n)Σ (f(Xⱼ) − Yⱼ), con n = 300 etiquetas humanas.
5. **numeros.** Juez solo 84,6 % (cobertura 0 %); personas solas 80 % ± 4,5; combinados 80 % ± 3,5. 300 etiquetas rinden como ~500.
6. **bayes.** Mismo principio del capítulo 1: pesar cada fuente según lo que sabe.

## Cuentas (simulación propia, semilla 10, 1.000 repeticiones)

- Cumplimiento real 80 %. Juez: P(dice «cumple» | cumple) = 0,97; P(dice «cumple» | no cumple) = 0,35 → media del juez 0,846.
- N = 10.000 sin etiqueta humana; n = 300 con etiqueta humana.
- Medias: juez 0,846; personas 0,800 (±0,045; cobertura 93,3 %); PPI 0,800 (±0,035; cobertura 95,5 %).
- Tamaño equivalente: (4,5/3,5)² × 300 ≈ 496.

## Fuentes

- Zheng L, Chiang W-L, Sheng Y et al. (2023). "Judging LLM-as-a-judge with MT-Bench and Chatbot Arena". *NeurIPS 2023 Datasets and Benchmarks*. arXiv:2306.05685.
- Angelopoulos AN, Bates S, Fannjiang C, Jordan MI, Zrnic T (2023). "Prediction-powered inference". *Science* 382(6671):669–674. arXiv:2301.09633. Código: github.com/aangelopoulos/ppi_py.
- Angelopoulos AN, Duchi JC, Zrnic T (2023). "PPI++: efficient prediction-powered inference". arXiv:2311.01453.
