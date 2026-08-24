import { useEffect } from "react";
import { useArcxnjo } from "@/lib/store";

export function HydrateStore() {
  useEffect(() => {
    void useArcxnjo.persist.rehydrate();
  }, []);
  return null;
}
