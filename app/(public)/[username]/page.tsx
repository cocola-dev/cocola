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
  const tab = searchParams.get("tab");

  const userrepo = require("./data/data.repositories.json");

  const { user } = useAuth();
  let renderedComponent;

  switch (tab) {
    case "repositories":
      renderedComponent = <Repositories userrepo={userrepo} />;
      break;
    default:
      renderedComponent = <Overview userrepo={userrepo} />;
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
          console.log("not found");
        }
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mt-5">
        <div className="flex justify-between">
          <UserSide userdata={userdata} user={user as User} />
          <Card className="w-full p-4 ml-10 border-none shadow-none">
            {renderedComponent}
          </Card>
        </div>
      </div>
    </>
  );
}
