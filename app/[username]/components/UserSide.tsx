import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ASSET_BASE_URL } from "@/resources";

const UserSide = ({ userdata, user }: { userdata: User; user: User }) => {
  return (
    <div className="w-72">
      <Avatar className="overflow-visible mt-3 w-72 h-72">
        <AvatarImage
          className="border rounded-full"
          src={`${ASSET_BASE_URL}${userdata?.username}.png`}
          alt={`"@${userdata?.username}"`}
        />
        <span className="absolute flex items-center justify-center w-10 h-10 border rounded-full hover:border-secondary-foreground bottom-5 right-5 bg-muted">
          😙
        </span>
        <AvatarFallback className="w-72 h-72"></AvatarFallback>
      </Avatar>
      <div className="mt-4 ml-4">
        <h1 className="text-2xl">{userdata?.name}</h1>
        <div className="text-lg text-muted-foreground">
          {userdata?.username} • he/him
        </div>

        {userdata?.bio ? (
          <p className="mt-4 text-sm text-justify">
            {userdata?.bio}
          </p>
        ) : null}

        {userdata?.username === user?.username ? (
          <Button className="w-full mt-4" variant={"outline"}>
            Edit profile
          </Button>
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
