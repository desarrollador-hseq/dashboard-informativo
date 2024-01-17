"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  FileX,
  Laptop,
  Link2,
  MoreHorizontal,
  Pencil,
  School,
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
import ModalImage from "react-modal-image";

interface CollaboratorTableProps {
  id: string;
  percentage: number;
  city: City | null;
  evaluationUrl: string | null;
  certificateUrl: string | null;
  archivesLink: string | null;
  isVirtual: boolean;
}

type CollaboratorTableType = CollaboratorTableProps;

const isPdf = (value: string) => {
  const urlParcial = value.split("/").pop();
  const fileExt: string | undefined = urlParcial
    ? urlParcial?.split(".").pop()
    : undefined;
  const ispdf = fileExt === "pdf";
  console.log({ fileExt });
  return ispdf;
};

export const collaboratorColumns: ColumnDef<CollaboratorTableType>[] = [
  {
    accessorKey: "isVirtual",
    header: ({ column }) => {
      return <span> </span>;
    },
    accessorFn: (value) => <div>`Si`</div>,
    size: 5,
    cell: ({ row }) => {
      const isVirtual = row.original.isVirtual;
      return (
        <span className="capitalize w-20">
          {isVirtual && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                className="fill-secondary"
                d="M0 20v-2h2V3h20v15h2v2zm10-2h4v-1h-4zm-6-3h16V5H4zm8-5"
              />
            </svg>
          )}
        </span>
      );
    },
  },
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
    accessorKey: "evaluationUrl",
    header: ({ column }) => {
      return <div>Evaluación</div>;
    },
    accessorFn: (value) => value.evaluationUrl,
    cell: ({ row }) => {
      const url = row.original.evaluationUrl;
      const existUrl = !!url;

      return (
        <Badge
          className={cn(
            "bg-inherit hover:bg-inherit",
            existUrl && "bg-emerald-500 hover:bg-emerald-700"
          )}
        >
          {existUrl ? (
            <div>
              {isPdf(url) ? (
                <PdfFullscreen
                  icon={Eye}
                  fileUrl={url}
                  btnClass="p-0 h-fit hover:bg-blue-700"
                />
              ) : (
                <div style={{ width: "15px", height: "15px" }}>
                  <ModalImage
                    showRotate
                    small={
                      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yNTEgMTIzLjEzYy0uMzctLjgxLTkuMTMtMjAuMjYtMjguNDgtMzkuNjFDMTk2LjYzIDU3LjY3IDE2NCA0NCAxMjggNDRTNTkuMzcgNTcuNjcgMzMuNTEgODMuNTJDMTQuMTYgMTAyLjg3IDUuNCAxMjIuMzIgNSAxMjMuMTNhMTIuMDggMTIuMDggMCAwIDAgMCA5Ljc1Yy4zNy44MiA5LjEzIDIwLjI2IDI4LjQ5IDM5LjYxQzU5LjM3IDE5OC4zNCA5MiAyMTIgMTI4IDIxMnM2OC42My0xMy42NiA5NC40OC0zOS41MWMxOS4zNi0xOS4zNSAyOC4xMi0zOC43OSAyOC40OS0zOS42MWExMi4wOCAxMi4wOCAwIDAgMCAuMDMtOS43NW0tNDYuMDYgMzNDMTgzLjQ3IDE3Ny4yNyAxNTcuNTkgMTg4IDEyOCAxODhzLTU1LjQ3LTEwLjczLTc2LjkxLTMxLjg4QTEzMC4zNiAxMzAuMzYgMCAwIDEgMjkuNTIgMTI4YTEzMC40NSAxMzAuNDUgMCAwIDEgMjEuNTctMjguMTFDNzIuNTQgNzguNzMgOTguNDEgNjggMTI4IDY4czU1LjQ2IDEwLjczIDc2LjkxIDMxLjg5QTEzMC4zNiAxMzAuMzYgMCAwIDEgMjI2LjQ4IDEyOGExMzAuNDUgMTMwLjQ1IDAgMCAxLTIxLjU3IDI4LjEyWk0xMjggODRhNDQgNDQgMCAxIDAgNDQgNDRhNDQuMDUgNDQuMDUgMCAwIDAtNDQtNDRtMCA2NGEyMCAyMCAwIDEgMSAyMC0yMGEyMCAyMCAwIDAgMS0yMCAyMCIvPjwvc3ZnPg=="
                    }
                    color="white"
                    large={url}
                  />
                </div>
              )}
            </div>
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
      return <div>Certificado</div>;
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
            <div>
              {isPdf(url) ? (
                <PdfFullscreen
                  icon={Eye}
                  fileUrl={url}
                  btnClass="p-0 h-fit hover:bg-blue-700"
                />
              ) : (
                <div style={{ width: "15px", height: "15px" }}>
                  <ModalImage
                    showRotate
                    small={
                      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yNTEgMTIzLjEzYy0uMzctLjgxLTkuMTMtMjAuMjYtMjguNDgtMzkuNjFDMTk2LjYzIDU3LjY3IDE2NCA0NCAxMjggNDRTNTkuMzcgNTcuNjcgMzMuNTEgODMuNTJDMTQuMTYgMTAyLjg3IDUuNCAxMjIuMzIgNSAxMjMuMTNhMTIuMDggMTIuMDggMCAwIDAgMCA5Ljc1Yy4zNy44MiA5LjEzIDIwLjI2IDI4LjQ5IDM5LjYxQzU5LjM3IDE5OC4zNCA5MiAyMTIgMTI4IDIxMnM2OC42My0xMy42NiA5NC40OC0zOS41MWMxOS4zNi0xOS4zNSAyOC4xMi0zOC43OSAyOC40OS0zOS42MWExMi4wOCAxMi4wOCAwIDAgMCAuMDMtOS43NW0tNDYuMDYgMzNDMTgzLjQ3IDE3Ny4yNyAxNTcuNTkgMTg4IDEyOCAxODhzLTU1LjQ3LTEwLjczLTc2LjkxLTMxLjg4QTEzMC4zNiAxMzAuMzYgMCAwIDEgMjkuNTIgMTI4YTEzMC40NSAxMzAuNDUgMCAwIDEgMjEuNTctMjguMTFDNzIuNTQgNzguNzMgOTguNDEgNjggMTI4IDY4czU1LjQ2IDEwLjczIDc2LjkxIDMxLjg5QTEzMC4zNiAxMzAuMzYgMCAwIDEgMjI2LjQ4IDEyOGExMzAuNDUgMTMwLjQ1IDAgMCAxLTIxLjU3IDI4LjEyWk0xMjggODRhNDQgNDQgMCAxIDAgNDQgNDRhNDQuMDUgNDQuMDUgMCAwIDAtNDQtNDRtMCA2NGEyMCAyMCAwIDEgMSAyMC0yMGEyMCAyMCAwIDAgMS0yMCAyMCIvPjwvc3ZnPg=="
                    }
                    color="white"
                    large={url}
                  />
                </div>
              )}
            </div>
          ) : (
            <X className="w-4 h-4 text-slate-300" />
          )}
        </Badge>
      );
    },
  },
  {
    accessorKey: "archivesLink",
    header: ({ column }) => {
      return <Button variant="ghost">Evidencias</Button>;
    },
    accessorFn: (value) => value.archivesLink,
    cell: ({ row }) => {
      const url = row.original.archivesLink;
      const existUrl = !!url;

      return (
        <Badge
          className={cn(
            "bg-inherit hover:bg-inherit",
            existUrl && "bg-red-400 hover:bg-red-500"
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
