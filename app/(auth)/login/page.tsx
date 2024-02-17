import { LoginForm } from "@/components/auth/login-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cocola - Login",
  description: "Cocola - Login",
  keywords: ["Login", "cocola", "Cocola - Login"],
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
