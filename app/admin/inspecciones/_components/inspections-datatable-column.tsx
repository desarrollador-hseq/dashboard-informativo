"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import { Inspection } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useMemo } from "react";


export const InspectionColumns: ColumnDef<Inspection>[] = [

  {
    accessorKey: "city",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ciudad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
     const city: string =  row.getValue("city")

     return (
      <span className="capitalize">{city}</span>
     )
    }
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de ejecución
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    
    accessorFn: (value) => formatDate(new Date(value.date)),
  },
  
  {
    accessorKey: "isExecuted",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const getIsExecuted = row.getValue("isExecuted") || "";
      const isExecuted = useMemo(() => getIsExecuted === "ejecutada" , [getIsExecuted]);

      return (
        <Badge className={cn("bg-slate-500", isExecuted && "bg-emerald-700")}>
          {isExecuted ? "ejecutada" : "programada"}
        </Badge>
      );
    },
    accessorFn: (value) => {
      if(value.isExecuted) {
        return "ejecutada"
      }else {
        return "programada"
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
            <Link href={`/admin/inspecciones/${id}`}>
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
