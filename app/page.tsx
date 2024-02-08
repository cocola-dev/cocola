import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <ModeToggle />
      <Link href="/auth/login">login</Link>

    </main>
  );
}
