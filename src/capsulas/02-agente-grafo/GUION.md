# Cápsula técnica 02 · El agente como grafo de estados

Serie **Cápsulas técnicas**. Composición: `Tec02-AgenteGrafo` · 1080×1920 · 30 fps · ~2:12.
Paleta: la misma base con `tono: 300` (rotación de matiz: cian, magenta y lima) para distinguir la serie técnica.

Cómo se estructura un agente como grafo de estados y cómo conversa con la interfaz, el servidor y la nube.
Patrones generalizados de una arquitectura real; sin nombres de producto, proveedores ni código.
Nota de voz: "RAG" se escribe `rag` en minúscula en el campo `dice` para que Kokoro lo pronuncie como palabra.

## Guion (lo que dice la voz)

1. **gancho.** ¿Dónde vive tu agente de IA? No vive en el prompt que escribes. Tu agente vive en un grafo, detrás de un servidor, sobre una nube. Veamos cómo conversan.
2. **titulo.** Cápsula técnica 02: el agente como grafo de estados.
3. **estado.** Tu agente es un grafo de estados. El estado es un objeto: la petición, el usuario, el contexto recuperado, la respuesta. Cada nodo lo lee, lo enriquece, y lo pasa al siguiente.
4. **nodos.** Con 3 nodos basta. El primero reúne contexto: lanza en paralelo la búsqueda en el RAG y la memoria del tema. El segundo razona: arma el prompt con ese contexto, llama al modelo, y valida la salida contra un esquema. El tercero guarda: persiste lo aprendido, solo si se cumple una condición.
5. **porque.** ¿Por qué un grafo y no una cadena de prompts? Porque cada nodo se prueba solo, se mide solo, y tiene su propio plan B. Y si el grafo entero falla, el backend llama al modelo directo. El usuario nunca ve el error.
6. **frontend.** ¿Cómo conversa con el frontend? El frontend no sabe que hay un grafo. Solo hace una petición a un endpoint, muestra un estado de carga, y recibe un objeto tipado: tipo, confianza, recomendación. Su única tarea es renderizar, no razonar. Así puedes cambiar el agente sin tocar la interfaz.
7. **backend.** Y en el backend, el código se organiza en rebanadas verticales. Por cada capacidad: un router que solo habla HTTP, un servicio con la lógica, y un esquema con los tipos. Tu agente es un servicio más. Y la autenticación se inyecta como dependencia: ningún endpoint la implementa a mano.
8. **nube.** Vamos a la nube. El modelo y los embeddings son servicios administrados en una región. Los vectores van a una base de documentos; los metadatos, a una relacional. Y la aplicación corre en contenedores sin servidor, detrás de un proxy que valida la identidad de cada usuario.
9. **config.** Todo lo que cambia entre ambientes (local, desarrollo y producción) vive en configuración: el modelo, los umbrales, el tamaño de los trozos. Y la infraestructura se declara como código, con un espacio de trabajo por ambiente.
10. **detalles.** Dos detalles de producción. Toda llamada a la nube es asíncrona, para no bloquear el servidor. Y los clientes de cada servicio se crean una sola vez y se reutilizan. Y un endpoint de salud, sin autenticación, para que la plataforma sepa que el servicio sigue vivo.
11. **cierre.** Tu agente es el cerebro. Pero sin servidor, interfaz y nube, es solo un experimento. Compártelo y sígueme para la cápsula 3.

## Mapa de la cápsula (y de dónde sale cada idea)

