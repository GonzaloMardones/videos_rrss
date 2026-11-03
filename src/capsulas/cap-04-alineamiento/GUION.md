# Cápsula técnica · Alineamiento y optimización por preferencias

Cápsula independiente, estilo **nube** bilingüe (pantalla en inglés).
Composiciones (mismas escenas y cues):
- `Cap04-Alineamiento` · voz en español (Kokoro `em_alex`) · subtítulos ES + EN · `guion.json`.
- `Cap04-Alineamiento-EN` · voz en inglés (Kokoro `am_michael`) · subtítulos EN + ES · `en/guion.json`.
Nota de voz (ES): RLHF → `ar el eich ef`, PPO → `pi pi ou`, DPO → `di pi ou`, KTO → `kei ti ou`, KL → `ka ele`, Bradley-Terry → `brádli téri`, rejection sampling → `rillékshon sámpling`, reward hacking → `riuórd jáking`, Goodhart → `gudjart`, Bayes → `beis`, Gemini → `yémini`. (EN): siglas separadas por espacios (`R L H F`, `D P O`, `K L`) y ORPO como `Orpo`.

## Guion (resumen)

1. **gancho.** En las evaluaciones humanas de InstructGPT, las respuestas del modelo de 1.300 millones de parámetros se prefirieron a las de GPT-3 de 175.000 millones (100× menos parámetros).
2. **rlhf.** Tres pasos: SFT, modelo de recompensa entrenado con comparaciones, RL con PPO. Objetivo: max 𝔼[r(x,y)] − β·KL(π_θ ‖ π_ref).
3. **bradley.** P(A ≻ B) = σ(r_A − r_B), σ(z) = 1/(1 + e^−z). Una diferencia de 1 punto → 73 %.
4. **bayes.** La solución del objetivo con penalización KL es π*(y|x) = π_ref(y|x)·exp(r(x,y)/β)/Z(x): previo × verosimilitud = posterior. β grande → cerca del previo; β chico → manda la recompensa. Ejemplo de juguete: previo (0,5; 0,3; 0,2), recompensas (0; 1; 2).
5. **dpo.** Recompensa implícita r̂ = β·log π_θ(y|x)/π_ref(y|x) (el término β·log Z(x) se cancela en la diferencia). Pérdida L = −log σ(r̂_w − r̂_l): una clasificación logística sobre pares, sin modelo de recompensa ni RL. En el paso 0 (π_θ = π_ref) vale ln 2 ≈ 0,693.
6. **kto.** Datos sin pares (👍/👎). Inspirado en la teoría prospectiva: las pérdidas pesan más que las ganancias. Curva de valor de Tversky y Kahneman (1992): v(z) = z^0,88 para ganancias y −2,25·(−z)^0,88 para pérdidas (la función de KTO usa una forma sigmoide con pesos λ_D y λ_U; la curva es la clásica, para la intuición).
7. **orpo.** odds(y) = P/(1 − P); L = L_SFT − λ·log σ(log odds(y_w)/odds(y_l)). Sin modelo de referencia y en una sola etapa. Copias de modelo en memoria: PPO 4 (política, referencia, recompensa, valor), DPO 2, ORPO 1.
8. **rechazo.** Best-of-n / rejection sampling: generar n respuestas y quedarse con la de mayor puntaje. KL respecto del modelo base = log n − (n−1)/n; n = 16 → 1,84 nats.
9. **hacking.** Ley de Goodhart (formulación de Strathern, 1997). La recompensa aproximada (proxy) sigue subiendo y la real alcanza un máximo y cae. Curva ilustrativa con la forma de Gao et al. para RL: R(d) = d(α − β log d), d = √KL; aquí α = 1, β = 0,35 → máximo en d = e^(α/β − 1) ≈ 6,4. Mitigaciones: penalización KL, ensambles de modelos de recompensa, detención temprana.
10. **nube.** Vertex AI: preference tuning para modelos Gemini, con una respuesta preferida y una rechazada por prompt; se recomienda hacer primero SFT con las respuestas preferidas y continuar desde ese checkpoint.
11. **bases.** Sigmoide, divergencia KL, regla de Bayes, máxima verosimilitud.

## Cuentas (verificadas en Python)

- σ(0,5) = 0,622; σ(1) = 0,731; σ(2) = 0,881.
- Posterior π_ref·exp(r/β) normalizado: β = 4 → (0,411; 0,317; 0,272); β = 1 → (0,179; 0,292; 0,529); β = 0,5 → (0,037; 0,163; 0,801).
- DPO: margen 0 → −log σ(0) = ln 2 = 0,693; β = 0,1, log-razones +2 y −1 → margen 0,3 → −log σ(0,3) = 0,554.
- KL best-of-n: n = 4 → 0,636; 16 → 1,835; 64 → 3,175; 256 → 4,549 nats.
- Odds: P = 0,2 → 0,25; P = 0,05 → 0,0526; log de la razón = 1,56.
- Puntajes de los 16 candidatos: pseudoaleatorios (función seno), ilustrativos.

## Fuentes

- Bradley RA, Terry ME (1952). "Rank Analysis of Incomplete Block Designs: I. The Method of Paired Comparisons". *Biometrika* 39(3/4):324–345.
- Christiano PF et al. (2017). "Deep Reinforcement Learning from Human Preferences". *NeurIPS 2017*.
- Schulman J et al. (2017). "Proximal Policy Optimization Algorithms". arXiv:1707.06347.
- Stiennon N et al. (2020). "Learning to summarize from human feedback". *NeurIPS 2020* (best-of-n y su KL).
- Ouyang L et al. (2022). "Training language models to follow instructions with human feedback". *NeurIPS 2022*. arXiv:2203.02155.
- Korbak T, Perez E, Buckley CL (2022). "RL with KL penalties is better viewed as Bayesian inference". *Findings of EMNLP 2022*.
- Rafailov R, Sharma A, Mitchell E, Ermon S, Manning CD, Finn C (2023). "Direct Preference Optimization: Your Language Model is Secretly a Reward Model". *NeurIPS 2023*. arXiv:2305.18290.
- Ethayarajh K, Xu W, Muennighoff N, Jurafsky D, Kiela D (2024). "KTO: Model Alignment as Prospect Theoretic Optimization". *ICML 2024*. arXiv:2402.01306.
- Tversky A, Kahneman D (1992). "Advances in prospect theory: Cumulative representation of uncertainty". *Journal of Risk and Uncertainty* 5:297–323.
- Hong J, Lee N, Thorne J (2024). "ORPO: Monolithic Preference Optimization without Reference Model". *EMNLP 2024*. arXiv:2403.07691.
- Touvron H et al. (2023). "Llama 2: Open Foundation and Fine-Tuned Chat Models". arXiv:2307.09288 (rejection-sampling fine-tuning).
- Gao L, Schulman J, Hilton J (2023). "Scaling Laws for Reward Model Overoptimization". *ICML 2023*, PMLR 202. arXiv:2210.10760.
- Coste T, Anwar U, Kirk R, Krueger D (2024). "Reward Model Ensembles Help Mitigate Overoptimization". *ICLR 2024*.
- Goodhart CAE (1975). "Problems of Monetary Management: The U.K. Experience"; Strathern M (1997). "'Improving ratings': audit in the British University system". *European Review* 5(3).
- Google Cloud. "About preference tuning for Gemini models" y "Tune Gemini models by using preference tuning". Documentación de Vertex AI (consultada en noviembre de 2026).
