import { NextComponentType } from "next";
import LoginRequired from "./components/LoginRequired";
import { useSession } from "next-auth/react";

export function withAuth(Component: NextComponentType) {
  return async function AuthComponent(props: any) {
    const session = useSession();

    if (session.status === "unauthenticated") {
      return <LoginRequired />;
    }

    return session ? <Component {...props} /> : null;
  };
}
