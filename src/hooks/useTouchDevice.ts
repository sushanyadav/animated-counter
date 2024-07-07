import { isBrowser } from "@/functions/isBrowser";
import { useState, useEffect, useCallback } from "react";

const hoverQuery = "(hover: none) and ((pointer: coarse) or (pointer: none))";

export const useTouchDevice = () => {
  const [hover, setHover] = useState<boolean>(
    !window.matchMedia(hoverQuery).matches
  );

  const updateHoverState = useCallback(
    (e: MediaQueryListEvent) => setHover(!e.matches),
    []
  );

  useEffect(() => {
    if (!isBrowser()) return;

    const matchMediaObjectHover = window.matchMedia(hoverQuery);

    matchMediaObjectHover.addEventListener("change", updateHoverState);

    return () => {
      matchMediaObjectHover.removeEventListener("change", updateHoverState);
    };
  }, [updateHoverState]);

  return { isTouchDevice: !hover };
};
