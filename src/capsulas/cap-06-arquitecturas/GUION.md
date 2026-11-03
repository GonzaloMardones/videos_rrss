# Cápsula técnica · Más allá del Transformer denso

Cápsula independiente, estilo **nube** bilingüe (pantalla en inglés).
Composiciones (mismas escenas y cues):
- `Cap06-Arquitecturas` · voz en español (Kokoro `em_alex`) · subtítulos ES + EN · `guion.json`.
- `Cap06-Arquitecturas-EN` · voz en inglés (Kokoro `am_michael`) · subtítulos EN + ES · `en/guion.json`.
Nota de voz (ES): tokens → `tóukens`, Transformer → `tránsformer`, softmax → `sóftmax`, Mixtral → `míxtral`, Jamba → `yamba`, GShard → `yi shárd`, caché KV → `caché ka ve`, Gemini → `yémini`. (EN): `K V cache`, `G Shard`, `T P Us`.

## Guion (resumen)

1. **gancho.** De 4.096 a 131.072 tokens: texto ×32, costo de la atención ×1.024 (32²).
2. **atencion.** softmax(QKᵀ/√d)V cuesta O(n²·d). Caché KV = 2 · L · h_kv · d_h · bytes · n. Mapa de atención ilustrativo con máscara causal.
3. **gqa.** Multi-head (8 cabezas KV), grouped-query (2) y multi-query (1) en el diagrama. Llama 2 70B (80 capas, 64 cabezas de consulta, 8 cabezas KV, d_h = 128, FP16): 2,5 MiB/token con 64 cabezas KV vs 0,3125 MiB con 8 grupos; 4.096 tokens → 10 GiB vs 1,25 GiB.
4. **moe.** Enrutador + 8 expertos, top-2. Mixtral 8×7B: 46,7 B parámetros totales, 12,9 B activos por token.
5. **router.** Modelo de mezcla y = Σ gᵢ(x)Eᵢ(x), g = softmax(Wx) (Jacobs et al., 1991): la salida es el promedio de los expertos ponderado por la probabilidad del experto dado el token. Logits de juguete (2,0; 1,2; 0,3; −0,5; 0,8; −1,0; 0,1; −0,2) → probabilidades 0,43; 0,19; …; top-2 renormalizado 0,69 / 0,31. Pérdida de balance de Switch: α·N·Σ fᵢ·Pᵢ.
6. **lineal.** (QKᵀ)V forma una matriz n×n: O(n²·d). Con un mapa de rasgos φ, φ(Q)(φ(K)ᵀV) forma una d×d: O(n·d²). Con n = 131.072 y d = 128, la razón es n/d = 1.024. La suma acumulada Σ φ(k)vᵀ la convierte en una RNN.
7. **ssm.** hₜ = A·hₜ₋₁ + B·xₜ, yₜ = C·hₜ. Entrena en paralelo como convolución y genera como recurrencia: O(n) de cómputo y memoria O(1) por paso.
8. **mamba.** Bₜ, Cₜ y Δₜ dependen de la entrada (selectividad). Ejemplo de palabras "recordadas" ilustrativo. Hasta 5× más rendimiento de inferencia que un Transformer (Gu y Dao). Híbridos: Jamba (Mamba + atención + MoE).
9. **nube.** Gemini 1.5 Pro es un Transformer de mezcla de expertos dispersa (informe técnico de Gemini 1.5). GShard: MoE de 600.000 millones de parámetros entrenado en 2.048 TPU v3.
10. **bases.** Atención O(n²·d), caché KV, softmax y modelos de mezcla, recurrencias lineales.

## Cuentas (verificadas en Python)

- 131.072² / 4.096² = 1.024; 131.072² ≈ 17,2 × 10⁹ puntajes.
- Caché KV por token: 2·80·64·128·2 B = 2,5 MiB; 2·80·8·128·2 B = 0,3125 MiB.
- softmax de los logits de juguete: (0,430; 0,193; 0,079; 0,035; 0,130; 0,021; 0,064; 0,048); top-2 → 0,690 y 0,310.
- 12,9 / 46,7 = 27,6 % de parámetros activos.

## Fuentes

- Vaswani A et al. (2017). "Attention Is All You Need". *NeurIPS 2017*.
- Shazeer N (2019). "Fast Transformer Decoding: One Write-Head is All You Need". arXiv:1911.02150.
- Ainslie J et al. (2023). "GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints". *EMNLP 2023*.
- Touvron H et al. (2023). "Llama 2: Open Foundation and Fine-Tuned Chat Models". arXiv:2307.09288.
- Jacobs RA, Jordan MI, Nowlan SJ, Hinton GE (1991). "Adaptive Mixtures of Local Experts". *Neural Computation* 3(1):79–87.
- Shazeer N et al. (2017). "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer". *ICLR 2017*.
- Fedus W, Zoph B, Shazeer N (2022). "Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity". *JMLR* 23.
- Jiang AQ et al. (2024). "Mixtral of Experts". arXiv:2401.04088.
- Katharopoulos A, Vyas A, Pappas N, Fleuret F (2020). "Transformers are RNNs: Fast Autoregressive Transformers with Linear Attention". *ICML 2020*.
- Gu A, Goel K, Ré C (2022). "Efficiently Modeling Long Sequences with Structured State Spaces". *ICLR 2022*.
- Gu A, Dao T (2024). "Mamba: Linear-Time Sequence Modeling with Selective State Spaces". *COLM 2024*. arXiv:2312.00752.
- Lieber O et al. (2024). "Jamba: A Hybrid Transformer-Mamba Language Model". arXiv:2403.19887.
- Gemini Team (2024). "Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context". arXiv:2403.05530.
- Lepikhin D et al. (2021). "GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding". *ICLR 2021*.
