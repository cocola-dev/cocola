import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    AlignLeft,
  Archive,
  Book,
  Cog,
  HelpCircle,
  Home,
  LineChart,
  ListTodo,
  MessagesSquare,
  Users2,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Side } from "./Side";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";


const Leftside = () => {
  const isCollapsed = true;

  return (
    <Sheet>
      <SheetTrigger className="border rounded-md hover:bg-secondary">
        <AlignLeft className="m-2 " size={20} />
      </SheetTrigger>
      <SheetContent
        forceMount={undefined}
        // onOpenAutoFocus={(object) => console.log(object)}
        className="w-[400px] sm:w-[70px]"
        side={"left"}
      >
        <TooltipProvider delayDuration={0}>
          <div className={cn(isCollapsed && "duration-300 ease-in-out mt-4")}>
            <Side
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Dashboard",
                  label: "",
                  icon: Home,
                  variant: "default",
                  path: "/",
                },
                {
                  title: "Todo",
                  label: "3",
                  icon: ListTodo,
                  variant: "ghost",
                  path: "/messages",
                },
                {
                  title: "Forums",
                  label: "4",
                  icon: MessagesSquare,
                  variant: "ghost",
                  path: "/messages",
                },
                {
                  title: "Analytics",
                  label: "",
                  icon: LineChart,
                  variant: "ghost",
                  path: "/analytics",
                },
                {
                  title: "Repositories",
                  label: "",
                  icon: Book,
                  variant: "ghost",
                  path: "/repositories",
                },
                {
                  title: "Archive",
                  label: "",
                  icon: Archive,
                  variant: "ghost",
                  path: "/messages",
                },
              ]}
            />

            <div className="flex justify-center w-full">
              <Separator className="w-[60%] " />
            </div>
            <Side
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Social",
                  label: "972",
                  icon: Users2,
                  variant: "ghost",
                  path: "/messages",
                },
                {
                  title: "Settings",
                  label: "342",
                  icon: Cog,
                  variant: "ghost",
                  path: "/settings",
                },
                {
                  title: "Help",
                  label: "128",
                  icon: HelpCircle,
                  variant: "ghost",
                  path: "/messages",
                },
              ]}
            />
          </div>
        </TooltipProvider>
      </SheetContent>
    </Sheet>
  );
};

export default Leftside;
