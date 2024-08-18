import { app, BrowserWindow } from "electron";
import { ipcMain } from "electron/main";

export const exitBehaviorHandler = (
  _ipcMain: typeof ipcMain,
  win: BrowserWindow
) => {
  _ipcMain.handle("toggle-close-to-tray", async (_event, enable: boolean) => {
    win.removeAllListeners("close");

    win.on("close", (event) => {
      if (!enable) {
        return app.quit();
      }

      event.preventDefault();
      win?.hide();
    });
  });
};
