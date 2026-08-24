import { Crosshair, Eye, RotateCcw, Settings2 } from "lucide-react";
import {
  AIM_MODES,
  AIM_PRIORITIES,
  AIM_TARGETS,
  ESP_BOXES,
  RECOIL_AXES,
  type PanelTab,
} from "@/lib/config";
import { useArcxnjo } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Section, SelectRow, SliderRow, ToggleRow } from "./controls";

const TABS: { id: PanelTab; label: string; icon: typeof Crosshair }[] = [
  { id: "aimbot", label: "Aimbot", icon: Crosshair },
  { id: "esp", label: "ESP", icon: Eye },
  { id: "norecoil", label: "No Recoil", icon: RotateCcw },
];

export function ArcxnjoPanel() {
  const { config, menuOpen, tab, capturingKey, setTab, setCapturingKey, patch, reset } =
    useArcxnjo();

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6",
        menuOpen ? "panel-enter" : "panel-exit",
      )}
      aria-hidden={!menuOpen}
    >
      <div
        className="pointer-events-auto flex w-full max-w-3xl max-h-[min(92dvh,720px)] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
        role="dialog"
        aria-label="Arcxnjo Painel"
      >
        <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="font-mono text-xs tracking-[0.28em] text-muted">PAINEL</p>
            <h1 className="truncate text-xl font-semibold tracking-tight text-fg">Arcxnjo</h1>
          </div>
          <div className="flex items-center gap-2">
            <StatusChip on={config.aimbot.enabled} label="AIM" />
            <StatusChip on={config.esp.enabled} label="ESP" />
            <StatusChip on={config.norecoil.enabled} label="RCL" />
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-border p-2 md:w-44 md:flex-col md:overflow-x-visible md:border-r md:border-b-0">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              const on =
                t.id === "aimbot"
                  ? config.aimbot.enabled
                  : t.id === "esp"
                    ? config.esp.enabled
                    : config.norecoil.enabled;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "flex min-h-11 min-w-28 items-center gap-2 rounded-md px-3 text-left text-sm font-medium transition-colors duration-150",
                    active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2/60 hover:text-fg",
                  )}
                >
                  <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                  <span className="flex-1">{t.label}</span>
                  <span
                    className={cn("size-1.5 rounded-full", on ? "bg-ok" : "bg-subtle")}
                    aria-hidden
                  />
                </button>
              );
            })}
          </nav>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
            {tab === "aimbot" ? <AimbotTab /> : null}
            {tab === "esp" ? <EspTab /> : null}
            {tab === "norecoil" ? <RecoilTab /> : null}
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-2.5 sm:px-5">
          <button
            type="button"
            onClick={() => setCapturingKey(true)}
            className="inline-flex min-h-10 items-center gap-2 rounded-sm px-2 font-mono text-xs text-muted hover:text-fg"
          >
            <Settings2 className="size-3.5" />
            {capturingKey ? (
              <span className="text-fg">Pressione uma tecla…</span>
            ) : (
              <span>
                {config.menuKey} <span className="text-subtle">abrir / fechar</span>
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={reset}
            className="min-h-10 rounded-sm px-3 font-mono text-xs text-muted hover:text-fg"
          >
            Reset
          </button>
        </footer>
      </div>
    </div>
  );
}

function StatusChip({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      className={cn(
        "hidden rounded-sm px-1.5 py-0.5 font-mono text-[10px] tracking-wider sm:inline",
        on ? "bg-ok/15 text-ok" : "bg-surface-2 text-subtle",
      )}
    >
      {label}
    </span>
  );
}

