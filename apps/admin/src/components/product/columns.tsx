import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { statuses, types } from "./table-toolbar";
import { ProductTableRowActions } from "./table-row-actions";
import { IProduct } from "@/types";
import Image from "next/image";
import { ProductColumnHeader } from "./column-header";
import { Checkbox } from "..";
import { cn } from "@/utils";

const columnHelper = createColumnHelper<IProduct[]>();

// const defaultColumns = [
//   columnHelper.display({
//     id: "select",
//     cell:
//   }),
// ];

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
              width={row.original.image.width}
              height={row.original.image.height}
              src={row.original.image.secure_url}
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
    accessorKey: "sku",
    header: ({ column }) => <ProductColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {row.original.type === "simple"
              ? row.getValue("sku")
              : row.original.variants.map((variant) => variant.sku).join(" / ")}
          </span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    enableHiding: false,
    enableSorting: false,
    accessorKey: "type",
    header: ({ column }) => (
      <ProductColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = types.find((t) => t.value === row.getValue("type"));

      if (!type) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{type.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <ProductColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {row.original.type === "simple"
              ? row.getValue("price")
              : row.original.variants
                  .map((variant) => variant.price)
                  .join(", ")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <ProductColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {row.original.type === "simple"
              ? row.getValue("quantity")
              : row.original.variants?.reduce(
                  (acc, variant) => acc + variant.quantity,
                  0
                )}
          </span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    enableHiding: false,
    enableSorting: false,
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
        <div
          className={cn(
            "flex items-center justify-center py-1 px-2 rounded-lg overflow-hidden space-x-2",
            {
              "bg-muted-foreground text-white": status.value === "archived",
              "bg-muted": status.value === "draft",
              "bg-green-100 text-green-600": status.value === "published",
            }
          )}
        >
          {status.icon && <status.icon className="h-4 w-4" />}
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
    cell: ({ row }) => <ProductTableRowActions {...{ row }} />,
  },
];
