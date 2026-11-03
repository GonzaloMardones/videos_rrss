# Cápsula técnica · Servir modelos en producción y enrutar

Cápsula independiente, estilo **nube** bilingüe (pantalla en inglés).
Composiciones (mismas escenas y cues):
- `Cap11-Serving` · voz en español (Kokoro `em_alex`) · subtítulos ES + EN · `guion.json`.
- `Cap11-Serving-EN` · voz en inglés (Kokoro `am_michael`) · subtítulos EN + ES · `en/guion.json`.
Nota de voz (ES): PagedAttention → `pejed aténshon`, MLX → `em el ex`, Cloud Run → `clau run`, GKE → `yi kei i`, L4 → `el for`, LoRA → `lora`.

## Guion (resumen)

1. **gancho.** Los sistemas previos desperdiciaban 60–80 % de la memoria de caché KV; vLLM con PagedAttention, < 4 %, y 2–4× más rendimiento (Kwon et al., 2023).
2. **fases.** Prefill (todo el prompt a la vez, limitado por cómputo, fija el TTFT) y decode (token a token, limitado por memoria, fija el TPOT). latencia = TTFT + (N_out − 1)·TPOT; ej. ilustrativo 0,4 s + 199 × 30 ms = 6,4 s.
3. **paged.** Reservar el largo máximo (2.048) y usar 500 desperdicia 76 %. PagedAttention: bloques de 16 tokens asignados a demanda con tabla de bloques; prefijos compartidos (copy-on-write); caché de prefijos (RadixAttention en SGLang).
4. **batching.** Lote estático con largos 100, 400, 50 y 250: ocupación (100 + 400 + 50 + 250)/(4 × 400) = 50 %. Batching continuo (planificación por iteración, Orca): un pedido nuevo entra cuando otro termina.
5. **little.** L = λ·W: 50 pedidos/s × 4 s = 200 en curso. Percentiles: p50 = 2,5 s y p99 = 9 s en una distribución log-normal ilustrativa.
6. **ruteo.** Cascada: modelo pequeño (costo 1) y escalamiento al grande (costo 20) si no está seguro. 𝔼[costo] = c_s + p·c_b = 1 + 0,3 × 20 = 7 → −65 % frente a usar siempre el grande (costos ilustrativos). FrugalGPT, RouteLLM.
7. **semantico.** Embedding de la pregunta y la intención más cercana por similitud coseno (ejemplo bancario ilustrativo: «a charge I don't recognize» → agente de fraude). En el borde: modelos pequeños cuantizados en Apple silicon con MLX.
8. **nube.** Cloud Run con GPU NVIDIA L4 (escala a cero). GKE Inference Gateway: enruta según carga, uso de caché KV y adaptador LoRA activo.
9. **bases.** Memoria paginada, teoría de colas, percentiles, valor esperado.

## Cuentas (verificadas en Python)

- 1 − 500/2.048 = 0,756.
- 800/1.600 = 0,50.
- 50 × 4 = 200.
- 1 + 0,3 × 20 = 7; 1 − 7/20 = 0,65 (con p = 0,2 → 0,75; p = 0,5 → 0,45).

## Fuentes

- Kwon W et al. (2023). "Efficient Memory Management for Large Language Model Serving with PagedAttention". *SOSP 2023*.
- Yu G-I et al. (2022). "Orca: A Distributed Serving System for Transformer-Based Generative Models". *OSDI 2022*.
- Agrawal A et al. (2024). "Taming Throughput-Latency Tradeoff in LLM Inference with Sarathi-Serve". *OSDI 2024*.
- Zheng L et al. (2024). "SGLang: Efficient Execution of Structured Language Model Programs". *NeurIPS 2024*.
- Little JDC (1961). "A Proof for the Queuing Formula: L = λW". *Operations Research* 9(3).
- Dean J, Barroso LA (2013). "The Tail at Scale". *Communications of the ACM* 56(2).
- Chen L, Zaharia M, Zou J (2023). "FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance". arXiv:2305.05176.
- Ong I et al. (2025). "RouteLLM: Learning to Route LLMs with Preference Data". *ICLR 2025*.
- Apple. MLX (framework de arrays para Apple silicon), documentación.
- Google Cloud. "Cloud Run GPUs are now generally available" (blog) y "About GKE Inference Gateway" (documentación de GKE).
