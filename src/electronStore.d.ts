import "electron-store";

declare module "electron-store" {
  export default interface ElectronStore {
    getFullStore: () => import("electron-store").default["store"];
    getStorePath: () => import("electron-store").default["path"];
    getSize: () => import("electron-store").default["size"];
  }
}
