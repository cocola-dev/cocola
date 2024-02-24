"use client";

import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { FileWithPath } from "file-selector";
import {
  FileCode2,
  GitCommitHorizontal,
  GitPullRequestArrow,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";

const Upload = () => {
  const user = useCurrentUser();
  const params = useParams<{
    username: string;
    repository: string;
    branch: string;
  }>();
  console.log(params);
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const handlechange = async (acceptFiles: FileWithPath[]) => {
    // Items to ignore
    const ignoreList = [
      ".env",
      "node_modules",
      ".git",
      ".next",
      ".vercel",
      "dist",
    ];

    // console.log(acceptFiles);
    // Filter out files or folders listed in the ignoreList

    const filteredFiles = acceptFiles.filter((file) => {
      const fileName = file.path && file.path.toLowerCase();
      return !ignoreList.some((item) => fileName?.includes(item.toLowerCase()));
    });

    setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <div>
      <div className="my-2 text-xl">
        <Link
          className=" hover:text-blue-700 hover:underline"
          href={`/${params.username}/${params.repository}`}
        >
          {params.repository}{" "}
        </Link>{" "}
        /
      </div>
      <div className="items-center justify-center w-full p-5 border rounded-md">
        <Dropzone onDrop={(acceptedFiles) => handlechange(acceptedFiles)}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <section className="flex items-center justify-center h-96">
              <div
                className="flex items-center justify-center w-full h-full "
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div className="flex items-center justify-center w-full h-full border-4 border-dashed rounded-md">
                    <div className="grid place-items-center">
                      <FileCode2
                        className="mb-5 text-muted-foreground"
                        size={50}
                      />
                      <p className="text-muted-foreground">
                        Drop to Upload file
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid w-full place-items-center">
                    <FileCode2
                      className="mb-5 text-muted-foreground"
                      size={50}
                    />

                    <p className="text-muted-foreground">
                      Drag files here to add them to your repository
                    </p>
                    <p className="text-muted-foreground">
                      or
                      <span className="text-blue-600 cursor-pointer hover:underline">
                        choose your file
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}
        </Dropzone>
      </div>

      <Card className="flex my-5 border-none rounded-md">
        <div>
          <Avatar>
            <AvatarImage
              src={user?.image || "https://asset-cocola.vercel.app/copilot.png"}
              alt={user?.username || "profile"}
            />
            <AvatarFallback> </AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full ml-4 comment-box">
          <Card className="w-full p-4 rounded-md">
            <h1 className="text-xl ">Commit changes</h1>
            <Input className="my-3" placeholder="Add file via upload" />
            <Textarea
              rows={5}
              placeholder="Add an optional extended description..."
            />
            <RadioGroup className="mt-3" defaultValue="main">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="main" id="r1" />
                <GitCommitHorizontal size={25} />
                <p className="ml-2">Commit directly to the main branch.</p>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="mr-1" value="new" id="r2" />
                <GitPullRequestArrow size={20} />
                <p className="ml-2">
                  Create a new branch for this commit and start a pull request.
                </p>
              </div>
            </RadioGroup>
          </Card>
          <div className="flex gap-3 my-4">
            <Button variant={"default"}>Commit changes</Button>
            <Button variant={"danger2"}>Cancel</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Upload;
