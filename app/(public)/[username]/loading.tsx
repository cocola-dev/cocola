"use client";

import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <Loader />
      </div>
    </>
  );
}
