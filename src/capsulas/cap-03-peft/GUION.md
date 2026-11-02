# Cápsula técnica · PEFT y fusión de modelos

Cápsula independiente, estilo **nube** bilingüe (pantalla en inglés).
Composiciones (mismas escenas y cues):
- `Cap03-PEFT` · voz en español (Kokoro `em_alex`) · subtítulos ES + EN · ~2:27 · `guion.json`.
- `Cap03-PEFT-EN` · voz en inglés (Kokoro `am_michael`) · subtítulos EN + ES · ~2:46 · `en/guion.json`.
Nota de voz (ES): QLoRA → `kiú lora`, SLERP → `eslerp`, TIES → `tais`, GPT-3 → `ye pe te tres`, Gemma → `yema`, L4 → `el for`. (EN): LoRA/QLoRA/DoRA se escriben `Lora`, `Q Lora`, `Dora` para que no se deletreen.

## Guion (resumen)

1. **gancho.** Ajustar un modelo de 65B en 16 bits: > 780 GB de memoria de GPU; con QLoRA, < 48 GB (una GPU).
2. **lora.** W = W₀ + BA, con B (d×r) y A (r×k): se entrenan r(d + k) parámetros en vez de d·k. Capa 4096×4096, r = 8: 65.536 vs 16,8 M (0,39 %).
3. **rango.** La actualización concentra su energía en pocas direcciones (simulación: rango 4 + ruido, 99,4 % en las 4 primeras). En GPT-3, LoRA: 10.000× menos parámetros entrenables y 3× menos memoria; BA se suma a W₀ al final (sin latencia extra).
4. **qlora.** Base congelada en 4 bits NormalFloat (NF4) + adaptadores LoRA; doble cuantización (≈ 0,37 bits/parámetro) y optimizadores paginados. 7B con Adam ≈ 16 B/parámetro = 112 GB; base en 4 bits ≈ 3,5 GB.
5. **dora.** W = m · (W₀ + BA)/‖W₀ + BA‖: magnitud entrenada directamente y LoRA solo sobre la dirección.
6. **vectores.** τ = θ_ajustado − θ_base; θ_fusionado = θ_base + λ·Σ τᵢ.
7. **slerp.** El punto medio lineal entre dos vectores unitarios perpendiculares mide 0,71; SLERP sigue el arco y conserva el largo: slerp(t) = sin((1−t)Ω)/sin Ω · θ₁ + sin(tΩ)/sin Ω · θ₂.
8. **ties.** Recortar (top 20 %), elegir signo, promediar solo los que coinciden. Ejemplo: +0,5, +0,3, −0,6 → promedio 0,07; TIES 0,40.
9. **nube.** Vertex AI (ajuste supervisado, Gemma con LoRA); una GPU NVIDIA L4 de 24 GB alcanza para QLoRA sobre un modelo de 7B.

## Cuentas (verificadas en Python)

- r(d + k) = 8·8192 = 65.536; d·k = 16.777.216; razón 0,39 %.
- ‖(e₁ + e₂)/2‖ = 0,7071.
- mean(0,5; 0,3; −0,6) = 0,0667; media de los positivos = 0,40.
- Espectro: ΔW 256×256 = U(256×4)·V(4×256) + 0,15·ruido; energía en los 4 primeros valores singulares = 99,4 % (ilustrativo).

## Fuentes

- Hu EJ et al. (2022). "LoRA: Low-Rank Adaptation of Large Language Models". *ICLR 2022*. arXiv:2106.09685.
- Dettmers T, Pagnoni A, Holtzman A, Zettlemoyer L (2023). "QLoRA: Efficient Finetuning of Quantized LLMs". *NeurIPS 2023*. arXiv:2305.14314.
- Liu S-Y et al. (2024). "DoRA: Weight-Decomposed Low-Rank Adaptation". *ICML 2024*.
- Aghajanyan A, Gupta S, Zettlemoyer L (2021). "Intrinsic Dimensionality Explains the Effectiveness of Language Model Fine-Tuning". *ACL 2021*.
- Ilharco G et al. (2023). "Editing Models with Task Arithmetic". *ICLR 2023*.
- Yadav P, Tam D, Choshen L, Raffel C, Bansal M (2023). "TIES-Merging: Resolving Interference When Merging Models". *NeurIPS 2023*.
- Shoemake K (1985). "Animating rotation with quaternion curves". *SIGGRAPH* (SLERP).
- Rajbhandari S et al. (2020). "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models". *SC20* (≈ 16 bytes por parámetro con Adam en precisión mixta).
