import { useCallback, useEffect } from "react";

type ClickOutsideCallback = (event: MouseEvent) => void;

export const useClickOutside = (
  callback: ClickOutsideCallback,
  targetRef: React.RefObject<HTMLElement>
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        callback(event);
      }
    },
    [targetRef, callback]
  );

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [callback, handleClickOutside, targetRef]);
};
