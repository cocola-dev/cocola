"use client";

import React, { useState } from "react";

import { ASSETS } from "@/data/variables";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

import { MoveRight } from "lucide-react";
import Loader2 from "./Loader2";

import { UpdateProfilePicAction } from "@/actions/profilePic";

interface UploadImageProps {
  preview: string;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUpload: React.FC<UploadImageProps> = ({ preview, setPreview }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File | null;
    console.log(file);
    setSelectedFile(file);
  };

  // todo:
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", selectedFile);
    console.log("formdata", formData);

    try {
      setIsLoading(true);

      await fetch(`${ASSETS}/upload`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          await setPreview(data.imageUrl);
          await UpdateProfilePicAction({ image: data.imageUrl } as any)
            .then((data) => {
              if (data?.error) {
                toast.error(data.error);
              }

              if (data?.success) {
                toast.success(data.success);
              }
            })
            .catch(() => toast.error("Something went wrong"));
        });

      toast.success("Profile picture hase been updated...");
      console.log("reloading for better performense...");
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <Loader2 />
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="w-full mb-3 flex items-center justify-between">
              <Avatar className="w-24 h-24">
                <AvatarImage src={preview} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              {selectedFile ? (
                <MoveRight
                  strokeWidth={0.75}
                  className="text-muted-foreground w-20 h-auto"
                />
              ) : null}
              {selectedFile ? (
                <Avatar className="w-24 h-24">
                  <AvatarImage src={URL.createObjectURL(selectedFile)} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              ) : null}
            </div>
            <div className="mb-2">Profile Image</div>
            <Input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <div className="text-xs mt-2 text-muted-foreground">
              Choose best image that bring spirits to your circle.
            </div>
            <Button className="mt-3" type="submit">
              Upload
            </Button>
          </form>
        </>
      )}
    </>
  );
};

export default ImageUpload;
