import HeatMap from "@uiw/react-heat-map";
import value from "../data/heatdata.json";
import { Card } from "@/components/ui/card";
import { GitFork, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RepoInterface } from "@/types/RepoInterface";
import Link from "next/link";

const Overview = ({ userrepo }: { userrepo: RepoInterface[] | null }) => {
  return (
    <div>
      <div className="flex justify-between items-end mb-3">
        <div>Popular repositories</div>
        <div className="text-xs text-blue-500 hover:underline">
          Customize your pins
        </div>
      </div>
      <Card className="border-none shadow-none grid grid-cols-2 gap-4">
        {userrepo?.map((item, index) => (
          <Card key={index} className="h hover:bg-muted p-4">
            <div className="flex justify-between">
              <Link
                href={`${item.name}`}
                className="hover:text-blue-500 hover:underline"
              >
                {item.name}
              </Link>
              <Badge className="text-muted-foreground" variant="outline">
                Public
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-4">
              {item.description}
            </div>
            <div className="mt-4">
              <div className="flex text-muted-foreground items-center">
                <div className="w-3 h-3 mr-1 rounded-full bg-[#3178c6]"></div>
                <p className="text-sm">typescript</p>
                <div className="ml-3 flex items-center">
                  <Star size={16} />
                  <p className="text-sm ml-1 text-muted-foreground"> 42.2K</p>
                </div>
                <div className="ml-3 flex items-center">
                  <GitFork size={16} />
                  <p className="text-sm ml-1 text-muted-foreground"> 3.1K</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </Card>
      <div className="mt-4">9,487 contributions in the last year</div>
      <div className="flex justify-between mt-4">
        <Card className="h-40">
          <div className="flex justify-center w-full items-center p-2 px-8">
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
              rectProps={{
                rx: 2.5,
              }}
            />
          </div>
          <div className="flex justify-between items-center -mt-10">
            <div className="mx-4 text-muted-foreground text-xs hover:text-blue-500 hover:underline">
              Learn how we count contributions
            </div>
            <div className="mx-4 flex items-center gap-1">
              <p className="text-muted-foreground text-xs">less</p>
              <div className="w-[10px] h-[10px] bg-[#202020] rounded-[3px]" />
              <div className="w-[10px] h-[10px] bg-[#525252] rounded-[3px]" />
              <div className="w-[10px] h-[10px] bg-[#71717a] rounded-[3px]" />
              <div className="w-[10px] h-[10px] bg-[#a3a3a3] rounded-[3px]" />
              <div className="w-[10px] h-[10px] bg-[#d4d4d4] rounded-[3px]" />
              <div className="w-[10px] h-[10px] bg-[#e5e5e5] rounded-[3px]" />
              <p className="text-muted-foreground text-xs">more</p>
            </div>
          </div>
        </Card>
        <Card className=" shadow-none border-none">
          <Button
            className="w-full mb-2 justify-start bg-secondary"
            variant={"outline"}
          >
            2024
          </Button>
          <Button className="w-full mb-2 justify-start" variant={"outline"}>
            2023
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
