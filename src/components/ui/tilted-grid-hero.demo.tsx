import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";

// Demo del componente tal como viene, para usarlo en una web con Tailwind.
// Unsplash no es accesible desde el contenedor donde se renderizan los videos,
// así que en la cápsula 02 se usan las piezas locales de public/tec02/piezas/.
const IMAGES = [
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80", alt: "Placa de circuitos en primer plano" },
  { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80", alt: "Pasillo de un centro de datos" },
  { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80", alt: "Código en un editor oscuro" },
  { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80", alt: "Red de conexiones sobre la Tierra" },
  { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80", alt: "Columnas de caracteres verdes" },
];

export default function TiltedGridHeroDemo() {
  return (
    <TiltedGridHero images={IMAGES} className="h-[560px] w-full rounded-lg border border-border bg-background">
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center">
        <div className="px-6">
          <h1 className="text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Every frame,
            <br />
            brought into focus.
          </h1>
        </div>
        <p className="max-w-md text-balance px-6 text-sm text-muted-foreground">
          Images curve in from one edge, flatten out at the centre, then fade away round the other.
        </p>
      </div>
    </TiltedGridHero>
  );
}
