import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMediaQuery } from "usehooks-ts";

import { makeFriendly } from "@/functions/makeFriendly";
import { usePrevious } from "@/hooks/usePrevious";

interface AnimatedCounterProviderProps {}

// For inferring return type
const useAnimatedCounterValues = () => {
  const [number, setNumber] = useState(4291);
  const [isFormatted, setFormatted] = useState(true);
  const [isTyping, setTyping] = useState(false);
  const [isRandomized, setRandomized] = useState(false);
  const [isCollapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const changeVal = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setNumber((prev) => Number(prev) - 1);
      } else {
        setNumber((prev) => Number(prev) + 1);
      }
    };
    window.addEventListener("wheel", changeVal);

    return () => {
      window.removeEventListener("wheel", changeVal);
    };
  }, []);

  const isMobile = useMediaQuery("(max-width: 640px)");

  const fontSize = isMobile ? 56 : 128;
  const padding = isMobile ? 12 : 16;
  const height = fontSize + padding;

  const isNegative = number < 0;

  const positiveNumber = isNegative ? number * -1 : number;

  const numArray = isFormatted
    ? positiveNumber < 9999
      ? new Intl.NumberFormat().format(number).split("")
      : isNegative
      ? ["-", ...makeFriendly(positiveNumber).split("")]
      : makeFriendly(positiveNumber).split("")
    : number.toString().split("");

  const prevNum = usePrevious(number);
  const isIncreasing = prevNum ? prevNum < number : false;
  const isDecreasing = prevNum ? prevNum > number : false;

  return {
    numArray,
    isTyping,
    fontSize,
    padding,
    height,
    isIncreasing,
    isDecreasing,
    isNegative,
    setNumber,
    number,
    setTyping,
    setFormatted,
    isFormatted,
    setRandomized,
    isRandomized,
    isCollapsed,
    setCollapsed,
  };
};

type AnimatedCounterProviderContext = ReturnType<
  typeof useAnimatedCounterValues
>;

const AnimatedCounterContext = createContext<
  Partial<AnimatedCounterProviderContext> | undefined
>(undefined);

export const AnimatedCounterProvider = ({
  children,
}: PropsWithChildren<AnimatedCounterProviderProps>) => {
  const values = useAnimatedCounterValues();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <AnimatedCounterContext.Provider value={values}>
      {children}
    </AnimatedCounterContext.Provider>
  );
};

export const useAnimatedCounter = () => {
  const context = useContext(AnimatedCounterContext);
  if (context === undefined) {
    throw new Error("useAnimatedCounter was used outside of its Provider");
  }
  return context as AnimatedCounterProviderContext;
};

export default AnimatedCounterProvider;
