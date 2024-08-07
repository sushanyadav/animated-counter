"use client";

import { motion } from "framer-motion";
import { useScrollLock } from "usehooks-ts";

import { ConfigureNumbers } from "@/components/ConfigureNumbers";
import { Counter } from "@/components/Counter";
import { CounterTimeLines } from "@/components/CounterTimeLines";
import AnimatedCounterProvider, {
  useAnimatedCounter,
} from "@/provider/AnimatedCounterProvider";

export default function Home() {
  useScrollLock();

  return (
    <AnimatedCounterProvider>
      <main className="min-h-[100dvh] flex flex-col">
        <CounterTimeLines />
        <CounterWrapper />
        <ConfigureNumbers />
      </main>
    </AnimatedCounterProvider>
  );
}

const CounterWrapper = () => {
  const { isCollapsed } = useAnimatedCounter();

  return (
    <motion.div
      animate={{
        y: isCollapsed ? -40 : -75,
      }}
      className="flex w-fit mx-auto items-center flex-1 select-none"
      initial={false}
    >
      <Counter />
    </motion.div>
  );
};
