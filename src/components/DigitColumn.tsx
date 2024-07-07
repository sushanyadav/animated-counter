import { useAnimate, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useAnimatedCounter } from "./AnimatedCounterProvider";
import { Digit } from "./Digit";

// TO PREVENT BLUR ANIMATION ON WINDOW LOAD
let initialAnimate = false;

export const DigitColumn = ({
  debug,
  digit,
}: {
  debug: boolean;
  digit: number;
}) => {
  const { isTyping, height, isDecreasing, isIncreasing, isNegative } =
    useAnimatedCounter();

  const [scope, animate] = useAnimate();

  let animatedValue = useSpring(digit, {
    stiffness: 300,
    damping: 30,
  });

  useEffect(() => {
    if (!initialAnimate) {
      setTimeout(() => (initialAnimate = true), 0);
      return;
    }

    animate(
      ".number",
      {
        filter: ["blur(4.5px)", "blur(0px)"],
        scale: [0.6, 1],
      },
      {
        duration: 0.6,
      }
    );
  }, [animate, digit]);

  useEffect(() => {
    if (isTyping) return;

    animatedValue.set(digit);
  }, [animatedValue, digit, isTyping]);

  useEffect(() => {
    const _prev = animatedValue.getPrevious();
    const prev = Math.round(_prev);
    const diff = digit - prev;

    const increasingVal = digit - 10 - diff;
    const decreasingVal = digit + 10 - diff;

    if (isNegative) {
      if (diff > 0 && isIncreasing) {
        animatedValue.jump(decreasingVal);
      }
      if (diff < 0 && isDecreasing) {
        animatedValue.jump(increasingVal);
      }
      return;
    }

    if (diff < 0 && isIncreasing) {
      animatedValue.jump(increasingVal);
    }

    if (diff > 0 && isDecreasing) {
      animatedValue.jump(decreasingVal);
    }
  }, [animatedValue, debug, isDecreasing, isIncreasing, isNegative, digit]);

  return (
    <div
      ref={scope}
      style={{ height }}
      className="relative w-[1ch] tabular-nums"
    >
      {Array.from({ length: 10 }, (_, i) => i).map((i) => (
        <Digit height={height} key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
};
