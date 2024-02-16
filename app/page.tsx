import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1>Home</h1>
      <Link href="/auth/login">login</Link>
    </main>
  );
}
