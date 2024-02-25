import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
import { UpdateProfilePicAction } from "@/actions/profilePic";

interface UploadImageProps {
  preview: string;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUpload: React.FC<UploadImageProps> = ({ preview, setPreview }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File | null;
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

    try {
      const response = await fetch("https://asset-cocola.vercel.app/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPreview(data.imageUrl);
          UpdateProfilePicAction({ image: data.imageUrl } as any).then((res) => {
            window.location.reload();
          });
        });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex items-center justify-between">
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
        <FormItem>
          <FormLabel>Profile Image</FormLabel>
          <FormControl>
            <Input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </FormControl>
          <FormDescription>
            Choose best image that bring spirits to your circle.
          </FormDescription>
        </FormItem>
        <Button className="mt-3" type="submit">
          Upload
        </Button>
      </form>
    </>
  );
};

export default ImageUpload;
