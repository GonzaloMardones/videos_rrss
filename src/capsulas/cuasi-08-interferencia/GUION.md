# Cuasi-experimentos · 08 · Interferencia entre agentes (banca: alertas de fraude)

Composición: `Cuasi08-Interferencia` · 1080×1920 · 30 fps · ~2:01.
Nota de voz: Johari como `Yojári`; switchback como `suich bak`; A2A como `a dos a`.

## Guion (resumen)

1. **gancho.** Un banco prueba un agente de IA que clasifica alertas de fraude: en el A/B por caso, sus casos se resuelven 41 % más rápido. Al lanzarlo a todos, la mejora desaparece.
2. **pipeline.** Dos agentes conectados por A2A: el clasificador marca urgentes; el resolutor atiende urgentes primero. El agente nuevo marca más urgentes y sus casos se adelantan a costa del control.
3. **sutva.** Se rompe la no interferencia: Yᵢ(zᵢ) pasa a Yᵢ(z₁, …, zₙ).
4. **numeros.** Simulación: A/B por caso −41 %; lanzamiento total −2 % (ruido). La prioridad no crea capacidad. Johari et al. (2022): el sesgo puede ser tan grande como el efecto.
5. **solucion.** Aleatorizar donde la interferencia queda adentro: switchback por día (≈ 0 en la simulación) o por grupos (sucursales, regiones, carteras).
6. **costo.** Efecto de diseño ED = 1 + (m − 1)ρ; con m = 100 y ρ = 0,05, ED = 5,95.
7. **trazas.** El identificador de contexto de las tareas A2A revela qué casos comparten recursos: esa es la unidad.

## Cuentas (simulación propia, semilla 8)

- 400 días; 200 alertas por día en 8 horas; servicio exponencial de 2,2 min; un resolutor con cola de prioridad (urgentes primero).
- Urgencia: 60 % de las alertas del clasificador nuevo, 20 % del antiguo.
- A/B por caso (50/50): espera 10,5 min (nuevo) vs 17,9 (antiguo) → −41,4 %. Todo antiguo: 13,0; todo nuevo: 12,8 → −2,1 %. Switchback por día: +4,1 % (ruido).
- **Ilustrativo:** las trazas y los identificadores de contexto.

## Fuentes

- Cox DR (1958). *Planning of Experiments*. Wiley. Rubin DB (1980). Comentario en *JASA* 75(371):591–593 (SUTVA).
- Hudgens MG, Halloran ME (2008). "Toward causal inference with interference". *JASA* 103(482):832–842.
- Johari R, Li H, Liskovich I, Weintraub GY (2022). "Experimental design in two-sided platforms: an analysis of bias". *Management Science* 68(10):7069–7089.
- Bojinov I, Simchi-Levi D, Zhao J (2023). "Design and analysis of switchback experiments". *Management Science* 69(7):3759–3777.
- Kish L (1965). *Survey Sampling*. Wiley. Donner A, Klar N (2000). *Design and Analysis of Cluster Randomization Trials in Health Research*. Arnold.
- Protocolo Agent2Agent (A2A): Google (abril de 2025), proyecto de la Linux Foundation desde junio de 2025.
