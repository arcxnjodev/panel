import { fridaClient } from "@/lib/frida-client";

/**
 * Example usage of Frida injection in the panel
 */

export async function exampleAimbotUsage() {
  // Enable aimbot with config
  const result = await fridaClient.setAimbot(true, {
    fov: 45,
    smooth: 10,
    speed: 5,
    target: "nearest",
    priority: "distance",
    visibilityCheck: true,
    teamCheck: true,
    onlyWhileAiming: false,
    maxDistance: 200,
  });

  console.log("Aimbot enabled:", result);

  // Update config dynamically
  setTimeout(async () => {
    await fridaClient.updateAimbot({ fov: 60, smooth: 15 });
  }, 2000);

  // Disable after 10 seconds
  setTimeout(async () => {
    await fridaClient.setAimbot(false);
  }, 10000);
}

export async function exampleESPUsage() {
  // Enable ESP
  const result = await fridaClient.setESP(true, {
    box: true,
    boxStyle: "2d",
    skeleton: true,
    name: true,
    healthBar: true,
    distance: true,
    snaplines: false,
    teamCheck: true,
    visibilityCheck: false,
    maxDistance: 400,
  });

  console.log("ESP enabled:", result);

  // Toggle skeleton visibility
  setTimeout(async () => {
    await fridaClient.updateESP({ skeleton: false });
  }, 5000);
}

export async function exampleNoRecoilUsage() {
  // Enable no recoil
  const result = await fridaClient.setNoRecoil(true, {
    axis: "both",
    strength: 100,
    smooth: 50,
  });

  console.log("No Recoil enabled:", result);

  // Reduce strength over time
  setTimeout(async () => {
    await fridaClient.updateNoRecoil({ strength: 75 });
  }, 3000);

  setTimeout(async () => {
    await fridaClient.updateNoRecoil({ strength: 50 });
  }, 6000);
}

export async function exampleCustomCommand() {
  // Execute custom command
  const result = await fridaClient.execute({
    type: "aimbot",
    action: "execute",
    params: { targetId: 123 },
  });

  console.log("Custom command result:", result);
}

/**
 * Integration with panel state management
 */
export async function syncPanelWithFrida(config: any) {
  try {
    // When panel config changes, sync with Frida
    if (config.aimbot.enabled) {
      await fridaClient.updateAimbot({
        fov: config.aimbot.fov,
        smooth: config.aimbot.smooth,
        speed: config.aimbot.speed,
        target: config.aimbot.target,
        priority: config.aimbot.priority,
        visibilityCheck: config.aimbot.visibilityCheck,
        teamCheck: config.aimbot.teamCheck,
        maxDistance: config.aimbot.maxDistance,
      });
    } else {
      await fridaClient.setAimbot(false);
    }

    if (config.esp.enabled) {
      await fridaClient.updateESP({
        box: config.esp.box,
        boxStyle: config.esp.boxStyle,
        skeleton: config.esp.skeleton,
        name: config.esp.name,
        healthBar: config.esp.healthBar,
        distance: config.esp.distance,
        snaplines: config.esp.snaplines,
        teamCheck: config.esp.teamCheck,
        maxDistance: config.esp.maxDistance,
      });
    } else {
      await fridaClient.setESP(false);
    }

    if (config.norecoil.enabled) {
      await fridaClient.updateNoRecoil({
        axis: config.norecoil.axis,
        strength: config.norecoil.strength,
        smooth: config.norecoil.smooth,
      });
    } else {
      await fridaClient.setNoRecoil(false);
    }

    return { success: true };
  } catch (error) {
    console.error("Sync error:", error);
    return { success: false, error };
  }
}
