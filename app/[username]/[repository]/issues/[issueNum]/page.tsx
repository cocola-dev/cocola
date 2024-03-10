import React from "react";

const Page = ({
  params,
}: {
  params: { username: string; repository: string; issueNum: string };
}) => {
  return (
    <div>
      <div>{params.username}</div>
      <div>{params.repository}</div>
      <div>{params.issueNum}</div>
    </div>
  );
};

export default Page;
