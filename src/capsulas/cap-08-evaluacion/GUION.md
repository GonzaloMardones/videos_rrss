# Cápsula técnica · Evaluaciones y red teaming

Cápsula independiente, estilo **nube** bilingüe (pantalla en inglés).
Composiciones (mismas escenas y cues):
- `Cap08-Evaluacion` · voz en español (Kokoro `em_alex`) · subtítulos ES + EN · `guion.json`.
- `Cap08-Evaluacion-EN` · voz en inglés (Kokoro `am_michael`) · subtítulos EN + ES · `en/guion.json`.
Nota de voz (ES): red teaming → `red tíming`, jailbreaks → `yéilbreiks`, Model Armor → `model ármor`, Vertex AI → `vértex ei ai`.

## Guion (resumen)

1. **gancho.** Modelo actual 80 %, nuevo 82 % en 500 preguntas (no pareado): diferencia +2 puntos, IC 95 % ≈ −2,9 … +6,9. No se puede concluir.
2. **error.** SE = √(p(1 − p)/n); con p = 0,80: n = 100 → ±7,8; n = 500 → ±3,5; n = 2.000 → ±1,75 puntos (95 %). Comparación pareada: mismos ítems para ambos modelos; solo las diferencias por pregunta aportan ruido.
3. **contaminacion.** GSM1k (problemas nuevos al estilo GSM8K): caídas de hasta 8 puntos en algunos modelos (versión NeurIPS 2024; el preprint decía 13). Detección: solapamiento de 13-gramas (GPT-3) y Min-K% Prob (promedio del log-prob del k % de tokens menos probables).
4. **dinamicas.** Preguntas posteriores a la fecha de corte (LiveBench, LiveCodeBench). Desarrollo guiado por evaluaciones: escribir la evaluación antes del cambio, correrla en CI con barras de error y bloquear regresiones.
5. **juez.** Sesgos de posición, verbosidad y autopreferencia. Calibración: intercambiar el orden, rúbrica, acuerdo con humanos. κ = (p_o − p_e)/(1 − p_e); ejemplo (0,85 − 0,50)/(1 − 0,50) = 0,70. Un juez fuerte supera el 80 % de acuerdo con humanos, similar al acuerdo entre humanos (Zheng et al., 2023).
6. **ppi.** Inferencia potenciada por predicción: θ̂ = media del juez en N = 10.000 − media(juez − humano) en n = 300 = 0,82 − 0,06 = 0,76. IC 95 %: solo humanos ±4,8; juez + humanos ±3,6 (desacuerdo juez–humano 10 %, ilustrativo); equivale a ≈ 543 etiquetas humanas.
7. **redteam.** Jailbreak, inyección indirecta de instrucciones (documentos, correos, páginas), sufijos adversarios optimizados por gradiente (GCG) que se transfieren. Métrica: tasa de éxito del ataque (ASR).
8. **cero.** 0 éxitos en 100 ataques con previo Beta(1, 1): posterior Beta(1, 101); cuantil 95 % = 1 − 0,05^(1/101) = 2,9 %. Regla del tres: ≈ 3/n.
9. **nube.** Vertex AI Gen AI evaluation service (jueces basados en modelos, puntuales o por pares, y métricas calculadas). Model Armor revisa prompts y respuestas contra inyección de instrucciones y jailbreaks.
10. **bases.** Error estándar y pareo, contaminación, jueces calibrados, distribución Beta.

## Cuentas (verificadas en Python)

- √(0,8·0,2/500)·1,96 = 3,51; con n = 100: 7,84; con n = 2.000: 1,75.
- Diferencia no pareada 80 % vs 82 %, n = 500 cada uno: SE = 2,48 → ±4,86.
- PPI: SE_humanos = √(0,76·0,24/300) = 0,0247; SE_PPI = √(0,82·0,18/10.000 + (0,10 − 0,06²)/300) = 0,0183; (0,0247/0,0183)²·300 ≈ 543.
- 1 − 0,05^(1/101) = 0,0292; 3/100 = 0,03.

## Fuentes

- Miller E (2024). "Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations". arXiv:2411.00640.
- Brown T et al. (2020). "Language Models are Few-Shot Learners". *NeurIPS 2020* (análisis de contaminación con 13-gramas).
- Zhang H et al. (2024). "A Careful Examination of Large Language Model Performance on Grade School Arithmetic" (GSM1k). *NeurIPS 2024 Datasets and Benchmarks*.
- Shi W et al. (2024). "Detecting Pretraining Data from Large Language Models" (Min-K% Prob). *ICLR 2024*.
- White C et al. (2025). "LiveBench: A Challenging, Contamination-Free LLM Benchmark". *ICLR 2025*.
- Jain N et al. (2025). "LiveCodeBench: Holistic and Contamination Free Evaluation of Large Language Models for Code". *ICLR 2025*.
- Zheng L et al. (2023). "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena". *NeurIPS 2023*.
- Cohen J (1960). "A Coefficient of Agreement for Nominal Scales". *Educational and Psychological Measurement* 20(1).
- Angelopoulos AN, Bates S, Fannjiang C, Jordan MI, Zrnic T (2023). "Prediction-powered inference". *Science* 382(6671).
- Perez E et al. (2022). "Red Teaming Language Models with Language Models". *EMNLP 2022*.
- Greshake K et al. (2023). "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection". *AISec 2023*.
- Zou A, Wang Z, Kolter JZ, Fredrikson M (2023). "Universal and Transferable Adversarial Attacks on Aligned Language Models". arXiv:2307.15043.
- Hanley JA, Lippman-Hand A (1983). "If nothing goes wrong, is everything all right? Interpreting zero numerators". *JAMA* 249(13).
- Google Cloud. "Gen AI evaluation service overview" y "Model Armor overview" (consultadas en noviembre de 2026).
