import HeatMap from "@uiw/react-heat-map";
import value from "../data/heatdata.json";
import { Card } from "@/components/ui/card";
import { GitFork, Pencil, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Repository, User } from "@prisma/client";
import MarkdownReader from "@/components/mdx-components";
import { useCurrentUser } from "@/hooks/use-current-user";

const Overview = ({
  userrepo,
  userdata,
  userMd,
}: {
  userrepo: Repository[] | null;
  userdata: User;
  userMd: string | null;
}) => {
  const user = useCurrentUser();

  return (
    <div>
      {userMd ? (
        <Card className="mb-4 p-4">
          <div className="flex w-full justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {userdata?.username} / README.md
            </p>
            <Link
              href={`${userdata?.username}/${userdata?.username}`}
              className="text-xs text-muted-foreground hover:text-secondary-foreground"
            >
              <Pencil size={16} />
            </Link>
          </div>
          <div>
            <MarkdownReader markdown={userMd} />
          </div>
        </Card>
      ) : null}
      <div className="flex items-end justify-between mb-3">
        <div>Popular repositories</div>
        <div className="text-xs text-blue-500 hover:underline">
          Customize your pins
        </div>
      </div>

      {userrepo && userrepo?.length > 0 ? (
        <Card className="grid grid-cols-2 gap-4 border-none shadow-none">
          {userrepo?.map((item, index) => (
            <Link
              key={index}
              className=""
              href={`/${item.author}/${item.name}`}
            >
              <Card className="p-4 h-36 bg-primary-foreground hover:border-secondary-foreground">
                <div className="flex justify-between">
                  <p className="hover:text-blue-500 hover:underline">
                    {item.name}
                  </p>
                  <Badge className="text-muted-foreground" variant="outline">
                    {item.Visibility}
                  </Badge>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  {item.description}
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-muted-foreground">
                    <div className="w-3 h-3 mr-1 rounded-full bg-[#3178c6]"></div>
                    <p className="text-sm">typescript</p>
                    <div className="flex items-center ml-3">
                      <Star size={16} />
                      <p className="ml-1 text-sm text-muted-foreground">
                        {" "}
                        {item.stars}
                      </p>
                    </div>
                    <div className="flex items-center ml-3">
                      <GitFork size={16} />
                      <p className="ml-1 text-sm text-muted-foreground">
                        {" "}
                        {item.forksCount}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </Card>
      ) : (
        <Card className="rounded-md  p-4 flex justify-center items-center w-full">
          {userdata?.username === user?.username ? (
            <div className="grid place-items-center">
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                You don&apos;t have any Repository
              </p>
              <Button
                variant={"outline"}
                className="w-fit mt-4"
                size={"sm"}
                asChild
              >
                <Link href="/new">Create</Link>
              </Button>
            </div>
          ) : (
            <div className="grid place-items-center">
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                user don&apos;t have any Repository
              </p>
            </div>
          )}
        </Card>
      )}

      <div className="mt-4">9,487 contributions in the last year</div>
      <div className="flex justify-between mt-4">
        <Card className="h-40">
          <div className="flex items-center justify-center w-full p-2 px-8">
            <HeatMap
              value={value}
              width={700}
              style={{
                color: "#fafafa",
              }}
              legendCellSize={0}
              rectSize={10}
              startDate={
                new Date(new Date().setDate(new Date().getDate() - 365))
              }
              endDate={new Date()}
              monthLabels={[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ]}
              weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
              panelColors={{
                0: "#202020",
                2: "#525252",
                4: "#71717a",
                10: "#a3a3a3",
                20: "#d4d4d4",
                30: "#e5e5e5",
              }}
              legendRender={(props) => <rect {...props} rx={2.5} />}
              rectProps={{
                rx: 2.5,
              }}
            />
          </div>
          <div className="flex items-center justify-between -mt-10">
            <div className="mx-4 text-xs text-muted-foreground hover:text-blue-500 hover:underline">
              Learn how we count contributions
            </div>
            <div className="flex items-center gap-1 mx-4">
              <p className="text-xs text-muted-foreground">less</p>
              <div className="w-[10px] h-[10px] bg-[#202020] rounded-[3px]" />
              <div className="w-[10px] h-[10px] bg-[#525252] rounded-[3px]" />
              <div className="w-[10px] h-[10px] bg-[#71717a] rounded-[3px]" />
              <div className="w-[10px] h-[10px] bg-[#a3a3a3] rounded-[3px]" />
              <div className="w-[10px] h-[10px] bg-[#d4d4d4] rounded-[3px]" />
              <div className="w-[10px] h-[10px] bg-[#e5e5e5] rounded-[3px]" />
              <p className="text-xs text-muted-foreground">more</p>
            </div>
          </div>
        </Card>
        <Card className="border-none shadow-none ">
          <Button
            className="justify-start w-full mb-2 bg-secondary"
            variant={"outline"}
          >
            2024
          </Button>
          <Button className="justify-start w-full mb-2" variant={"outline"}>
            2023
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
