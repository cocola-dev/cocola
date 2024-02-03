import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        className="w-16 h-16 rounded-full dark:block hidden"
        src={"/white_logo.svg"}
        alt="img"
        width={64}
        height={64}
      />
      <Image
        className="w-16 h-16 rounded-full dark:hidden"
        src={"/black_logo.svg"}
        alt="img"
        width={64}
        height={64}
      />
    </Link>
  );
};

export default Logo;
