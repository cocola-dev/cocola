import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <>
      <div className="h-screen flex w-full">
        <Loader />
      </div>
    </>
  );
}
