# El mapa de la experimentación · 15/17 · Análisis de sensibilidad y E-value

Composición: `Exp15-Sensibilidad` · 1080×1920 · 30 fps · ~2:14.
Nota de voz: "E-value" se escribe `i válu` en `dice` (Kokoro se traga la "e" de "valor E"; "valor é" lo lee "e acentuada").

## Guion (lo que dice la voz)

1. **gancho.** Quienes usan la app renuevan 1,8 veces más. ¿Y si hay un confusor no medido? No se descarta, pero se puede medir qué tan fuerte tendría que ser.
2. **titulo.** Idea 15: análisis de sensibilidad y E-value.
3. **problema.** Siempre puede quedar una U oculta (motivación) que causa uso y renovación. La pregunta útil: ¿qué tan fuerte para borrar el efecto?
4. **cornfield.** 1959: si los fumadores tienen 9 veces más riesgo y fuera por una «hormona oculta», esa hormona tendría que ser al menos 9 veces más común en fumadores.
5. **formula.** Factor de sesgo B = RR_UX · RR_UY / (RR_UX + RR_UY − 1). Si B ≥ RR observado, U puede explicar todo el efecto.
6. **evalue.** E = RR + √(RR · (RR − 1)). Con 1,8: 1,8 + √1,44 = 3,0. Para el límite inferior 1,3: E = 1,9.
7. **curva.** Combinaciones que borran el efecto: (3, 3), (2, 9), (4; 2,45)… Un confusor tan fuerte como el medido más fuerte (1,5; 1,5) solo da B = 1,125.
8. **cuidado.** No prueba causalidad; no es un p-valor; E alto ≠ sin confusión; reportar el del estimado y el del intervalo.
9. **cierre.** No digas que no hay confusores: di qué tan fuertes tendrían que ser. Próxima: double machine learning.

## Cuentas y fuentes

- E(1,8) = 1,8 + √(1,8·0,8) = 1,8 + 1,2 = 3,0. E(1,3) = 1,3 + √0,39 = 1,924.
- Curva B = RR: RR_UY = RR·(RR_UX − 1)/(RR_UX − RR). Con RR = 1,8: RR_UX = 2 → 9,0; 3 → 3,0; 4 → 2,45; 10 → 1,98.
- B(1,5; 1,5) = 2,25/2 = 1,125.
- El ejemplo de la app (RR 1,8, IC inferior 1,3) es **ilustrativo**.
- VanderWeele y Ding (2017). "Sensitivity Analysis in Observational Research: Introducing the E-Value". Annals of
  Internal Medicine 167(4).
- Ding y VanderWeele (2016). "Sensitivity Analysis Without Assumptions". Epidemiology 27(3) (factor de sesgo).
- Cornfield, Haenszel, Hammond, Lilienfeld, Shimkin y Wynder (1959). "Smoking and lung cancer: recent evidence and a
  discussion of some questions". Journal of the National Cancer Institute 22(1).
- Comparación con covariables observadas: Cinelli y Hazlett (2020), "Making sense of sensitivity", JRSS-B 82(1).
