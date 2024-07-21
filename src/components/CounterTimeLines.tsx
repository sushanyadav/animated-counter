import { cn } from "@/functions/cn";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery, useWindowSize } from "usehooks-ts";
import {
  motion,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useAnimatedCounter } from "@/provider/AnimatedCounterProvider";

const useAudio = (src: string, { volume = 1, playbackRate = 1 }) => {
  const audio = useRef(new Audio(src));

  useEffect(() => {
    audio.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    audio.current.playbackRate = playbackRate;
  }, [playbackRate]);

  return audio.current;
};

export const CounterTimeLines = () => {
  const currentTickFrontID = useRef<number | null>(null);
  const currentTickBackID = useRef<number | null>(null);

  const { width = 0, height = 0 } = useWindowSize();
  const [scope, animate] = useAnimate();
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const { setNumber } = useAnimatedCounter();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const audio = useAudio("/Tick.mp3", { volume: 1, playbackRate: 1 });

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
        drag={isMobile ? "x" : "y"}
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
              scale: isMobile ? 1.3 : 1.5,
            },
            {
              duration: 0.1,
              ease: "backIn",
            }
          );
        }}
        onDrag={(e: PointerEvent, info) => {
          const velocityToCheck = isMobile ? info.velocity.x : info.velocity.y;

          const ticks = document.querySelectorAll(".ticks");
          const indicator = document.getElementById("indicator-inner");

          ticks.forEach((tick) => {
            const t = tick.getBoundingClientRect();
            const i = indicator?.getBoundingClientRect();

            // check if tick is overlapping with indicator
            if (
              i?.top! < t.bottom! &&
              i?.bottom! > t.top! &&
              i?.left! < t.right! &&
              i?.right! > t.left!
            ) {
              // check if tick is already active
              const getTickID = tick.id.split("-")[1];

              if (velocityToCheck > 0) {
                if (currentTickFrontID.current === Number(getTickID)) {
                  return;
                }
                audio.load();
                const playPromise = audio.play();

                if (playPromise !== undefined) {
                  playPromise.then(() => {}).catch(() => {});
                }

                setNumber((prev) => Number(prev) - 1);

                currentTickFrontID.current = Number(getTickID);
                currentTickBackID.current = null;
              } else {
                if (currentTickBackID.current === Number(getTickID)) {
                  return;
                }

                audio.load();
                const playPromise = audio.play();

                if (playPromise !== undefined) {
                  playPromise.then(() => {}).catch(() => {});
                }

                setNumber((prev) => Number(prev) + 1);

                currentTickBackID.current = Number(getTickID);
                currentTickFrontID.current = null;
              }

              return;
            }
          });
        }}
        style={isMobile ? { x, touchAction: "none" } : { y }}
        className="w-[199vw] sm:w-auto sm:h-full cursor-grab sm:pl-6 flex sm:block"
      >
        <CounterTimeLine />
        <CounterTimeLine />
      </motion.div>
    </div>
  );
};

const Indicator = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <>
      <motion.div
        style={isMobile ? { originY: "bottom" } : { originX: "left" }}
        className={cn(
          "bg-[#FFF833] z-40 absolute sm:ml-6 sm:top-1/2 sm:-translate-y-0.5 left-1/2 bottom-4 sm:bottom-auto sm:left-auto rounded-full pointer-events-none transition-all",
          { "w-0.5 h-[28px]": isMobile },
          { "w-[44px] h-0.5": !isMobile }
        )}
        id="indicator"
      ></motion.div>

      <motion.div
        className={cn(
          "absolute sm:ml-6 sm:top-1/2 left-1/2 bottom-4 sm:bottom-auto sm:left-auto rounded-full pointer-events-none transition-all",
          { "w-0.5 h-[44px]": isMobile },
          { "w-[44px] h-px": !isMobile }
        )}
        id="indicator-inner"
      ></motion.div>
    </>
  );
};

export const CounterTimeLine = memo(() => {
  const { width = 0, height = 0 } = useWindowSize();
  const [numberOfLines, setNumberOfLines] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const GAP = useMemo(() => (width > 640 ? 22 : 12), [width]);

  useEffect(() => {
    if (isMobile === undefined) return;
    const numberOfLines = !isMobile
      ? Math.floor(height / GAP)
      : Math.floor(width / GAP);

    setNumberOfLines(numberOfLines);
  }, [height, width, isMobile, GAP]);

  if (isMobile === undefined) return null;

  return (
    <div
      className={cn(
        "w-full h-[50px] sm:w-[50px] sm:pl-6 relative sm:h-full flex items-center justify-center"
      )}
    >
      <div
        className={cn("", {
          "h-full w-px": !isMobile,
          "h-px w-full": isMobile,
        })}
        ref={ref}
      >
        {Array.from({ length: numberOfLines }).map((_, i) => (
          <div
            key={i}
            id={`tick-${i}`}
            className={cn(
              "bg-[#113f36] ticks",
              { "w-[10px] h-[0.5px] absolute left-0": !isMobile },
              { "w-[0.5px] h-[10px] absolute left-0": isMobile }
            )}
            style={
              !isMobile
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
