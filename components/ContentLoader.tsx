import React from "react";

const ContentLoader = ({
  size,
  dark = false,
}: {
  size?: number;
  dark?: boolean;
}) => {
  return (
    <div
      className={`h-${size || 7} w-${size || 7} rounded-full border-2 ${dark ? "border-border/15 border-t-secondary" : "border-t-secondary-foreground"} my-2 animate-spin`}
    ></div>
  );
};

export default ContentLoader;
