# Cápsula técnica 01 · Anatomía de un proyecto de IA

Serie **Cápsulas técnicas** (para profesionales que trabajan en IA). Composición: `Tec01-AnatomiaIA` · 1080×1920 · 30 fps · ~2:18.

Qué debe contener un proyecto de IA en producción, por qué el RAG es la capa que más acelera, cómo se
compone y qué hay que saber para operarlo. Inspirada en la arquitectura de un asistente real, pero sin
nombres de producto, proveedores, URLs ni código: solo patrones y parámetros de referencia.

## Guion (lo que dice la voz)

1. **gancho.** Un proyecto de inteligencia artificial no es un prompt. Es un sistema. Estas son las 5 capas que debe tener, y por qué el RAG es la que más acelera.
2. **titulo.** Cápsula técnica: anatomía de un proyecto de IA.
3. **capas.** Capa 1, ingesta: convertir documentos y transcripciones en texto limpio. Capa 2, conocimiento. Aquí vive el RAG: tus documentos convertidos en vectores que el modelo puede consultar. Capa 3, orquestación: un agente con pasos definidos, no un prompt gigante. Capa 4, integraciones: herramientas externas y otros agentes, con autenticación seria. Capa 5, persistencia y resiliencia: metadatos, memoria por tema, y un plan B para cada llamada al modelo.
4. **porque.** ¿Por qué importa el RAG? Porque el modelo no conoce tus documentos. El problema: reentrenarlo es caro, lento, y queda obsoleto en semanas. Con RAG, subes un documento y en minutos ya responde con él. Y puede citar de dónde salió.
5. **como.** ¿Cómo se compone? Primero, partes el texto en trozos de unos 800 caracteres, con 150 de traslape para no cortar ideas a la mitad. Segundo, cada trozo pasa por un modelo de embeddings y se vuelve un vector de 768 números. Tercero, lo guardas en una base vectorial, junto a su metadata: documento, tipo y dueño.
6. **busqueda.** Cuando alguien pregunta, la pregunta también se vuelve vector. Comparas con similitud coseno, te quedas con los 3 más cercanos, y se los pasas al modelo como contexto. Detalle que importa: usa el modo correcto de embedding. Documentos, consultas y similitud no son intercambiables.
7. **agente.** Tu agente debe ser un grafo de estados con pocos nodos: reunir contexto, razonar, y guardar lo aprendido. Exige la salida en JSON con esquema, y valídala antes de que llegue al usuario. Y cada nodo tiene plan B: sin contexto si el RAG falla, llamada directa si el grafo falla. Nada bloquea al usuario.
8. **saber.** Ahora, tres cosas más que necesitas saber. El tamaño del trozo es un equilibrio entre precisión y contexto. Segunda: el umbral de similitud se afina con datos reales, y debe ser configuración, no código. Y la tercera: la búsqueda en memoria aguanta unos miles de vectores. Después, migra a una base vectorial.
9. **acelera.** ¿Qué acelera? Incorporar conocimiento nuevo pasa de semanas de reentrenamiento a minutos de ingesta. Y cada respuesta llega con sus fuentes: la revisión humana es más rápida y confiable.
10. **cierre.** Entonces: si tu proyecto no tiene estas 5 capas, todavía es una demo. Compártelo y sígueme para la siguiente cápsula.

## Mapa de la cápsula (y de dónde sale cada idea)

| Idea en el video | Patrón general detrás |
|---|---|
| 5 capas: ingesta, conocimiento, orquestación, integraciones, persistencia | Vertical slices: cada capacidad con su router / service / schema; el modelo es solo una capa |
| Chunks de 800 caracteres con 150 de traslape | `RecursiveCharacterTextSplitter` con separadores por párrafo, línea, oración y espacio |
| Vector de 768 números | Modelo de embeddings de texto de 768 dimensiones |
| Modos de embedding: documento, consulta, similitud | Task types `RETRIEVAL_DOCUMENT`, `RETRIEVAL_QUERY`, `SEMANTIC_SIMILARITY`: el mismo modelo, vectores distintos según la tarea |
| Similitud coseno, top-3 como contexto | Búsqueda coseno in-memory (numpy) filtrada por usuario/tipo/etiquetas, `top_k = 3` en el agente |
| Umbral 0,87 en configuración | `topic-similarity-threshold` en YAML, ajustable sin redeploy: agrupa o separa temas |
| En memoria hasta miles de vectores, luego base vectorial | ~900 chunks hoy en RAM; plan de migrar a una base vectorial dedicada cuando crezca |
| Grafo de 3 nodos: reunir contexto → razonar → guardar | Agente como grafo de estados; el primer nodo corre RAG y memoria por tema en paralelo |
| Salida JSON con esquema validado | Respuesta del LLM parseada a modelos Pydantic (tipo, confianza, SMART, hipótesis, evidencia) |
| Plan B en cada nodo | RAG falla → contexto vacío · grafo falla → llamada directa · detector de temas falla → hash determinístico |
| Integraciones con autenticación seria | Herramientas externas vía JSON-RPC/MCP con doble token; OAuth2 para calendario; IAP en prod y CLI en local |
| Persistencia y memoria por tema | Metadatos relacionales + vectores en documento + memoria de hipótesis/decisiones por tema |

