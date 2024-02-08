import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = cookies().get("authjs.session-token");

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />

      {children}
    </div>
  );
};

export default AuthLayout;