function AimbotTab() {
  const a = useArcxnjo((s) => s.config.aimbot);
  const patch = useArcxnjo((s) => s.patch);
  const set = (partial: Partial<typeof a>) =>
    patch((c) => ({ ...c, aimbot: { ...c.aimbot, ...partial } }));

  return (
    <div className="space-y-6">
      <Section title="Geral">
        <ToggleRow label="Enable" checked={a.enabled} onChange={(v) => set({ enabled: v })} />
        <SelectRow label="Mode" value={a.mode} options={AIM_MODES} onChange={(v) => set({ mode: v })} />
      </Section>
      <Section title="Aim">
        <SliderRow label="FOV" value={a.fov} min={1} max={180} onChange={(v) => set({ fov: v })} />
        <SliderRow label="Smooth" value={a.smooth} min={1} max={20} onChange={(v) => set({ smooth: v })} />
        <SliderRow label="Speed" value={a.speed} min={1} max={20} onChange={(v) => set({ speed: v })} />
        <SelectRow
          label="Target"
          value={a.target}
          options={AIM_TARGETS}
          onChange={(v) => set({ target: v })}
        />
        <SelectRow
          label="Priority"
          value={a.priority}
          options={AIM_PRIORITIES}
          onChange={(v) => set({ priority: v })}
        />
      </Section>
      <Section title="Conditions">
        <ToggleRow
          label="Visibility Check"
          hint="Só mira em alvos visíveis"
          checked={a.visibilityCheck}
          onChange={(v) => set({ visibilityCheck: v })}
        />
        <ToggleRow
          label="Team Check"
          hint="Ignora aliados"
          checked={a.teamCheck}
          onChange={(v) => set({ teamCheck: v })}
        />
        <ToggleRow
          label="Only while aiming"
          checked={a.onlyWhileAiming}
          onChange={(v) => set({ onlyWhileAiming: v })}
        />
        <ToggleRow
          label="Only while shooting"
          checked={a.onlyWhileShooting}
          onChange={(v) => set({ onlyWhileShooting: v })}
        />
        <SliderRow
          label="Max Distance"
          value={a.maxDistance}
          min={10}
          max={500}
          suffix="m"
          onChange={(v) => set({ maxDistance: v })}
        />
        <SliderRow
          label="Switch Delay"
          value={a.switchDelay}
          min={0}
          max={400}
          suffix="ms"
          onChange={(v) => set({ switchDelay: v })}
        />
      </Section>
    </div>
  );
}

function EspTab() {
  const e = useArcxnjo((s) => s.config.esp);
  const patch = useArcxnjo((s) => s.patch);
  const set = (partial: Partial<typeof e>) =>
    patch((c) => ({ ...c, esp: { ...c.esp, ...partial } }));

  return (
    <div className="space-y-6">
      <Section title="Geral">
        <ToggleRow label="Enable" checked={e.enabled} onChange={(v) => set({ enabled: v })} />
        <ToggleRow label="Box" checked={e.box} onChange={(v) => set({ box: v })} />
        <SelectRow
          label="Box Style"
          value={e.boxStyle}
          options={ESP_BOXES}
          onChange={(v) => set({ boxStyle: v })}
        />
        <ToggleRow label="Skeleton" checked={e.skeleton} onChange={(v) => set({ skeleton: v })} />
      </Section>
      <Section title="Info">
        <ToggleRow label="Name" checked={e.name} onChange={(v) => set({ name: v })} />
        <ToggleRow label="Health Bar" checked={e.healthBar} onChange={(v) => set({ healthBar: v })} />
        <ToggleRow label="Distance" checked={e.distance} onChange={(v) => set({ distance: v })} />
        <ToggleRow label="Snaplines" checked={e.snaplines} onChange={(v) => set({ snaplines: v })} />
      </Section>
      <Section title="Filters">
        <ToggleRow label="Team Check" checked={e.teamCheck} onChange={(v) => set({ teamCheck: v })} />
        <ToggleRow
          label="Visibility Check"
          hint="Mostrar só atrás da parede"
          checked={e.visibilityCheck}
          onChange={(v) => set({ visibilityCheck: v })}
        />
        <SliderRow
          label="Max Distance"
          value={e.maxDistance}
          min={20}
          max={800}
          suffix="m"
          onChange={(v) => set({ maxDistance: v })}
        />
      </Section>
    </div>
  );
}

function RecoilTab() {
  const r = useArcxnjo((s) => s.config.norecoil);
  const patch = useArcxnjo((s) => s.patch);
  const set = (partial: Partial<typeof r>) =>
    patch((c) => ({ ...c, norecoil: { ...c.norecoil, ...partial } }));

  return (
    <div className="space-y-6">
      <Section title="Geral">
        <ToggleRow label="Enable" checked={r.enabled} onChange={(v) => set({ enabled: v })} />
        <SelectRow
          label="Axis"
          value={r.axis}
          options={RECOIL_AXES}
          onChange={(v) => set({ axis: v })}
        />
      </Section>
      <Section title="Compensation">
        <SliderRow
          label="Strength"
          value={r.strength}
          min={0}
          max={100}
          suffix="%"
          onChange={(v) => set({ strength: v })}
        />
        <SliderRow
          label="Smooth"
          value={r.smooth}
          min={0}
          max={100}
          onChange={(v) => set({ smooth: v })}
        />
      </Section>
    </div>
  );
}
