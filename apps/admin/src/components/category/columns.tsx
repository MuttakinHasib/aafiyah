import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { statuses } from "./table-toolbar";
import { CategoryTableRowActions } from "./table-row-actions";

import Image from "next/image";
import { CategoryColumnHeader } from "./column-header";
import { Checkbox } from "..";
import { ICategory } from "@/types";

export const categoryColumns: ColumnDef<ICategory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="grid align-middle py-5 pl-4 pr-3 text-sm">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="grid align-middle py-5 pl-4 pr-3 text-sm">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <CategoryColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className="h-11 w-11 flex-shrink-0">
            <Image
              className="rounded-full"
              width={44}
              height={44}
              src={row.getValue("icon")}
              alt={row.getValue("name")}
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {row.getValue("name")}
            </div>
            {/* <div className="mt-1 text-gray-500">Category</div> */}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "image",
    enableHiding: false,
    enableSorting: false,
    header: ({ column }) => (
      <CategoryColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      return (
        <div className="h-11 w-11 flex-shrink-0">
          <Image
            className="rounded-full"
            width={44}
            height={44}
            src={row.getValue("image")}
            alt={row.getValue("name")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "totalProducts",
    header: ({ column }) => (
      <CategoryColumnHeader column={column} title="Total products" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {row.getValue("totalProducts")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <CategoryColumnHeader column={column} title="Slug" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue("slug")}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <CategoryColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <CategoryTableRowActions row={row} />,
  },
];
