"use client";

import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";


export default function Home() {
  return (
    <main>
      <ModeToggle />
      <Link href="/login">login</Link>
    </main>
  );
}
