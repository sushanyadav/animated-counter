import { cn } from "@/functions/cn";
import { useTouchDevice } from "@/hooks/useTouchDevice";
import { useDragControls, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";

export const CounterTimeLine = () => {
  const { width = 0, height = 0 } = useWindowSize();
  const [numberOfLines, setNumberOfLines] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { isTouchDevice } = useTouchDevice();

  const GAP = useMemo(() => (width > 640 ? 18 : 12), [width]);

  useEffect(() => {
    const numberOfLines = !isTouchDevice
      ? Math.floor(height / GAP)
      : Math.floor(width / GAP);

    setNumberOfLines(numberOfLines);
  }, [height, width, isTouchDevice, GAP]);

  const controls = useDragControls();

  return (
    <div
      className={cn("absolute", {
        "inset-y-0 left-4 py-2": !isTouchDevice,
        "inset-x-0 bottom-4 px-2": isTouchDevice,
      })}
    >
      <div
        className={cn("", {
          "h-full w-px": !isTouchDevice,
          "h-px w-full": isTouchDevice,
        })}
        ref={ref}
      >
        <div
          className={cn({
            "-translate-y-8": isTouchDevice,
          })}
        >
          <motion.div
            className={cn("absolute flex z-10", {
              "py-2": !isTouchDevice,
              "px-2": isTouchDevice,
            })}
            drag={isTouchDevice ? "x" : "y"}
            dragControls={controls}
            dragConstraints={ref}
            style={{ touchAction: "none" }}
            whileDrag={
              isTouchDevice
                ? {
                    scale: 1.5,
                    originY: "bottom",
                  }
                : { scale: 1.5, originX: "left" }
            }
            dragMomentum={false}
          >
            <div
              className={cn(
                "bg-[rgba(255,_124,_95,_1)] rounded-full pointer-events-none transition-all",
                { "w-[44px] h-0.5": !isTouchDevice },
                { "w-0.5 h-[44px]": isTouchDevice }
              )}
            ></div>
          </motion.div>
        </div>
        {Array.from({ length: numberOfLines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "bg-[rgba(212,_212,_212,_1)] ",
              { "w-[10px] h-px absolute left-0": !isTouchDevice },
              { "w-px h-[10px] absolute left-0": isTouchDevice }
            )}
            style={
              !isTouchDevice
                ? { top: `calc(${(i + 1) * GAP}px)` }
                : { left: `calc(${(i + 1) * GAP}px)` }
            }
          />
        ))}
      </div>
    </div>
  );
};
