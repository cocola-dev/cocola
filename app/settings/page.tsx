"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { withAuth } from "@/protectedRouter";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import Uploadimage from "./components/Image";
import { useEffect, useState } from "react";
import ImageUpload from "@/components/UploadImages";

const formSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  PublicEmail: z.string().email().optional(),
  Bio: z.string().max(160).optional(),
  Pronouns: z.string().optional(),
  URL: z.string().optional(),
  Company: z.string().optional(),
  Location: z.string().optional(),
  image: z.string().optional(),
});

const Page = () => {
  const user = useCurrentUser();

  const [preview, setPreview] = useState<string>(user?.image as string);

  useEffect(() => {
    form.setValue("image", preview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      PublicEmail: user?.email || "",
      Bio: user?.bio || "",
      Pronouns: user?.Pronouns || "",
      URL: user?.URL || "",
      Company: user?.Company || "",
      Location: user?.country || "",
      image: preview || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="ml-8 text-2xl w-full">
      Public profile
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <section className="flex">
            <div className="mr-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your name may appear around GitHub where you contribute or
                      are mentioned. You can remove it at any time.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="PublicEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Public email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      You can manage verified email addresses in your{" "}
                      <Link
                        className="text-blue-700 underline"
                        href={"/settings/email"}
                      >
                        email settings
                      </Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can @mention other users and organizations to link to
                      them.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Pronouns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pronouns</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Don't specify">
                          Don&apos;t specify
                        </SelectItem>
                        <SelectItem value="they/them">they/them</SelectItem>
                        <SelectItem value="she/her">she/her</SelectItem>
                        <SelectItem value="he/him">he/him</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="URL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      You can @mention your company’s Cocola organization to
                      link it.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-xs text-muted-foreground">
                All of the fields on this page are optional and can be deleted
                at any time, and by filling them out, you&apos;re giving us
                consent to share this data wherever your user profile appears.
                Please see our privacy statement to learn more about how we use
                this information.
              </div>
            </div>

            <div>
              <FormLabel className="w-full mb-4">Profile picture</FormLabel>

              <Avatar className="w-40 overflow-visible h-40 mt-3">
                <AvatarImage
                  className="rounded-full"
                  src={user?.image}
                  alt="Profile picture"
                />
                <span className="absolute flex items-center justify-center  rounded-full bottom-5 -right-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="mt-2 w-full text-sm"
                        size={"sm"}
                        variant="outline"
                      >
                        {" "}
                        <Pencil size={12} className="mr-1" /> Edit
                      </Button>
                    </DialogTrigger>
                    {/* <DialogContent className="sm:max-w-[500px]">
                      <Uploadimage preview={preview} setPreview={setPreview} />
                    </DialogContent> */}
                    <DialogContent className="sm:max-w-[500px]">
                      <ImageUpload preview={preview} setPreview={setPreview} />
                    </DialogContent>
                  </Dialog>
                </span>
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
          </section>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default withAuth(Page);
