import { cn } from "@/lib/utils";

export default function PageMargin({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(`mx-auto w-[1400px]`, className)}>{children}</div>;
}
