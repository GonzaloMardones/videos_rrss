# Cuasi-experimentos · 05 · Despliegues escalonados (camiones autónomos)

Composición: `Cuasi05-Escalonado` · 1080×1920 · 30 fps · ~2:00.
Nota de voz: Goodman-Bacon como `Andrú Gúdman Béicon`; Callaway y Sant'Anna como `Cálowei y Santána`.

## Guion (resumen)

1. **gancho.** 2008: Gabriela Mistral (Codelco) fue el primer despliegue comercial de camiones autónomos de Komatsu; hoy su flota es 100 % autónoma. No hay un estudio controlado del efecto de la autonomía en la productividad.
2. **escalon.** La tecnología llega por olas (años 3, 5, 7, nunca).
3. **twfe.** Y_it = α_i + λ_t + β·D_it + ε_it. Si el efecto crece con el tiempo, un solo β falla.
4. **prohibidas.** La regresión usa faenas ya tratadas como control de las que adoptan después. Simulación: efecto real promedio 6,8; TWFE 3,4.
5. **eventos.** Estudio de eventos Y_it = α_i + λ_t + Σ_k β_k·1[t − G_i = k]: coeficientes previos ≈ 0 (tendencias paralelas) y efecto creciente después. Callaway–Sant'Anna recupera 7,1.
6. **nube.** Activación de un agente por región con una bandera de configuración = despliegue escalonado; guardar fechas y dejar una región sin activar.

## Cuentas (simulación propia, semilla 5)

- 6 faenas, 10 años; adopción en años 3, 3, 5, 5, 7 y nunca. Y_it = a_i + t + efecto + N(0; 0,3²), con efecto = 2 + 2k para k ≥ 0 años desde la adopción.
- ATT real promedio sobre celdas tratadas: 6,81. TWFE: 3,42. Estimador tipo Callaway–Sant'Anna (cada cohorte contra la faena que nunca adopta, base g − 1): 7,08.
- Estudio de eventos (contra la faena que nunca adopta): k = −4, −3, −2 → −0,32; −0,23; −0,15; k = 0…6 → 2,2; 4,0; 6,2; 8,1; 10,6; 12,4; 14,7.
- **Ilustrativo:** el archivo de configuración y las fechas por país.

## Fuentes

- Komatsu (FrontRunner): primer despliegue comercial en 2008 en Gabriela Mistral; Codelco: primera mina con flota 100 % autónoma (20 camiones). Prensa: Mining Magazine, E&MJ, MCH (2023–2025).
- Goodman-Bacon A (2021). "Difference-in-differences with variation in treatment timing". *Journal of Econometrics* 225(2):254–277.
- Callaway B, Sant'Anna PHC (2021). "Difference-in-differences with multiple time periods". *Journal of Econometrics* 225(2):200–230.
- Sun L, Abraham S (2021). "Estimating dynamic treatment effects in event studies with heterogeneous treatment effects". *Journal of Econometrics* 225(2):175–199.
- de Chaisemartin C, D'Haultfœuille X (2020). "Two-way fixed effects estimators with heterogeneous treatment effects". *American Economic Review* 110(9):2964–2996.
- Borusyak K, Jaravel X, Spiess J (2024). "Revisiting event-study designs: robust and efficient estimation". *Review of Economic Studies* 91(6):3253–3285.
