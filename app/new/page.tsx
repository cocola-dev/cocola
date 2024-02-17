"use client";

import New from "@/components/repository/new/New";
import { withAuth } from "@/protectedRouter";

const Page = () => {
  return (
    <div className="flex items-center justify-center w-full h-full ">
      <New />
    </div>
  );
};

export default withAuth(Page);
