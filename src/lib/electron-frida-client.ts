/**
 * Electron Frida Integration Hook
 * Uses IPC to communicate with main process for Frida commands
 */

interface ElectronAPI {
  frida: {
    execute: (payload: InjectionPayload) => Promise<InjectionResponse>;
    getStatus: () => Promise<{ connected: boolean; message: string }>;
    disconnect: () => Promise<{ success: boolean }>;
  };
}

declare global {
  interface Window {
    electron?: ElectronAPI;
  }
}

import type { InjectionPayload, InjectionResponse } from "../server/frida-server";

/**
 * Electron-aware Frida client that uses IPC instead of fetch
 */
export class ElectronFridaClient {
  private isElectron: boolean;

  constructor() {
    this.isElectron = typeof window !== "undefined" && !!(window as any).electron;
  }

  /**
   * Execute command via Electron IPC or fallback to HTTP
   */
  async execute(payload: InjectionPayload): Promise<InjectionResponse> {
    try {
      if (this.isElectron && (window as any).electron) {
        // Use Electron IPC (faster, no network overhead)
        const result = await (window as any).electron.frida.execute(payload);
        return {
          success: result.success,
          result: result.result,
          timestamp: new Date().toISOString(),
        };
      } else {
        // Fallback to HTTP API
        const response = await fetch("/api/injection/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("API request failed");
        return await response.json();
      }
    } catch (error) {
      console.error("[FridaClient] Error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Get Frida connection status
   */
  async getStatus(): Promise<{ connected: boolean; message: string }> {
    if (this.isElectron && (window as any).electron) {
      return await (window as any).electron.frida.getStatus();
    }

    try {
      const response = await fetch("/api/injection/status");
      return await response.json();
    } catch {
      return { connected: false, message: "Connection failed" };
    }
  }

  /**
   * Disconnect from Frida
   */
  async disconnect(): Promise<{ success: boolean }> {
    if (this.isElectron && (window as any).electron) {
      return await (window as any).electron.frida.disconnect();
    }

    try {
      const response = await fetch("/api/injection/disconnect", { method: "POST" });
      return await response.json();
    } catch {
      return { success: false };
    }
  }
}

// Export singleton
export const electronFridaClient = new ElectronFridaClient();
