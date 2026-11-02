# Data Scientist 2027 · Etapa 2 · Curación de datos y pipelines sintéticos

Serie **Data Scientist 2027**, estilo **nube** bilingüe (pantalla en inglés).
Composiciones (mismas escenas y cues):
- `DS27-02-Datos` · voz en español (Kokoro `em_alex`) · subtítulos ES + EN · ~2:43 · `guion.json`.
- `DS27-02-Datos-EN` · voz en inglés (Kokoro `am_michael`) · subtítulos EN + ES · ~2:55 · `en/guion.json`.
Nota de voz (ES): C4 → `si for`, Jaccard → `yacárd`, MinHash → `min jash`, LSH → `el es eich`, tokens → `tóukens`, Evol-Instruct → `évol instráct`, Bayes → `beis`, Dataflow → `déitaflou`, BigQuery → `big cuíri`, Vertex AI → `vértex ei ai`. (EN): Jaccard → `Jack-card`.

## Guion (resumen)

1. **gancho.** En C4 una frase de 61 palabras aparecía más de 60.000 veces; tras deduplicar, los modelos emiten texto memorizado 10× menos.
2. **jaccard.** Shingles de 3 palabras; J(A,B) = |A∩B|/|A∪B| = 8/11 ≈ 0,73 en el ejemplo.
3. **minhash.** 10⁹ documentos → 5·10¹⁷ pares (O(n²)). P[min h(A) = min h(B)] = J(A,B). Con 128 hashes, error estándar √(J(1−J)/k) ≈ 0,035 con J = 0,8.
4. **lsh.** 20 bandas × 5 filas: P(s) = 1 − (1 − s⁵)²⁰; s = 0,8 → 99,96 %; s = 0,3 → 4,75 %; umbral ≈ (1/b)^(1/r) ≈ 0,55; costo ≈ O(n).
5. **escala.** Chinchilla: D ≈ 20·N; Chinchilla 70B con 1,4T tokens vs Gopher 280B con 300B, mismo cómputo. La mezcla de dominios es un hiperparámetro (pesos ilustrativos).
6. **sintetico.** Evol-Instruct: evolución en profundidad (restricciones, razonamiento) y en amplitud (temas nuevos). Ejemplos ilustrativos.
7. **verificador.** Bayes: P(correcta | pasa) = 0,9·0,6 / (0,9·0,6 + 0,2·0,4) = 0,87 (números ilustrativos).
8. **colapso.** Entrenar recursivamente con datos propios hace desaparecer las colas. Simulación: normal reajustada con 20 muestras por generación: σ mediana 1 → 0,26 en 50 generaciones → 0,07 en 100.
9. **nube.** Dataflow (pipeline), BigQuery (firmas y duplicados), Vertex AI (generar y verificar).
10. **bases.** MinHash → comparar firmas; LSH → evitar O(n²); lo sintético necesita verificador y datos reales.

## Cuentas (verificadas en Python)

- Jaccard del ejemplo: 8 shingles en común / 11 distintos = 0,727.
- n(n−1)/2 con n = 10⁹ = 5,0·10¹⁷.
- LSH b = 20, r = 5: s = 0,3 → 0,0475; 0,5 → 0,470; 0,8 → 0,9996.
- Colapso: 4.000 cadenas, n = 20, mediana de σ: gen 10 = 0,76; 25 = 0,50; 50 = 0,26; 100 = 0,07.

## Fuentes

- Lee K, Ippolito D, Nystrom A, Zhang C, Eck D, Callison-Burch C, Carlini N (2022). "Deduplicating Training Data Makes Language Models Better". *ACL 2022*:8424–8445.
- Broder AZ (1997). "On the resemblance and containment of documents". *Compression and Complexity of Sequences*.
- Leskovec J, Rajaraman A, Ullman JD. *Mining of Massive Datasets*, cap. 3 (MinHash y LSH por bandas).
- Hoffmann J et al. (2022). "Training Compute-Optimal Large Language Models". *NeurIPS*. Réplica: Besiroglu et al. (2024), Epoch AI.
- Xu C et al. (2024). "WizardLM: Empowering Large Language Models to Follow Complex Instructions". *ICLR 2024*. arXiv:2304.12244.
- Shumailov I, Shumaylov Z, Zhao Y, Papernot N, Anderson R, Gal Y (2024). "AI models collapse when trained on recursively generated data". *Nature* 631:755–759.
