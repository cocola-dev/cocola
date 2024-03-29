"use client";

import * as React from "react";
import { Style } from "./styles";

interface StyleWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  styleName?: Style["name"];
}

export function StyleWrapper({ styleName, children }: StyleWrapperProps) {
  const config = {
    style: "zinc",
  };

  if (!styleName || config.style === styleName) {
    return <>{children}</>;
  }

  return null;
}
