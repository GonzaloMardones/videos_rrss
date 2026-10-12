import React from "react";
import { SceneShell } from "../../../components/SceneShell";
import { GlowBars } from "../../../components/charts";
import { Pop, useEase } from "../../../components/motion";
import { useCue, useCueAt } from "../../../components/narracion";
import { Counter, fmt, Glass, GradientText, Note } from "../../../components/ui";
import { colors, fonts, gradients } from "../../../theme";
import { bancoCentral, crecimiento, deuda, inflacion, reconstruccion, tasa } from "../data";
import { Icon, IconGradients, Title } from "./comun";

// Fila con ícono, idea en grande y una línea de explicación.
const Idea: React.FC<{ at: number; icon: string; tone: "warm" | "cool" | "gold"; title: string; text: string }> = ({
  at,
  icon,
  tone,
  title,
  text,
}) => (
  <Pop at={at} from="right" distance={120}>
    <Glass style={{ display: "flex", alignItems: "center", gap: 28, padding: "26px 30px" }}>
      <div
        style={{
          width: 108,
          height: 108,
          flexShrink: 0,
          borderRadius: 30,
          background: colors.glassStrong,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={icon} gradientId={`ico-${tone}`} size={64} />
      </div>
      <div>
        <div style={{ fontFamily: fonts.display, fontSize: 52, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.05 }}>
          <GradientText gradient={gradients[tone]}>{title}</GradientText>
        </div>
        <div style={{ fontSize: 31, lineHeight: 1.25, color: colors.dim, marginTop: 6 }}>{text}</div>
      </div>
    </Glass>
  </Pop>
);

// El Banco Central: quién es y qué hace.
export const BancoCentral: React.FC = () => {
  const cQuien = useCue("quien");
  const cAutonomo = useCueAt("quien", 0.45);
  const cMision = useCue("mision");
  const cHerr = useCue("herramienta");
  return (
    <SceneShell entrada="zoom" source={bancoCentral.fuente}>
      <IconGradients />
      <Title at={cQuien + 10} gradient={gradients.brand} size={108}>
        El Banco Central
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 10 }}>
        <Idea at={cAutonomo} icon="escudo" tone="cool" title="Autónomo" text="No depende del gobierno de turno." />
        <Idea at={cMision} icon="diana" tone="gold" title={`Meta: ${bancoCentral.meta}%`} text="Cuida que los precios no se disparen." />
        <Idea at={cHerr} icon="perilla" tone="warm" title="La tasa de interés" text="Su herramienta: el precio del dinero." />
      </div>
    </SceneShell>
  );
};

