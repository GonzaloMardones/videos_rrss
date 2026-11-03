# Cápsula técnica · Física de la inferencia y cuantización

Cápsula independiente, estilo **nube** bilingüe (pantalla en inglés).
Composiciones (mismas escenas y cues):
- `Cap09-Inferencia` · voz en español (Kokoro `em_alex`) · subtítulos ES + EN · `guion.json`.
- `Cap09-Inferencia-EN` · voz en inglés (Kokoro `am_michael`) · subtítulos EN + ES · `en/guion.json`.
Nota de voz (ES): H100 → `eich uan jándred`, GPTQ → `yi pi ti kiú`, AWQ → `a dabliu kiú`, RoPE → `rope`, JetStream → `yétstrim`, vLLM → `vi el el em`, GKE → `yi kei i`.

## Guion (resumen)

1. **gancho.** 70 B parámetros × 2 bytes = 140 GB por token. H100 (3,35 TB/s): ≥ 41,8 ms por token con lote 1, techo ≈ 24 tokens/s.
2. **memoria.** Intensidad aritmética al decodificar: 2 FLOP·B / 2 bytes = B (lote). Punto de quiebre H100 ≈ 989/3,35 ≈ 295 FLOP/byte (cápsula 1). Caché KV: 32 usuarios × 4.096 tokens × 0,3125 MiB (70B con GQA) = 40 GiB.
3. **cuantizar.** q = round(x/s), s = max|x|/127, x̂ = s·q. Ejemplo: x = (0,12; −0,5; 0,03; 2,0; −0,9) → s = 0,0157, q = (8; −32; 2; 127; −57), x̂ = (0,126; −0,504; 0,031; 2,0; −0,898). Error de redondeo uniforme: Var ≈ Δ²/12. Techos para 70B en H100 con lote 1: FP16 140 GB (≤ 24 tok/s), INT8 70 GB (≤ 48), INT4 35 GB (≤ 96).
4. **outliers.** Canales atípicos de activación (LLM.int8) agrandan la escala. GPTQ: cuantiza peso a peso y corrige el resto con la inversa del Hessiano; 175 B en ≈ 4 horas-GPU a 3–4 bits. AWQ: protege ≈ 1 % de canales salientes (por magnitud de activación) escalándolos antes de cuantizar.
5. **especulativa.** Un modelo borrador propone γ tokens; el grande verifica en una pasada y acepta con prob. min(1, p/q); si rechaza, re-muestrea de norm(max(0, p − q)): la distribución de salida es exactamente la del modelo grande. 𝔼[tokens por pasada] = (1 − α^(γ+1))/(1 − α); α = 0,8, γ = 4 → 3,36.
6. **rope.** Rotación de cada par de dimensiones por m·θᵢ, θᵢ = 10000^(−2i/d); ⟨R_m q, R_n k⟩ depende solo de m − n. Interpolación de posiciones: m → m·2.048/32.768 (×16 de contexto) con poco ajuste; YaRN como variante.
7. **sumideros.** Los primeros tokens reciben atención alta en todas las consultas. StreamingLLM: 4 tokens sumidero + ventana reciente → hasta 4 M tokens estables; hasta 22,2× más rápido que ventana con recálculo. No agranda la ventana de contexto.
8. **nube.** JetStream (TPU): int8 en pesos, activaciones y caché KV, batching continuo. GKE + vLLM en GPU con modelos AWQ o GPTQ.
9. **bases.** Ancho de banda de memoria, error de cuantización Δ²/12, muestreo por rechazo, rotaciones.

## Cuentas (verificadas en Python)

- 140e9 / 3,35e12 = 41,8 ms → 23,9 tok/s; 70 GB → 20,9 ms (47,9 tok/s); 35 GB → 10,4 ms (95,7 tok/s).
- (1 − 0,8⁵)/(1 − 0,8) = 3,3616.
- 0,3125 MiB × 32 × 4.096 = 40 GiB.
- θᵢ con d = 8: 1; 0,1; 0,01; 0,001.

## Fuentes

- Williams S, Waterman A, Patterson D (2009). "Roofline: An Insightful Visual Performance Model for Multicore Architectures". *CACM* 52(4).
- Gray RM, Neuhoff DL (1998). "Quantization". *IEEE Transactions on Information Theory* 44(6).
- Dettmers T, Lewis M, Belkada Y, Zettlemoyer L (2022). "LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale". *NeurIPS 2022*.
- Frantar E, Ashkboos S, Hoefler T, Alistarh D (2023). "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers". *ICLR 2023*.
- Lin J et al. (2024). "AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration". *MLSys 2024*.
- Leviathan Y, Kalman M, Matias Y (2023). "Fast Inference from Transformers via Speculative Decoding". *ICML 2023*.
- Chen C et al. (2023). "Accelerating Large Language Model Decoding with Speculative Sampling". arXiv:2302.01318.
- Su J et al. (2024). "RoFormer: Enhanced Transformer with Rotary Position Embedding". *Neurocomputing* 568.
- Chen S, Wong S, Chen L, Tian Y (2023). "Extending Context Window of Large Language Models via Positional Interpolation". arXiv:2306.15595.
- Peng B, Quesnelle J, Fan H, Shippole E (2024). "YaRN: Efficient Context Window Extension of Large Language Models". *ICLR 2024*.
- Xiao G, Tian Y, Chen B, Han S, Lewis M (2024). "Efficient Streaming Language Models with Attention Sinks". *ICLR 2024*.
- Kwon W et al. (2023). "Efficient Memory Management for Large Language Model Serving with PagedAttention" (vLLM). *SOSP 2023*.
- Google Cloud blog (2024). "Accelerating AI inference with Google Cloud TPUs and GPUs" (JetStream); GKE docs: "Serve an LLM using TPUs on GKE with JetStream and PyTorch".
