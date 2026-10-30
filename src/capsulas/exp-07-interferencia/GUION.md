# El mapa de la experimentación · 07/17 · Interferencia

Composición: `Exp07-Interferencia` · 1080×1920 · 30 fps · ~1:36.
Nota de voz: "switchback" se escribe `suích bak` en el campo `dice`.

## Guion (lo que dice la voz)

1. **gancho.** Imagina que en una app de transporte le das un descuento a la mitad de los pasajeros. Ellos piden más viajes, y los conductores se acaban para la otra mitad. Tu experimento acaba de mentir.
2. **titulo.** Idea 7 del mapa de la experimentación: interferencia, y la unidad de aleatorización.
3. **sutva.** Todo experimento supone algo que casi nunca se dice: mi resultado depende solo de mi tratamiento, no del tratamiento de los demás. Se llama SUTVA: el valor del tratamiento es estable por unidad. Y se rompe más seguido de lo que crees.
4. **donde.** Se rompe en marketplaces, donde tratados y control comparten la misma oferta. En redes sociales, donde tus amigos te influyen. Y en vacunas, donde mi vacuna también te protege a ti.
5. **sesgo.** En el marketplace, los tratados le quitan conductores al control. El control empeora, el tratamiento mejora, y la diferencia se infla. El experimento dice +10% de viajes. Lanzado a todos, como ya nadie le quita a nadie, el efecto real es mucho menor.
6. **cluster.** La solución: aleatoriza por grupos que no se mezclan. Ciudades, zonas, o comunidades de la red. El precio es el efecto de diseño: DEFF = 1 + (m − 1)·ρ, por la correlación dentro del grupo. Con 100 personas por grupo y ρ = 0,05: DEFF = 5,95. Necesitas casi seis veces más datos.
7. **switchback.** Otra opción, muy usada en delivery y transporte: el switchback. Toda la zona pasa a la versión A una hora, y a la B la siguiente, alternando al azar. Funciona si el efecto de una hora no se arrastra a la siguiente.
8. **dilema.** El dilema de fondo: aleatorizar por usuario es preciso pero sesgado. Aleatorizar por grupo es insesgado, pero ruidoso. Elige según cuánto se contagian tus unidades.
9. **cierre.** Antes de sortear, pregúntate a quién afecta el tratamiento. En la próxima idea, el zoológico de efectos. Compártelo y sígueme.

## Cuentas y fuentes

- SUTVA (stable unit treatment value assumption): Rubin (1980); Imbens y Rubin (2015), *Causal Inference for Statistics,
  Social, and Biomedical Sciences*.
- Efecto de diseño de la aleatorización por conglomerados: DEFF = 1 + (m − 1)·ρ (ρ: correlación intraclase).
  Con m = 100 y ρ = 0,05: 1 + 99·0,05 = 5,95.
- Experimentos switchback en marketplaces: alternancia temporal de toda una zona; requiere poco arrastre entre bloques
  (Bojinov, Simchi-Levi y Zhao, 2023, "Design and Analysis of Switchback Experiments", *Management Science*).
- **Ilustrativo:** +10 % en el experimento contra +3 % lanzado a todos, las zonas sorteadas y las dianas de sesgo y varianza.
