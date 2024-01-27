import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div
        className={cn(
          "text-3xl flex items-center justify-center font-semibold -mb-6 -ml-7",
          font.className
        )}
      >
        <Image
          src={"/black_logo.svg"}
          className=" dark:hidden block"
          width={90}
          height={90}
          alt="logo"
        />
        <Image
          src={"/white_logo.svg"}
          className=" hidden dark:block"
          width={90}
          height={90}
          alt="logo"
        />
        <h1>Cocola</h1>
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
