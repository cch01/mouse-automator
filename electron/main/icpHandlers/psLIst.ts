import { ipcMain } from "electron/main";
import psList from "ps-list";

export const psListHandler = (_ipcMain: typeof ipcMain) => {
  _ipcMain.handle("ps-list", async () => psList());
};
