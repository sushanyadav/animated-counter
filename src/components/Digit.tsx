import { MotionValue, motion, useTransform } from "framer-motion";

interface NumberProps {
  mv: MotionValue<number>;
  height: number;
  number: number;
}

export const Digit = ({ mv, height, number }: NumberProps) => {
  let y = useTransform(mv, (latest) => {
    const b = latest % 10;

    const offset = (10 + number - b) % 10;
    let memo = offset * height;

    if (offset > 5) memo = memo - 10 * height;

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className={`absolute select-none number inset-0 flex items-center justify-center`}
    >
      {number}
    </motion.span>
  );
};
