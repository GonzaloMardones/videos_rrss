# Cápsula técnica · MLOps y seguimiento de experimentos

Cápsula independiente, estilo **nube** bilingüe (pantalla en inglés).
Composiciones (mismas escenas y cues):
- `Cap10-MLOps` · voz en español (Kokoro `em_alex`) · subtítulos ES + EN · `guion.json`.
- `Cap10-MLOps-EN` · voz en inglés (Kokoro `am_michael`) · subtítulos EN + ES · `en/guion.json`.
Nota de voz (ES): MLOps → `em el ops`, Hyperband → `jáiperband`, hash → `jash`, pipeline → `páiplain`, Vizier → `vízier`.

## Guion (resumen)

1. **gancho.** Misma configuración, dos corridas, dos resultados (0,861 y 0,834, ilustrativos). En un sistema real de ML, el código del modelo es la caja más pequeña (esquema inspirado en Sculley et al., 2015).
2. **run.** Un experimento reproducible registra código (commit), datos (hash), configuración, semilla y entorno; salidas: métricas, curvas y artefactos. resultado = f(código, datos, config, semilla, entorno).
3. **semillas.** Al ajustar modelos de lenguaje en tareas pequeñas, solo cambiar la semilla puede mover mucho el resultado (Dodge et al., 2020). Se reporta media ± desviación sobre varias semillas, no la mejor corrida. Doce puntos ilustrativos (pseudoaleatorios).
4. **busqueda.** Grilla de 9 pruebas en 2D → 3 valores distintos del parámetro importante; 9 pruebas al azar → 9 valores. P(caer en el 5 % mejor) = 1 − 0,95ⁿ; n = 60 → 0,954 (Bergstra y Bengio, 2012).
5. **bayes.** Proceso gaussiano (kernel RBF, ℓ = 0,22, σ_f = 0,8) sobre una función de juguete f(x) = 0,6 sin 3x + 0,4 cos 7x + 0,5x en [0; 1,6], con 4 observaciones (x = 0,15; 0,6; 1,05; 1,45; mejor observado 0,713). UCB = μ + 2σ elige x = 0,84, donde f = 1,137, el máximo real de la grilla.
6. **hyperband.** Successive halving: 81 configuraciones × 1 época → 27 × 3 → 9 × 9 → 3 × 27 → 1 × 81; cada ronda cuesta 81 épocas (405 en total) frente a 81 × 81 = 6.561 entrenando todo completo.
7. **datos.** Versionar datos por hash del contenido (hashes ilustrativos). Sesgo entrenamiento–producción: la misma variable transformada de dos formas (ej.: log1p en entrenamiento, valor crudo en producción); solución: una transformación compartida.
8. **niveles.** Niveles de madurez MLOps de Google Cloud: 0 manual; 1 automatización del pipeline con entrenamiento continuo; 2 CI/CD del propio pipeline.
9. **nube.** Vertex AI Experiments (corridas, parámetros y métricas, con TensorBoard), Vertex AI Vizier (optimización de caja negra y bayesiana), Vertex AI Pipelines y Model Registry.
10. **bases.** Reproducibilidad, varianza entre semillas, probabilidad en búsqueda aleatoria 1 − (1 − q)ⁿ, procesos gaussianos.

## Cuentas (verificadas en Python)

- 1 − 0,95⁶⁰ = 0,954; 1 − 0,95²⁰ = 0,642.
- GP: posterior en 81 puntos, UCB máximo 1,70 en x = 0,84; f(0,84) = 1,137 (máximo de f en la grilla).
- Hyperband: 5 rondas × 81 = 405 épocas.

## Fuentes

- Sculley D et al. (2015). "Hidden Technical Debt in Machine Learning Systems". *NeurIPS 2015*.
- Dodge J et al. (2020). "Fine-Tuning Pretrained Language Models: Weight Initializations, Data Orders, and Early Stopping". arXiv:2002.06305.
- Bergstra J, Bengio Y (2012). "Random Search for Hyper-Parameter Optimization". *JMLR* 13.
- Snoek J, Larochelle H, Adams RP (2012). "Practical Bayesian Optimization of Machine Learning Algorithms". *NeurIPS 2012*.
- Srinivas N, Krause A, Kakade S, Seeger M (2010). "Gaussian Process Optimization in the Bandit Setting: No Regret and Experimental Design" (GP-UCB). *ICML 2010*.
- Rasmussen CE, Williams CKI (2006). *Gaussian Processes for Machine Learning*. MIT Press.
- Jamieson K, Talwalkar A (2016). "Non-stochastic Best Arm Identification and Hyperparameter Optimization" (successive halving). *AISTATS 2016*.
- Li L et al. (2018). "Hyperband: A Novel Bandit-Based Approach to Hyperparameter Optimization". *JMLR* 18.
- Breck E et al. (2017). "The ML Test Score: A Rubric for ML Production Readiness and Technical Debt Reduction". *IEEE Big Data 2017*.
- Golovin D et al. (2017). "Google Vizier: A Service for Black-Box Optimization". *KDD 2017*.
- Google Cloud Architecture Center. "MLOps: Continuous delivery and automation pipelines in machine learning".
- Google Cloud. Documentación de Vertex AI Experiments, Vertex AI Vizier, Vertex AI Pipelines y Model Registry (consultada en noviembre de 2026).
