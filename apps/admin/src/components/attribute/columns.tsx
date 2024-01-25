import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { ProductTableRowActions } from "./table-row-actions";
import { IAttribute, IProduct } from "@/types";
import { ProductColumnHeader } from "./column-header";
import { Checkbox } from "..";

export const attributeColumns: ColumnDef<IAttribute>[] = [
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
      <ProductColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {row.getValue("name")}
            </div>
          </div>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "values",
    header: ({ column }) => (
      <ProductColumnHeader column={column} title="Values" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {(row.getValue("values") as IAttribute["values"])
              .map((item) => item.name)
              .join(", ")}
          </span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
  },

  {
    id: "actions",
    header: ({ column }) => (
      <ProductColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <ProductTableRowActions row={row} />,
  },
];
