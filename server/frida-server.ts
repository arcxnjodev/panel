import Frida from "frida";
import * as fs from "fs";
import * as path from "path";

interface FridaConfig {
  processName: string;
  host: string;
  port: number;
}

interface InjectionPayload {
  type: "aimbot" | "esp" | "norecoil" | "command";
  action: string;
  params?: Record<string, any>;
}

class FridaInjectionServer {
  private device: any;
  private session: any;
  private script: any;
  private config: FridaConfig;

  constructor(config: FridaConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    try {
      // Get local device (emulator)
      this.device = await Frida.getLocalDevice();
      console.log("[Frida] Device connected:", this.device.name);
    } catch (error) {
      console.error("[Frida] Failed to connect to device:", error);
      throw error;
    }
  }

  async attachToProcess(): Promise<void> {
    try {
      // Find and attach to FF process
      const processes = await this.device.enumerateProcesses();
      const ffProcess = processes.find((p: any) =>
        p.name.toLowerCase().includes(this.config.processName.toLowerCase())
      );

      if (!ffProcess) {
        throw new Error(
          `Process "${this.config.processName}" not found. Available: ${processes.map((p: any) => p.name).join(", ")}`
        );
      }

      console.log(`[Frida] Attaching to ${ffProcess.name} (PID: ${ffProcess.pid})`);
      this.session = await this.device.attach(ffProcess.pid);
      console.log("[Frida] Session established");
    } catch (error) {
      console.error("[Frida] Failed to attach to process:", error);
      throw error;
    }
  }

  async injectScript(): Promise<void> {
    try {
      const scriptPath = path.join(process.cwd(), "server", "frida-agent.js");
      const scriptSource = fs.readFileSync(scriptPath, "utf8");

      this.script = await this.session!.createScript(scriptSource);
      this.script.message.connect((message: any, data: any) => {
        this.handleMessage(message, data);
      });

      await this.script.load();
      console.log("[Frida] Agent script injected successfully");
    } catch (error) {
      console.error("[Frida] Failed to inject script:", error);
      throw error;
    }
  }

  async executeCommand(payload: InjectionPayload): Promise<any> {
    if (!this.script) {
      throw new Error("Script not loaded. Call injectScript() first.");
    }

    try {
      const result = await this.script.exports.execute(JSON.stringify(payload));
      return result;
    } catch (error) {
      console.error("[Frida] Command execution failed:", error);
      throw error;
    }
  }

  private handleMessage(message: any, data: any): void {
    if (message.type === "send") {
      console.log("[Frida Agent]", message.payload);
    } else if (message.type === "error") {
      console.error("[Frida Agent Error]", message.stack);
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.script) await this.script.unload();
      if (this.session) await this.session.detach();
      console.log("[Frida] Disconnected");
    } catch (error) {
      console.error("[Frida] Disconnect error:", error);
    }
  }
}

// Export singleton instance
let fridaServer: FridaInjectionServer | null = null;

export async function getFridaServer(
  config?: FridaConfig
): Promise<FridaInjectionServer> {
  if (!fridaServer) {
    fridaServer = new FridaInjectionServer(
      config || {
        processName: "com.dts.freefireth",
        host: "127.0.0.1",
        port: 27042,
      }
    );
    await fridaServer.initialize();
    await fridaServer.attachToProcess();
    await fridaServer.injectScript();
  }
  return fridaServer;
}

export async function disconnectFrida(): Promise<void> {
  if (fridaServer) {
    await fridaServer.disconnect();
    fridaServer = null;
  }
}

export { FridaInjectionServer, InjectionPayload };
