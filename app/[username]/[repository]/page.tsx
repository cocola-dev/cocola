"use client";

import { fetchRepo } from "@/actions/repo/fetch";
import { Repository } from "@prisma/client";
import React, { useEffect, useState } from "react";
import NotFound from "./components/notFound";
import { Code } from "./components/Code";
import { useCurrentUser } from "@/hooks/use-current-user";
import ContentLoader from "@/components/ContentLoader";

const Page = ({
  params,
}: {
  params: { username: string; repository: string };
}) => {
  // * Hooks
  const user = useCurrentUser();

  // * React states
  const [repodata, setRepodata] = useState<Repository | null>();
  const [repoNotFound, setRepoNotFound] = useState(false);
  const [isloading, setIsloading] = useState(false);

  // * Fetching data
  const fetching = async () => {
    setIsloading(true);
    await fetchRepo(params.username, params.repository, user)
      .then((data) => {
        if (data.error && data.statuscode === 404) {
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
          <ContentLoader />
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
