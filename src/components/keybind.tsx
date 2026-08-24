import { useEffect } from "react";
import { useArcxnjo } from "@/lib/store";

function normalizeKey(e: KeyboardEvent): string {
  if (e.key === "Insert") return "Insert";
  if (e.key === "Escape") return "Escape";
  if (e.key === " ") return "Space";
  if (e.key.length === 1) return e.key.toUpperCase();
  return e.key;
}

export function KeybindListener() {
  const { config, capturingKey, toggleMenu, setCapturingKey, patch } = useArcxnjo();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "SELECT" || target.tagName === "TEXTAREA")) {
        return;
      }

      const name = normalizeKey(e);

      if (capturingKey) {
        e.preventDefault();
        patch((c) => ({ ...c, menuKey: name }));
        setCapturingKey(false);
        return;
      }

      if (name === config.menuKey) {
        e.preventDefault();
        toggleMenu();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [capturingKey, config.menuKey, patch, setCapturingKey, toggleMenu]);

  return null;
}