## Lo que la cápsula no dice (y conviene saber si te preguntan)

- Llamar al endpoint de embeddings directo en vez de un wrapper evitó una llamada extra que fallaba con credenciales de usuario final.
- Todas las llamadas síncronas a servicios externos van envueltas en hilos para no bloquear el event loop.
- Los tokens de integraciones guardados en disco se pierden al reiniciar: en producción van a un gestor de secretos.
- El catch-all del frontend se monta al final; cualquier ruta registrada después queda inaccesible.

## Texto para la publicación

> Un proyecto de IA no es un prompt. Es un sistema. 🧩
>
> Cápsula técnica 01: las 5 capas que debe tener y por qué el RAG es la que más acelera.
> 1️⃣ Ingesta → texto limpio
> 2️⃣ Conocimiento → chunks (800/150) · embeddings (768) · base vectorial
> 3️⃣ Orquestación → agente como grafo de estados, salida JSON validada, plan B en cada nodo
> 4️⃣ Integraciones → herramientas y otros agentes, con auth seria
> 5️⃣ Persistencia → metadatos, memoria por tema, fallbacks
>
> 🔍 Detalle que importa: el modo de embedding (documento / consulta / similitud) no es intercambiable.
> ⏱️ Qué acelera: conocimiento nuevo en minutos, no en semanas de reentrenamiento. Y respuestas con fuentes.
>
> ¿Qué capa te ha costado más en tus proyectos? Te leo.
>
> #IA #RAG #LLM #agentes #MLOps #ingenieríadesoftware

## Versión 2: estilo de la cápsula 02 y las tres cuentas

La cápsula se rehízo con el estilo vacío (negro, violeta y ámbar, diagramas con nombre) y un guion nuevo
que descompone la matemática del RAG. Cada fórmula aparece término por término: la variable que nombra la
voz se enciende en su color y las demás se atenúan (`src/estilos/vacio/mate.tsx`).

| Cuenta | Fórmula | Ejemplo en pantalla | Verificación |
|---|---|---|---|
| Trozos | n = ⌈(L − o) / (t − o)⌉ | L = 30.000, t = 800, o = 150 → ⌈29.850 / 650⌉ = ⌈45,9⌉ = 46 | equivale a ⌈(L − t) / (t − o)⌉ + 1 = 46 |
| Costo del traslape | n·t / L ≈ t / (t − o) | 800 / 650 = 1,23 → +23 % de texto guardado | 46 · 800 / 30.000 = 1,227 |
| Similitud coseno | cos θ = q·d / (‖q‖‖d‖) = Σ qᵢdᵢ / (√Σqᵢ² √Σdᵢ²) | q = (0,8; 0,6; 0), d = (0,6; 0,8; 0) → 0,96 / (1·1) = 0,96 | ‖q‖ = √(0,64 + 0,36) = 1 |
| Búsqueda exacta | O(n·d) | 911 × 768 = 699.648; 1.000.000 × 768 = 768.000.000 | 10⁶ × 768 × 4 bytes = 3,07 GB en float32 (6,1 GB en float64) |
| Ordenar | O(n log n) → top-k O(n log k) | con n = 10⁶ y k = 3: 19,9 M → 1,6 M (log₂) | |
| Índice aproximado | ≈ O(d · log n) | HNSW, ScaNN | crece con log n en vez de n |
| Umbral | similitud ≥ 0,87 → tema existente | 9 reuniones: 4 se suman, 5 abren tema; a 0,94 se fragmentan, a 0,78 se mezclan | |
| Ingesta | llamadas = ⌈n / b⌉ | ⌈46 / 5⌉ = 10, lineal en n | |

Los 911 trozos, el traslape de 150, los lotes de 5 y el umbral 0,87 son los de la arquitectura de referencia;
los vectores del ejemplo y los puntajes de las reuniones son ilustrativos.
