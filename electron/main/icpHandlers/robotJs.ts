import { ipcMain } from "electron/main";
import robotJs from "@jitsi/robotjs";

export const mouseClickHandler = (_ipcMain: typeof ipcMain) => {
  _ipcMain.handle(
    "mouse-click",
    async (
      _event,
      actionType?: "singleClick" | "doubleClick",
      clickButton?: "left" | "right" | "middle"
    ) => {
      const clickPattern = actionType === "doubleClick";
      return robotJs.mouseClick(clickButton || "left", clickPattern);
    }
  );
};
