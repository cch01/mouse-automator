import { ipcMain } from "electron/main";
import {
  app,
  BrowserWindow,
  Menu,
  MenuItemConstructorOptions,
  nativeImage,
  Tray,
} from "electron";
import path from "node:path";
import cloneDeep  from "lodash-es/cloneDeep";


export const startAndStopEffectsHandler = (
  _ipcMain: typeof ipcMain,
  win: BrowserWindow,
  tray: Tray,
  contextMenuStructure: MenuItemConstructorOptions[]
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
    .resize({ width: 24, height: 24 });
  const START_TRAY_ICON = nativeImage
    .createFromPath(path.join(process.env.VITE_PUBLIC!, "icon_working.png"))
    .resize({ width: 24, height: 24 });

  _ipcMain.handle("start-service-effects", async () => {
    win.setIcon(START_ICON);
    app.dock?.setIcon(START_ICON);
    tray.setImage(START_TRAY_ICON);
    win.setOverlayIcon(WORKING_OVERLAY_ICON, "Working");
    win.setTitle("Mouse Animator - Working");

    const menuStructureCp =cloneDeep(contextMenuStructure);

    const startBtnMenu = menuStructureCp.find(
      ({ label }) => label === "Start"
    )!;
    startBtnMenu.enabled = false;

    const stopBtn = menuStructureCp.find(({ label }) => label === "Stop");

    if (stopBtn) stopBtn.enabled = true;

    tray.setContextMenu(Menu.buildFromTemplate(menuStructureCp));
  });

  _ipcMain.handle("stop-service-effects", async () => {
    win.setIcon(STOP_ICON);
    app.dock?.setIcon(STOP_ICON);
    tray.setImage(STOP_TRAY_ICON);
    win.setOverlayIcon(START_ICON, "Started");
    win.setTitle("Mouse Animator");
    win.setOverlayIcon(null, "");

    const menuStructureCp =cloneDeep(contextMenuStructure);

    const startBtnMenu = menuStructureCp.find(
      ({ label }) => label === "Start"
    )!;
    startBtnMenu.enabled = true;

    const stopBtn = menuStructureCp.find(({ label }) => label === "Stop");

    if (stopBtn) stopBtn.enabled = false;

    tray.setContextMenu(Menu.buildFromTemplate(menuStructureCp));
  });
};
