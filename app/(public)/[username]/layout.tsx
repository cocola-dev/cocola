import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollArea className="h-[90vh] w-full rounded-md px-2">
        {children}
      </ScrollArea>
    </>
  );
}
