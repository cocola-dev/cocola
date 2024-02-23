import React from "react";
import { Card } from "@/components/ui/card";
import { BsChatRightDots } from "react-icons/bs";

const Page = () => {
  return (
    <div className="ml-2 h-full hidden md:block w-full border-slate-100">
      <Card className="h-full rounded-md">
        <div className="px-2 h-full flex justify-center items-center">
          <div className=" grid place-items-center">
            <BsChatRightDots className=" w-16 h-16 mb-5" />
            <h1>select user to start chating</h1>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Page;
