"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CircleDot,
  Code,
  GitPullRequestArrow,
  LineChart,
  Settings,
  ShieldAlert,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    username: string;
    repository: string;
  };
}) => {
  const pathname = usePathname();

  const Items = [
    {
      name: "Code",
      href: `/${params.username}/${params.repository}`,
      icon: Code,
      count: 0,
    },
    {
      name: "Issues",
      href: `/${params.username}/${params.repository}/issues`,
      icon: CircleDot,
      count: 2,
    },
    {
      name: "Pull requests",
      href: `/pulls`,
      icon: GitPullRequestArrow,
      count: 6,
    },
    {
      name: "Workflow",
      href: `/workflow`,
      icon: Workflow,
      count: 0,
    },
    {
      name: "Graph",
      href: `/`,
      icon: LineChart,
      count: 0,
    },
    {
      name: "Security",
      href: `/`,
      icon: ShieldAlert,
      count: 2,
    },
    {
      name: "Settings",
      href: `/`,
      icon: Settings,
      count: 0,
    },
  ];

  return (
    <div className="mb-44">
      <div className="text-sm font-medium text-center text-muted-foreground border-b bg-primary-foreground/35 dark:text-gray-400">
        <div className="text-sm font-medium text-center text-muted-foreground dark:text-gray-400">
          <div className="flex ml-4 flex-wrap -mb-px text-muted-foreground">
            {Items.map((item, index) => (
              <div className="" key={index}>
                <Link
                  href={item.href}
                  className={`${
                    pathname === item.href
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
      </div>
      <div>{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
