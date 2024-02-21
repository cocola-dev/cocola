import { NextComponentType } from "next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function withAuth(Component: NextComponentType) {
  return function AuthComponent(props: any) {
    const { data: session } = useSession();

    if (!session) {
      return redirect(`/login`);
    }

    return <Component {...props} />;
  };
}
