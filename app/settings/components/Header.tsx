import { User } from "@prisma/client";
import React from "react";
import { ArrowRightLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = ({ user }: { user: User }) => {
  return (
    <div className="w-full flex justify-between items-center  ">
      <div className="flex items-center justify-center">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user?.image ? user?.image : undefined} alt={""} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <div className="ml-3">
          {user.name ? (
            <Link
              href={user.username}
              className="text-muted-foreground text-lg"
            >
              {user.name} ( {user?.username} )
            </Link>
          ) : (
            <Link
              href={user.username}
              className="text-muted-foreground text-lg"
            >
              {user?.username}
            </Link>
          )}
          <h1 className="text-muted-foreground text-xs flex ">
            Your personal account{" "}
            <span className="text-blue-700 flex hover:underline cursor-pointer">
              {" "}
              <ArrowRightLeft className=" ml-2 mr-1" size={16} /> Switch
              settings context{" "}
            </span>{" "}
          </h1>
        </div>
      </div>
      <Link
        className="text-muted-foreground text-xs border p-2 rounded-md hover:text-foreground hover:border-foreground"
        href={`/${user.username}`}
      >
        Go to your personal profile
      </Link>
    </div>
  );
};

export default Header;
