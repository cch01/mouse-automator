import { useEffect } from "react";

type ClickOutsideCallback = (event: MouseEvent) => void;

export const useClickOutsideCallback = (
  callback: ClickOutsideCallback,
  targetRef: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        callback(event);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [callback, targetRef]);
};
