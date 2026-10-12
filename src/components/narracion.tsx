import React, { createContext, useContext } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export type Frase = { escena: string; inicio: number; fin: number; texto: string; cue: string | null };
export type Timeline = {
  duracion: number;
  escenas: { id: string; inicio: number; fin: number }[];
  frases: Frase[];
};

type SceneInfo = { id: string; from: number; duration: number; timeline: Timeline };

const SceneContext = createContext<SceneInfo | null>(null);

export const SceneProvider: React.FC<SceneInfo & { children: React.ReactNode }> = ({ children, ...info }) => (
  <SceneContext.Provider value={info}>{children}</SceneContext.Provider>
);

export const useScene = (): SceneInfo => {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error("useScene debe usarse dentro de una escena");
  return ctx;
};

// Frame (relativo a la escena) en que la voz empieza a decir la frase marcada con `cue`.
export const useCue = (cue: string, offset = 0): number => {
  const { fps } = useVideoConfig();
  const { id, from, timeline } = useScene();
  const frase = timeline.frases.find((f) => f.escena === id && f.cue === cue);
  if (!frase) throw new Error(`No existe el cue "${cue}" en la escena "${id}"`);
  return Math.round(frase.inicio * fps) - from + offset;
};

// Frame en un punto intermedio de la frase (0 = inicio, 1 = fin), para sincronizar con una palabra.
export const useCueAt = (cue: string, fraccion: number): number => {
  const { fps } = useVideoConfig();
  const { id, from, timeline } = useScene();
  const frase = timeline.frases.find((f) => f.escena === id && f.cue === cue);
  if (!frase) throw new Error(`No existe el cue "${cue}" en la escena "${id}"`);
  return Math.round((frase.inicio + (frase.fin - frase.inicio) * fraccion) * fps) - from;
};

// Frames transcurridos desde un cue (negativo si aún no llega).
export const useSinceCue = (cue: string, offset = 0): number => {
  const frame = useCurrentFrame();
  return frame - useCue(cue, offset);
};
