import { auth } from "@/auth";
import Navbar from "@/components/Navbar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await auth();

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      {children}
    </div>
  );
}
