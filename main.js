const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { getFridaServer, disconnectFrida } = require("./server/frida-server.ts");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, "assets/icon.png"),
  });

  const startUrl = isDev ? "http://localhost:8080" : `file://${path.join(__dirname, "../dist/index.html")}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", async () => {
  await disconnectFrida();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers for Frida
ipcMain.handle("frida:execute", async (event, payload) => {
  try {
    const fridaServer = await getFridaServer();
    const result = await fridaServer.executeCommand(payload);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle("frida:status", async (event) => {
  try {
    const fridaServer = await getFridaServer();
    return { connected: true, message: "Frida connected to FF" };
  } catch (error) {
    return { connected: false, message: error.message };
  }
});

ipcMain.handle("frida:disconnect", async (event) => {
  try {
    await disconnectFrida();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
