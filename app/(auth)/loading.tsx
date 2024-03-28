import ContentLoader from "@/components/ContentLoader";
import Loader2 from "@/components/Loader2";
import { CardWrapper } from "@/components/auth/card-wrapper";

export default function Loading() {
  return (
    <>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel=""
        backButtonHref="/register"
      >
        <div className="w-full h-auto my-10 flex justify-center items-center">
          <ContentLoader />
        </div>
      </CardWrapper>
    </>
  );
}
