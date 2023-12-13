"use client";

import { cn } from "@/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("animate- rounded-md bg-muted", className)} {...props} />
  );
}

export { Skeleton };
