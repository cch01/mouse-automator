import { app, BrowserWindow, ipcMain, Menu, nativeImage, Tray } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { psListHandler } from "./icpHandlers/psLIst";
import { mouseClickHandler } from "./icpHandlers/robotJs";
import { appStorageHandler } from "./icpHandlers/appStorage";
import { toggleAutoStartHandler } from "./icpHandlers/toggleAutoStart";
import { exitBehaviorHandler } from "./icpHandlers/exitBehavior";
import { exitHandler } from "./icpHandlers/exit";
import { startAndStopEffectsHandler } from "./icpHandlers/startAndStopEffects";

const APP_HEIGHT = 680;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "../..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

const isDev = !!VITE_DEV_SERVER_URL;

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;
let tray: Tray | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC!, "icon.png"),
    webPreferences: {
      preload: path.join(MAIN_DIST, "./preload/index.mjs"),
      devTools: isDev,
    },
    autoHideMenuBar: !isDev,
    resizable: isDev,
    width: isDev ? 800 : 400,
    height: APP_HEIGHT,
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send(
      "main-process-message",
      `Finished Load on ${new Date().toLocaleString()}`
    );
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  // Disable all native keyboard shortcuts
  win.webContents.on("before-input-event", (event, input) => {
    const shortcutsToDisable = [
      "Control+R", // Refresh
      "Control+r", // Refresh
      "F5", // Refresh
      !isDev && "Control+Shift+R", // Hard refresh
      !isDev && "Control+Shift+r", // Hard refresh
      !isDev && "Control+Shift+I", // Open DevTools
      !isDev && "Control+Shift+i", // Open DevTools
      "F12", // Open DevTools
      "F11",
      "Control+T", // New tab (if applicable)
      "Control+t", // New tab (if applicable)
      "Control+w", // Close tab/window
      "Control+W", // Close tab/window
      "Control+n", // New window
      !isDev && "Control+Shift++",
      !isDev && "Control+-",
    ];

    let keyboardInputs = "";
    if (input.control) keyboardInputs += "Control+";
    if (input.shift) keyboardInputs += "Shift+";
    if (input.alt) keyboardInputs += "Alt+";
    keyboardInputs += input.key;

    if (shortcutsToDisable.includes(keyboardInputs)) {
      event.preventDefault();
    }
  });

  if (isDev) win.webContents.openDevTools();

  win.once("ready-to-show", () => {
    win!.webContents.setZoomFactor(0.8);
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  createWindow();

const trayImg = nativeImage.createFromPath(path.join(process.env.VITE_PUBLIC!, "icon.png"))

  tray = new Tray(trayImg.resize({width: 48, height:48}));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: () => {
        win?.show();
      },
    },
    {
      label: "Quit",
      click: () => {
        app.exit()
      },
    },
  ]);

  tray.setToolTip("Mosue Automator");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    win?.show();
  });

  psListHandler(ipcMain);
  mouseClickHandler(ipcMain);
  appStorageHandler(ipcMain);
  toggleAutoStartHandler(ipcMain);
  exitBehaviorHandler(ipcMain, win!);
  exitHandler(ipcMain)
  startAndStopEffectsHandler(ipcMain, win!, tray)
});

