# Cápsula técnica · Código abierto y un portafolio verificable

Cápsula independiente, estilo **nube** bilingüe (pantalla en inglés).
Composiciones (mismas escenas y cues):
- `Cap12-Portafolio` · voz en español (Kokoro `em_alex`) · subtítulos ES + EN · `guion.json`.
- `Cap12-Portafolio-EN` · voz en inglés (Kokoro `am_michael`) · subtítulos EN + ES · `en/guion.json`.
Nota de voz (ES): Hugging Face → `jáguin feis`, LoRA → `lora`, Bayes → `beis`, Cloud Run → `clau run`, Model Garden → `model garden`.

## Guion (resumen)

1. **gancho.** Una línea en el currículum («sé ajustar modelos») frente a un repositorio con pesos/adaptador, evaluación con barras de error, ficha técnica y código para reproducir.
2. **evidencia.** Regla de Bayes en forma de chances: chances posteriores = chances previas × razón de verosimilitud. Previa 10 % (1 : 9) × razón 9 → 1 : 1 = 50 % (números ilustrativos).
3. **finetune.** Adaptador LoRA de rango 16 en q y v de un modelo de 7 B (32 capas, d = 4.096): 32 × 2 × 16 × 8.192 = 8,4 M parámetros ≈ 17 MB en FP16, 0,12 % del modelo base (14 GB). Publicar en el Hub con licencia y modelo base declarado (código ilustrativo).
4. **ficha.** Model card: uso previsto, datos de entrenamiento, evaluación, limitaciones; métricas por grupo (ejemplo ilustrativo: general 0,91; consultas con errores de tipeo 0,74). Datasheets para datos.
5. **reproducir.** Implementar, correr 5 semillas, comparar con lo reportado (ilustrativo: 81,2 reportado vs 79,4 ± 1,1). Una diferencia también es un resultado: documentar qué detalle faltaba.
6. **desmontar.** Errores de etiqueta: al menos 3,3 % en promedio en 10 test sets populares; ≈ 6 % (2.916) en la validación de ImageNet. Con un 6 % más de ejemplos mal etiquetados, ResNet-18 supera a ResNet-50 en ImageNet corregido.
7. **estructura.** Problema, línea base, método, evaluación con barras de error, ficha técnica, demo y texto breve.
8. **nube.** Model Garden: «Deploy from Hugging Face» a un endpoint de Vertex AI en un clic. Cloud Run aloja la demo y escala a cero.
9. **bases.** Chances y razón de verosimilitud, tamaño de un adaptador, reproducir con barras de error, ruido en las etiquetas.

## Cuentas (verificadas en Python)

- 32 × 2 × 16 × (4.096 + 4.096) = 8.388.608 parámetros; × 2 bytes = 16,8 MB; 8,39 M / 7.000 M = 0,12 %.
- (0,1/0,9) × 9 = 1 → probabilidad 0,5.

## Fuentes

- Hu EJ et al. (2022). "LoRA: Low-Rank Adaptation of Large Language Models". *ICLR 2022*.
- Mitchell M et al. (2019). "Model Cards for Model Reporting". *FAT* 2019*.
- Gebru T et al. (2021). "Datasheets for Datasets". *Communications of the ACM* 64(12).
- Pineau J et al. (2021). "Improving Reproducibility in Machine Learning Research (A Report from the NeurIPS 2019 Reproducibility Program)". *JMLR* 22.
- Northcutt CG, Athalye A, Mueller J (2021). "Pervasive Label Errors in Test Sets Destabilize Machine Learning Benchmarks". *NeurIPS 2021 Datasets and Benchmarks*.
- Hugging Face. Documentación del Hub: repositorios de modelos y model cards.
- Hugging Face blog. "Making thousands of open LLMs bloom in the Vertex AI Model Garden".
- Google Cloud. Documentación de Vertex AI Model Garden y de Cloud Run.
