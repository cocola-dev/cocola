"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  BookMarked,
  BookOpen,
  LayoutPanelLeft,
  Star,
  Package,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function Page({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  let renderedComponentName;

  switch (tab) {
    case "repositories":
      renderedComponentName = "repositories";
      break;
    default:
      renderedComponentName = null;
  }

  return (
    <>
      <ScrollArea className="h-[90vh] w-full rounded-md px-2">
        <div className="text-sm font-medium text-center border-b text-muted-foreground dark:text-gray-400">
          <ul className="flex flex-wrap -mb-px text-muted-foreground">
            <li className="me-2">
              <Link
                href={`/${params.username}`}
                className={`${
                  renderedComponentName === null
                    ? "flex items-center p-4 border-b-2 border-muted-foreground rounded-t-lg text-foreground active"
                    : "flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
                } `}
                // className={`flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground`}
                aria-current="page"
              >
                {/* <Link
                to={""}
                className="flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
              > */}
                <BookOpen className="mr-2" size={16} />
                Overview
              </Link>
            </li>
            <li className="me-2">
              <Link
                href={`/${params.username}?tab=repositories`}
                // className="flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
                className={`${
                  renderedComponentName === "repositories"
                    ? "flex items-center p-4 border-b-2 border-muted-foreground rounded-t-lg text-foreground active"
                    : "flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
                } `}
              >
                <BookMarked className="mr-2" size={16} /> Repositories
                {/* {userrepo?.length ? (
                  <Badge
                    className="ml-3 rounded-full text-muted-foreground"
                    variant="secondary"
                  >
                    {userrepo?.length}
                  </Badge>
                ) : null} */}
              </Link>
            </li>
            <li className="me-2">
              <Link
                href={`/${params.username}?tab=projects`}
                className="flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
              >
                <LayoutPanelLeft className="mx-2" size={16} />
                Project
              </Link>
            </li>
            <li className="me-2">
              <Link
                href={"/dashboard"}
                className="flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
              >
                <Package className="mr-2" size={16} /> Packages
              </Link>
            </li>
            <li className="me-2">
              <Link
                href={"/"}
                className="flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
              >
                <Star className="mr-2" size={16} /> Stars
                <Badge
                  className="ml-3 rounded-full text-muted-foreground"
                  variant="secondary"
                >
                  10
                </Badge>
              </Link>
            </li>
          </ul>
        </div>
        <Card className="h-4 m-auto border-none shadow-none mx-28">
          {children}
        </Card>
      </ScrollArea>
    </>
  );
}
