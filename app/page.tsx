"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { hello } from "@/server/actions/hello";

export default function Home() {
  const hendelclick = () => {
    hello();
  };
  return (
    <main>
      <ModeToggle />
      <Button onClick={hendelclick}>hello</Button>
    </main>
  );
}
