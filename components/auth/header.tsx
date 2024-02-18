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
    <div className="flex flex-col items-center justify-center w-full gap-y-4">
      <div
        className={cn(
          "text-3xl flex items-center justify-center font-semibold -mb-6 -ml-7",
          font.className,
        )}
      >
        <Image
          src={"/black_logo.svg"}
          className="block dark:hidden"
          width={90}
          height={90}
          alt="logo"
          priority={true}
        />
        <Image
          src={"/white_logo.svg"}
          className="hidden dark:block"
          width={90}
          height={90}
          alt="logo"
          priority={true}
        />
        <h1>Cocola</h1>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
