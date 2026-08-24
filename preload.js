const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  frida: {
    execute: (payload) => ipcRenderer.invoke("frida:execute", payload),
    getStatus: () => ipcRenderer.invoke("frida:status"),
    disconnect: () => ipcRenderer.invoke("frida:disconnect"),
  },
});
