import Store from "electron-store";

const schema = {
  autoStart: {
    type: "boolean",
  },
  closeToTray: { type: "boolean" }
};

export const store = new Store({ schema });
