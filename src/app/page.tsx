"use client";

import AnimatedCounterProvider from "@/provider/AnimatedCounterProvider";
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
