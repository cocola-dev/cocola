import Link from "next/link";
import React from "react";

interface SidebarMaperProps {
  sections: Sections[];
  path: string;
}

interface Sections {
  path: string;
  text: string;
  icon: React.ReactNode;
}

const SidebarMaper = ({ sections, path }: SidebarMaperProps) => {
  return (
    <div>
      {sections.map((section) => (
        <Link
          href={section.path}
          className="flex items-center"
          key={section.path}
        >
          {section.path === path ? (
            <div className="w-1 h-full bg-foreground rounded-full mr-1">‎ </div>
          ) : (
            <div className="w-1 h-full bg-foreground rounded-full mr-1"> </div>
          )}
          <div
            className={`text-muted-foreground w-64 text-sm flex rounded-md my-1 ${section.path === path ? "bg-muted hover:bg-muted" : "hover:bg-muted"} px-2 py-1`}
          >
            {section.icon}
            <h1 className="ml-2 text-foreground">{section.text}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SidebarMaper;
