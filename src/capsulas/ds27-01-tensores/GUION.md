# Data Scientist 2027 · Etapa 1 · Tensores y PyTorch por dentro

Serie **Data Scientist 2027** (12 etapas). Estilo **nube** (`src/estilos/nube`): fondo blanco, Google Sans y Google Sans Code (OFL-1.1), acentos azul, rojo, amarillo y verde, tarjetas con borde fino. Sin logotipos ni marcas.
Composición: `DS27-01-Tensores` · 1080×1920 · 30 fps · ~2:56.
Nota de voz: PyTorch como `páitorch`; strides como `stráids`; backward/forward como `bákuard`/`fóruard`; FP32, BF16, FP8 como `efe pe…`, `be efe…`; H100 como `hache cien`; TPU como `te pe u`.

## Guion (resumen)

1. **gancho.** 7.000 millones de parámetros: 28 GB en FP32, 14 en BF16, 7 en FP8.
2. **strides.** Un tensor es memoria plana + strides. Matriz 2×3 FP32: strides (12, 4) bytes. dir(i, j) = inicio + i·s₀ + j·s₁. Transponer intercambia los strides (O(1), sin copia) y deja el tensor no contiguo.
3. **autograd.** Grafo de operaciones recorrido al revés con la regla de la cadena. Modo inverso: el gradiente completo por O(1)·costo(f); modo directo: O(n)·costo(f). Función personalizada con `torch.autograd.Function` (ejemplo: GELU aproximada x·σ(1,702x), derivada σ + 1,702·x·σ(1 − σ)).
4. **memoria.** Pirámide: registros, memoria compartida, caché L2 (50 MB) y HBM (80 GB, 3,35 TB/s) en una H100 SXM; 989 TFLOPS BF16 densos.
5. **roofline.** Rendimiento = min(pico, ancho de banda × intensidad). Punto de quiebre 989/3,35 ≈ 295 FLOP/byte. Suma BF16: 1/6 FLOP/byte (limitada por memoria); matmul 4096×4096 en BF16: 2n³/(3n²·2 bytes) ≈ 1.365 FLOP/byte (limitada por cómputo).
6. **fusion.** Tres operaciones elemento a elemento: 6 viajes a HBM; fusionadas: 2 (3× menos tráfico). torch.compile; FlashAttention.
7. **precision.** FP32 (1·8·23), BF16 (1·8·7, mismo rango que FP32), FP16 (1·5·10, máx 65.504, requiere escalar la pérdida), FP8 E4M3 (máx 448, pesos y activaciones) y E5M2 (máx 57.344, gradientes).
8. **nube.** Cloud TPU: matmul en BF16 con acumulación FP32. VM A3 con H100: FP8.
9. **entrevista.** Tres preguntas típicas.

## Cuentas (verificadas en Python)

- 7·10⁹ × 4 B = 28 GB; × 2 = 14 GB; × 1 = 7 GB.
- strides de `np.arange(6, dtype=float32).reshape(2,3)` = (12, 4); de su transpuesta = (4, 12), `C_CONTIGUOUS = False`.
- E4M3: 2^(15−7)·1,75 = 448. E5M2: 2^(30−15)·1,75 = 57.344. FP16: 2^15·(1 + 1023/1024) = 65.504.
- BF16 = 16 bits altos de FP32: bf16(π) = 3,140625; máx ≈ 3,39·10³⁸.

## Fuentes

- Ficha técnica NVIDIA H100 Tensor Core GPU (SXM): 989 TFLOPS BF16 densos (1.979 con dispersión), HBM3 3,35 TB/s, 80 GB; L2 de 50 MB.
- Micikevicius P et al. (2022). "FP8 Formats for Deep Learning". arXiv:2209.05433.
- Wang S, Kanwar P (2019). "BFloat16: The secret to high performance on Cloud TPUs". Google Cloud Blog. Documentación de Cloud TPU: «Improve your model's performance with bfloat16».
- Williams S, Waterman A, Patterson D (2009). "Roofline: an insightful visual performance model for multicore architectures". *Communications of the ACM* 52(4):65–76.
- Griewank A, Walther A (2008). *Evaluating Derivatives*, 2.ª ed. SIAM (costo del modo inverso).
- Paszke A et al. (2019). "PyTorch: an imperative style, high-performance deep learning library". *NeurIPS*.
- Dao T, Fu DY, Ermon S, Rudra A, Ré C (2022). "FlashAttention: fast and memory-efficient exact attention with IO-awareness". *NeurIPS*.
- Hendrycks D, Gimpel K (2016). "Gaussian Error Linear Units (GELUs)". arXiv:1606.08415 (aproximación x·σ(1,702x)).
