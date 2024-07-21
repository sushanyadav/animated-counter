import { cn } from "@/functions/cn";
import { useTouchDevice } from "@/hooks/useTouchDevice";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import {
  motion,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useAnimatedCounter } from "@/provider/AnimatedCounterProvider";

export const CounterTimeLines = () => {
  const prevLayer = useRef<number | null>(null);

  const { width = 0, height = 0 } = useWindowSize();
  const [scope, animate] = useAnimate();
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const { setNumber } = useAnimatedCounter();
  const { isTouchDevice } = useTouchDevice();

  useMotionValueEvent(y, "change", (e) => {
    let newY = e % height;

    if (newY > 0) {
      newY = newY - height;
    }

    y.set(newY);
  });

  useMotionValueEvent(x, "change", (e) => {
    let newX = e % width;

    if (newX > 0) {
      newX = newX - width;
    }

    x.set(newX);
  });

  return (
    <div
      ref={scope}
      className="w-full sm:h-full fixed sm:left-0 sm:bottom-0 bottom-0 inset-x-0 sm:right-auto"
    >
      <Indicator />
      <motion.div
        dragTransition={{ timeConstant: 100, power: 0.01 }}
        drag={isTouchDevice ? "x" : "y"}
        whileDrag={{
          cursor: "grabbing",
        }}
        onDragEnd={() => {
          animate(
            "#indicator",
            {
              scale: 1,
            },
            {
              duration: 0.1,
              ease: "backOut",
            }
          );
        }}
        onDragStart={() => {
          animate(
            "#indicator",
            {
              scale: isTouchDevice ? 1.3 : 1.5,
            },
            {
              duration: 0.1,
              ease: "backIn",
            }
          );
        }}
        onDrag={(e: PointerEvent, info) => {
          const velocityToCheck = isTouchDevice
            ? info.velocity.x
            : info.velocity.y;
          const layerToCheck = isTouchDevice ? e.layerX : e.layerY;

          if (velocityToCheck === 0) return;

          if (velocityToCheck > 0) {
            if (
              Math.abs(layerToCheck) % 8 === 0 &&
              prevLayer.current !== Math.abs(layerToCheck)
            ) {
              setNumber((prev) => prev - 1);
              prevLayer.current = Math.abs(layerToCheck);
            }
          } else {
            if (
              Math.abs(layerToCheck) % 8 === 0 &&
              prevLayer.current !== Math.abs(layerToCheck)
            ) {
              setNumber((prev) => prev + 1);
              prevLayer.current = Math.abs(layerToCheck);
            }
          }
        }}
        style={isTouchDevice ? { x, touchAction: "none" } : { y }}
        className="w-[199vw] sm:w-auto sm:h-full cursor-grab sm:pl-6 flex sm:block"
      >
        <CounterTimeLine />
        <CounterTimeLine />
      </motion.div>
    </div>
  );
};

const Indicator = () => {
  const { isTouchDevice } = useTouchDevice();

  return (
    <motion.div
      style={isTouchDevice ? { originY: "bottom" } : { originX: "left" }}
      className={cn(
        "bg-[#FFF833] z-40 absolute sm:ml-6 sm:top-1/2 sm:-translate-y-0.5 left-1/2 bottom-4 sm:bottom-auto sm:left-auto rounded-full pointer-events-none transition-all",
        { "w-0.5 h-[44px]": isTouchDevice },
        { "w-[44px] h-0.5": !isTouchDevice }
      )}
      id="indicator"
    ></motion.div>
  );
};

export const CounterTimeLine = memo(() => {
  const { width = 0, height = 0 } = useWindowSize();
  const [numberOfLines, setNumberOfLines] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { isTouchDevice } = useTouchDevice();

  const GAP = useMemo(() => (width > 640 ? 22 : 12), [width]);

  useEffect(() => {
    if (isTouchDevice === undefined) return;
    const numberOfLines = !isTouchDevice
      ? Math.floor(height / GAP)
      : Math.floor(width / GAP);

    setNumberOfLines(numberOfLines);
  }, [height, width, isTouchDevice, GAP]);

  if (isTouchDevice === undefined) return null;

  return (
    <div
      className={cn(
        "w-full h-[50px] sm:w-[50px] sm:pl-6 relative sm:h-full flex items-center justify-center"
      )}
    >
      <div
        className={cn("", {
          "h-full w-px": !isTouchDevice,
          "h-px w-full": isTouchDevice,
        })}
        ref={ref}
      >
        {Array.from({ length: numberOfLines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "bg-[#113f36] ",
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
});

CounterTimeLine.displayName = "CounterTimeLine";
