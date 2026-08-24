export const AIM_MODES = ["Legit", "Rage", "Silent"] as const;
export const AIM_TARGETS = ["Head", "Body", "Nearest"] as const;
export const AIM_PRIORITIES = ["Distance", "Health", "Crosshair"] as const;
export const ESP_BOXES = ["2D", "3D", "Corner"] as const;
export const RECOIL_AXES = ["Both", "Vertical", "Horizontal"] as const;

export type AimMode = (typeof AIM_MODES)[number];
export type AimTarget = (typeof AIM_TARGETS)[number];
export type AimPriority = (typeof AIM_PRIORITIES)[number];
export type EspBox = (typeof ESP_BOXES)[number];
export type RecoilAxis = (typeof RECOIL_AXES)[number];
export type PanelTab = "aimbot" | "esp" | "norecoil";

export type ArcxnjoConfig = {
  menuKey: string;
  aimbot: {
    enabled: boolean;
    mode: AimMode;
    fov: number;
    smooth: number;
    speed: number;
    target: AimTarget;
    priority: AimPriority;
    visibilityCheck: boolean;
    teamCheck: boolean;
    onlyWhileAiming: boolean;
    onlyWhileShooting: boolean;
    maxDistance: number;
    switchDelay: number;
  };
  esp: {
    enabled: boolean;
    box: boolean;
    boxStyle: EspBox;
    skeleton: boolean;
    name: boolean;
    healthBar: boolean;
    distance: boolean;
    snaplines: boolean;
    teamCheck: boolean;
    visibilityCheck: boolean;
    maxDistance: number;
  };
  norecoil: {
    enabled: boolean;
    strength: number;
    axis: RecoilAxis;
    smooth: number;
  };
};

export const DEFAULT_CONFIG: ArcxnjoConfig = {
  menuKey: "Insert",
  aimbot: {
    enabled: true,
    mode: "Legit",
    fov: 80,
    smooth: 8,
    speed: 6,
    target: "Head",
    priority: "Crosshair",
    visibilityCheck: true,
    teamCheck: true,
    onlyWhileAiming: true,
    onlyWhileShooting: false,
    maxDistance: 250,
    switchDelay: 120,
  },
  esp: {
    enabled: true,
    box: true,
    boxStyle: "Corner",
    skeleton: false,
    name: true,
    healthBar: true,
    distance: true,
    snaplines: false,
    teamCheck: true,
    visibilityCheck: false,
    maxDistance: 400,
  },
  norecoil: {
    enabled: false,
    strength: 70,
    axis: "Both",
    smooth: 40,
  },
};

export const STORAGE_KEY = "arcxnjo-config-v1";
