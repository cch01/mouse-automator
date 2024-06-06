import { ipcMain } from "electron/main";
import robotJs from "@jitsi/robotjs";

export const mouseClickHandler = (_ipcMain: typeof ipcMain) => {
  _ipcMain.handle("mouse-click", async () => robotJs.mouseClick());
};
