"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MoreVertical, Phone, Plus, Video } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Chats from "../components/Chats";
import { bot } from "@/axios";

const Page = () => {
  const [promt, setPromt] = useState("");
  const [msg, setMsg] = useState<any[]>([]);
  const [istypeing, setIstypeing] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIstypeing(true);
    setPromt("");
    
    const newMsg = {
      role: "user",
      parts: [{ text: promt }],
    };

    setMsg((prevMsg) => [...prevMsg, newMsg]);

    const response = await bot({ prompt: promt, history: msg });

    console.log(response.data);

    const updatedMsg = {
      role: "model",
      parts: [{ text: response.data.text }],
    };

    setIstypeing(false);

    setMsg((prevMsg) => [...prevMsg, updatedMsg]);
  };

  useEffect(() => {
    console.log(msg);
  }, [msg]);

  return (
    <div className="ml-4 h-full w-full border-slate-100">
      <Card className="h-full">
        <div className="px-2 h-full flex flex-col">
          <div className="self-center w-full">
            <div className="flex justify-between items-center">
              <div className=" flex justify-center items-center">
                <div className="relative inline-block ml-2">
                  <Image
                    src={"/copilot.png"}
                    alt="user avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 dark:bg-white bg-green-500 w-3 h-3 rounded-full"></span>
                </div>
                <div className="text-xl ml-3 hover:underline">@copilot</div>
              </div>
              <div className=" flex">
                <Card className=" h-auto my-2 flex justify-center items-center">
                  <Button
                    variant="ghost"
                    className="flex rounded-bl-xl border-r rounded-tl-xl rounded-br-none rounded-tr-none"
                  >
                    <Phone />
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex rounded-bl-none border-l rounded-tl-none rounded-br-xl rounded-tr-xl"
                  >
                    <Video />
                  </Button>
                </Card>
                <Button variant="ghost" className="my-2 ml-3 px-1">
                  <MoreVertical />
                </Button>
              </div>
            </div>
            {/* <hr className="border-r border-input mb-1" /> */}
          </div>
          <div className=" overflow-y-auto flex-1">
            <Chats istypeing={istypeing} messages={msg} />
          </div>
          <div className=" w-full self-end py-2">
            <div className="flex w-full">
              <form onSubmit={onSubmit} className="flex w-full">
                <Button variant="outline" className="mr-2">
                  <Plus />
                </Button>
                <Input
                  id="subject"
                  className="mr-3"
                  placeholder="I want to tall you something..."
                  autoComplete="off"
                  onChange={(e) => setPromt(e.target.value)}
                  value={promt}
                  autoFocus
                />
                <Button type="submit">Send</Button>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Page;
