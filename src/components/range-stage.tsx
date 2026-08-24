import { useArcxnjo } from "@/lib/store";
import { cn } from "@/lib/utils";

type Dummy = {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  dist: number;
  hp: number;
  team: boolean;
  visible: boolean;
};

const DUMMIES: Dummy[] = [
  { id: "a", name: "Riven", x: 18, y: 42, w: 11, h: 28, dist: 42, hp: 78, team: false, visible: true },
  { id: "b", name: "Kade", x: 48, y: 38, w: 9, h: 24, dist: 91, hp: 44, team: false, visible: false },
  { id: "c", name: "Nyx", x: 72, y: 46, w: 10, h: 26, dist: 63, hp: 96, team: true, visible: true },
];

export function RangeStage() {
  const { config, menuOpen, toggleMenu } = useArcxnjo();
  const { aimbot, esp } = config;

  const shown = DUMMIES.filter((d) => {
    if (!esp.enabled) return false;
    if (d.dist > esp.maxDistance) return false;
    if (esp.teamCheck && d.team) return false;
    if (esp.visibilityCheck && d.visible) return false;
    return true;
  });

  const fovScale = Math.min(90, Math.max(8, aimbot.fov * 0.42));

  return (
    <div className="relative z-0 min-h-dvh overflow-hidden bg-bg">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 100%, #141820 0%, #08090b 55%, #050506 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklab, var(--color-fg) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-fg) 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to top, black 10%, transparent 70%)",
        }}
      />

      {DUMMIES.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-sm bg-surface-2"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.w}%`,
            height: `${d.h}%`,
            opacity: d.visible ? 0.55 : 0.22,
          }}
        />
      ))}

      {aimbot.enabled ? (
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 rounded-full border border-accent/35"
          style={{
            width: `${fovScale}vmin`,
            height: `${fovScale}vmin`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : null}

      <div className="pointer-events-none absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute top-1/2 left-0 h-px w-full bg-fg/80" />
        <span className="absolute top-0 left-1/2 h-full w-px bg-fg/80" />
      </div>

      {!menuOpen
        ? shown.map((d) => <EspOverlay key={d.id} dummy={d} />)
        : null}

      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
        <p className="font-mono text-xs tracking-[0.22em] text-muted">ARCXNJO // RANGE</p>
        <button
          type="button"
          onClick={toggleMenu}
          className="pointer-events-auto min-h-11 rounded-sm border border-border bg-surface/80 px-3 font-mono text-xs text-fg backdrop-blur-sm"
        >
          {menuOpen ? "Fechar" : `${config.menuKey} · Menu`}
        </button>
      </div>

      {!menuOpen ? (
        <p className="absolute bottom-6 left-0 right-0 text-center font-mono text-xs text-muted">
          {config.menuKey} para abrir o painel
        </p>
      ) : null}
    </div>
  );
}

function EspOverlay({ dummy }: { dummy: Dummy }) {
  const esp = useArcxnjo((s) => s.config.esp);
  const box = dummy;

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: `${box.x}%`,
        top: `${box.y}%`,
        width: `${box.w}%`,
        height: `${box.h}%`,
      }}
    >
      {esp.snaplines ? (
        <span
          className="absolute left-1/2 top-full h-[40vh] w-px origin-top bg-accent/40"
          style={{ transform: "translateX(-50%)" }}
        />
      ) : null}

      {esp.box ? (
        esp.boxStyle === "Corner" ? (
          <CornerBox />
        ) : (
          <div
            className={cn(
              "absolute inset-0 border",
              esp.boxStyle === "3D" ? "border-accent/70 shadow-[inset_0_0_0_1px_rgba(197,204,214,0.15)]" : "border-accent/80",
            )}
          />
        )
      ) : null}

      {esp.skeleton ? (
        <svg className="absolute inset-[12%] text-accent/70" viewBox="0 0 40 80" fill="none">
          <circle cx="20" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 13 V42 M20 22 L8 34 M20 22 L32 34 M20 42 L10 70 M20 42 L30 70" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ) : null}

      {esp.healthBar ? (
        <div className="absolute top-0 -left-1.5 h-full w-1 overflow-hidden rounded-full bg-surface-2">
          <div className="absolute bottom-0 w-full bg-ok" style={{ height: `${dummy.hp}%` }} />
        </div>
      ) : null}

      {(esp.name || esp.distance) && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-fg">
          {esp.name ? dummy.name : null}
          {esp.name && esp.distance ? " · " : null}
          {esp.distance ? `${dummy.dist}m` : null}
        </div>
      )}
    </div>
  );
}

function CornerBox() {
  const arm = "w-2.5 h-2.5 border-accent";
  return (
    <>
      <span className={cn("absolute top-0 left-0 border-t border-l", arm)} />
      <span className={cn("absolute top-0 right-0 border-t border-r", arm)} />
      <span className={cn("absolute bottom-0 left-0 border-b border-l", arm)} />
      <span className={cn("absolute bottom-0 right-0 border-b border-r", arm)} />
    </>
  );
}
