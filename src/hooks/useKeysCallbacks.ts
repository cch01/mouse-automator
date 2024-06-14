import { useEffect } from "react";

export enum Keys {
  ENTER = "Enter",
  ARROW_UP = "ArrowUp",
  ESCAPE = "Escape",
  ARROW_DOWN = "ArrowDown",
  ARROW_LEFT = "ArrowLeft",
  ARROW_RIGHT = "ArrowRight",
  CONTROL = "Control",
  SHIFT = "Shift",
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  E = "e",
  F = "f",
  G = "g",
  H = "h",
  I = "i",
  J = "j",
  K = "k",
  L = "l",
  M = "m",
  N = "n",
  O = "o",
  P = "p",
  Q = "q",
  R = "r",
  S = "s",
  T = "t",
  U = "u",
  V = "v",
  W = "w",
  X = "x",
  Y = "y",
  Z = "z",
  DIGIT_0 = "0",
  DIGIT_1 = "1",
  DIGIT_2 = "2",
  DIGIT_3 = "3",
  DIGIT_4 = "4",
  DIGIT_5 = "5",
  DIGIT_6 = "6",
  DIGIT_7 = "7",
  DIGIT_8 = "8",
  DIGIT_9 = "9",
}

type keyConfigs = {
  key: Keys;
  ctrl?: boolean;
  shift?: boolean;
  callback: () => void;
};

export const useKeysCallbacks = (keyConfigs: keyConfigs[]) => {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const eventKey = event.key.toLowerCase();

      keyConfigs.forEach((keyConfig) => {
        const { key, ctrl = false, shift = false, callback } = keyConfig;
        if (
          eventKey === key.toLowerCase() &&
          event.ctrlKey === ctrl &&
          event.shiftKey === shift
        ) {
          callback();
        }
      });
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyConfigs]);
};
