"use client";

import { fetchRepo } from "@/actions/repo/fetch";
import Loader2 from "@/components/Loader2";
import { useAuth } from "@/context/userContext";
import { Repository } from "@prisma/client";
import React, { useEffect, useState } from "react";
import NotFound from "./components/notFound";
import { Code } from "./components/Code";

const Page = ({
  params,
}: {
  params: { username: string; repository: string };
}) => {
  const [repodata, setRepodata] = useState<Repository | null>();
  const [repoNotFound, setRepoNotFound] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const { user } = useAuth();

  const fetching = async () => {
    setIsloading(true);
    await fetchRepo(params.username, params.repository, user)
      .then((data) => {
        if (data.statuscode === 404) {
          setRepoNotFound(true);
        }
        const { repo } = data;
        setRepodata(repo);
      })
      .finally(() => {
        setIsloading(false);
      });
    setIsloading(false);
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

 
  return (
    <main>
      {isloading ? (
        <div className="h-screen flex justify-center items-center">
          <Loader2 />
        </div>
      ) : repoNotFound ? (
        <NotFound />
      ) : (
        <div>
          {repodata && <Code repodata={repodata} />}
        </div>
      )}
    </main>
  );
};

export default Page;
