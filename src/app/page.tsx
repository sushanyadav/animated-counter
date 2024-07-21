"use client";

import AnimatedCounterProvider, {
  useAnimatedCounter,
} from "@/provider/AnimatedCounterProvider";
import { CounterTimeLines } from "@/components/CounterTimeLines";
import { useScrollLock } from "usehooks-ts";
import { Counter } from "@/components/Counter";
import { ConfigureNumbers } from "@/components/ConfigureNumbers";

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
