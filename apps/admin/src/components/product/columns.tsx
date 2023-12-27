import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { statuses } from "./table-toolbar";
import { ProductTableRowActions } from "./table-row-actions";
import { IProduct } from "@/types";
import Image from "next/image";
import { ProductColumnHeader } from "./column-header";
import { Checkbox } from "..";

export const productColumns: ColumnDef<IProduct>[] = [
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
      <ProductColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className="h-11 w-11 flex-shrink-0">
            <Image
              className="rounded-full"
              width={44}
              height={44}
              src={row.getValue("image")}
              alt={row.getValue("name")}
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {row.getValue("name")}
            </div>
            <div className="mt-1 text-gray-500">Category</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <ProductColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue("sku")}</span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <ProductColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue("price")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "countInStock",
    header: ({ column }) => (
      <ProductColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {row.getValue("countInStock")}
          </span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <ProductColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductTableRowActions row={row} />,
  },
];
