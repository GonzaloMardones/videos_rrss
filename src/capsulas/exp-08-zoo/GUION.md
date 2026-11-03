# El mapa de la experimentación · 08/17 · El zoológico de efectos

Composición: `Exp08-Zoo` · 1080×1920 · 30 fps · ~1:28.
Nota de voz: ATE se escribe `ate`, ATT `ate te`, ATU `ate u`, CATE `cate`, LATE `late` en el campo `dice`.

## Guion (lo que dice la voz)

1. **gancho.** Imagina que dos analistas miran el mismo experimento. Uno dice que el efecto es cuatro. El otro dice cinco. Y los dos tienen razón.
2. **titulo.** Idea 8 del mapa de la experimentación: el zoológico de efectos.
3. **dios.** Para verlo, hagamos trampa. Ocho personas, y por una vez vemos sus dos mundos: su resultado con tratamiento, y sin él. La diferencia de cada persona es su efecto individual. En la vida real, nunca lo vemos.
4. **ate.** El promedio de todos es el ATE, el efecto promedio del tratamiento: 32 / 8 = 4.
5. **att.** Si promedias solo a los que recibieron el tratamiento, tienes el ATT, el efecto en los tratados: 5. Y en los que no lo recibieron, el ATU: 3. El ATE es la mezcla de ambos: ½ · 5 + ½ · 3 = 4.
6. **cate.** Si promedias dentro de un subgrupo, tienes el CATE, el efecto condicional. Jóvenes: 6,5. Mayores: 1,5.
7. **late.** Y si un instrumento empuja a algunos a tratarse, el LATE es el efecto solo en ellos, los que cambiaron por el empujón: 3,75.
8. **ingenuo.** ¿Y la comparación ingenua, tratados contra no tratados? Da 18 − 12 = 6. No es ninguno de los anteriores. Es el ATT (5) más un sesgo de selección de 1: los tratados ya estaban mejor sin tratamiento.
9. **metodos.** Cada método estima un animal distinto. Experimento: ATE. Emparejamiento y DiD: usualmente ATT. Variable instrumental: LATE. Regresión discontinua: el efecto en el corte.
10. **cierre.** Antes de discutir el número, pregunta en quién. En la próxima idea, efectos heterogéneos a fondo. Compártelo y sígueme.

## Cuentas (población ilustrativa de 8 personas, verificada)

| persona | grupo | tratado | Y(0) | Y(1) | efecto | cumplidor |
|---|---|---|---|---|---|---|
| 1 | joven | sí | 10 | 18 | 8 | no |
| 2 | joven | sí | 12 | 19 | 7 | sí |
| 3 | joven | no | 11 | 17 | 6 | no |
| 4 | mayor | sí | 14 | 16 | 2 | sí |
| 5 | mayor | no | 15 | 16 | 1 | sí |
| 6 | mayor | no | 13 | 13 | 0 | no |
| 7 | joven | no | 9 | 14 | 5 | sí |
| 8 | mayor | sí | 16 | 19 | 3 | no |

- ATE = 32/8 = 4. ATT = (8+7+2+3)/4 = 5. ATU = (6+1+0+5)/4 = 3. ATE = ½·5 + ½·3.
- CATE(joven) = (8+7+6+5)/4 = 6,5. CATE(mayor) = (2+1+0+3)/4 = 1,5.
- LATE (cumplidores marcados) = (7+2+1+5)/4 = 3,75.
- Comparación ingenua: Ȳ(tratados observados) = (18+19+16+19)/4 = 18; Ȳ(no tratados observados) = (11+15+13+9)/4 = 12;
  diferencia 6 = ATT (5) + sesgo de selección (E[Y(0)|T=1] − E[Y(0)|T=0] = 13 − 12 = 1).
