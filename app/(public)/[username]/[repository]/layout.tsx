import { Badge } from "@/components/ui/badge";
import {
  CircleDot,
  Code,
  GitPullRequestArrow,
  LineChart,
  Settings,
  ShieldAlert,
  Workflow,
} from "lucide-react";
import Link from "next/link";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    username: string;
    repository: string;
  };
}) => {
  return (
    <>
      <div className="text-sm font-medium text-center text-muted-foreground border-b dark:text-gray-400">
        <ul className="flex flex-wrap text-muted-foreground -mb-px ">
          <li className="me-2">
            <Link
              href={`/${params.username}/${params.repository}`}
              className="flex items-center p-4 border-b-2 border-muted-foreground rounded-t-lg text-foreground active"
              aria-current="page"
            >
              {/* <Link
                href={""}
                className=" flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
              > */}
              <Code className="mr-2" size={16} />
              Code
            </Link>
          </li>
          <li className="me-2">
            <Link
              href={`${params.repository}/issues`}
              className=" flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
            >
              <CircleDot className="mr-2" size={16} /> Issues{" "}
              {/* {currentallissues && currentallissues?.length > 0 ? (
                <Badge
                  className="ml-3 text-muted-foreground rounded-full"
                  variant="secondary"
                >
                  {currentallissues?.length}
                </Badge>
              ) : null} */}
                <Badge
                  className="ml-3 text-muted-foreground rounded-full"
                  variant="secondary"
                >
                    2
                </Badge>
            </Link>
          </li>
          <li className="me-2">
            <Link
              href={"/pulls"}
              className="flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
            >
              <GitPullRequestArrow className="mx-2" size={16} />
              pull requests
              <Badge
                className="ml-3 text-muted-foreground rounded-full"
                variant="secondary"
              >
                6
              </Badge>
            </Link>
          </li>
          <li className="me-2">
            <Link
              href={"/workflow"}
              className="flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
            >
              <Workflow className="mr-2" size={16} /> Workflow
            </Link>
          </li>
          <li className="me-2">
            <Link
              href={"/"}
              className="flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
            >
              <LineChart className="mr-2" size={16} /> graph
            </Link>
          </li>
          <li className="me-2">
            <Link
              href={"/"}
              className="flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
            >
              <ShieldAlert className="mr-2" size={16} /> security
              <Badge
                className="ml-3 text-muted-foreground rounded-full"
                variant="secondary"
              >
                2
              </Badge>
            </Link>
          </li>
          <li className="me-2">
            <Link
              href={"/"}
              className="flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-foreground"
            >
              <Settings className="mr-2" size={16} /> Settings
            </Link>
          </li>
        </ul>
      </div>
      <div>{children}</div>
    </>
  );
};

export default Layout;
