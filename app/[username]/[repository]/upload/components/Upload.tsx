"use client";

import React, { use, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { FileWithPath } from "file-selector";
import {
  Dot,
  FileCode,
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
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { storage } from "@/firebase/firebase";
import {
  getDownloadURL,
  getMetadata,
  ref,
  updateMetadata,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "sonner";
import { addCommit } from "@/actions/repo/addCommit";
import { Commit, Repository, User } from "@prisma/client";
import { fetchRepo } from "@/actions/repo/fetch";

interface Credentials {
  title: string;
  description: string;
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

const Upload = () => {
  // * React states
  const user = useCurrentUser();
  const params = useParams<{
    username: string;
    repository: string;
    branch: string;
    path?: string[];
  }>();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [metadataCredentials, setMetadataCredentials] = useState<Credentials>({
    title: "",
    description: "",
  });
  const [isload, setisload] = useState(false);
  const [repodata, setRepodata] = useState<Repository | null>();
  const router = useRouter();

  const fetching = async () => {
    await fetchRepo(params.username, params.repository, user).then((data) => {
      const { repo } = data;
      setRepodata(repo);
    });
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // * handle change on react drag and drop
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

    const filteredFiles = acceptFiles.filter((file) => {
      const fileName = file.path && file.path.toLowerCase();
      return !ignoreList.some((item) => fileName?.includes(item.toLowerCase()));
    });

    setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
    // setFiles(filteredFiles);
  };

  // * handel metadata
  const onChange = (e: { target: { name: string; value: string } }) => {
    setMetadataCredentials({
      ...metadataCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // todo: rendom string
    function generateRandomString() {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let randomString = "";

      for (let i = 0; i < 32; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }

      return randomString;
    }

    const randomString = generateRandomString();

    const uploadPromises = files.map((file) => {
      return new Promise(async (resolve, reject) => {
        const newMetadata = {
          customMetadata: {
            satus: "CREATED",
            commitId: randomString,
            commitTitle: metadataCredentials.title,
            commitDescription: metadataCredentials.description,
            filePath: file?.path ? file?.path : "/",
          },
        };

        const storageRef = ref(
          storage,
          `files/${user?.username}/${params.repository}${params.path ? params.path : "/"}${file?.path}`,
        );

        const task = uploadBytesResumable(storageRef, file, newMetadata);

        task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
              ) / 100;
            console.log(progress);
          },
          (error) => {
            console.error("Error during upload:", error);
            reject(error);
          },
          () => {
            getMetadata(task.snapshot.ref)
              .then((metadata) => {
                console.log("metadata", metadata);
                const fileMetadata = {
                  type: "file",
                  generation: metadata.generation,
                  satus: metadata.customMetadata?.satus,
                  commitId: metadata.customMetadata?.commitId,
                  commitTitle: metadata.customMetadata?.commitTitle,
                  commitDescription: metadata.customMetadata?.commitDescription,
                  fullPath: metadata.fullPath,
                  filePath: metadata.customMetadata?.filePath,
                  metageneration: metadata.metageneration,
                  md5Hash: metadata.md5Hash,
                  name: metadata.name,
                  size: metadata.size,
                  timeCreated: metadata.timeCreated,
                };
                // console.log("File metadata:", fileMetadata);
                resolve(fileMetadata); // Resolve with the file metadata
              })
              .catch((error) => {
                console.error("Error getting metadata:", error);
                reject(error);
              });
          },
        );
      });
    });

    try {
      const results = await Promise.all(uploadPromises);
      console.log("All files uploaded successfully. File metadata:", results);

      const addcommitValue = {
        commitId: randomString,
        author: user?.username || "", // Add the appropriate value for author
        title: metadataCredentials.title,
        description: metadataCredentials.description,
        branch: params.branch,
        repositoryId: repodata?.id || "",
        createdAt: new Date(),
        updatedAt: new Date(),
        files: results as [],
      };

      console.log(addcommitValue);
      // @ts-ignore
      addCommit(addcommitValue, user as User);

      console.log("add commits", {
        author: user?.username,
        branch: params.branch,
        commitId: randomString,
        name: params.repository,
        repositoryId: params.repository,
        description: metadataCredentials.description,
        title: metadataCredentials.title,
        files: results,
      });
      toast.success("All files uploaded successfully");
      router.push(`/${user?.username}/${params.repository}`, { scroll: false });
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Error uploading files");
    }
  };

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
                      or {" "}
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

      {files.length > 0 ? (
        <section className="my-4">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Files
          </h4>
          {files.map((file, index) => (
            <Card
              key={index}
              className="flex items-center justify-between rounded-md py-3 px-3 my-3"
            >
              <div className="flex items-center">
                <FileCode size={20} className="text-muted-foreground" />
                <p className=" ml-2">{file.name}</p>
                <Dot className="ml-2" />
                <p className="ml-2">{file.path}</p>
              </div>
              <p className="text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </Card>
          ))}
        </section>
      ) : null}

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
            <Input
              className="my-3"
              name="title"
              onChange={onChange}
              placeholder="Add file via upload"
            />
            <Textarea
              name="description"
              onChange={onChange}
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
            <Button
              variant={"default"}
              type="submit"
              disabled={files.length > 0 ? false : true}
              onClick={handleSubmit}
            >
              {" "}
              Commit changes
            </Button>
            <Button variant={"danger2"}>Cancel</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Upload;
