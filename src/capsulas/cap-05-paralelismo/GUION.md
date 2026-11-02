# Cápsula técnica · Entrenamiento distribuido y paralelismo 3D

Cápsula independiente, estilo **nube** bilingüe (pantalla en inglés).
Composiciones (mismas escenas y cues):
- `Cap05-Paralelismo` · voz en español (Kokoro `em_alex`) · subtítulos ES + EN · `guion.json`.
- `Cap05-Paralelismo-EN` · voz en inglés (Kokoro `am_michael`) · subtítulos EN + ES · `en/guion.json`.
Nota de voz (ES): Adam → `ádam`, ZeRO → `zíro`, FSDP → `ef es di pi`, all-reduce → `ol ridiús`, reduce-scatter → `ridiús escáter`, all-gather → `ol gáder`, Megatron → `mégatron`, pipeline → `páiplain`, checkpointing → `chékpointing`, JAX → `yax`, GKE → `yi kei i`, TPU v5p → `ti pi iú vi cinco pi`. (EN): siglas separadas por espacios (`G P U`, `F S D P`, `G K E`), ZeRO como `Zero`.

## Guion (resumen)

1. **gancho.** Un modelo de 7.500 millones de parámetros con Adam en precisión mixta necesita 120 GB (más que una GPU de 80 GB). Con ZeRO-3 en 64 GPUs: 1,9 GB por GPU (ejemplo de la figura 1 del artículo de ZeRO).
2. **memoria.** 16 bytes por parámetro: 2 (pesos FP16/BF16) + 2 (gradientes) + 12 (Adam: copia FP32, momento y varianza, 4 + 4 + 4). mem = (2 + 2 + K)·Ψ, K = 12. Sin contar activaciones.
3. **datos.** Paralelismo de datos: modelo completo en cada GPU, lote repartido. Gradientes promediados con all-reduce en anillo: cada GPU envía 2(N − 1)/N veces el tamaño del modelo (N = 8 → 1,75×), casi constante en N.
4. **zero.** Etapas: optimizador (ZeRO-1: (4 + K/N)Ψ), + gradientes (ZeRO-2: (2 + (2 + K)/N)Ψ), + pesos (ZeRO-3: (2 + 2 + K)Ψ/N). Con Ψ = 7,5 B y N = 64: 120 → 31,4 → 16,6 → 1,9 GB. FSDP de PyTorch implementa la misma idea.
5. **tensor.** Megatron-LM en el MLP: A partida por columnas, B por filas; Y = Σᵢ GeLU(X Aᵢ) Bᵢ, un all-reduce por bloque en el forward (otro en el backward). Comunica en cada capa: dentro de un servidor (NVLink).
6. **pipeline.** Capas en etapas; calendario tipo GPipe (todos los forward y luego todos los backward). Burbuja = (p − 1)/(m + p − 1): p = 4, m = 4 → 43 %; m = 32 → 8,6 %.
7. **tresd.** GPUs = t · p · d: tensores dentro del servidor, pipeline entre servidores, datos encima. Megatron-LM (PTD-P): 1 billón (10¹²) de parámetros en 3.072 GPUs, 502 petaFLOP/s, 52 % del pico teórico por GPU.
8. **checkpoint.** Gradient checkpointing: guardar activaciones solo en √n capas y recalcular el resto en el backward. Memoria O(√n) a cambio de un forward extra (forward + backward ≈ 3 forwards → ≈ +33 % de cómputo).
9. **nube.** TPU v5p: interconexión ICI en toro 3D, hasta 8.960 chips por pod; JAX reparte el mismo código con anotaciones de sharding (GSPMD); GKE orquesta entrenamiento multinodo con GPUs.
10. **bases.** 16 bytes por parámetro; all-reduce = reduce-scatter + all-gather; la burbuja del pipeline; la comunicación también es cómputo.

## Cuentas (verificadas en Python)

- 16 × 7,5 = 120 GB; (4 + 12/64) × 7,5 = 31,41; (2 + 14/64) × 7,5 = 16,64; 16 × 7,5/64 = 1,875 GB.
- Burbuja: 3/7 = 0,429; 3/11 = 0,273; 3/35 = 0,086.
- Anillo: 2(8 − 1)/8 = 1,75.
- √16 = 4 puntos de control para 16 capas.

## Fuentes

- Kingma DP, Ba J (2015). "Adam: A Method for Stochastic Optimization". *ICLR 2015*.
- Rajbhandari S, Rasley J, Ruwase O, He Y (2020). "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models". *SC20*. arXiv:1910.02054.
- Zhao Y et al. (2023). "PyTorch FSDP: Experiences on Scaling Fully Sharded Data Parallel". *PVLDB* 16(12).
- Patarasuk P, Yuan X (2009). "Bandwidth optimal all-reduce algorithms for clusters of workstations". *Journal of Parallel and Distributed Computing* 69(2).
- NVIDIA. NCCL (NVIDIA Collective Communications Library), documentación.
- Shoeybi M et al. (2019). "Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism". arXiv:1909.08053.
- Huang Y et al. (2019). "GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism". *NeurIPS 2019*.
- Narayanan D et al. (2021). "Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM". *SC21*. arXiv:2104.04473.
- Chen T, Xu B, Zhang C, Guestrin C (2016). "Training Deep Nets with Sublinear Memory Cost". arXiv:1604.06174.
- Xu Y et al. (2021). "GSPMD: General and Scalable Parallelization for ML Computation Graphs". arXiv:2105.04663.
- Google Cloud. "TPU v5p" (documentación de Cloud TPU, consultada en noviembre de 2026): toro 3D, 8.960 chips por pod.
