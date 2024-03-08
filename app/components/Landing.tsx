import React from "react";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Landing = () => {
  return (
    <div>
      <div className="absolute inset-0 h-full w-full bg-card bg-[radial-gradient(#363636_1px,transparent_1px)] [background-size:30px_30px]"></div>
      <Navbar />
      <div className=" w-full flex justify-center items-center">
        <section className="mt-28 z-20 bg-clip-text text-transparent mx-32 bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          <h1 className="text-4xl sm:text-8xl text-center font-bold  ">
            Where Code Fuels Creativity
          </h1>
          <p className="text-xl text-center my-20 mx-48 ">
            Experience coding mastery with our platform, blending Cocola and top
            resources, elevating your projects effortlessly.
          </p>
          <div className="text-center mx-48">
            <Link
              href={"/login"}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md  font-medium transition-colors focus-visible:outline-none bg-primary text-primary-foreground shadow hover:bg-primary/90 focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-12 text-lg px-4"
            >
              Get Started
            </Link>
            <Link
              href={"/docs"}
              className="h-12 ml-4 px-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              Learn More
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
