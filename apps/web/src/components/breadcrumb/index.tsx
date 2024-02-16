import { ILink } from "@/types";
import Link from "next/link";
import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils";
import { capitalize, startCase } from "lodash";

interface Props extends React.HTMLAttributes<HTMLElement> {
  items: ILink[];
}

export const Breadcrumb = ({ items }: Props) => {
  return (
    <div className="flex items-center gap-x-2">
      <Link href="/" className="text-sm font-medium text-primary">
        Home
      </Link>
      <ChevronRightIcon className="w-5 h-5 text-primary" />
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <Link
              href={item.url}
              className={cn(
                "text-sm font-medium",
                isLast ? "text-gray-500" : "text-primary"
              )}
            >
              {capitalize(startCase(item.title)) || "Home"}
            </Link>
            {!isLast && <ChevronRightIcon className="w-5 h-5 text-primary" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};
