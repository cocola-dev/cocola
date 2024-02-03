import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SelectLabel } from "@radix-ui/react-select";
import {
  BookMarked,
  ChevronDownIcon,
  PlusIcon,
  Star,
  StarIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as timeago from "timeago.js";
import { RepoInterface } from "@/types/RepoInterface";
import Link from "next/link";

const Repositories = ({ userrepo }: { userrepo: RepoInterface[] | null }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-full mr-4">
          <Input
            className="w-full"
            id="subject"
            placeholder="I need help with..."
          />
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button variant={"outline"}>
            {" "}
            <BookMarked size={16} className="mr-2" />
            new
          </Button>
        </div>
      </div>
      <div>
        <Separator className="my-4" />
        {userrepo?.map((item, index) => (
          <>
            <Card
              key={index}
              className="h-28 flex border-none shadow-none justify-between items-center px-8"
            >
              <div className="grid grid-rows-2 gap-4">
                <div className="flex">
                  <Link
                    href={`${item.name}`}
                    className="text-2xl hover:underline hover:text-blue-500"
                  >
                    {item.name}
                  </Link>
                  <Badge
                    className="ml-3 text-muted-foreground rounded-full"
                    variant="secondary"
                  >
                    Public
                  </Badge>
                </div>
                <div className="text-xs flex items-center text-muted-foreground">
                  <div className="w-3 h-3 mr-1 rounded-full bg-[#3178c6]"></div>
                  <p className="text-sm mr-3">typescript</p>
                  <p className="mr-3 flex items-center">
                    <Star className="mr-1" size={16} /> {item.stars}
                  </p>
                  <p>{timeago.format(new Date(item.updatedAt), "en_US")}</p>
                </div>
              </div>
              <div className="grid grid-rows-2 gap-1">
                <div>
                  <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
                    <Button variant="secondary" className="px-3 shadow-none">
                      <StarIcon className="mr-2 h-4 w-4" />
                      Star
                    </Button>
                    <Separator orientation="vertical" className="h-[20px]" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          className="px-2 shadow-none"
                        >
                          <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        alignOffset={-5}
                        className="w-[200px]"
                        forceMount
                      >
                        <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Future Ideas
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          My Stack
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Inspiration
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusIcon className="mr-2 h-4 w-4" /> Create List
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className=" flex items-end p-2">
                  <div className="w-full hidden h-[1px] bg-green-800"></div>
                </div>
              </div>
            </Card>
            <Separator className="my-1" />
          </>
        ))}
      </div>
    </div>
  );
};

export default Repositories;
