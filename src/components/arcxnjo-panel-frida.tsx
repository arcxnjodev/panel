import { useState, useEffect } from "react";
import { electronFridaClient } from "@/lib/electron-frida-client";
import { fridaClient } from "@/lib/frida-client";
import { Toggle } from "@/components/ui/toggle";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Arcxnjo Panel - Integrated with Frida Injection
 */
export function ArcxnjoPanelFrida() {
  // Frida connection state
  const [connected, setConnected] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState("Connecting...");

  // Aimbot state
  const [aimbotEnabled, setAimbotEnabled] = useState(false);
  const [aimbotConfig, setAimbotConfig] = useState({
    fov: 45,
    smooth: 10,
    speed: 5,
    target: "nearest",
    priority: "distance",
    visibilityCheck: true,
    teamCheck: true,
    maxDistance: 200,
  });

  // ESP state
  const [espEnabled, setEspEnabled] = useState(false);
  const [espConfig, setEspConfig] = useState({
    box: true,
    boxStyle: "2d",
    skeleton: false,
    name: true,
    healthBar: true,
    distance: true,
    snaplines: false,
    teamCheck: true,
    maxDistance: 400,
  });

  // No Recoil state
  const [noRecoilEnabled, setNoRecoilEnabled] = useState(false);
  const [noRecoilConfig, setNoRecoilConfig] = useState({
    axis: "both",
    strength: 100,
    smooth: 50,
  });

  // Initialize Frida connection
  useEffect(() => {
    const checkConnection = async () => {
      const status = await electronFridaClient.getStatus();
      setConnected(status.connected);
      setConnectionMessage(status.message);
    };

    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle Aimbot toggle
  const handleAimbotToggle = async (enabled: boolean) => {
    try {
      const result = await electronFridaClient.execute({
        type: "aimbot",
        action: enabled ? "enable" : "disable",
        params: aimbotConfig,
      });

      if (result.success) {
        setAimbotEnabled(enabled);
      } else {
        console.error("Aimbot toggle failed:", result.error);
      }
    } catch (error) {
      console.error("Aimbot error:", error);
    }
  };

  // Handle Aimbot config update
  const handleAimbotConfigChange = async (key: string, value: any) => {
    const newConfig = { ...aimbotConfig, [key]: value };
    setAimbotConfig(newConfig);

    if (aimbotEnabled) {
      await electronFridaClient.execute({
        type: "aimbot",
        action: "update",
        params: newConfig,
      });
    }
  };

  // Handle ESP toggle
  const handleESPToggle = async (enabled: boolean) => {
    try {
      const result = await electronFridaClient.execute({
        type: "esp",
        action: enabled ? "enable" : "disable",
        params: espConfig,
      });

      if (result.success) {
        setEspEnabled(enabled);
      } else {
        console.error("ESP toggle failed:", result.error);
      }
    } catch (error) {
      console.error("ESP error:", error);
    }
  };

  // Handle ESP config update
  const handleESPConfigChange = async (key: string, value: any) => {
    const newConfig = { ...espConfig, [key]: value };
    setEspConfig(newConfig);

    if (espEnabled) {
      await electronFridaClient.execute({
        type: "esp",
        action: "update",
        params: newConfig,
      });
    }
  };

  // Handle No Recoil toggle
  const handleNoRecoilToggle = async (enabled: boolean) => {
    try {
      const result = await electronFridaClient.execute({
        type: "norecoil",
        action: enabled ? "enable" : "disable",
        params: noRecoilConfig,
      });

      if (result.success) {
        setNoRecoilEnabled(enabled);
      } else {
        console.error("No Recoil toggle failed:", result.error);
      }
    } catch (error) {
      console.error("No Recoil error:", error);
    }
  };

  // Handle No Recoil config update
  const handleNoRecoilConfigChange = async (key: string, value: any) => {
    const newConfig = { ...noRecoilConfig, [key]: value };
    setNoRecoilConfig(newConfig);

    if (noRecoilEnabled) {
      await electronFridaClient.execute({
        type: "norecoil",
        action: "update",
        params: newConfig,
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Arcxnjo Panel</h1>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}
          />
          <span className="text-sm text-gray-300">{connectionMessage}</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="aimbot" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-700">
          <TabsTrigger value="aimbot" className="text-white">
            Aimbot
          </TabsTrigger>
          <TabsTrigger value="esp" className="text-white">
            ESP
          </TabsTrigger>
          <TabsTrigger value="norecoil" className="text-white">
            No Recoil
          </TabsTrigger>
        </TabsList>

        {/* Aimbot Tab */}
        <TabsContent value="aimbot">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Aimbot</CardTitle>
              <CardDescription>Auto-aim with configurable settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enable Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Enable Aimbot</span>
                <Toggle
                  pressed={aimbotEnabled}
                  onPressedChange={handleAimbotToggle}
                  className="bg-slate-700 hover:bg-slate-600"
                >
                  {aimbotEnabled ? "ON" : "OFF"}
                </Toggle>
              </div>

              {/* FOV Slider */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">FOV: {aimbotConfig.fov}°</label>
                <Slider
                  value={[aimbotConfig.fov]}
                  onValueChange={(value) => handleAimbotConfigChange("fov", value[0])}
                  min={10}
                  max={180}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Smooth Slider */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Smoothness: {aimbotConfig.smooth}
                </label>
                <Slider
                  value={[aimbotConfig.smooth]}
                  onValueChange={(value) => handleAimbotConfigChange("smooth", value[0])}
                  min={0}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Speed Slider */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Speed: {aimbotConfig.speed}</label>
                <Slider
                  value={[aimbotConfig.speed]}
                  onValueChange={(value) => handleAimbotConfigChange("speed", value[0])}
                  min={1}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Max Distance */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Max Distance: {aimbotConfig.maxDistance}m
                </label>
                <Slider
                  value={[aimbotConfig.maxDistance]}
                  onValueChange={(value) => handleAimbotConfigChange("maxDistance", value[0])}
                  min={50}
                  max={500}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-4 border-t border-slate-700">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aimbotConfig.visibilityCheck}
                    onChange={(e) => handleAimbotConfigChange("visibilityCheck", e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Visibility Check</span>
                </label>
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aimbotConfig.teamCheck}
                    onChange={(e) => handleAimbotConfigChange("teamCheck", e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Team Check</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ESP Tab */}
        <TabsContent value="esp">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">ESP (Enemy Spotted)</CardTitle>
              <CardDescription>See enemies through walls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enable Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Enable ESP</span>
                <Toggle
                  pressed={espEnabled}
                  onPressedChange={handleESPToggle}
                  className="bg-slate-700 hover:bg-slate-600"
                >
                  {espEnabled ? "ON" : "OFF"}
                </Toggle>
              </div>

              {/* Max Distance */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Max Distance: {espConfig.maxDistance}m
                </label>
                <Slider
                  value={[espConfig.maxDistance]}
                  onValueChange={(value) => handleESPConfigChange("maxDistance", value[0])}
                  min={100}
                  max={1000}
                  step={50}
                  className="w-full"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-4 border-t border-slate-700">
                {[
                  { key: "box", label: "Box" },
                  { key: "skeleton", label: "Skeleton" },
                  { key: "name", label: "Name" },
                  { key: "healthBar", label: "Health Bar" },
                  { key: "distance", label: "Distance" },
                  { key: "snaplines", label: "Snaplines" },
                  { key: "teamCheck", label: "Team Check" },
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2 text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={espConfig[item.key as keyof typeof espConfig] as boolean}
                      onChange={(e) => handleESPConfigChange(item.key, e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* No Recoil Tab */}
        <TabsContent value="norecoil">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">No Recoil</CardTitle>
              <CardDescription>Remove weapon recoil compensation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enable Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Enable No Recoil</span>
                <Toggle
                  pressed={noRecoilEnabled}
                  onPressedChange={handleNoRecoilToggle}
                  className="bg-slate-700 hover:bg-slate-600"
                >
                  {noRecoilEnabled ? "ON" : "OFF"}
                </Toggle>
              </div>

              {/* Strength Slider */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Strength: {noRecoilConfig.strength}%
                </label>
                <Slider
                  value={[noRecoilConfig.strength]}
                  onValueChange={(value) => handleNoRecoilConfigChange("strength", value[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Smooth Slider */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Smoothness: {noRecoilConfig.smooth}
                </label>
                <Slider
                  value={[noRecoilConfig.smooth]}
                  onValueChange={(value) => handleNoRecoilConfigChange("smooth", value[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Info */}
      <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
        <p className="text-xs text-gray-400 text-center">
          Arcxnjo Panel v1.0 | Frida Injection System | Free Fire 1.71.4
        </p>
      </div>
    </div>
  );
}
