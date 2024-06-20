import Store from "electron-store";

const schema = {
  autoStart: {
    type: "boolean",
  },
  savedProcesses: {
    type: "array",
    items: {
      type: "string",
    },
    default: [],
  },
  useSavedProcess: {
    type: "boolean",
  },
};

export const store = new Store({ schema });
