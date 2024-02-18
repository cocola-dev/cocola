import { Loader2 } from "lucide-react";
import React from "react";

const CompoLoader = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Loader2 size={30} className="animate-spin w-full mt-48" />
    </div>
  );
};

export default CompoLoader;
