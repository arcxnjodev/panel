import { defineEventHandler, readBody, createError } from "h3";
import { getFridaServer, InjectionPayload } from "../frida-server";

/**
 * POST /api/injection/execute
 * Execute a cheat command via Frida
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.type || !body.action) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: type, action",
      });
    }

    const payload: InjectionPayload = {
      type: body.type,
      action: body.action,
      params: body.params || {},
    };

    const fridaServer = await getFridaServer();
    const result = await fridaServer.executeCommand(payload);

    return {
      success: true,
      result,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error("[API] Injection error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Injection failed",
    });
  }
});
