# Cápsula técnica 03 · Causal AI Scientist

Serie **Cápsulas técnicas**. Composición: `Tec03-CausalAIScientist` · 1080×1920 · 30 fps · ~3:06.
Estilo vacío (negro, violeta y ámbar) con diagramas técnicos y fórmulas que se arman término por término.

Explica, de lo simple a lo complejo, el trabajo *Causal AI Scientist: Towards End-to-End Causal Inference with
Large Language Models* (CAIS), que se expone en el programa 2026 de causalscience.org. Recorrido: correlación y
confusor → contrafactual → experimento → métodos cuasi experimentales → por qué cuesta elegir → qué hace CAIS →
sus cuatro etapas → el árbol de decisión → las pruebas de supuestos → el balance (SMD) en detalle → un ejemplo →
resultados y límites.

Nota de voz: "Causal AI Scientist" se escribe `Cósal Ei Ai Sáientist` en el campo `dice` para que Kokoro lo diga en inglés.

## Guion (lo que dice la voz)

1. **gancho.** Las ventas subieron en diciembre. ¿Fue la campaña, o fue diciembre? Esa pregunta se llama causalidad. Y ahora, un agente de IA intenta responderla solo.
2. **titulo.** Cápsula técnica 03: Causal AI Scientist. Inferencia causal de punta a punta, con modelos de lenguaje.
3. **correlacion.** Empecemos simple. Correlación: dos cosas se mueven juntas. Causalidad: una mueve a la otra. En verano suben los helados, y también los ahogamientos. Los helados no ahogan a nadie. El calor mueve a los dos. Eso se llama un confusor.
4. **contrafactual.** La pregunta causal de verdad es: ¿qué habría pasado con la misma persona, sin el tratamiento? El efecto es la diferencia entre esos dos mundos: Y(1), con tratamiento, menos Y(0), sin él. El problema: de cada persona solo vemos un mundo. El otro hay que estimarlo.
5. **experimento.** La forma más limpia es un experimento: sorteas quién recibe el tratamiento. Con el azar, los dos grupos se parecen en todo lo demás. Y basta restar los promedios.
6. **metodos.** Pero casi nunca puedes sortear. Y la econometría tiene trucos. Si hay un antes y un después: diferencias en diferencias. Si hay un umbral: regresión discontinua. Si algo empuja el tratamiento sin tocar el resultado: variable instrumental. Y si mides los confusores, emparejas casos parecidos.
7. **problema.** Elegir bien exige años de formación. Si se lo preguntas directo a un modelo de lenguaje, puede elegir mal, o escribir código que falla.
8. **cais.** Ahí entra Causal AI Scientist. Le das una pregunta en lenguaje natural, los datos, y su descripción. Y responde con un efecto, su incertidumbre, y una explicación en palabras simples.
9. **etapas.** Funciona en 4 etapas. 1: el modelo lee la pregunta y los datos, y separa tratamiento, resultado y covariables. 2: un árbol de decisión elige el método. 3: valida los supuestos. 4: ejecuta código ya probado, y explica el resultado.
10. **arbol.** La clave es el árbol. ¿Hubo sorteo? Diferencia de medias, o regresión si hay covariables. Si no hubo sorteo: ¿hay un antes y un después? DiD. ¿Hay un umbral? RDD. ¿Hay un instrumento? Variable instrumental. Si no, emparejamiento por propensión. No elige a ciegas: sigue reglas que puedes auditar.
11. **validacion.** Y antes de responder, prueba sus supuestos. En DiD, que las tendencias sean paralelas antes del tratamiento. En IV, que el instrumento sea fuerte: un estadístico F mayor que 10. En RDD, que nadie haga trampa justo en el umbral. Si una prueba falla, descarta el método, y vuelve al árbol.
12. **balance.** Veamos una en detalle: el balance. Para cada covariable, restas el promedio de tratados menos el de controles. Y divides por la desviación estándar combinada, para que no importen las unidades. Si queda bajo 0,1, los grupos se parecen. Si no, la comparación está sesgada.
13. **ejemplo.** Un ejemplo del propio proyecto: ¿un programa de capacitación sube los ingresos? Datos observacionales, tratamiento sí o no, covariables como edad y estudios. El árbol propone emparejar. Revisa el balance, estima el efecto con su intervalo, y dice qué supuestos lo sostienen.
14. **limites.** Lo probaron con estudios reales, sintéticos y de libros, y reporta menos errores que dejar al modelo elegir solo. Pero ojo: hay supuestos que ningún dato prueba, como que no haya confusores ocultos. Esos siguen siendo tuyos.
15. **cierre.** La idea de fondo: que la IA no adivine la causalidad, sino que siga el método. Pregunta, supuestos, prueba, y recién ahí, respuesta. Compártelo y sígueme para la próxima cápsula.

## Fuentes y qué se verificó

- **Repositorio oficial** github.com/causalNLP/causal-agent (licencia MIT), leído en el commit `e732e3a`:
  - autores: Vishal Verma, Sawal Acharya, Devansh Bhardwaj, Samuel Simko, Yongjin Yang, Anahita Haghighat,
    Dominik Janzing, Mrinmaya Sachan, Bernhard Schölkopf y Zhijing Jin;
  - las cuatro etapas (preprocesar y descomponer la pregunta, elegir método con un árbol de reglas, validar
    supuestos y volver al árbol si una prueba falla, ejecutar plantillas de código e interpretar con un LLM);
  - el ejemplo "¿un programa de capacitación sube los ingresos?" está en el README;
  - `cais/components/decision_tree.py`: ramas por experimento aleatorio (diferencia de medias, OLS con
    covariables, IV de estímulo), estructura temporal (DiD), variable de corte (RDD), instrumento (IV),
    covariables (emparejamiento o ponderación por propensión), criterio de puerta delantera y OLS de respaldo;
  - `cais/components/assumption_checks.py`: estadístico F de la primera etapa (regla F > 10), tendencias
    paralelas en DiD, prueba de densidad de McCrary en RDD y balance de covariables con la diferencia de medias
    estandarizada SMD = |x̄_T − x̄_C| / √((s_T² + s_C²) / 2).
- **Simplificación del árbol en pantalla:** el código no recorre las preguntas en un orden fijo; arma una lista de
  candidatos y elige el de mayor prioridad (por ejemplo, IV antes que emparejamiento). El video lo muestra como
  una secuencia de preguntas para que se entienda.
- **Resultados:** la versión del taller CauScien (NeurIPS 2025) y la de ICML 2026 reportan que el árbol con
  validación comete menos errores que dejar al modelo elegir el método directamente, evaluado en CauSciBench
  (estudios reales, datos sintéticos y ejemplos de libros de texto). Las páginas de OpenReview, ICML y del
  programa no se pudieron abrir desde este entorno, así que el video no cita cifras del benchmark.
- **Ilustrativo, no del paper:** las ventas mensuales del gancho, las series de helados y ahogamientos, la
  asignación del sorteo, los errores del modelo "solo", la barra de F, el histograma de RDD y los valores de
  balance (edad 42 vs 38 con s = 10 y 12 → SMD 0,36; tras emparejar 41 vs 40,5 → 0,05).
