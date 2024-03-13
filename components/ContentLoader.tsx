import React from "react";

const ContentLoader = ({ size }: { size?: number }) => {
  return (
    <div
      className={`h-${size || 7} w-${size || 7} rounded-full border-2 border-t-secondary-foreground my-2 animate-spin`}
    ></div>
  );
};

export default ContentLoader;
