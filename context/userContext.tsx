"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { User } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { whoami } from "@/actions/whoami";
import { debounce } from "lodash";
import { getUserByEmail } from "@/data/user";

const AuthContext = createContext<{
  user: User | null;
}>({
  user: null,
});

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const currentUser = useCurrentUser();

  const test = async () => {
    if (!currentUser) {
      return;
    }
    const data = await getUserByEmail(currentUser?.email || "");
    console.log("data from context", data);
  };

  const fetchUserData = debounce(async () => {
    const { userdata } = await whoami(currentUser);
    setUser({ ...userdata, password: null });
    setIsLoading(false);
  }, 1000);

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      fetchUserData();
    }

    test();
    return () => fetchUserData.cancel();
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {/* {isLoading ? <Loader /> : children} */}
      {children}
    </AuthContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { AuthContext, AuthProvider, useAuth };
