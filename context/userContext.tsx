"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@prisma/client";

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
