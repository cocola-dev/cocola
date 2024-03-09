import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ASSET_BASE_URL } from "@/resources";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateBio } from "@/actions/user/update-bio";
import Alert from "@/components/alert/Alert";
import Link from "next/link";
const UserSide = ({ userdata, user }: { userdata: User; user: User }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [bio, setBio] = useState<string>();

  const updateUserBio = () => {
    setError("");
    setSuccess("");

    if (user?.username && bio) {
      updateBio(user?.username, bio).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        if (data?.success) {
          setSuccess(data.success);
          setBio("");
        }
      });
    }
  };

  return (
    <div className="w-72">
      <Link className="rounded-full" href="/settings">
        <Avatar className="overflow-visible mt-3 w-72 h-72">
          <AvatarImage
            className="border rounded-full"
            src={`${userdata?.image}`}
            alt={`"@${userdata?.username}"`}
          />
          <span className="absolute flex items-center justify-center w-10 h-10 border rounded-full hover:border-secondary-foreground bottom-5 right-5 bg-muted">
            😙
          </span>
          <AvatarFallback className="w-72 h-72"></AvatarFallback>
        </Avatar>
      </Link>
      <div className="mt-4 ml-4">
        <h1 className="text-2xl">{userdata?.name}</h1>
        <div className="text-lg text-muted-foreground">
          {userdata?.username} • he/him
        </div>

        {userdata?.bio ? (
          <p className="mt-4 text-sm text-justify">{userdata?.bio}</p>
        ) : null}

        {userdata?.username === user?.username ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full mt-4" variant={"outline"}>
                Edit profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    className="col-span-3"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </div>
              <div className="my-4">
                {error ? <Alert message={error} variant={"alert"} /> : null}
                {success ? (
                  <Alert message={success} variant={"success"} />
                ) : null}
              </div>
              <DialogFooter>
                <Button onClick={updateUserBio} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Button className="w-full mt-4" variant={"outline"}>
            Follow
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserSide;
