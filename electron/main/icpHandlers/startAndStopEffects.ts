import { ipcMain } from "electron/main";
import { app, BrowserWindow, nativeImage, Tray } from "electron";
import path from "node:path";

export const startAndStopEffectsHandler = (
  _ipcMain: typeof ipcMain,
  win: BrowserWindow,
  tray: Tray
) => {
  const STOP_ICON = nativeImage.createFromPath(
    path.join(process.env.VITE_PUBLIC!, "icon.png")
  );
  const START_ICON = nativeImage.createFromPath(
    path.join(process.env.VITE_PUBLIC!, "icon_working.png")
  );

  const WORKING_OVERLAY_ICON = nativeImage.createFromPath(
    path.join(process.env.VITE_PUBLIC!, "working_overlay_icon.png")
  );

  const STOP_TRAY_ICON = nativeImage
    .createFromPath(path.join(process.env.VITE_PUBLIC!, "icon.png"))
    .resize({ width: 48, height: 48 });
  const START_TRAY_ICON = nativeImage
    .createFromPath(path.join(process.env.VITE_PUBLIC!, "icon_working.png"))
    .resize({ width: 48, height: 48 });

  _ipcMain.handle("start-service-effects", async () => {
    win.setIcon(START_ICON);
    app.dock?.setIcon(START_ICON);
    tray.setImage(START_TRAY_ICON);
    win.setOverlayIcon(WORKING_OVERLAY_ICON, "Working");
    win.setTitle("Mouse Animator - Working");
  });

  _ipcMain.handle("stop-service-effects", async () => {
    win.setIcon(STOP_ICON);
    app.dock?.setIcon(STOP_ICON);
    tray.setImage(STOP_TRAY_ICON);
    win.setOverlayIcon(START_ICON, "Started");
    win.setTitle("Mouse Animator");
    win.setOverlayIcon(null, "");
  });
};
