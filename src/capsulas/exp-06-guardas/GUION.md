# El mapa de la experimentación · 06/17 · Métricas de guarda y de razón

Composición: `Exp06-Guardas` · 1080×1920 · 30 fps · ~1:35.

## Guion (lo que dice la voz)

1. **gancho.** Imagina que tu cambio sube la conversión 2%, y las cancelaciones casi 4%. ¿Lo lanzas?
2. **titulo.** Idea 6 del mapa de la experimentación: métricas de guarda, y métricas de razón.
3. **oec.** Un buen experimento tiene una métrica principal, la que decide. Y métricas de guarda: las que no pueden empeorar, aunque la principal mejore.
4. **tipos.** Hay guardas de negocio, como cancelaciones, quejas o ingresos. Y guardas de confianza, que avisan si el experimento mismo falla: el desbalance de muestra, la latencia, los errores de carga.
5. **margen.** ¿Cómo se prueba una guarda? No preguntas si cambió. Preguntas si empeoró menos que un margen que fijaste antes. Si todo el intervalo de confianza queda bajo ese margen, la guarda pasa. Si lo cruza, no lanzas.
6. **razon.** Ahora, las métricas de razón, como clics por sesión. El problema: sorteas usuarios, pero mides sesiones. Las sesiones de una misma persona se parecen entre sí. Si las tratas como independientes, subestimas el ruido.
7. **delta.** La solución es el método delta. La varianza de una razón depende del ruido del numerador, del ruido del denominador, y de cuánto se mueven juntos. Como clics y sesiones suben juntos, la covarianza resta. Pero calcularla por usuario, y no por sesión, suele dar un error más grande que el ingenuo.
8. **ejemplo.** Un ejemplo: efecto de 0,02 clics por sesión. Con el error ingenuo, z = 2,5 y p = 0,01. Con el método delta, el error crece 50%, y p sube a 0,10. Ya no es significativo.
9. **regla.** La regla: analiza en la misma unidad que sorteaste. Para métricas de razón, usa el método delta, o un bootstrap por usuario.
10. **cierre.** Una métrica decide, las otras protegen. En la próxima idea, qué pasa cuando tratar a uno afecta a otro. Compártelo y sígueme.

## Cuentas y fuentes

- Métrica principal (OEC) y métricas de guarda de negocio y de confianza: Kohavi, Tang y Xu (2020), *Trustworthy Online
  Controlled Experiments*.
- Guarda como prueba de no inferioridad: pasa si el límite superior del intervalo de confianza queda bajo el margen fijado antes.
- Método delta para una razón R = X̄/Ȳ con datos por usuario: Var(R̂) ≈ (σ²_X − 2R·σ_XY + R²·σ²_Y)/(μ²_Y·n).
  Deng, Knoblich y Lu (2018), "Applying the Delta Method in Metric Analytics", KDD.
- Ejemplo ilustrativo: efecto 0,02; EE 0,008 → z = 2,5, p = 0,012; EE 0,012 (×1,5) → z = 1,67, p = 0,096.
  En una simulación con usuarios heterogéneos, el EE por usuario fue 1,2 veces el ingenuo por sesión; la razón depende de los datos.
- **Ilustrativo:** +2,1 % y +3,8 %, los intervalos de latencia y cancelaciones y las sesiones por usuario.
