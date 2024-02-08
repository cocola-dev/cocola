import { Separator } from "@/components/ui/separator";
import React from "react";

const Heder = () => {
  return (
    <div className="mb-4 ml-2 ">
      <h1 className="text-3xl">Create a new repository</h1>
      <p className="mb-2 text-sm text-muted-foreground">
        A repository contains all project files, including the revision history.
        Already have a project repository elsewhere?
      </p>
      <Separator className="mt-5" /> 
    </div>
  );
};

export default Heder;
