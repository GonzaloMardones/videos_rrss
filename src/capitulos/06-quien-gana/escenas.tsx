import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { clamp, Pop, useEase, useSpring, WordsIn } from "../../components/motion";
import { useCue, useCueAt } from "../../components/narracion";
import { Counter, fmt, Glass, GradientText, Note } from "../../components/ui";
import { Title } from "../../components/comun";
import {
  Alerta,
  Billetera,
  Bolsa,
  Candado,
  Documento,
  Edificio,
  Flecha,
  Intercambio,
  Jubilado,
  Martillo,
  Moneda,
  paletas,
  Persona,
  Puerta,
} from "../../components/iconos";
import { colors, fonts, gradients } from "../../theme";
import { calculo, comisiones, contrapartes, duenos, duenosFuente, fondoEfuente, fondoEporAFP, politica, resultadosAFP } from "./data";

const big: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 800, letterSpacing: -5, lineHeight: 1 };

const Float: React.FC<{ children: React.ReactNode; amp?: number; phase?: number }> = ({ children, amp = 10, phase = 0 }) => {
  const frame = useCurrentFrame();
  return <div style={{ transform: `translateY(${Math.sin(frame * 0.06 + phase) * amp}px)` }}>{children}</div>;
};

const Etiq: React.FC<{ children: React.ReactNode; color?: string; size?: number }> = ({ children, color = colors.dim, size = 34 }) => (
  <div style={{ fontFamily: fonts.display, fontSize: size, fontWeight: 700, color, textAlign: "center", whiteSpace: "nowrap" }}>{children}</div>
);

// Barra horizontal con etiqueta, valor y resorte propio.
const Fila: React.FC<{
  at: number;
  etiqueta: string;
  valor: number;
  max: number;
  texto: string;
  gradient: string;
  ancho?: number;
  anchoEtiqueta?: number;
  destacada?: boolean;
}> = ({ at, etiqueta, valor, max, texto, gradient, ancho = 520, anchoEtiqueta = 170, destacada = false }) => {
  const p = useSpring(at, { damping: 16 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: Math.min(1, p * 2) }}>
      <div style={{ width: anchoEtiqueta, fontFamily: fonts.display, fontSize: 32, fontWeight: 700, color: destacada ? colors.text : colors.dim, whiteSpace: "nowrap" }}>{etiqueta}</div>
      <div style={{ height: 46, width: Math.max(8, (valor / max) * ancho * p), borderRadius: 14, background: gradient, boxShadow: destacada ? "0 0 30px rgba(255,193,94,0.6)" : "none" }} />
      <div style={{ ...big, fontSize: 40, letterSpacing: -1, whiteSpace: "nowrap", opacity: p }}>{texto}</div>
    </div>
  );
};

// Gancho: los ahorros de la gente caen; ¿y las administradoras?
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const cPerd = useCue("perdieron");
  const cCae = useCueAt("perdieron", 0.45);
  const cCuanto = useCue("cuanto");
  const cae = useEase(cCae, 40);
  const latido = 1 + 0.04 * Math.sin(frame * 0.2);
  return (
    <SceneShell entrada="none">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 50 }}>
        <Pop at={cPerd} from="zoom">
          <div style={{ display: "flex", alignItems: "flex-end", gap: 40 }}>
            <Persona size={170} />
            <div style={{ transform: `translateY(${cae * 70}px) rotate(${cae * 20}deg)`, opacity: 1 - cae * 0.4 }}>
              <Bolsa size={170} />
            </div>
            <Jubilado size={170} />
          </div>
        </Pop>
        <Pop at={cCae} from="zoom" style={{ textAlign: "center" }}>
          <div style={{ ...big, fontSize: 170, letterSpacing: -8 }}>
            <GradientText gradient={gradients.warm}>
              −US$<Counter to={7.7} at={cCae} duration={36} decimals={1} /> mil
            </GradientText>
          </div>
          <Note style={{ fontSize: 38 }}>millones de los ahorros de la gente</Note>
        </Pop>
        <Pop at={cCuanto} from="zoom" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Edificio size={150} paleta={paletas.calido} />
          <div style={{ ...big, fontSize: 110, transform: `scale(${latido})` }}>
            <GradientText gradient={gradients.cool}>¿Y a ellas?</GradientText>
          </div>
        </Pop>
      </div>
    </SceneShell>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ serie, autor }) => (
  <SceneShell entrada="zoom">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
      <Pop at={2}>
        <div style={{ fontFamily: fonts.display, fontSize: 40, fontWeight: 600, color: colors.dim }}>{serie} · Capítulo 6</div>
      </Pop>
      <div style={{ ...big, letterSpacing: -6, lineHeight: 0.98 }}>
        <Pop at={4} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ fontSize: 170, letterSpacing: -8 }}>
            <GradientText gradient={gradients.gold}>¿Quién gana</GradientText>
          </div>
        </Pop>
        <WordsIn at={12} stagger={3} text="cuando el fondo pierde?" style={{ fontSize: 118, display: "block", marginTop: 10 }} />
      </div>
      <Pop at={24}>
        <Note style={{ fontSize: 30, marginTop: 20 }}>por {autor}</Note>
      </Pop>
    </div>
  </SceneShell>
);

