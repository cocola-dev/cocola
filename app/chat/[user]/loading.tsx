import Loader2 from "@/components/Loader2";
import { Card } from "@/components/ui/card";

const Loading = () => {
  return (
    <div className="ml-4 h-full w-full border-slate-100">
      <Card className="h-full bg-transparent">
        <div className="px-2 h-full flex justify-center items-center">
          <Loader2 size={30} />
        </div>
      </Card>
    </div>
  );
};

export default Loading;
