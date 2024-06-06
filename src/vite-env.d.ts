/// <reference types="vite/client" />

interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import("electron").IpcRenderer;
  psList: typeof import("ps-list").default;
  mouseClick: () => Promise<void>;
}
