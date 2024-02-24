import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypingAnimation from "./TypingAnimation";

const Chats = ({
  messages,
  istypeing,
}: {
  messages: any;
  istypeing: boolean;
}) => {
  // console.log(chats);

  const [initialRender, setInitialRender] = useState(true);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current && scrollAreaRef.current) {
      if (initialRender) {
        // For the initial render, set scrollTop without animation
        messagesEndRef.current.scrollIntoView({
          block: "end",
          inline: "nearest",
        });
      } else {
        // For subsequent renders, use scrollIntoView with animation
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
    setInitialRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, istypeing]);

  return (
    <Card className=" h-full">
      <ScrollArea ref={scrollAreaRef} className="h-full w-full p-4">
        {messages.map((items: any, index: any) => {
          return (
            <div key={index}>
              <div className="mb-2 w-full">
                {items.role === "model" ? (
                  <Card className="w-fit max-w-[800px] px-2 py-1.5 rounded-bl">
                    {items.imageUrl ? (
                      <div>
                        <Card className="m-0 p-0 mb-1">
                          <Image
                            className="w-72 rounded-md overflow-hidden"
                            src={items.imageUrl}
                            alt="image"
                            width={200}
                            height={200}
                          />
                        </Card>
                      </div>
                    ) : null}
                    <div className="mx-1 max-w-[600px]">
                      {items?.parts[0].text}
                    </div>
                  </Card>
                ) : (
                  <div className="flex justify-end w-full">
                    <Card className="w-fit flex justify-between text-primary-foreground bg-primary/90 px-2 py-1.5 rounded-br">
                      <div className="grid place-items-end">
                        {items.imageUrl ? (
                          <div>
                            <Card className="border-0 m-0 p-0 mb-1">
                              <Image
                                className="w-72 rounded-md overflow-hidden"
                                src={items.imageUrl}
                                alt="image"
                                width={200}
                                height={200}
                              />
                            </Card>
                          </div>
                        ) : null}
                        <div className="mx-1 max-w-[600px]">
                          {items?.parts[0].text}
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {istypeing ? (
          <Card className="w-fit px-2 py-1.5 rounded-bl">
            <div className="mx-1">
              <TypingAnimation />
            </div>
          </Card>
        ) : null}
        <div ref={messagesEndRef} />
      </ScrollArea>
    </Card>
  );
};

export default Chats;
