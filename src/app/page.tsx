"use client";

import AnimatedCounterProvider from "@/components/AnimatedCounterProvider";
import { Counter } from "@/components/Counter";

export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center">
      <AnimatedCounterProvider>
        <Counter />
      </AnimatedCounterProvider>
    </main>
  );
}
