import type { InjectionPayload } from "../../server/frida-server";

interface InjectionResponse {
  success: boolean;
  result?: any;
  error?: string;
  timestamp: string;
}

class FridaClient {
  private baseUrl: string;

  constructor(baseUrl: string = "/api/injection") {
    this.baseUrl = baseUrl;
  }

  /**
   * Send injection command to Frida server
   */
  async execute(payload: InjectionPayload): Promise<InjectionResponse> {
    try {
      const response = await fetch("/api/injection/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.statusMessage || "Injection failed");
      }

      return await response.json();
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
   * Enable/Disable Aimbot
   */
  async setAimbot(enabled: boolean, config?: any): Promise<InjectionResponse> {
    return this.execute({
      type: "aimbot",
      action: enabled ? "enable" : "disable",
      params: config,
    });
  }

  /**
   * Update Aimbot configuration
   */
  async updateAimbot(config: any): Promise<InjectionResponse> {
    return this.execute({
      type: "aimbot",
      action: "update",
      params: config,
    });
  }

  /**
   * Enable/Disable ESP
   */
  async setESP(enabled: boolean, config?: any): Promise<InjectionResponse> {
    return this.execute({
      type: "esp",
      action: enabled ? "enable" : "disable",
      params: config,
    });
  }

  /**
   * Update ESP configuration
   */
  async updateESP(config: any): Promise<InjectionResponse> {
    return this.execute({
      type: "esp",
      action: "update",
      params: config,
    });
  }

  /**
   * Enable/Disable No Recoil
   */
  async setNoRecoil(enabled: boolean, config?: any): Promise<InjectionResponse> {
    return this.execute({
      type: "norecoil",
      action: enabled ? "enable" : "disable",
      params: config,
    });
  }

  /**
   * Update No Recoil configuration
   */
  async updateNoRecoil(config: any): Promise<InjectionResponse> {
    return this.execute({
      type: "norecoil",
      action: "update",
      params: config,
    });
  }
}

// Export singleton
export const fridaClient = new FridaClient();
export type { InjectionResponse };
