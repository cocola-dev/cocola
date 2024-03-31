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
import { useState } from "react";
import ImageUpload from "@/components/UploadImages";
import { settings_Public_Profile } from "@/actions/settings";

const formSchema = z.object({
  name: z.string().min(2).max(15).optional(),
  lname: z.string().min(2).max(15).optional(),
  email: z.string().email().optional(),
  bio: z.string().max(200).optional(),
  image: z.string().optional(),
  Pronouns: z.string().optional(),
  URL: z.string(),
  Company: z.string().optional(),
  country: z.string().optional(),
});

const Page = () => {
  const user = useCurrentUser();

  const [preview, setPreview] = useState<string>(user?.image as string);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      lname: user?.lname || "",
      email: user?.email || "",
      bio: user?.bio || "",
      Pronouns: user?.Pronouns || "",
      URL: user?.URL || "",
      Company: user?.Company || "",
      country: user?.country || "",
      image: preview,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    settings_Public_Profile(values).then((res) => {
      // location.reload();
    });
  }

  return (
    <div className="ml-8 flex text-2xl w-full">
      <div>
        Public profile
        <Separator className="my-4" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <section className="flex">
              <div className="mr-4">
                <div className="flex w-full m-auto">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input className="w-full" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lname"
                    render={({ field }) => (
                      <FormItem className=" m-auto">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input className="w-full" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormDescription>
                  Your name may appear around Cocola where you contribute or are
                  mentioned. You can remove it at any time.
                </FormDescription>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Public email</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="" {...field} />
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
                  name="bio"
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
                        You can @mention other users and organizations to link
                        to them.
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
                      <FormDescription>
                        You don&apos;t need to specify &apos;https://&apos; or
                        &apos;http://&apos;.
                      </FormDescription>
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
                  name="country"
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
                <div className="text-xs mt-4 text-muted-foreground">
                  All of the fields on this page are optional and can be deleted
                  at any time, and by filling them out, you&apos;re giving us
                  consent to share this data wherever your user profile appears.
                  Please see our privacy statement to learn more about how we
                  use this information.
                </div>
              </div>
            </section>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

      <div className="ml-10">
        <div className="w-full mb-4 text-base">Profile picture</div>

        <Avatar className="w-40 overflow-visible h-40 mt-3">
          <AvatarImage
            className="rounded-full"
            src={user?.image}
            alt="Profile picture"
          />
          <div className="absolute flex items-center justify-center  rounded-full bottom-5 -right-3">
            <Dialog>
              <DialogTrigger>
                {/* <Button
                      className="mt-2 w-full text-sm"
                      size={"sm"}
                      variant="outline"
                    >
                      <Pencil size={12} className="mr-1" /> Edit
                    </Button> */}
                <div className="w-auto flex bg-card text-xs border p-2 rounded-md items-center justify-center">
                  <Pencil size={12} className="mr-1" /> Edit
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <ImageUpload
                  preview={preview}
                  setPreview={setPreview}
                  user={user?.username}
                />
              </DialogContent>
            </Dialog>
          </div>
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default withAuth(Page);
