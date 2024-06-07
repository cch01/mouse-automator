import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { psListHandler } from "./icpHandlers/psLIst";
import { mouseClickHandler } from "./icpHandlers/robotJs";
psListHandler(ipcMain);
mouseClickHandler(ipcMain);

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

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC!, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(MAIN_DIST, "./preload/index.mjs"),
    },
    autoHideMenuBar: true,
    resizable: false,
    width: 400,
    height: 680,
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
      "Control+Shift+R", // Hard refresh
      "Control+Shift+r", // Hard refresh
      "Control+Shift+I", // Open DevTools
      "Control+Shift+i", // Open DevTools
      "F12", // Open DevTools
      "Control+T", // New tab (if applicable)
      "Control+t", // New tab (if applicable)
      "Control+w", // Close tab/window
      "Control+W", // Close tab/window
      "Control+n", // New window
      "Control+Shift++",
      "Control+-",
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
});
