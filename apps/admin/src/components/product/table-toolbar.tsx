"use client";

import { Table } from "@tanstack/react-table";
import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button, Input } from "..";
import ProductTableFilter from "./table-faceted-filter";
import { Archive, CheckCircle, NotebookPen } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const statuses = [
  {
    value: "archived",
    label: "Archived",
    icon: Archive,
  },
  {
    value: "draft",
    label: "Draft",
    icon: NotebookPen,
  },
  {
    value: "published",
    label: "Published",
    icon: CheckCircle,
  },
];

export const types = [
  {
    value: "simple",
    label: "Simple",
  },
  {
    value: "variant",
    label: "Variant",
  },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const ProductTableToolbar = <TData,>({
  table,
}: DataTableToolbarProps<TData>) => {
  const filteredColumns = table.getState().columnFilters;
  const isFiltered = filteredColumns.length > 0;
  const searchParams = useSearchParams();
  // const pathname = usePathname();
  const { push } = useRouter();

  const clearFilteredParams = () => {
    const query = new URLSearchParams(Array.from(searchParams.entries()));
    filteredColumns.forEach((column) => {
      query.delete(column.id);
    });
    table.resetColumnFilters();

    setTimeout(() => {
      // @ts-ignore
      push(`?${query.toString()}`);
    }, 0);
  };

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
        {table.getColumn("type") && (
          <ProductTableFilter
            column={table.getColumn("type")}
            title="Type"
            options={types}
          />
        )}
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
            onClick={clearFilteredParams}
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
        <Link href={{ pathname: "/products/new-product" }} passHref>
          <Button>Add Product</Button>
        </Link>
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
};

export default ProductTableToolbar;
