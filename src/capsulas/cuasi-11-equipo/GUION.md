# Cuasi-experimentos · 11 · Un equipo de agentes que hace inferencia causal (banca)

Composición: `Cuasi11-Equipo` · 1080×1920 · 30 fps · ~1:53. Cierre de la serie.
Nota de voz: Sumit Agarwal como `Súmit Agárwal`; A2A como `a dos a`.

## Guion (resumen)

1. **gancho.** ¿Puede un equipo de agentes responder una pregunta causal de punta a punta? Subir el límite de la tarjeta, ¿aumenta el endeudamiento?
2. **caso.** Agarwal et al.: 8,5 millones de tarjetas y 743 discontinuidades en cortes de puntaje FICO. Los de puntaje bajo se endeudan más por dólar extra de límite, pero los bancos les suben menos el límite: US$127 por punto menos de costo de fondos (FICO < 660) contra US$2.203 (FICO > 740).
3. **equipo.** Agentes planificador (plan escrito antes), de datos, de identificación (cortes → RDD), estimador y crítico (cortes falsos, McCrary, sensibilidad).
4. **a2a.** Tarjeta de agente con habilidades; tareas con estados (enviada, en curso, completada, requiere información); si el crítico encuentra un problema, la tarea vuelve a una persona.
5. **riesgo.** Jardín de los senderos que se bifurcan: con 100 pruebas al 5 %, P(≥ 1 falso positivo) = 1 − 0,95¹⁰⁰ = 99 %.
6. **cierre.** Los agentes aceleran; el diseño, los supuestos y la decisión siguen siendo humanos.

## Cuentas

- 1 − 0,95¹⁰⁰ = 0,994.
- **Ilustrativo:** los escalones del gráfico de límites, la tarjeta del agente crítico (dominio .example) y los estados dibujados.

## Fuentes

- Agarwal S, Chomsisengphet S, Mahoney N, Stroebel J (2018). "Do banks pass through credit expansions to consumers who want to borrow?". *Quarterly Journal of Economics* 133(1):129–190. NBER WP 21567.
- Especificación Agent2Agent (A2A), a2a-protocol.org: Agent Card y ciclo de vida de tareas (submitted, working, input-required, completed, failed, canceled, rejected).
- Gelman A, Loken E (2014). "The statistical crisis in science". *American Scientist* 102(6):460–465.
- Chen T et al. (2025). Causal AI Scientist (cápsula técnica 03 de esta serie de videos), como antecedente de agentes para inferencia causal.