// La comisión se cobra sobre el sueldo: barras por AFP.
export const Comision: React.FC = () => {
  const frame = useCurrentFrame();
  const cCom = useCue("comision");
  const cSueldo = useCueAt("comision", 0.5);
  const cRango = useCue("rango");
  const cMisma = useCue("misma");
  const tiembla = frame >= cMisma ? Math.sin(frame * 0.5) * 6 : 0;
  return (
    <SceneShell entrada="rise" source={comisiones.fuente}>
      <Title at={cCom} gradient={gradients.gold} size={104} sub="un porcentaje de tu sueldo, cada mes">
        La comisión
      </Title>
      <Pop at={cSueldo} from="left" style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 0 }}>
        <Billetera size={120} />
        <div style={{ transform: "rotate(0deg)" }}>
          <Flecha up={false} color={colors.gold} size={50} />
        </div>
        <Edificio size={120} paleta={paletas.calido} />
        <Note style={{ fontSize: 32, marginLeft: 10 }}>del sueldo, no del ahorro</Note>
      </Pop>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 30 }}>
        {comisiones.porAFP.map((c, i) => (
          <Fila key={c.afp} at={cRango + i * 4} etiqueta={c.afp} valor={c.pct} max={1.6} texto={`${fmt(c.pct, 2)}%`} gradient={gradients.gold} />
        ))}
      </div>
      <Pop at={cMisma} from="zoom" style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ transform: `translateY(${tiembla}px)` }}>
          <Flecha up color={colors.cyan} size={60} />
        </div>
        <div style={{ transform: `translateY(${-tiembla}px)` }}>
          <Flecha up={false} color={colors.pink} size={60} />
        </div>
        <div style={{ ...big, fontSize: 64, letterSpacing: -2 }}>
          <GradientText gradient={gradients.gold}>misma comisión</GradientText>
        </div>
      </Pop>
    </SceneShell>
  );
};

