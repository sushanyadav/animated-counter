import { motion } from "framer-motion";

import { DigitColumn } from "./DigitColumn";

import { cn } from "@/functions/cn";
import { isNumeric } from "@/functions/isNumeric";
import { useAnimatedCounter } from "@/provider/AnimatedCounterProvider";

export const Counter = () => {
  const { numArray, fontSize, height, padding } = useAnimatedCounter();

  const transition = {
    layout: {
      type: "spring",
      damping: 20,
      stiffness: 200,
    },
  };

  return (
    <motion.span
      className={cn(
        "flex overflow-hidden text-white font-mono w-fit mx-auto items-center justify-center leading-text-white",
        "[mask-image:linear-gradient(to_bottom,_transparent,_black_30%,_black_calc(100%_-_30%),_transparent)]",
        "[-webkit-mask-image:linear-gradient(to_bottom,_transparent,_black_30%,_black_calc(100%_-_30%),_transparent)]"
      )}
      layout="position"
      style={{
        fontSize: `${fontSize}px`,
        height: `${height + padding}px`,
      }}
      transition={transition}
    >
      {numArray.map((_digit, index) => {
        // check if the digit is not a number
        if (!isNumeric(_digit)) {
          return <span key={index}>{_digit}</span>;
        }

        const digit = +_digit; // convert string to number

        return (
          <DigitColumn
            key={index}
            debug={index === numArray.length - 1} // just for debugging - console logs (logging last column)
            digit={digit}
          />
        );
      })}
    </motion.span>
  );
};
