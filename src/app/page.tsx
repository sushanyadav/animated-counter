"use client";

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
    <main className="min-h-screen flex flex-col">
      <AnimatedCounterProvider>
        <CounterTimeLines />
        <div className="flex items-center flex-1 select-none">
          <Counter />
        </div>
        <ConfigureNumbers />
      </AnimatedCounterProvider>
    </main>
  );
}
