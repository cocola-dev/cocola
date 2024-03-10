"use client";

import { fetchRepo } from "@/actions/repo/fetch";
import Loader2 from "@/components/Loader2";
import { Repository } from "@prisma/client";
import React, { useEffect, useState } from "react";
import NotFound from "./components/notFound";
import { Code } from "./components/Code";
import { useCurrentUser } from "@/hooks/use-current-user";

const Page = ({
  params,
}: {
  params: { username: string; repository: string };
}) => {
  const [repodata, setRepodata] = useState<Repository | null>();
  const [repoNotFound, setRepoNotFound] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const user = useCurrentUser();

  const fetching = async () => {
    setIsloading(true);
    await fetchRepo(params.username, params.repository, user)
      .then((data) => {
        if (!data.error) {
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
        <div className="flex items-center justify-center h-screen">
          <Loader2 />
        </div>
      ) : repoNotFound ? (
        <NotFound />
      ) : (
        <div>{repodata && <Code repodata={repodata} />}</div>
      )}
    </main>
  );
};

export default Page;
