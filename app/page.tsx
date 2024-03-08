"use client";

import React from "react";
import Dashboard from "./components/Dashboard";
import { useSession } from "next-auth/react";
import Landing from "./components/Landing";

const Page = () => {
  const session = useSession();

  return (
    <div>
      {session.data ? (
        <Dashboard />
      ) : (
        <div>
          <Landing />
        </div>
      )}
    </div>
  );
};

export default Page;
