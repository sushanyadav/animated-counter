"use client";

import AnimatedCounterProvider from "@/provider/AnimatedCounterProvider";
import { CounterTimeLines } from "@/components/CounterTimeLines";
import { useScrollLock } from "usehooks-ts";
import { Counter } from "@/components/Counter";

export default function Home() {
  useScrollLock();

  return (
    <main className="min-h-screen grid place-items-center">
      <AnimatedCounterProvider>
        <CounterTimeLines />
        <Counter />
      </AnimatedCounterProvider>
    </main>
  );
}
