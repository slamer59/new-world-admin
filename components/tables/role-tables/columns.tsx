"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { generateColumns } from "@/lib/utils";
import { Role } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

const headers = [
  "id",
  "name",
  "roleType",
  "rune",
  "weapon",
  "weightLimit",
  "player",
  "created_at",
  "updated_at",
]

export const columns: ColumnDef<Role>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  ...generateColumns(headers),
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
