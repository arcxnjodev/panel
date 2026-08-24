import { createFileRoute } from "@tanstack/react-router";
import { ArcxnjoPanel } from "@/components/arcxnjo-panel";
import { HydrateStore } from "@/components/hydrate-store";
import { KeybindListener } from "@/components/keybind";
import { RangeStage } from "@/components/range-stage";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="relative min-h-dvh bg-bg text-fg">
      <HydrateStore />
      <KeybindListener />
      <RangeStage />
      <ArcxnjoPanel />
    </main>
  );
}
