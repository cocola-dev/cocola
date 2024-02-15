import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

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
      {/* <Footer /> */}
    </div>
  );
}
