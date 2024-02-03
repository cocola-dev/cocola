"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { User } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { whoami } from "@/actions/whoami";
import { debounce, set } from "lodash";

const AuthContext = createContext<{
  user: User | null;
}>({
  user: null,
});

// Create a hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

// Create a component that provides authentication-related data and functions
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const currentUser = useCurrentUser();

  const fetchUserData = debounce(async () => {
    const { userdata } = await whoami(currentUser);
    setUser({ ...userdata, password: null });
    setIsLoading(false);
  }, 900);

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      fetchUserData();
    } 

    // Cleanup the debounce function on component unmount
    return () => fetchUserData.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // Provide authentication-related data and functions through the context
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { AuthContext, AuthProvider, useAuth };
