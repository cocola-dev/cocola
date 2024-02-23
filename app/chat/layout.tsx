"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const param = useParams();

  const chatlistUsers = [
    {
      id: 1,
      name: "copilot",
      lastMessage: "Hey there! 👋 ",
      avatar: "/copilot.png",
      time: "12:00",
      online: true,
      unread: 1,
    },
    {
      id: 3,
      name: "akshat",
      lastMessage: "bay bay!",
      time: "12:00",
      avatar: "https://asset-cocola.vercel.app/Akshat.png",
      online: true,
      unread: 1,
    },
    {
      id: 2,
      name: "ruru",
      lastMessage: "Hello! How are you?",
      time: "12:00",
      avatar: "https://asset-cocola.vercel.app/ruru_m07.png",
      online: false,
      unread: 1,
    },
  ];

  return (
    <div className=" h-[90vh] flex mx-auto mr-3 my-2">
      <div
        className={`${param.user ? "hidden md:block" : " block "}  h-full w-full md:w-96`}
      >
        <div className="h-full">
          <Card className="h-full ml-4 rounded-md">
            <div className="h-full">
              <div className="flex justify-between items-center">
                <div className="text-lg ml-3 hover:underline">@Ruru.07</div>
                <div>
                  <Button
                    onClick={(e) => console.log(e)}
                    variant="outline"
                    className="my-2 px-3 mr-2"
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
              <hr className="border-r border-input mb-1" />
              <ScrollArea className="w-full h-[90%] rounded-md">
                <div>
                  <CardContent className="grid p-0 px-1 mt-2">
                    {chatlistUsers.map((user, index) => (
                      <Link
                        href={`/chat/${user.name}`}
                        onClick={() => console.log(user)}
                        key={index}
                      >
                        <div className="flex items-center h-14 rounded-md p-2 hover:bg-accent mb-2 justify-between space-x-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="overflow-visible">
                              <AvatarImage
                                className="rounded-full bg-slate-100"
                                src={user.avatar}
                              />
                              {user.online ? (
                                <span className="absolute bottom-0 right-0 dark:bg-white bg-green-500 w-3 h-3 rounded-full"></span>
                              ) : (
                                <div className=""></div>
                              )}
                              <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium leading-none">
                                  {user.name}
                                </p>
                                <p className="text-xs mt-1 text-muted-foreground">
                                  {user.lastMessage}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </div>
              </ScrollArea>
            </div>
          </Card>
        </div>
      </div>
      {/* <div className={`${param.user ? "" : "hidden md:hidden"}`}> */}
        {children}
      {/* </div> */}
    </div>
  );
}
