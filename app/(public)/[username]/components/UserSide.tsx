import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ASSET_BASE_URL } from "@/resources";

const UserSide = ({ userdata, user }: { userdata: User; user: User }) => {
  return (
    <div className="w-72">
      <Avatar className="overflow-visible w-72 h-72">
        <AvatarImage
          className="border rounded-full"
          src={`${ASSET_BASE_URL}${userdata?.username}.png`}
          alt={`"@${userdata?.username}"`}
        />
        <span className="absolute flex items-center justify-center w-10 h-10 border rounded-full hover:border-secondary-foreground bottom-5 right-5 bg-muted">
          😙
        </span>
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className="mt-4 ml-4">
        <h1 className="text-2xl">{userdata?.name}</h1>
        <div className="text-lg text-muted-foreground">
          {userdata?.username} • he/him
        </div>
        <p className="mt-4 text-sm">
          hello friends, i am Ruru. i from 2007 🙄. i am just a new learner from
          india. learning more about JS or TS.
        </p>
        <Button className="w-full mt-4" variant={"outline"}>
          Edit profile
        </Button>
      </div>
    </div>
  );
};

export default UserSide;
