# Capítulo 1 · ¿Cómo está Chile en 2026?

Serie **Economía en simple**.
Composición de Remotion: `Cap01-Chile2026` · 1080×1920 · 30 fps · ~2:10 · con voz, música y subtítulos.
Corte de datos: **12 de octubre de 2026**. Las cifras viven en `data.ts`.

## Cómo está armado

| Archivo | Para qué sirve |
| --- | --- |
| `guion.json` | El guion de la voz, frase por frase. `dice` es lo que se pronuncia (números en palabras), `muestra` es el subtítulo y `cue` marca el momento en que aparece cada animación. |
| `timeline.json` | Generado por `scripts/narrar.py`: en qué segundo empieza y termina cada frase. Las escenas y los subtítulos se sincronizan con esto. |
| `public/cap01/narracion.mp3` | La voz en off, generada con Kokoro (voz `em_alex`, fonética latinoamericana) y procesada para sonar más cálida. |
| `public/cap01/musica.mp3`, `public/sfx/*` | Música de fondo y efectos, sintetizados por `scripts/musica.py`. |
| `data.ts` | Las cifras y sus fuentes. |

Para cambiar algo de lo que se dice, edita `guion.json` y regenera la voz (ver README). Si grabas tu propia voz, puedes reemplazar `narracion.mp3`; en ese caso, ajusta los tiempos de `timeline.json` a tu grabación.

## Guion (lo que dice la voz)

1. **Gancho.** El cobre está en el precio más alto de su historia. Y aun así, Chile casi no va a crecer este año. ¿Cómo se explica eso?
2. **Título.** Vamos por partes.
3. **Crecimiento.** Partamos por el PIB: todo lo que produce el país. El tamaño de la torta. El año pasado creció 2,5%. Este año, el Banco Central espera menos de 1%.
4. **El cobre.** ¿Y por qué? Justamente, por el cobre. Lo que ganamos es precio × cantidad. El precio está por las nubes… pero en agosto, las minas produjeron 17% menos. Y eso frenó a toda la economía.
5. **Inflación.** Segundo tema: la inflación, lo que pierde tu plata cada año. La meta: 3%. Partimos el año bajo la meta, pero la guerra en Medio Oriente disparó los combustibles. Hoy estamos en 4,1%.
6. **El Banco Central.** ¿Y quién cuida eso? El Banco Central, que es autónomo: no depende del gobierno de turno. Su trabajo es mantener la inflación cerca de 3%, y su herramienta es la tasa de interés: el precio del dinero.
7. **Tasa de interés.** El dilema: con la economía débil, convendría bajar la tasa y abaratar los créditos. Pero con los precios subiendo, es arriesgado. Por eso la dejó quieta, en 4,5%.
8. **Empleo.** Mientras tanto, el desempleo subió a 9,6%. Casi 1 de cada 10 personas que busca trabajo no lo encuentra.
9. **Cuentas fiscales.** ¿Y el Estado? Tiene déficit: gasta más de lo que recauda, y la diferencia la paga con deuda. Este año el déficit baja a 1,8% del PIB. Y la deuda sigue bajo el límite prudente.
10. **¿Y si nos endeudamos de más?.** Ahora, ¿y si el país pide mucha deuda, por ejemplo, para más beneficios sociales? La deuda cobra intereses: el año pasado, casi US$5.000 millones. Y cada peso en intereses es un peso menos para salud, educación o pensiones. Por eso la regla de oro: gastos permanentes, con ingresos permanentes.
11. **Lo que viene.** La apuesta para salir de esto es la inversión. Con la nueva Ley de Reconstrucción, el Banco Central espera crecer entre 2% y 3% el próximo año.
12. **¿Y a ti, cómo te afecta?.** ¿Y a ti, cómo te afecta todo esto? Si tu sueldo sube menos que los precios, en la práctica ganas menos. Por ahora, los créditos no se abaratan. Y con más desempleo, conviene tener un colchón para imprevistos.
13. **Cierre.** En pocas palabras: la economía crece poco, los precios presionan, y falta empleo. Pero ojo: el cobre vale oro, y la inversión puede cambiar la historia. Sígueme para el capítulo 2.

## Texto para la publicación de Instagram

> El cobre en récord… y Chile casi sin crecer. ¿Cómo se explica? 🇨🇱
>
> Capítulo 1 de *Economía en simple*: cómo está Chile en 2026, qué hace el Banco Central, qué pasa si el país se endeuda de más y cómo te afecta a ti.
>
> 📈 PIB 2026: 0,25%–0,75% (proyección del Banco Central)
> ⛏️ Producción minera: −17,4% en agosto
> 🛒 Inflación: 4,1% (meta: 3%)
> 🏦 Tasa de política monetaria: 4,5%
> 👷 Desocupación: 9,6%
> 🏛️ Déficit fiscal 2026: 1,8% del PIB
>
> ¿Qué indicador te sorprendió más?
>
> Fuentes: Banco Central de Chile, INE, Dipres, Cochilco y Ministerio de Hacienda. Datos al 12-10-2026.
>
> #economía #Chile #macroeconomía #finanzaspersonales #inflación #cobre #aprendeconmigo

