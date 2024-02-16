"use client";

import { Card } from "@/components/ui/card";
import { getAccountByUserId } from "@/data/getAccountByUsername";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import CompoLoader from "@/components/ComponentLoader";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/userContext";
import { User } from "@prisma/client";
import Link from "next/link";
import {
  BookMarked,
  BookOpen,
  LayoutPanelLeft,
  Star,
  Package,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Repositories = dynamic(() => import("./components/Repositories"), {
  loading: () => <CompoLoader />,
});
const Overview = dynamic(() => import("./components/Overview"), {
  loading: () => <CompoLoader />,
});
const UserSide = dynamic(() => import("./components/UserSide"), {
  loading: () => <Loader />,
});

export default function Page({ params }: { params: { username: string } }) {
  const [userdata, setUserdata] = useState<any>();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const tab = searchParams?.get("tab");

  const userrepo = require("./data/data.repositories.json");

  const { user } = useAuth();

  let renderedComponent;
  let renderedComponentName;

  switch (tab) {
    case "repositories":
      renderedComponent = <Repositories userrepo={userrepo} />;
      renderedComponentName = "repositories";
      break;
    default:
      renderedComponent = <Overview userrepo={userrepo} />;
      renderedComponentName = null;
  }

  const data = async () => {
    setLoading(true);
    return await getAccountByUserId(params.username);
  };

  useEffect(() => {
    data()
      .then((res) => {
        if (res) {
          setUserdata(res);
        } else {
          setUserdata(null);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
        <div className="mt-5">
          <div className="flex justify-between">
            <div className="w-72">
              <UserSide userdata={userdata} user={user as User} />
            </div>
            <Card className="w-full p-4 ml-10 border-none shadow-none">
              {renderedComponent}
            </Card>
          </div>
        </div>
      </Card>
    </>
  );
}
