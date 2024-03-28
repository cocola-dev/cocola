// "use client";

import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";

const Mininavigationbar = ({
  items,
  renderedComponentName,
}: {
  items: any[];
  renderedComponentName: any;
}) => {
  return (
    <div className="text-sm font-medium text-center bg-primary-foreground/35 border-b text-muted-foreground dark:text-gray-400">
      <div className="flex flex-wrap -mb-px text-muted-foreground">
        {items.map((item, index) => (
          <div className="me-2" key={index}>
            <Link
              href={item.href}
              className={`${
                renderedComponentName === item.renderedComponentName
                  ? "border-muted-foreground  text-foreground"
                  : "border-transparent dark:hover:text-foreground"
              } flex items-center p-1 py-3 border-b-2 rounded-t-lg`}
            >
              <Button
                className="hover:bg-primary-foreground"
                variant={"ghost"}
                size={"sm"}
                asChild
              >
                <div>
                  <item.icon className="mr-2" size={16} />
                  <small className="text-sm font-medium leading-none">
                    {item.name}
                  </small>
                  {item.count > 0 ? (
                    <Badge
                      className="ml-3 rounded-full text-muted-foreground"
                      variant="secondary"
                    >
                      {item.count}
                    </Badge>
                  ) : null}
                </div>
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mininavigationbar;
