import React from "react";
import { Button } from "../ui/button";

const NavItems = () => {
  return (
    <div className={"text-muted-foreground"}>
      <div>
        <Button className="mx-2" variant={"ghost"}>
          Documentation
        </Button>
        <Button className="mx-2" variant={"ghost"}>
          About
        </Button>
        <Button className="mx-2" variant={"ghost"}>
          Contact
        </Button>
      </div>
    </div>
  );
};

export default NavItems;