// Ingresos y utilidades del primer semestre, mientras el fondo E caía.
export const Utilidades: React.FC = () => {
  const cIng = useCueAt("ingresos", 0.55);
  const cCaia = useCueAt("ingresos", 0.3);
  const cGan = useCue("ganaron");
  const cMas = useCueAt("ganaron", 0.6);
  const cae = useEase(cCaia, 30);
  const bloque = (at: number, valor: number, texto: string, gradient: string, icono: React.ReactNode) => (
    <Pop at={at} from="left">
      <Glass style={{ display: "flex", alignItems: "center", gap: 26, padding: "24px 30px" }}>
        <div style={{ width: 150, display: "flex", justifyContent: "center" }}>{icono}</div>
        <div>
          <div style={{ ...big, fontSize: 96, letterSpacing: -4, whiteSpace: "nowrap" }}>
            <GradientText gradient={gradient}>
              $<Counter to={valor / 1000} at={at} duration={30} decimals={0} /> mil
            </GradientText>
            <span style={{ fontSize: 40, color: colors.dim, letterSpacing: -1 }}> millones</span>
          </div>
          <Note style={{ fontSize: 30 }}>{texto}</Note>
        </div>
      </Glass>
    </Pop>
  );
  return (
    <SceneShell entrada="slide" source={resultadosAFP.fuente}>
      <Title at={useCue("ingresos")} gradient={gradients.gold} size={104} sub="primer semestre 2026 · las siete AFP">
        Mientras tanto
      </Title>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <div style={{ transform: `translateY(${cae * 24}px)` }}>
          <Jubilado size={110} />
        </div>
        <div style={{ width: 220, height: 20, borderRadius: 10, background: colors.glass, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${100 - cae * 10.4 * 3}%`, background: gradients.warm }} />
        </div>
        <Note style={{ fontSize: 30, opacity: cae }}>fondo E: −10,4%</Note>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {bloque(cIng, resultadosAFP.ingresosMM, "ingresaron", gradients.cool, <Billetera size={120} paleta={paletas.frio} />)}
        {bloque(cGan, resultadosAFP.utilidadesMM, "ganaron", gradients.gold, <Bolsa size={130} />)}
      </div>
      <Pop at={cMas} from="zoom" style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 20 }}>
        <Flecha up color="#7CF29A" size={70} />
        <div style={{ ...big, fontSize: 96, letterSpacing: -4 }}>
          <GradientText gradient={gradients.gold}>+{fmt(resultadosAFP.variacion)}%</GradientText>
        </div>
        <Note style={{ fontSize: 32 }}>que el año anterior</Note>
      </Pop>
    </SceneShell>
  );
};

// El encaje: el 1% propio, lo que pierden en el fondo E y la regla relativa.
export const Encaje: React.FC = () => {
  const frame = useCurrentFrame();
  const cEnc = useCue("encaje");
  const cUno = useCueAt("encaje", 0.7);
  const c28 = useCueAt("veintiocho", 0.4);
  const cMin = useCue("minima");
  const cJuntas = useCueAt("minima", 0.6);
  const rebana = useSpring(cUno, { damping: 14 });
  const caen = useEase(cJuntas, 30);
  const W = 900;
  return (
    <SceneShell entrada="zoom" source={`${resultadosAFP.fuente} · ${calculo.fuente}`}>
      <Title at={cEnc} gradient={gradients.cool} size={104} sub="1% de cada fondo con plata propia">
        El encaje
      </Title>
      <Pop at={cEnc + 8} style={{ position: "relative", height: 90, width: W }}>
        <div style={{ position: "absolute", left: 0, top: 10, height: 70, width: W, borderRadius: 18, background: colors.glass, border: `1.5px solid ${colors.line}` }} />
        <div style={{ position: "absolute", left: 0, top: 10, height: 70, width: W * 0.99, borderRadius: "18px 0 0 18px", background: gradients.cool, opacity: 0.5 }} />
        <div style={{ position: "absolute", right: 0, top: 10 - 20 * rebana, height: 70, width: W * 0.01 + 10, background: gradients.gold, borderRadius: "0 18px 18px 0", boxShadow: `0 0 ${30 * rebana}px ${colors.gold}` }} />
        <div style={{ position: "absolute", right: -10, top: -56, ...big, fontSize: 48, letterSpacing: -1, color: colors.gold, opacity: rebana }}>1%</div>
        <div style={{ position: "absolute", left: 24, top: 24, fontSize: 30, fontWeight: 700, color: colors.text }}>ahorros de los afiliados</div>
      </Pop>
      <Pop at={c28} from="left" style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 30 }}>
        <Edificio size={120} paleta={paletas.calido} />
        <div>
          <div style={{ ...big, fontSize: 96, letterSpacing: -4 }}>
            <GradientText gradient={gradients.warm}>
              −US$<Counter to={calculo.perdidaEncajeEUSD} at={c28} duration={26} decimals={0} /> M
            </GradientText>
          </div>
          <Note style={{ fontSize: 30 }}>encaje del fondo E, las siete juntas</Note>
        </div>
      </Pop>
      <Pop at={cMin} style={{ marginTop: 40 }}>
        <Note style={{ fontSize: 32, marginBottom: 12 }}>rentabilidad mínima: cada AFP frente al promedio</Note>
        <div style={{ position: "relative", height: 200 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 70 + caen * 60, height: 4, borderTop: `4px dashed ${colors.faint}` }} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{ position: "absolute", left: 20 + i * 125, top: 20 + caen * 60 + Math.sin(i * 1.7) * 8, transform: `rotate(${Math.sin(frame * 0.1 + i) * 2}deg)` }}>
              <Edificio size={100} paleta={paletas.frio} />
            </div>
          ))}
        </div>
        <Pop at={cJuntas + 20} from="zoom">
          <div style={{ ...big, fontSize: 60, letterSpacing: -2, textAlign: "center" }}>
            <GradientText gradient={gradients.cool}>todas bajan → nadie compensa</GradientText>
          </div>
        </Pop>
      </Pop>
    </SceneShell>
  );
};

// Bonos: información reservada.
export const Bonos: React.FC = () => {
  const frame = useCurrentFrame();
  const cBonos = useCue("bonos");
  const cReservada = useCueAt("bonos", 0.6);
  const cMarcel = useCue("marcel");
  const cNoHay = useCueAt("marcel", 0.5);
  const giro = Math.sin(frame * 0.12) * 10;
  return (
    <SceneShell entrada="tilt" source="The Clinic · El Dínamo · El Clarín (oct. 2026)">
      <Title at={cBonos} gradient={gradients.warm} size={104}>
        ¿Y los bonos?
      </Title>
      <Pop at={cBonos + 6} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 30, marginTop: 10 }}>
        <Persona size={150} paleta={paletas.calido} />
        <Float>
          <Bolsa size={150} />
        </Float>
        <div style={{ ...big, fontSize: 150, color: colors.gold, transform: `rotate(${giro}deg)` }}>?</div>
      </Pop>
      <Pop at={cReservada} from="zoom" style={{ marginTop: 30 }}>
        <Glass style={{ display: "flex", alignItems: "center", gap: 26, padding: "26px 32px" }}>
          <Candado size={110} paleta={paletas.frio} />
          <div>
            <Etiq color={colors.text} size={44}>
              información reservada
            </Etiq>
            <Note style={{ fontSize: 30 }}>no se publica cómo se pagan</Note>
          </div>
        </Glass>
      </Pop>
      <Pop at={cMarcel} from="left" style={{ marginTop: 26 }}>
        <Glass style={{ display: "flex", alignItems: "center", gap: 26, padding: "26px 32px" }}>
          <Documento size={110} />
          <div>
            <Etiq color={colors.text} size={40}>
              "conocer los esquemas de bonos"
            </Etiq>
            <Note style={{ fontSize: 30 }}>Mario Marcel, exministro de Hacienda</Note>
          </div>
        </Glass>
      </Pop>
      <Pop at={cNoHay} from="zoom" style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 20 }}>
        <Alerta size={100} paleta={paletas.frio} />
        <Note style={{ fontSize: 34, maxWidth: 700 }}>sin antecedentes públicos que liguen bonos a estas operaciones</Note>
      </Pop>
    </SceneShell>
  );
};

// Las siete cayeron casi igual.
export const Iguales: React.FC = () => {
  const cTodas = useCue("todas");
  const cSiete = useCueAt("todas", 0.6);
  const cPunto = useCue("punto");
  const cBrecha = useCueAt("punto", 0.8);
  return (
    <SceneShell entrada="rise" source={fondoEfuente}>
      <Title at={cTodas} gradient={gradients.warm} size={104} sub="fondo E · enero a septiembre 2026">
        ¿Todas?
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
        {fondoEporAFP.map((f, i) => (
          <Fila
            key={f.afp}
            at={cSiete + i * 4}
            etiqueta={f.afp}
            valor={Math.abs(f.pct)}
            max={12}
            texto={`−${fmt(Math.abs(f.pct))}%`}
            gradient={gradients.warm}
            destacada={i === 0 || i === fondoEporAFP.length - 1}
          />
        ))}
      </div>
      <Pop at={cBrecha} from="zoom" style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ ...big, fontSize: 130, letterSpacing: -6 }}>
          <GradientText gradient={gradients.gold}>{fmt(calculo.brecha)} pto</GradientText>
        </div>
        <Note style={{ fontSize: 34, maxWidth: 420 }}>entre la peor y la mejor</Note>
        <div style={{ opacity: cPunto > 0 ? 0.7 : 0 }}>
          <Intercambio size={100} />
        </div>
      </Pop>
    </SceneShell>
  );
};

// Al otro lado del swap: los bancos y los dueños de las AFP.
export const OtroLado: React.FC = () => {
  const frame = useCurrentFrame();
  const cSuma = useCue("sumacero");
  const cGana = useCueAt("sumacero", 0.65);
  const cBancos = useCue("bancos");
  const cDuenos = useCue("duenos");
  const cSin = useCue("sinvinculo");
  const pasa = useEase(cGana, 30);
  const giro = frame * 2;
  return (
    <SceneShell entrada="slide" source={`${contrapartes.fuente} · ${duenosFuente}`}>
      <Title at={cSuma} gradient={gradients.cool} size={104}>
        Al otro lado
      </Title>
      <Pop at={cSuma + 6} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: -10 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Edificio size={130} paleta={paletas.calido} />
          <Etiq size={28}>fondo</Etiq>
        </div>
        <div style={{ position: "relative", width: 300, height: 130, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `rotate(${giro}deg)` }}>
            <Intercambio size={120} />
          </div>
          <div style={{ position: "absolute", left: interpolate(pasa, [0, 1], [0, 220]), top: 0, opacity: pasa > 0 ? 1 : 0 }}>
            <Moneda size={70} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Edificio size={130} paleta={paletas.frio} />
          <Etiq size={28}>banco</Etiq>
        </div>
      </Pop>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
        {contrapartes.bancos.slice(0, 4).map((b, i) => (
          <Fila key={b.nombre} at={cBancos + i * 5} etiqueta={b.nombre} valor={b.mmusd} max={1600} texto={`US$${fmt(b.mmusd, 0)} M`} gradient={gradients.cool} ancho={330} anchoEtiqueta={290} />
        ))}
      </div>
      <Pop at={cDuenos} style={{ marginTop: 26 }}>
        <Note style={{ fontSize: 30, marginBottom: 10 }}>¿de quién son las AFP?</Note>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {duenos.map((d, i) => (
            <Pop key={d.afp} at={cDuenos + 4 + i * 3} from="up">
              <Glass style={{ padding: "12px 20px", borderRadius: 20 }}>
                <div style={{ fontSize: 24, color: colors.dim }}>{d.afp}</div>
                <div style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, whiteSpace: "nowrap" }}>{d.grupo}</div>
              </Glass>
            </Pop>
          ))}
        </div>
      </Pop>
      <Pop at={cSin} from="zoom" style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 16 }}>
        <Alerta size={80} paleta={paletas.frio} />
        <Note style={{ fontSize: 30 }}>sin evidencia pública de vínculos con esos bancos</Note>
      </Pop>
    </SceneShell>
  );
};

// El lado político: puerta giratoria, culpas cruzadas y Fiscalía.
export const Politica: React.FC = () => {
  const frame = useCurrentFrame();
  const cPuerta = useCue("puerta");
  const cCulpa = useCue("culpa");
  const cResponde = useCueAt("culpa", 0.55);
  const cFiscalia = useCue("fiscalia");
  const giro = interpolate(frame, [cPuerta, cPuerta + 120], [0, 360], clamp);
  const empuja = useSpring(cCulpa + 6, { damping: 9 });
  const devuelve = useSpring(cResponde, { damping: 9 });
  const golpe = useSpring(cFiscalia + 6, { damping: 8 });
  return (
    <SceneShell entrada="zoom" source={`${politica.fuente} · superintendente: ${politica.superintendente}`}>
      <Title at={cPuerta} gradient={gradients.warm} size={104}>
        El lado político
      </Title>
      <Pop at={cPuerta + 6}>
        <Glass style={{ display: "flex", alignItems: "center", gap: 26, padding: "22px 30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Edificio size={90} paleta={paletas.calido} />
            <Puerta size={120} giro={giro} />
            <Edificio size={90} paleta={paletas.frio} />
          </div>
          <div>
            <Etiq color={colors.text} size={38}>
              de la AFP al regulador
            </Etiq>
            <Note style={{ fontSize: 28, marginTop: 4 }}>críticos hablan de "puerta giratoria"</Note>
          </div>
        </Glass>
      </Pop>
      <Pop at={cCulpa} style={{ marginTop: 24 }}>
        <Glass style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 30px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `translateX(${empuja * 24 - devuelve * 24}px)` }}>
            <Edificio size={110} paleta={paletas.calido} />
            <Etiq size={26}>gobierno</Etiq>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ transform: `rotate(90deg) scaleX(${empuja})`, opacity: empuja }}>
              <Flecha up color={colors.pink} size={54} />
            </div>
            <Etiq size={28} color={colors.text}>
              "fue el anterior"
            </Etiq>
            <div style={{ transform: `rotate(-90deg) scaleX(${devuelve})`, opacity: devuelve }}>
              <Flecha up color={colors.cyan} size={54} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `translateX(${devuelve * -24 + empuja * 24}px)` }}>
            <Edificio size={110} paleta={paletas.frio} />
            <Etiq size={26}>anterior</Etiq>
          </div>
        </Glass>
      </Pop>
      <Pop at={cFiscalia} style={{ marginTop: 24 }}>
        <Glass style={{ display: "flex", alignItems: "center", gap: 26, padding: "22px 30px" }}>
          <div style={{ transform: `rotate(${(1 - golpe) * -30}deg)`, transformOrigin: "80% 80%" }}>
            <Martillo size={110} />
          </div>
          <div>
            <Etiq color={colors.text} size={38}>
              Fiscalía y Congreso
            </Etiq>
            <Note style={{ fontSize: 28, marginTop: 4 }}>denuncias por administración desleal · comisión investigadora en trámite</Note>
          </div>
        </Glass>
      </Pop>
    </SceneShell>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const frame = useCurrentFrame();
  const cDiseno = useCue("diseno");
  const cTres = useCueAt("diseno", 0.6);
  const cProp = useCue("propuestas");
  const cCta = useCue("cta");
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.18);
  const chip = (at: number, icono: React.ReactNode, texto: string) => (
    <Pop at={at} from="up" style={{ flex: 1 }}>
      <Glass style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "18px 10px", height: 190, justifyContent: "center" }}>
        {icono}
        <Etiq color={colors.text} size={26}>
          {texto}
        </Etiq>
      </Glass>
    </Pop>
  );
  return (
    <SceneShell entrada="zoom">
      <Title at={cDiseno} gradient={gradients.gold} size={100}>
        Incentivos mal alineados
      </Title>
      <div style={{ display: "flex", gap: 14 }}>
        {chip(cTres, <Billetera size={90} />, "comisión fija")}
        {chip(cTres + 6, <Edificio size={90} paleta={paletas.frio} />, "pérdidas juntas")}
        {chip(cTres + 12, <Candado size={80} />, "bonos reservados")}
      </div>
      <Pop at={cProp} style={{ marginTop: 34 }}>
        <Note style={{ fontSize: 30, marginBottom: 12 }}>lo que se discute</Note>
        <div style={{ display: "flex", gap: 14 }}>
          {chip(cProp + 4, <Bolsa size={90} />, "cobrar sobre el saldo")}
          {chip(cProp + 10, <Documento size={90} />, "bonos públicos")}
          {chip(cProp + 16, <Intercambio size={90} paleta={paletas.calido} />, "límites de duración")}
        </div>
      </Pop>
      <Pop at={cCta} from="zoom" style={{ marginTop: 44 }}>
        <div
          style={{
            display: "inline-flex",
            padding: "24px 40px",
            borderRadius: 999,
            background: gradients.brand,
            color: colors.bg,
            fontFamily: fonts.display,
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: -1,
            whiteSpace: "nowrap",
            boxShadow: `0 0 ${50 + 40 * pulse}px rgba(255,77,141,${0.35 + 0.3 * pulse})`,
          }}
        >
          Compártelo · Sígueme →
        </div>
      </Pop>
      <Pop at={cCta + 8}>
        <Note style={{ fontSize: 30, marginTop: 18 }}>{autor}</Note>
      </Pop>
    </SceneShell>
  );
};
