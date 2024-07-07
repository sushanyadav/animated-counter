"use client";

import AnimatedCounterProvider from "@/provider/AnimatedCounterProvider";
import { Counter } from "@/components/Counter";
import { CounterTimeLine } from "@/components/CounterTimeLine";
import { useScrollLock } from "usehooks-ts";

export default function Home() {
  useScrollLock();

  return (
    <main className="min-h-screen grid place-items-center">
      <AnimatedCounterProvider>
        <CounterTimeLine />
        <Counter />
      </AnimatedCounterProvider>
    </main>
  );
}
