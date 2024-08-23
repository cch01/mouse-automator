import { ipcMain } from "electron/main";
import { Button, mouse } from "@nut-tree-fork/nut-js";

const buttonMapper = {
  left: Button.LEFT,
  right: Button.RIGHT,
  middle: Button.MIDDLE,
};

export const mouseClickHandler = (_ipcMain: typeof ipcMain) => {
  _ipcMain.handle(
    "mouse-click",
    async (
      _event,
      actionType?: "singleClick" | "doubleClick",
      clickButton?: "left" | "right" | "middle"
    ) => {
      if (actionType === "singleClick") {
         mouse.click(buttonMapper[clickButton || "left"]);
         return
      }
      mouse.doubleClick(buttonMapper[clickButton || "left"]);
    }
  );
};