// El presupuesto: cuando los intereses crecen, aprietan todo lo demás (ilustrativo).
const Budget: React.FC<{ at: number }> = ({ at }) => {
  const p = useEase(at, 50);
  const intereses = 0.08 + 0.22 * p;
  const resto = 1 - intereses;
  const parts = [
    { label: "Salud", share: 0.36 * resto, bg: "rgba(34,211,238,0.85)" },
    { label: "Educación", share: 0.36 * resto, bg: "rgba(139,92,246,0.85)" },
    { label: "Pensiones", share: 0.28 * resto, bg: "rgba(59,130,246,0.85)" },
    { label: "Intereses", share: intereses, bg: gradients.warm },
  ];
  return (
    <div>
      <div style={{ display: "flex", width: 900, height: 120, borderRadius: 28, overflow: "hidden", gap: 4 }}>
        {parts.map((x) => (
          <div
            key={x.label}
            style={{
              width: `${x.share * 100}%`,
              background: x.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
              color: colors.bg,
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {x.label}
          </div>
        ))}
      </div>
      <Note style={{ fontSize: 24, marginTop: 10 }}>Ejemplo ilustrativo de un presupuesto</Note>
    </div>
  );
};

// ¿Y si el país se endeuda mucho?
export const Deuda: React.FC = () => {
  const cPregunta = useCue("pregunta");
  const cIntereses = useCue("intereses");
  const cMonto = useCueAt("intereses", 0.45);
  const cPeso = useCue("peso");
  const cRegla = useCue("regla");
  return (
    <SceneShell entrada="tilt" source={deuda.fuente}>
      <Title at={cPregunta + 6} gradient={gradients.warm} size={96}>
        ¿Y si nos endeudamos de más?
      </Title>
      <Pop at={cIntereses} style={{ marginTop: 6 }}>
        <Note>Intereses que pagó Chile en 2025</Note>
      </Pop>
      <Pop at={cMonto} from="zoom" style={{ transformOrigin: "left center" }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 132, letterSpacing: -5, lineHeight: 1.05 }}>
          <GradientText gradient={gradients.gold}>
            <Counter to={deuda.intereses2025} from={0} at={cMonto} duration={34} decimals={0} prefix="US$" />
          </GradientText>
          <span style={{ fontSize: 50, color: colors.dim, letterSpacing: -1 }}> millones</span>
        </div>
      </Pop>
      <Pop at={cPeso} style={{ marginTop: 34 }}>
        <Budget at={cPeso + 6} />
      </Pop>
      <Pop at={cRegla} from="zoom" style={{ marginTop: 34 }}>
        <Glass glow="rgba(255,193,94,0.3)" style={{ textAlign: "center", padding: "28px 24px" }}>
          <div style={{ fontSize: 28, color: colors.dim, marginBottom: 6 }}>La regla de oro</div>
          <div style={{ fontFamily: fonts.display, fontSize: 52, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1 }}>
            <GradientText gradient={gradients.gold}>Gastos permanentes = ingresos permanentes</GradientText>
          </div>
        </Glass>
      </Pop>
    </SceneShell>
  );
};

// Lo que viene
export const Futuro: React.FC = () => {
  const cApuesta = useCue("apuesta");
  const cLey = useCue("rebote");
  const cBarras = useCueAt("rebote", 0.45);
  return (
    <SceneShell entrada="rise" source={reconstruccion.fuente}>
      <Title at={cApuesta} gradient={gradients.gold} sub="La apuesta: más inversión.">
        Lo que viene
      </Title>
      <Pop at={cLey}>
        <Glass glow="rgba(255,193,94,0.25)" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontFamily: fonts.display, fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>Ley de Reconstrucción</div>
          <div style={{ fontSize: 31, color: colors.dim, lineHeight: 1.3 }}>
            Agiliza proyectos y baja el impuesto a las empresas de {reconstruccion.impuestoDesde}% a {reconstruccion.impuestoHasta}%.
          </div>
        </Glass>
      </Pop>
      <Pop at={cBarras - 4}>
        <Note style={{ marginTop: 30 }}>Crecimiento esperado por el Banco Central</Note>
      </Pop>
      <GlowBars
        width={900}
        height={450}
        max={3.6}
        items={[
          { label: "2026", range: crecimiento.proyeccion2026, tone: "warm", at: cBarras },
          { label: "2027", range: crecimiento.proyeccion2027, tone: "cool", at: cBarras + 10 },
          { label: "2028", range: crecimiento.proyeccion2028, tone: "cool", at: cBarras + 20 },
        ]}
      />
    </SceneShell>
  );
};

// ¿Y a ti, cómo te afecta?
export const ParaTi: React.FC = () => {
  const cPregunta = useCue("pregunta");
  const cSueldo = useCue("sueldo");
  const cCreditos = useCue("creditos");
  const cColchon = useCue("colchon");
  const ipc = inflacion.serie[inflacion.serie.length - 1].value;
  return (
    <SceneShell entrada="zoom">
      <IconGradients />
      <Title at={cPregunta + 4} gradient={gradients.brand} size={104}>
        ¿Y a ti, cómo te afecta?
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 10 }}>
        <Idea at={cSueldo} icon="billetera" tone="warm" title="Tu sueldo" text={`Si sube menos de ${fmt(ipc)}% al año, alcanza para menos.`} />
        <Idea at={cCreditos} icon="tarjeta" tone="cool" title="Tus créditos" text={`Con la tasa en ${fmt(tasa.tpm)}%, por ahora no se abaratan.`} />
        <Idea at={cColchon} icon="paraguas" tone="gold" title="Tu colchón" text="Ahorra para imprevistos: el empleo está más difícil." />
      </div>
    </SceneShell>
  );
};
