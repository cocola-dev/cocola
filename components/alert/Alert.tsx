import { AlertOctagon, Check, Info } from "lucide-react";
import { Card } from "../ui/card";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva("flex items-center w-full h-10 px-4 rounded-lg ", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
      denger: "border-[#5b3b04] bg-[#191001] text-[#e5d07b]",
      // success: "border-[#51d89f] bg-[#10241b] text-[#51d89f]",
      success:
        "bg-emerald-500/15 rounded-md flex items-center text-sm border border-emerald-500 text-emerald-500",
      alert: "border-[#671e21] bg-destructive/15 text-[#d93136]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Alert = ({
  message,
  variant,
}: {
  message: string;
  variant: "default" | "denger" | "success" | "alert";
}) => {
  if (!message) return null;

  return (
    <Card className={cn(alertVariants({ variant }))}>
      {variant === "denger" ? (
        <Info className="text-[#cfac3e]" size={16} />
      ) : null}
      {variant === "success" ? (
        <Check className="text-[#51d89f]" size={16} />
      ) : null}
      {variant === "alert" ? (
        <AlertOctagon className="text-[#d93136]" size={16} />
      ) : null}

      <p className="ml-2 text-sm">{message}</p>
    </Card>
  );
};

export default Alert;
