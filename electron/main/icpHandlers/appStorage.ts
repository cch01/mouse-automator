import { ipcMain } from "electron/main";
import { store } from "../appStorage";

export const appStorageHandler = (_ipcMain: typeof ipcMain) => {
  _ipcMain.on(
    "store-get",
    async (event, ...args: Parameters<typeof store.get>) => {
      event.returnValue = store.get(...args);
    }
  );

  _ipcMain.on(
    "store-set",
    async (_event, ...args: Parameters<typeof store.set>) => {
      store.set(...args);
    }
  );
  _ipcMain.on(
    "store-has",
    async (event, ...args: Parameters<typeof store.has>) => {
      event.returnValue = store.has(...args);
    }
  );
  _ipcMain.on("store-clear", async () => {
    store.clear();
  });
  _ipcMain.on("store-reset", async () => {
    store.reset();
  });
  _ipcMain.on(
    "store-delete",
    async (event, ...args: Parameters<typeof store.delete>) => {
      event.returnValue = store.delete(...args);
    }
  );
  // _ipcMain.on(
  //   "store-onDidChange",
  //   async (event, ...args: Parameters<typeof store.onDidChange>) => {
  //     console.log(args)
  //     return  store.onDidChange(...args);
  //   }
  // );
  // _ipcMain.on(
  //   "store-onDidAnyChange",
  //   async (event, ...args: Parameters<typeof store.onDidAnyChange>) => {
  //     return store.onDidAnyChange(...args);
  //   }
  // );

  _ipcMain.on("store-openInEditor", async () => {
    await store.openInEditor();
  });

  _ipcMain.on("store-fullStore", async (event) => {
    event.returnValue = store.store;
  });
  _ipcMain.on("store-storePath", async (event) => {
    event.returnValue = store.path;
  });
  _ipcMain.on("store-size", async (event) => {
    event.returnValue = store.size;
  });
};
