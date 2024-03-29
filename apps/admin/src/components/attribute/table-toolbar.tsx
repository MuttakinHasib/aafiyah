"use client";

import { Table } from "@tanstack/react-table";
import React from "react";
import {
  CheckCircledIcon,
  Cross2Icon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { Button, Input } from "..";
import ProductTableFilter from "./table-faceted-filter";

export const statuses = [
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const AttributeTableToolbar = <TData,>({
  table,
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between space-x-5">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-xs bg-white"
        />
        {table.getColumn("status") && (
          <ProductTableFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-5">
        <Button variant="secondary" className="bg-white">
          Export
        </Button>
        <Link href={{ pathname: "/attributes/new-attribute" }} passHref>
          <Button>Add Attribute</Button>
        </Link>
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
};

export default AttributeTableToolbar;
