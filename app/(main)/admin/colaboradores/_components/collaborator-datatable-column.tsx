"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  FileX,
  Link2,
  MoreHorizontal,
  Pencil,
  X,
} from "lucide-react";
import { City } from "@prisma/client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import PdfFullscreen from "@/components/pdf-fullscreen";

interface CollaboratorTableProps {
  id: string;
  percentage: number;
  city: City | null;
  pdfUrl: string | null;
  certificateUrl: string | null;
}

type CollaboratorTableType = CollaboratorTableProps;

export const collaboratorColumns: ColumnDef<CollaboratorTableType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombres
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apellidos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "numDoc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          N° documento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
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
    accessorFn: (value) => `${value.city?.realName}`,
    cell: ({ row }) => {
      const city = row.original.city;
      const cityName = city?.realName || "Desconocida";
      return <span className="capitalize">{cityName}</span>;
    },
  },

  {
    accessorKey: "percentage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          % de Evaluación
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    id: "percentage",
    accessorFn: (value) => `${value.percentage}`,
    cell: ({ row }) => {
      const numPerc = row.getValue("percentage") || 0;
      const onFormation = numPerc === "0" ? true : false;

      return (
        <Badge
          className={cn(
            "relative m-0 w-[120px] rounded-sm p-0 overflow-hidden text-center h-5 bg-slate-200 hover:bg-slate-900 "
          )}
        >
          <div
            style={{
              display: "flex",
              width: numPerc && `${numPerc}%`,
              height: "100%",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
            className={cn("bg-secondary/60 h-full", numPerc && "bg-slate-400")}
          ></div>
          <span
            className={cn(
              `absolute m-auto left-0 right-0 text-white font-bold`,
              onFormation && "text-slate-900 hover:text-white"
            )}
          >
            {!onFormation ? numPerc + " %" : "en formación"}
          </span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "pdfUrl",
    header: ({ column }) => {
      return <Button variant="ghost">Evaluación</Button>;
    },
    accessorFn: (value) => value.pdfUrl,
    cell: ({ row }) => {
      const url = row.original.pdfUrl;
      const existUrl = !!url;

      return (
        <Badge
          className={cn(
            "bg-inherit hover:bg-inherit",
            existUrl && "bg-emerald-500 hover:bg-emerald-700"
          )}
        >
          {existUrl ? (
            url && <PdfFullscreen icon={Eye} fileUrl={url} btnClass="p-0 h-fit hover:bg-emerald-700" />
          ) : (
            <X className="w-4 h-4 text-slate-300" />
          )}
        </Badge>
      );
    },
  },
  {
    accessorKey: "certificateUrl",
    header: ({ column }) => {
      return <Button variant="ghost">Certificado</Button>;
    },
    accessorFn: (value) => value.certificateUrl,
    cell: ({ row }) => {
      const url = row.original.certificateUrl;
      const existUrl = !!url;

      return (
        <Badge
          className={cn(
            "bg-inherit hover:bg-inherit",
            existUrl && "bg-blue-500 hover:bg-blue-700"
          )}
        >
          {existUrl ? (
            <a
              className={cn(
                buttonVariants({
                  className: "p-0 bg-inherit hover:bg-inherit w-full",
                  variant: "ghost",
                }),
                "h-fit"
              )}
              href={url!}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Link2 className="w-4 h-4" />
            </a>
          ) : (
            <X className="w-4 h-4 text-slate-300" />
          )}
        </Badge>
      );
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
            <Link href={`/admin/colaboradores/${id}`}>
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
