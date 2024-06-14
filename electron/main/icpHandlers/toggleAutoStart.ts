import { app } from "electron";
import { ipcMain } from "electron/main";

export const toggleAutoStartHandler = (_ipcMain: typeof ipcMain) => {
  _ipcMain.handle("toggle-auto-start", async (_event, openAtLogin: boolean) => {
    app.setLoginItemSettings({ openAtLogin });
  });
};
