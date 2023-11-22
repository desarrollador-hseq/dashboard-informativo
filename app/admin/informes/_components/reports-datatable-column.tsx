"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreHorizontal, Pencil, X } from "lucide-react";
import { Report } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";

export const reportColumns: ColumnDef<Report>[] = [
  {
    accessorKey: "deliveryDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de entrega
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    accessorFn: (value) => formatDate(new Date(value.deliveryDate)),
  },

  {
    accessorKey: "conformity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Conformidad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const getIsConformity = row.getValue("conformity") || "";
      const isConformity = useMemo(
        () => getIsConformity === "Sí",
        [getIsConformity]
      );

      return (
        <Badge className={cn("bg-red-700", isConformity && "bg-emerald-700")}>
          {isConformity ? (
            <span>
              <Check className="w-4 h-4" />
            </span>
          ) : (
            <X className="w-4 h-4" />
          )}
        </Badge>
      );
    },
    accessorFn: (value) => {
      if (value.conformity) {
        return "Sí";
      } else {
        return "No";
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/informes/${id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
