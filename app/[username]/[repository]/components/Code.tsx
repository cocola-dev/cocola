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
  File,
  CalendarIcon,
  History,
  Loader2,
  Menu,
  Pencil,
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { TableTree } from "@/actions/repo/TableTree";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaFolder } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useParams } from "next/navigation";
import * as timeago from "timeago.js";
import { FileMetadata } from "@/types/TreeInterface";
import { findBlobByName } from "@/hooks/Find-README-file";
import { FetchBlob } from "@/actions/repo/fetchBlob";
import { debounce } from "lodash";
import MarkdownReader from "@/components/mdx-components";

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

export type Payment = FileItem | FolderItem;
export function Code({ repodata }: { repodata: Repository }) {
  // ! React states
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [folderStructureData, setFolderStructureData] = React.useState<
    FileMetadata[] | []
  >([]);
  const [md, setMd] = React.useState<string>("");
  const [mdload, setMdload] = React.useState<boolean>(false);
  const [fetchingdataloadfortree, setFetchingdataloadfortree] =
    React.useState<boolean>(false);

  // ! hooks
  const user = useCurrentUser();
  const params = useParams();

  // ! fetch data for table

  const fetchTree = debounce(async () => {
    setFetchingdataloadfortree(true);

    TableTree({
      user: user?.username,
      repository: repodata.name,
    })
      .then(async (data: any) => {
        setFolderStructureData(data.data);
        console.log(data.data);
        if (data.data) {
          const readme = findBlobByName("README.md", data.data);
          console.log(readme);
          const READMEdata: any = await FetchBlob(
            readme?.metadata.name,
            readme?.metadata.generation,
          );
          console.log(READMEdata);
          setMd(READMEdata.data);
        }
      })
      .finally(() => {
        setFetchingdataloadfortree(false);
      });
  }, 100);

  React.useEffect(() => {
    fetchTree(); // Trigger the debounced function

    // Cleanup the debounce function on component unmount
    return () => fetchTree.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.username]);

  // ! get user image
  React.useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await findImageUrlByUserName(repodata.author);
      setImageUrl(url as string | null);
    };

    fetchImageUrl();
  }, [repodata.author]);

  //  #####################################################################
  //  ################ handel table data ##################################
  //  #####################################################################

  const columns: ColumnDef<FileMetadata>[] = [
    {
      accessorKey: "isFolder",
      cell: () => <div className="w-0 "></div>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="mr-0 -ml-0 lg:-ml-4 text-muted-foreground">
            {row.original.type === "tree" ? <FaFolder /> : <File size={16} />}
          </div>
          <div className="ml-2 cursor-pointer text-muted-foreground hover:underline hover:text-blue-500">
            {row.getValue("isFolder") ? (
              <Link
                href={`http://localhost:3000/${params.username}/${params.repository}/tree/${row.getValue(
                  "name",
                )}`}
              >
                original
              </Link>
            ) : (
              <Link
                href={`http://localhost:3000/${params.username}/${params.repository}/blob/${row.getValue(
                  "name",
                )}`}
              >
                {row.original.name}
              </Link>
              // <Button
              //   variant={"link"}
              //   className="p-0 m-0 lowercase text-muted-foreground hover:underline hover:text-blue-500"
              //   onClick={() => handledata(row.original)}
              // >
              //   {row.getValue("name")}
              // </Button>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: () => {
        return <h1 className="w-auto h-4 ml-2">Last commit message</h1>;
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground hover:underline hover:text-blue-500">
          {row.original.type === "tree" ? (
            <div> - </div>
          ) : (
            <>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="cursor-pointer">
                    {row.original.metadata?.metadata?.commitTitle}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent side={"top"} className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src={user?.image} />
                      <AvatarFallback>{user?.image}</AvatarFallback>
                    </Avatar>
                    <div className="w-full space-y-1">
                      <h4 className="text-sm font-semibold">
                        @{user?.username}
                      </h4>
                      <p className="text-sm">
                        {row.original.type === "blob"
                          ? row.original.metadata.metadata.commitDescription
                          : null}
                      </p>
                      {/* <p className="text-sm">The React Framework – created and maintained by @vercel.</p> */}
                      <div className="flex items-center pt-2">
                        <CalendarIcon className="w-4 h-4 mr-2 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                          {row.original.metadata?.timeCreated
                            ? new Date(
                                row.original.metadata.timeCreated,
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </>
          )}
        </div>
      ),
    },
    {
      accessorKey: "timeCreated",
      header: () => <div className="text-right">Last commit date</div>,
      cell: ({ row }) => {
        return (
          <div className="font-medium text-right text-muted-foreground">
            {row.original.type === "tree" ? (
              <div> - </div>
            ) : (
              <>
                {timeago.format(row?.original?.metadata?.timeCreated, "en_US")}
              </>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(
                    payment.metadata?.metadata?.commitId,
                  )
                }
              >
                Copy Commite ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const table = useReactTable({
    data: folderStructureData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="h-full mb-4 mt-4">
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
            className="mr-1 dark:hover:border-[#51d89f] hover:border-[#166534] dark:hover:bg-[#10241b] hover:bg-[#a7f3d0] hover:text-[#166534]  dark:hover:text-[#51d89f]"
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
        {/*  // todo: table section */}
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
                  <Link
                    href={`${repodata.name}/upload/${repodata.DefualtBranch}`}
                  >
                    <Button variant="outline" className="ml-auto ">
                      Add File
                    </Button>
                  </Link>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>

          {/*  // ! table */}
          <div className="border rounded-md">
            <Table key={JSON.stringify(folderStructureData)}>
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
                          href={`/${params.username}`}
                          className="mx-2 hover:underline"
                        >
                          {user?.username}
                        </Link>
                        <p className="mr-1 text-muted-foreground">•</p>
                        <Link
                          href={`/${params.username}/${params.repository}/`}
                          className="text-muted-foreground hover:text-blue-500 hover:underline"
                        >
                          my first commit
                        </Link>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <p className="hover:text-blue-500 hover:underline">
                            ivis21
                          </p>
                          <p className="mx-2">•</p>
                          1m ago
                        </div>
                        <Button className="p-2 py-0 ml-3 h-7" variant={"ghost"}>
                          <Link
                            className="flex items-center hover:underline text-muted-foreground"
                            href={"commits"}
                          >
                            <History size={16} />
                            <p className="ml-2"> 5 Commits</p>
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
                              cell.getContext(),
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
            </Table>
          </div>
          <div className="mt-5 w-full">
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
                <Card className="p-4 px-6 m-0 rounded-tl-none rounded-tr-none rounded-br-md rounded-bl-md">
                  {/* <MarkdownPreview
                    className="border-none editor-preview bg-card"
                    source={md}
                  /> */}
                  <div className="max-w-4xl ">
                    <MarkdownReader markdown={md} />
                  </div>
                </Card>
              </div>
            ) : null}
          </div>
        </div>

        {/* // todo: right side sectiom */}
        <div className="w-96">
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
                    <Link
                      href={repodata.link}
                      className="text-blue-500 cursor-pointer hover:underline"
                    >
                      {repodata.link}
                    </Link>
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
