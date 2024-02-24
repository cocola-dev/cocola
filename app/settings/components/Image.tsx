"use client";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UploadImageProps {
  preview: string;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterCircleInputClientSchema = zod.object({
  circle_image: zod.string(),
});

type RegisterCircleInputClient = zod.infer<
  typeof RegisterCircleInputClientSchema
>;

const registerCircleSchemaClient = RegisterCircleInputClientSchema;

export type { RegisterCircleInputClient, registerCircleSchemaClient };

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image),
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);
  return { files, displayUrl };
}

const UploadImage: React.FC<UploadImageProps> = ({ preview, setPreview }) => {
  const form = useForm<RegisterCircleInputClient>({
    mode: "onSubmit",
    resolver: zodResolver(registerCircleSchemaClient),
  });

  function submitCircleRegistration(value: RegisterCircleInputClient) {
    console.log({ value });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Profile picture</DialogTitle>
        <DialogDescription>
          Make changes to your profile picture here. Click upload when
          you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(submitCircleRegistration)}
          >
            <Avatar className="w-24 h-24">
              <AvatarImage src={preview} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <FormField
              control={form.control}
              name="circle_image"
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <FormItem>
                    <FormLabel>Circle Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...rest}
                        onChange={(event) => {
                          const { files, displayUrl } = getImageData(event);
                          setPreview(displayUrl);
                          onChange(files);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose best image that bring spirits to your circle.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <Button type="submit">Upload</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UploadImage;
