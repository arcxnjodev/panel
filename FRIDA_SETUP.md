# Frida Injection Setup Guide

## Overview

This guide explains how to set up and use the Frida injection system to inject cheat functions into Free Fire 1.71.4 on Android 5.x.

## Architecture

```
┌─────────────────────────────────┐
│  Panel Web (React)              │
│  - Aimbot UI                    │
│  - ESP UI                       │
│  - No Recoil UI                 │
└──────────────┬──────────────────┘
               │ fridaClient.ts
               │
               ▼
┌─────────────────────────────────┐
│  Node.js Server (Nitro)         │
│  - API endpoints                │
│  - frida-server.ts              │
└──────────────┬──────────────────┘
               │ Frida RPC
               │
               ▼
┌─────────────────────────────────┐
│  Frida Agent (frida-agent.js)   │
│  - Memory manipulation          │
│  - Function hooking             │
│  - Payload execution            │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Free Fire 1.71.4 Process       │
│  - Aimbot mechanics             │
│  - ESP rendering                │
│  - Recoil compensation          │
└─────────────────────────────────┘
```

## Prerequisites

### 1. Install Frida

```bash
# Global Frida CLI
npm install -g frida-tools

# Project dependency
npm install frida
```

### 2. Android Emulator Setup

- **Emulator**: MSI with Android 5.x
- **Root access**: Required for Frida to attach
- **Free Fire**: Version 1.71.4 (modified)

### 3. Install Frida Server on Emulator

```bash
# Download Frida server for Android ARM
wget https://github.com/frida/frida/releases/download/VERSION/frida-server-VERSION-android-arm.xz

# Extract
xz -d frida-server-*.xz

# Push to emulator
adb push frida-server-* /data/local/tmp/
adb shell chmod +x /data/local/tmp/frida-server-*

# Start Frida server on emulator
adb shell /data/local/tmp/frida-server-* -l 0.0.0.0:27042
```

### 4. Enable ADB Port Forwarding

```bash
# Forward port 27042 from emulator to host
adb forward tcp:27042 tcp:27042
```

## Installation

### 1. Update package.json

```json
{
  "dependencies": {
    "frida": "^20.0.0"
  }
}
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create `.env.local`:

```env
# Frida Configuration
VITE_FRIDA_HOST=127.0.0.1
VITE_FRIDA_PORT=27042
VITE_FF_PROCESS_NAME=com.dts.freefireth
```

## Usage

### Starting the Panel

```bash
# Development
npm run dev

# Production
npm run build
npm run preview
```

### Connecting to Free Fire

The panel automatically connects to Frida when:

1. Panel loads
2. Server detects Frida device
3. Attaches to FF process
4. Injects agent script

### Executing Cheat Commands

#### Via UI

1. Open Arcxnjo Panel (Menu key)
2. Navigate to desired tab (Aimbot, ESP, No Recoil)
3. Toggle/adjust settings
4. Changes are sent to Frida in real-time

#### Via API

```typescript
import { fridaClient } from "@/lib/frida-client";

// Enable Aimbot
const result = await fridaClient.setAimbot(true, {
  fov: 45,
  smooth: 10,
  speed: 5,
  target: "nearest",
});

// Update ESP config
await fridaClient.updateESP({
  box: true,
  skeleton: true,
  healthBar: true,
  maxDistance: 400,
});

// Disable No Recoil
await fridaClient.setNoRecoil(false);
```

## API Endpoints

### POST /api/injection/execute

Execute cheat command via Frida.

**Request:**

```json
{
  "type": "aimbot" | "esp" | "norecoil",
  "action": "enable" | "disable" | "update" | "execute",
  "params": {
    // Configuration object
  }
}
```

**Response:**

```json
{
  "success": true,
  "result": { ... },
  "timestamp": "2026-08-24T10:30:00.000Z"
}
```

## Frida Agent Commands

### Aimbot

```javascript
// Enable
{
  type: "aimbot",
  action: "enable",
  params: {
    fov: 45,
    smooth: 10,
    speed: 5,
    target: "nearest",
    priority: "distance",
    visibilityCheck: true,
    teamCheck: true,
    onlyWhileAiming: false,
    maxDistance: 200
  }
}

// Update
{
  type: "aimbot",
  action: "update",
  params: { fov: 60 }
}
```

### ESP

```javascript
// Enable
{
  type: "esp",
  action: "enable",
  params: {
    box: true,
    boxStyle: "2d",
    skeleton: false,
    name: true,
    healthBar: true,
    distance: true,
    snaplines: false,
    teamCheck: true,
    visibilityCheck: false,
    maxDistance: 400
  }
}
```

### No Recoil

```javascript
// Enable
{
  type: "norecoil",
  action: "enable",
  params: {
    axis: "both",
    strength: 100,
    smooth: 50
  }
}
```

## Troubleshooting

### Frida Not Connecting

```bash
# Check if Frida server is running
adb shell ps | grep frida

# Check port forwarding
adb forward --list

# Restart ADB
adb kill-server
adb start-server
```

### Process Not Found

```bash
# List running processes
frida-ps -U

# Check FF package name
adb shell pm list packages | grep free
```

### Permission Denied

```bash
# Ensure device is rooted
adb shell id

# Restart Frida server with proper permissions
adb shell su -c '/data/local/tmp/frida-server-* -l 0.0.0.0:27042'
```

## Performance Considerations

- **Memory**: Frida agent adds ~50MB overhead
- **CPU**: Real-time injection has minimal impact (<5% CPU)
- **Latency**: Commands execute within 1-10ms
- **Stability**: Android 5.x may have compatibility issues

## Security Notes

⚠️ **This is for educational purposes only!**

- Frida injection requires rooted device
- Modifying game processes may violate ToS
- Anti-cheat systems can detect Frida
- Use only on personal devices or tests

## File Structure

```
server/
├── frida-server.ts          # Main Frida server class
├── frida-agent.js           # Agent script (injected)
└── api/
    └── injection.ts         # API endpoint

src/
├── lib/
│   └── frida-client.ts      # Frontend client
└── components/
    └── arcxnjo-panel.tsx    # UI component
```

## Next Steps

1. ✅ Install Frida tools and dependencies
2. ✅ Set up Android emulator with root
3. ✅ Deploy Frida server to emulator
4. ✅ Start the panel
5. ✅ Open FF 1.71.4
6. ✅ Use panel to inject cheats

## Support

For issues or questions, check:

- [Frida Documentation](https://frida.re/docs/home/)
- [Frida GitHub](https://github.com/frida/frida)
- Android logcat: `adb logcat | grep -i frida`
