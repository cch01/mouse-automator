import { app, ipcMain } from "electron";

export const exitHandler = (_ipcMain: typeof ipcMain) => {
  _ipcMain.handle("exit", () => {
    app.exit();
  });
};