## Fuentes

| Dato | Fuente |
| --- | --- |
| PIB 2023–2025 (0,7% · 2,8% · 2,5%) | Banco Central, Cuentas Nacionales, 18-03-2026 ([La Tercera](https://www.latercera.com/pulso/noticia/pib-de-chile-2025/), [Radio U. de Chile](https://radio.uchile.cl/2026/03/18/banco-central-confirma-crecimiento-del-25-del-pib-en-2025-comercio-e-inversion-lideran-el-avance/)) |
| Proyecciones PIB 2026–2028 e inflación | [Banco Central, IPoM septiembre 2026](https://www.bcentral.cl/en/content/-/detalle/prensa/nota-de-prensa/bcch-publica-ipom-septiembre-2026) |
| TPM 4,5% | [Banco Central, comunicado RPM 8-09-2026](https://www.bcentral.cl/en/content/-/detalle/prensa/comunicados-rpm/comunicado-rpm-septiembre-2026); recorte a 4,5% en dic. 2025 ([DF](https://www.df.cl/economia-y-politica/macro/banco-central-recorta-su-tasa-de-interes-y-llega-a-su-nivel-mas-bajo-en)) |
| Imacec agosto 2026 (−1,0%; minería −17,4%; resto +1,4%) | Banco Central, 01-10-2026 ([Radio U. de Chile](https://radio.uchile.cl/2026/10/01/el-peso-de-la-mineria-imacec-cae-1-y-pone-nuevamente-el-crecimiento-bajo-presion/)) |
| Cobre US$6,59/lb (récord) | Cochilco, semana 10–14 ago. 2026 ([Reporte Minero](https://www.reporteminero.cl/noticia/noticias/2026/08/precio-cobre-record-historico-us-659-libra-cochilco-inventarios)) |
| IPC septiembre 4,1% en 12 meses | [INE, 08-10-2026](https://www.ine.gob.cl/sala-de-prensa/prensa/general/noticia/2026/10/08/%C3%ADndice-de-precios-al-consumidor-(ipc)-de-septiembre-present%C3%B3-una-variaci%C3%B3n-mensual-de-0-4) |
| IPC diciembre 2025: 3,5% | INE, 08-01-2026 ([DF](https://www.df.cl/economia-y-politica/macro/el-ipc-baja-mas-de-lo-esperado-en-diciembre-y-la-inflacion-para-todo-2025)) |
| IPC ene–ago 2026 (serie del gráfico) | INE, boletines mensuales (recopilación de [Nuevo Ciclo Político](https://nuevociclopolitico.cl/informativo/inflacion-chile/)) |
| Desocupación 2026 (8,9% → 9,6%) | INE, ENE: [jun–ago](https://www.ine.gob.cl/sala-de-prensa/prensa/general/noticia/2026/09/30/la-tasa-de-desocupaci%C3%B3n-nacional-fue-9-6-en-el-trimestre-junio---agosto-de-2026), [may–jul](https://www.ine.gob.cl/sala-de-prensa/prensa/general/noticia/2026/08/28/la-tasa-de-desocupaci%C3%B3n-nacional-fue-9-5-en-el-trimestre-mayo---julio-de-2026), [mar–may](https://www.ine.gob.cl/sala-de-prensa/prensa/general/noticia/2026/06/30/la-tasa-de-desocupaci%C3%B3n-nacional-fue-9-4-en-el-trimestre-marzo-mayo-de-2026) |
| Déficit fiscal 2,8% → 1,8% y deuda 42,7% del PIB | [Dipres, IFP tercer trimestre 2026](https://www.dipres.gob.cl/598/articles-433299_Informe_PDF.pdf) |
| Intereses de la deuda 2025: US$4.886 millones | Dipres, ejecución 2025 ([DF](https://www.df.cl/economia-y-politica/macro/pese-a-contencion-de-la-deuda-publica-gasto-en-intereses-crecio-mucho-mas)) |
| Banco Central: autonomía (Ley 18.840, 1989) y meta de 3% a dos años | [Banco Central, marco de política monetaria](https://coleccion.bcentral.cl/documents/33528/133301/PoliticaMonetariaBcchMarcoMetasInflacion2020.pdf) |
| Ley de Reconstrucción Nacional (impuesto 27% → 23%) | [Ministerio de Hacienda](https://www.hacienda.cl/noticias-y-eventos/noticias/952161b6837a6), [KPMG](https://assets.kpmg.com/content/dam/kpmgsites/cl/pdf/2026/08/Tax%20Alert%20Aprobaci%C3%B3n%20Ley%20de%20Reconstrucci%C3%B3n.pdf.coredownload.inline.pdf) |

## Antes de publicar

- Revisa la serie mensual del IPC de enero a agosto en los boletines del INE: viene de una recopilación secundaria.
- Si el Banco Central cambia la TPM en la reunión del 26–27 de octubre de 2026, actualiza `tasa` en `data.ts` y la frase correspondiente en `guion.json`, regenera la voz y vuelve a renderizar.
