# Cápsula técnica · Fusión multimodal y embeddings propios

Cápsula independiente, estilo **nube** bilingüe (pantalla en inglés).
Composiciones (mismas escenas y cues):
- `Cap07-Multimodal` · voz en español (Kokoro `em_alex`) · subtítulos ES + EN · `guion.json`.
- `Cap07-Multimodal-EN` · voz en inglés (Kokoro `am_michael`) · subtítulos EN + ES · `en/guion.json`.
Nota de voz (ES): tokens → `tóukens`, Whisper → `uísper`, SigLIP → `síglip`, softmax → `sóftmax`, LLaVA → `lava`, Matryoshka → `matrioska`. (EN): LLaVA → `Lava`.

## Guion (resumen)

1. **gancho.** CLIP (2021): 76,2 % top-1 zero-shot en ImageNet, igual que un ResNet-50 entrenado con las 1,28 M imágenes etiquetadas (≈ 76 %), sin usar ninguna de esas etiquetas; aprendió de 400 M pares imagen–texto.
2. **tokens.** ViT: 224/16 × 224/16 = 196 parches. Whisper: 30 s → 3.000 cuadros mel (10 ms) → convolución con stride 2 → 1.500 tokens. EnCodec a 24 kHz: 75 cuadros/s × 8 libros de códigos × 10 bits (1.024 entradas) = 6 kbit/s.
3. **contraste.** Matriz N × N de similitudes coseno sᵢⱼ = cos(f(imgᵢ), g(txtⱼ)); la diagonal son los pares verdaderos. Valores ilustrativos.
4. **infonce.** Lᵢ = −log exp(sᵢᵢ/τ) / Σⱼ exp(sᵢⱼ/τ): una clasificación entre N textos; con previo uniforme, la softmax es la posterior P(texto | imagen). Con τ = 0,2, la fila del perro da 0,90 al texto correcto. Cota: I(X;Y) ≥ log N − L; con N = 32.768, a lo más 10,4 nats.
5. **siglip.** L = −Σᵢⱼ log σ(zᵢⱼ·(t·sᵢⱼ + b)), zᵢⱼ = ±1: cada par es un sí/no independiente, sin normalizar sobre el lote. N positivos frente a N² − N negativos; inicialización t = 10 (t' = log 10) y b = −10. Al inicio: σ(10·0,82 − 10) = 0,14 y σ(10·0,15 − 10) = 0,0002.
6. **fusion.** Fusión temprana (tokens de imagen y texto en un solo modelo), tardía (dos codificadores, CLIP) y atención cruzada (consultas de texto sobre rasgos de imagen). Flamingo: capas de atención cruzada con compuerta dentro de un LM congelado. LLaVA: una proyección lleva los rasgos visuales al espacio de tokens del LM.
7. **propios.** Ajuste contrastivo con negativos del lote y negativos difíciles (ejemplo bancario ilustrativo). Matryoshka: prefijos anidados del vector (128, 256, 512, 1.408). 1 M vectores float32: 1.408 dims → 5,6 GB; 128 dims → 0,51 GB (11×).
8. **nube.** Vertex AI multimodal embeddings: imagen y texto en el mismo espacio, 1.408 dimensiones por defecto (también 512, 256, 128). Vertex AI Vector Search para vecinos aproximados (ScaNN).
9. **bases.** Similitud coseno, softmax frente a sigmoide, temperatura, información mutua.

## Cuentas (verificadas en Python)

- (224/16)² = 196; 30 s × 100 cuadros/s / 2 = 1.500; 75 × 8 × 10 = 6.000 bit/s.
- softmax por fila con τ = 0,2: diagonal (0,901; 0,867; 0,794; 0,918).
- log 32.768 = 10,40 nats; log 4 = 1,39.
- σ(−1,8) = 0,142; σ(−8,5) = 0,0002.
- 10⁶ × 1.408 × 4 B = 5,63 GB; 10⁶ × 128 × 4 B = 0,51 GB.

## Fuentes

- Radford A et al. (2021). "Learning Transferable Visual Models From Natural Language Supervision" (CLIP). *ICML 2021*.
- Dosovitskiy A et al. (2021). "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale". *ICLR 2021*.
- Radford A et al. (2023). "Robust Speech Recognition via Large-Scale Weak Supervision" (Whisper). *ICML 2023*.
- Défossez A, Copet J, Synnaeve G, Adi Y (2023). "High Fidelity Neural Audio Compression" (EnCodec). *TMLR*.
- van den Oord A, Li Y, Vinyals O (2018). "Representation Learning with Contrastive Predictive Coding". arXiv:1807.03748.
- Zhai X, Mustafa B, Kolesnikov A, Beyer L (2023). "Sigmoid Loss for Language Image Pre-Training" (SigLIP). *ICCV 2023*.
- Alayrac J-B et al. (2022). "Flamingo: a Visual Language Model for Few-Shot Learning". *NeurIPS 2022*.
- Liu H, Li C, Wu Q, Lee YJ (2023). "Visual Instruction Tuning" (LLaVA). *NeurIPS 2023*.
- Kusupati A et al. (2022). "Matryoshka Representation Learning". *NeurIPS 2022*.
- Guo R et al. (2020). "Accelerating Large-Scale Inference with Anisotropic Vector Quantization" (ScaNN). *ICML 2020*.
- Google Cloud. "Get multimodal embeddings" (Vertex AI, consultada en noviembre de 2026).
