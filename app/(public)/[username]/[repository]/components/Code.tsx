import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Activity,
  BookOpen,
  Eye,
  GitFork,
  Link as Linkicon,
  Settings,
  ShieldCheck,
  Star,
  StarIcon,
  ChevronDownIcon,
  PlusIcon,
  EyeIcon,
  Heart,
  Tag,
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import MarkdownPreview from "@uiw/react-markdown-preview";
import { Card } from "@/components/ui/card";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";
import { ProgressBar } from "@primer/react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { IoIosGitBranch } from "react-icons/io";
import Link from "next/link";
import { Repository } from "@prisma/client";
import { findImageUrlByUserName } from "@/actions/findImageUrlByUserName";

export type FileItem = {
  id: string;
  last_update: string;
  name: string;
  last_commits: string;
  isfolder: false;
  fullpath: string;
};

export type FolderItem = {
  id: string;
  last_update: string;
  name: string;
  last_commits: string;
  isfolder: true;
  children?: (FileItem | FolderItem)[];
  fullpath: string;
};

type folder = {
  name: string;
  isFolder: boolean;
  metadata: any;
};

export type Payment = FileItem | FolderItem;
export function Code({ repodata }: { repodata: Repository }) {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await findImageUrlByUserName(repodata.author);
      setImageUrl(url as string | null);
    };

    fetchImageUrl();
  }, [repodata.author]);

  return (
    <div className="h-full mt-4">
      <div className="w-[90%] m-auto flex justify-between mt-6">
        <div className="flex items-center">
          <Avatar className="w-7 h-7">
            <Avatar className="w-7 h-7">
              {imageUrl ? (
                <AvatarImage src={imageUrl} alt="@shadcn" />
              ) : (
                <AvatarFallback>CN</AvatarFallback>
              )}
            </Avatar>
          </Avatar>
          <h1 className="ml-2 text-2xl cursor-pointer hover:underline">
            {repodata.name}
          </h1>
          {repodata.Visibility === "private" ? (
            <Badge className="ml-2 text-muted-foreground" variant="outline">
              Private
            </Badge>
          ) : (
            <Badge className="ml-2 text-muted-foreground" variant="outline">
              public
            </Badge>
          )}
        </div>
        <div className="flex">
          <Button
            className="mr-1 hover:border-[#51d89f] hover:bg-[#10241b] hover:text-[#51d89f]"
            variant={"outline"}
          >
            <Heart className="w-4 h-4 mr-2" />
            Sponsor
          </Button>
          <div className="flex items-center mx-1 space-x-1 bg-transparent border rounded-md text-secondary-foreground">
            <Button variant="ghost" className="px-3 shadow-none">
              <EyeIcon className="w-4 h-4 mr-2" />
              Watching
              <Badge
                className="ml-3 rounded-full text-muted-foreground"
                variant="secondary"
              >
                {repodata.watchers}
              </Badge>
            </Button>
            <Separator orientation="vertical" className="h-[20px]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-2 shadow-none">
                  <ChevronDownIcon className="w-4 h-4 text-secondary-foreground" />
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
                <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusIcon className="w-4 h-4 mr-2" /> Create List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center mx-1 space-x-1 bg-transparent border rounded-md text-secondary-foreground">
            <Button variant="ghost" className="px-3 shadow-none">
              <GitFork className="w-4 h-4 mr-2" />
              Fork
              <Badge
                className="ml-3 rounded-full text-muted-foreground"
                variant="secondary"
              >
                {repodata.forksCount}
              </Badge>
            </Button>
            <Separator orientation="vertical" className="h-[20px]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-2 shadow-none">
                  <ChevronDownIcon className="w-4 h-4 text-secondary-foreground" />
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
                <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusIcon className="w-4 h-4 mr-2" /> Create List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center mx-1 space-x-1 bg-transparent border rounded-md text-secondary-foreground">
            <Button variant="ghost" className="px-3 shadow-none">
              <StarIcon className="w-4 h-4 mr-2" />
              Star
              <Badge
                className="ml-3 rounded-full text-muted-foreground"
                variant="secondary"
              >
                {repodata.stars}
              </Badge>
            </Button>
            <Separator orientation="vertical" className="h-[20px]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-2 shadow-none">
                  <ChevronDownIcon className="w-4 h-4 text-secondary-foreground" />
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
                <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusIcon className="w-4 h-4 mr-2" /> Create List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="w-[90%] m-auto flex mt-2">
        <div className="w-full">
          <div className="flex items-center py-4">
            <div className="flex max-w-sm">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    {/* <GitBranch className="mr-1" size={16} /> */}
                    <IoIosGitBranch size={20} />
                    {repodata.DefualtBranch}
                    <ChevronDownIcon className="w-4 h-4 ml-2 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-60" align="start">
                  <Command>
                    <CommandInput placeholder="find commit..." />
                    <CommandList>
                      <CommandEmpty>No roles found.</CommandEmpty>
                      <CommandGroup>
                        <Link href={`/ruru_m07/test/commits/tree`}>
                          <CommandItem
                            className={`teamaspace-y-1 flex flex-col items-start px-4 py-2`}
                          >
                            <p>v1.0.0</p>
                          </CommandItem>
                        </Link>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Button className="p-2 mx-2" variant={"ghost"}>
                <IoIosGitBranch size={20} />4 Branches
              </Button>
              <Button className="p-2 " variant={"ghost"}>
                <Tag size={16} className="mr-1" />2 Tags
              </Button>
            </div>

            <div className="flex ml-auto">
              <div className="flex items-center mr-2">
                {/* <div className="">
                  <SearchIcon size={20} className="text-muted-foreground" />
                </div> */}
                <Input placeholder="Go to file..." className="max-w-s " />
              </div>
              <Button variant="outline" className="mx-2 ml-auto">
                Code
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Add File
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
          <div className="border rounded-md">
            {/* <Table key={JSON.stringify(folderStructureData)}>
              <TableHeader>
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={user?.image} alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Link
                          to={`/${username}`}
                          className="mx-2 hover:underline"
                        >
                          {commits && commits.length > 0
                            ? commits[0].username || user?.username
                            : user?.username}
                        </Link>
                        {commits && commits.length > 0 ? (
                          <p className="mr-1 text-muted-foreground">•</p>
                        ) : null}
                        <Link
                          to={`/${username}/${repo_name}/commits/changes/C5YOy941GxPREo5JD6BySnN6AgDaZtiO`}
                          className="text-muted-foreground hover:text-blue-500 hover:underline"
                        >
                          {commits?.slice(-1)[0]?.title}
                        </Link>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <p className="hover:text-blue-500 hover:underline">
                            {commits && commits.length > 0
                              ? commits[0].commiteId.substring(0, 7)
                              : null}
                          </p>
                          {commits && commits.length > 0 ? (
                            <p className="mx-2">•</p>
                          ) : null}
                          {commits && commits.length > 0
                            ? timeago.format(commits[0].time, "en_US")
                            : null}
                        </div>
                        <Button className="p-2 py-0 ml-3 h-7" variant={"ghost"}>
                          <Link
                            className="flex items-center hover:underline text-muted-foreground"
                            to={"commits"}
                          >
                            <History size={16} />
                            <p className="ml-2"> {commits?.length} Commits</p>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHeader>
              {!fetchingdataloadfortree ? (
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No data.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 overflow-hidden text-center"
                  >
                    <Loader2 className="w-full animate-spin" />
                  </TableCell>
                </TableRow>
              )}
            </Table> */}
          </div>
          {/* <div className="mt-5 ">
            {mdload ? (
              <Loader2 className="w-full mt-20 animate-spin" />
            ) : md ? (
              <div id="readme">
                <Card className="sticky top-0 z-10 flex items-center justify-between h-10 m-0 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none">
                  <div className="flex items-center">
                    <Button variant={"link"}>
                      <Menu size={16} />
                    </Button>
                    <label>README.md</label>
                  </div>
                  <div>
                    <Button variant={"link"}>
                      <Pencil size={16} />
                    </Button>
                  </div>
                </Card>
                <Card className="p-0 m-0 rounded-tl-none rounded-tr-none rounded-br-md rounded-bl-md">
                  <MarkdownPreview
                    className="border-none editor-preview bg-card"
                    source={md}
                  />
                </Card>
              </div>
            ) : null}
          </div> */}
        </div>
        <div>
          <Card className="p-4 px-6 border-none w-96 h-96">
            <div className="flex items-center justify-between">
              <h1 className="text-xl">about</h1>
              <Settings
                className="cursor-pointer text-muted-foreground hover:text-foreground"
                size={16}
              />
            </div>
            <div className="mt-2 text-muted-foreground">
              {repodata.description}
            </div>
            <div>
              <ul className="mt-3 text-sm text-muted-foreground">
                {repodata.link ? (
                  <li className="flex items-center mt-1">
                    <Linkicon className="mr-4" size={16} />
                    <a
                      href={repodata.link}
                      target="_blank"
                      className="text-blue-500 cursor-pointer hover:underline"
                    >
                      {repodata.link}
                    </a>
                  </li>
                ) : null}
                <li className="flex items-center mt-1">
                  <BookOpen className="mr-4" size={16} />
                  <p className="cursor-pointer hover:text-blue-500 hover:underline">
                    <a href="#readme">readme</a>
                  </p>
                </li>
                <li className="flex items-center mt-1">
                  <ShieldCheck className="mr-4" size={16} />
                  <p className="cursor-pointer hover:text-blue-500 hover:underline">
                    Security policy
                  </p>
                </li>
                <li className="flex items-center mt-1">
                  <Activity className="mr-4" size={16} />
                  <p className="cursor-pointer hover:text-blue-500 hover:underline">
                    Activity
                  </p>
                </li>
                <li className="flex items-center mt-1">
                  <Star className="mr-4" size={16} />
                  <p className="cursor-pointer hover:text-blue-500 hover:underline">
                    {repodata.stars} Star
                  </p>
                </li>
                <li className="flex items-center mt-1">
                  <Eye className="mr-4" size={16} />
                  <p className="cursor-pointer hover:text-blue-500 hover:underline">
                    {repodata.watchers} watching
                  </p>
                </li>
                <li className="flex items-center mt-1">
                  <GitFork className="mr-4" size={16} />
                  <p className="cursor-pointer hover:text-blue-500 hover:underline">
                    {repodata.forksCount} forks
                  </p>
                </li>
              </ul>
              <Separator className="my-4" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl">Releases</h1>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                <div className="flex">
                  No releases published.
                  <div className="ml-1 text-blue-500 cursor-pointer hover:underline">
                    learn more
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl">Package</h1>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                <div className="flex">
                  No Package published.
                  <div className="ml-1 text-blue-500 cursor-pointer hover:underline">
                    learn more
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl">deployments</h1>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                <div className="flex">
                  No deployments on this project.
                  <div className="ml-1 text-blue-500 cursor-pointer hover:underline">
                    learn more
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            {/* https://primer.style/react/storybook/?path=/story/components-progressbar-features--multiple-items&globals=colorScheme:dark_dimmed */}
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl">Languages</h1>
            </div>
            <ProgressBar
              // barSize="default"
              aria-valuenow={100}
              aria-label="Upload test.png"
              sx={{ backgroundColor: "#141414" }}
            >
              <ProgressBar.Item
                progress={88.5}
                sx={{ backgroundColor: "#3178c6" }}
              />
              <ProgressBar.Item
                progress={8.3}
                sx={{ backgroundColor: "#f1e05a" }}
              />
              <ProgressBar.Item
                progress={3.0}
                sx={{ backgroundColor: "#563d7c" }}
              />
              <ProgressBar.Item
                progress={1}
                sx={{ backgroundColor: "#e34c26" }}
              />
            </ProgressBar>
            <div className="grid grid-cols-1 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center mt-1">
                <div className="flex items-center mt-1">
                  <div className="w-3 h-3 mr-1 bg-[#3178c6] rounded-full" />
                  TypeScript 88.5%
                </div>
                <div className="flex items-center mt-1 ml-7">
                  <div className="w-3 h-3 mr-1 bg-[#f1e05a] rounded-full" />
                  JavaScript 8.3%
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="flex items-center mt-1">
                  <div className="w-3 h-3 mr-1 bg-[#563d7c] rounded-full" />
                  CSS 3.0%
                </div>
                <div className="flex items-center mt-1">
                  <div className="w-3 h-3 mr-1 bg-[#e34c26] rounded-full" />
                  HTML 0.2%
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
