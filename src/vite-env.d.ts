/// <reference types="vite/client" />

interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import("electron").IpcRenderer;
  psList: typeof import("@trufflesuite/ps-list").default;
  mouseClick: (
    actionType?: "singleClick" | "doubleClick",
    clickButton?: "left" | "right" | "middle"
  ) => Promise<void>;
  toggleAutoStart: (enable: boolean) => void;
  appStorage: import("electron-store").default;
  toggleCloseToTray: (enable: boolean) => void;
  exit: () => void;
  runStartServiceEffects: () => void;
  runStopServiceEffects: () => void;
}
