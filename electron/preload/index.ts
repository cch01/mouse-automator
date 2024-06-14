import { ipcRenderer, contextBridge, webFrame } from "electron";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args)
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APTs you need here.
  // ...
});

contextBridge.exposeInMainWorld("psList", () => ipcRenderer.invoke("ps-list"));
contextBridge.exposeInMainWorld(
  "mouseClick",
  (
    actionType?: "singleClick" | "doubleClick",
    clickButton?: "left" | "right" | "middle"
  ) => ipcRenderer.invoke("mouse-click", actionType, clickButton)
);
contextBridge.exposeInMainWorld("toggleAutoStart", (enable: boolean) =>
  ipcRenderer.invoke("toggle-auto-start", enable)
);

contextBridge.exposeInMainWorld("appStorage", {
  get(key: string) {
    return ipcRenderer.sendSync("store-get", key);
  },
  has(key: string) {
    return ipcRenderer.sendSync("store-has", key);
  },
  clear() {
    return ipcRenderer.send("store-clear");
  },
  set(key: string, val: unknown) {
    return ipcRenderer.send("store-set", key, val);
  },
  reset() {
    return ipcRenderer.send("store-reset");
  },
  delete(key: string) {
    return ipcRenderer.send("store-delete", key);
  },
  // onDidChange(
  //   key: string,
  //   callback: (newValue?: unknown, oldValue?: unknown) => void
  // ) {
  //   return ipcRenderer.send("store-onDidChange", key, callback);
  // },
  // onDidAnyChange(
  //   callback: (
  //     newValue?: Readonly<unknown>,
  //     oldValue?: Readonly<unknown>
  //   ) => void
  // ) {
  //   return ipcRenderer.send("store-onDidAnyChange", callback);
  // },
  openInEditor() {
    return ipcRenderer.send("store-openInEditor");
  },
  getFullStore: () => ipcRenderer.sendSync("store-fullStore"),
  getStorePath: () => ipcRenderer.sendSync("store-storePath"),
  getSize:() => ipcRenderer.sendSync("store-size"),
});


ipcRenderer.on('set-zoom-factor', (_event, zoomFactor) => {
  console.log("zoom factor", zoomFactor*0.5);
  webFrame.setZoomFactor(zoomFactor*0.5);
});