| Idea en el video | Patrón general detrás |
|---|---|
| Estado como objeto que viaja por los nodos | Estado tipado del grafo: petición, usuario, contexto RAG, contexto del tema, respuesta |
| Nodo 1 reúne contexto en paralelo | `gather` de la búsqueda vectorial y de la memoria por tema |
| Nodo 2 arma prompt, llama al modelo y valida contra esquema | Prompt con contexto → LLM (temperatura baja) → parseo JSON a modelos tipados |
| Nodo 3 guarda solo si se cumple una condición | Persistencia de hipótesis/evidencia solo cuando la actividad es de producto y hay tema |
| Si el grafo falla, llamada directa | Router captura la excepción del grafo y usa el servicio directo con el mismo prompt |
| La interfaz no sabe que hay un grafo | Un modal hace `POST` a un endpoint, muestra carga y renderiza la respuesta tipada |
| Rebanadas verticales: router · service · schema | Cada capacidad en su carpeta; `main` solo conecta routers |
| Auth como dependencia | Dependencias inyectadas: usuario autenticado, usuario registrado, administrador |
| Servicios administrados, dos bases, contenedores, proxy | LLM y embeddings en una región; vectores en base de documentos; metadatos relacionales; contenedores sin servidor tras un proxy de identidad |
| Configuración por ambiente | YAML por ambiente: modelo, umbral de similitud, tamaño y traslape de trozos |
| Infraestructura como código con workspaces | Un repositorio de infraestructura con un workspace por ambiente |
| Todo asíncrono, clientes reutilizados, endpoint de salud | Llamadas síncronas envueltas en hilos; singletons para clientes de nube; `/health` sin auth |

## Texto para la publicación

> ¿Dónde vive tu agente de IA? No en el prompt. 🧠
>
> Cápsula técnica 02: el agente como grafo de estados, y cómo conversa con frontend, backend y nube.
> 🔁 Estado = un objeto que cada nodo lee y enriquece
> 3️⃣ Tres nodos: reunir contexto (RAG + memoria, en paralelo) → razonar (prompt → modelo → esquema) → guardar (con condición)
> 🛟 Si el grafo falla, llamada directa: el usuario nunca ve el error
> 🖥️ El frontend renderiza, no razona: recibe un objeto tipado
> 🧱 Backend en rebanadas verticales, auth inyectada como dependencia
> ☁️ Nube administrada: modelo, vectores, metadatos, contenedores, proxy de identidad
> ⚙️ Config por ambiente + infraestructura como código
>
> Sin servidor, interfaz y nube, el agente es solo un experimento. ¿Cómo lo tienes montado tú?
>
> #IA #agentes #LangGraph #RAG #arquitectura #cloud

## Motion design (versión 3)

- **Estilo "vacío"** (`src/estilos/vacio/`): negro puro, constelación de triángulos como firma, Inter liviana, ámbar para el énfasis y violeta solo para lo activo y el botón final.
- **Ilustraciones isométricas** (`iso.tsx`) en el lenguaje de hairline (@lucasmarkes/hairline, MIT): cámara 2:1 a 45°, sólidos redondeados con silueta clara y un pliegue tenue, placas opacas pintadas de atrás hacia adelante, un solo realce y nada de texto dentro del dibujo. El paquete anima con su propio reloj y el puntero, que Remotion no puede capturar cuadro a cuadro, así que las figuras se dibujan desde el número de cuadro.
- **framer-motion** (`movimiento.tsx`) como motor de curvas y resortes: `cubicBezier(.32,.72,0,1)` para los cambios discretos (el reloj de hairline), `expo.out` para los titulares divididos, `expo.inOut` para los recorridos, y su `spring` (k 100 · c 18 · m 1) evaluado en el tiempo del cuadro. No se usa `<motion.div>`: sus animaciones corren con el reloj del navegador.
- **Pautas de UI UX Pro Max** (motion.csv): titulares divididos de menos de 8 palabras a 400–700 ms, escalonado de 20–40 ms, morph de 500–800 ms, paralaje con velocidades distintas por capa.
- **Carrusel curvo** del gancho: `src/components/ui/tilted-grid-hero.tsx` (shadcn/ui) con tres props opcionales para render cuadro a cuadro (`time`, `size`, `ImageComponent`). Las piezas son imágenes locales generadas por la composición `Tec02-Piezas` (Unsplash está bloqueado en el contenedor de render).
