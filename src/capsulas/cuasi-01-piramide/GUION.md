# Cuasi-experimentos · 01 · La pirámide de la evidencia

Serie **Cuasi-experimentos** (12 capítulos). Composición: `Cuasi01-Piramide` · 1080×1920 · 30 fps · ~2:44.
Nota de voz: Meng se escribe `Méng, de Járvard`; Kohavi `Rónni Kojávi`; "cuasi experimentos" sin guion.

## Guion (lo que dice la voz)

1. **gancho.** 1996: un estudio observacional con enfermeras concluye que la terapia de estrógeno + progestina baja el riesgo coronario 61 %. 2002: un experimento aleatorizado con la misma terapia encuentra 29 % más riesgo. ¿A cuál le crees?
2. **titulo.** Cuasi-experimentos, capítulo 1: la pirámide de la evidencia.
3. **piramide.** De abajo hacia arriba: opinión de expertos y casos; caso-control; cohortes; cuasi-experimentos; aleatorizados; revisiones sistemáticas. En tecnología: anécdota, dashboard, cohortes de usuarios, despliegue por región, A/B, meta-análisis de pruebas.
4. **ecm.** ECM = sesgo² + σ²/n. La varianza es O(1/n); el sesgo es O(1). Subir en la pirámide es achicar el sesgo, no la muestra.
5. **meng.** Con una correlación de 0,005 entre responder y la respuesta, 2,3 millones de respuestas ≈ una muestra al azar de ~400. n_ef ≈ f/(1 − f) · 1/ρ².
6. **bayes.** Combinación bayesiana normal: promedio ponderado por precisión, wᵢ = 1/(σᵢ²/nᵢ + τᵢ²). Con sesgo posible τ, el peso tiene techo 1/τ²: con τ = 0,1 y σ = 1, un observacional infinito pesa como un experimento de 100 personas.
7. **grade.** GRADE baja la confianza por riesgo de sesgo, inconsistencia, imprecisión, evidencia indirecta y sesgo de publicación; la sube por efecto grande, dosis-respuesta o confusión que iría en contra.
8. **kohavi.** En Microsoft, solo un tercio de las ideas probadas mejoró la métrica buscada.
9. **ia.** La evidencia exigida para un agente de IA en producción crece con el costo de equivocarse: prompt reversible → cuasi-experimento; reemplazar un proceso humano → aleatorizado.
10. **cierre.** No cuántos datos: de qué nivel. Próximo: qué es un cuasi-experimento.

## Cuentas

- Grodstein et al.: RR 0,39 (IC 95 % 0,19–0,78) para estrógeno + progestina → −61 %. WHI: HR 1,29 (IC nominal 1,02–1,63) para enfermedad coronaria → +29 %.
- Meng: f = n/N ≈ 1 %, ρ ≈ 0,005 → f/(1 − f)/ρ² = 0,0101 × 40.000 ≈ 404.
- ECM del gráfico: σ² = 1, sesgo² = 0,01 (ilustrativo).
- Peso con sesgo: w(n) = 1/(1/n + 0,01) → 100 cuando n → ∞; un experimento sin sesgo con n = 100 pesa 100 (ilustrativo).
- Posterior normal del gráfico de campanas: estudios con precisión 1 y 4 (ilustrativo); media combinada = (1·(−1) + 4·0,6)/5 = 0,28.

## Fuentes

- Grodstein F, Stampfer MJ, Manson JE et al. (1996). "Postmenopausal estrogen and progestin use and the risk of cardiovascular disease". *NEJM* 335(7):453–461. Antecedente: Stampfer et al. (1991), *NEJM* 325:756–762 (RR 0,56).
- Writing Group for the Women's Health Initiative Investigators (2002). "Risks and benefits of estrogen plus progestin in healthy postmenopausal women". *JAMA* 288(3):321–333.
- Sackett DL, Rosenberg WMC, Gray JAM, Haynes RB, Richardson WS (1996). "Evidence based medicine: what it is and what it isn't". *BMJ* 312:71–72.
- Murad MH, Asi N, Alsawas M, Alahdab F (2016). "New evidence pyramid". *BMJ Evidence-Based Medicine* 21(4):125–127.
- Guyatt GH, Oxman AD, Vist GE et al. (2008). "GRADE: an emerging consensus on rating quality of evidence and strength of recommendations". *BMJ* 336:924–926.
- Meng X-L (2018). "Statistical paradises and paradoxes in big data (I): Law of large populations, big data paradox, and the 2016 US presidential election". *Annals of Applied Statistics* 12(2):685–726.
- Kohavi R, Crook T, Longbotham R (2009). "Online Experimentation at Microsoft". Workshop on Data Mining Case Studies. Kohavi R, Tang D, Xu Y (2020). *Trustworthy Online Controlled Experiments*. Cambridge University Press.
- Combinación bayesiana con sesgo: Turner RM, Spiegelhalter DJ, Smith GCS, Thompson SG (2009). "Bias modelling in evidence synthesis". *JRSS-A* 172(1):21–47.
- Shadish WR, Cook TD, Campbell DT (2002). *Experimental and Quasi-Experimental Designs for Generalized Causal Inference*. Houghton Mifflin (marco de la serie).
