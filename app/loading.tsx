import ContentLoader from "@/components/ContentLoader";

export default function Loading() {
  return (
    <>
      <div className="h-screen justify-center items-center flex w-full">
        <ContentLoader size={10} />
      </div>
    </>
  );
}
