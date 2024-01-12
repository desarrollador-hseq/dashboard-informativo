"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MonthlyReports } from "@prisma/client";
import { format, getMonth, getYear } from "date-fns";
import { es } from "date-fns/locale";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, File, MoreHorizontal, Pencil, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PdfFullscreen from "@/components/pdf-fullscreen";
import { cn } from "@/lib/utils";
import ModalImage from "react-modal-image";
interface MonthlyReportsTableProps {
  monthlyReports: MonthlyReports[];
}

export const MonthlyReportsTable = ({
  monthlyReports,
}: MonthlyReportsTableProps) => {
  const isPdf = (value: string) => {
    const fileExt: string | undefined = value
      ? value?.split(".").pop()
      : undefined;
    const ispdf = fileExt === "pdf";
    return ispdf;
  };

  return (
    <div style={{ width: "800px" }}>
      <Table className="" style={{ width: "800px" }}>
        <TableHeader>
          <TableRow>
            <TableHead className="">Año</TableHead>
            <TableHead className="">Mes</TableHead>
            <TableHead>Ver</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monthlyReports.map((monthly) => (
            <TableRow key={monthly.id}>
              <>
                <TableCell className="font-medium">
                  {getYear(monthly.date)}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {format(monthly.date, "MMMM", { locale: es })}
                </TableCell>
                <TableCell className="font-medium">
                  <Badge
                    className={cn(
                      "bg-inherit hover:bg-inherit",
                      !!monthly.reportUrl &&
                        "bg-blue-500 hover:bg-blue-700"
                    )}
                  >
                    {!!monthly.reportUrl && (
                      <div>
                        {isPdf(monthly.reportUrl) ? (
                          <PdfFullscreen
                            icon={File}
                            fileUrl={monthly.reportUrl}
                            btnClass="p-0 h-fit hover:bg-blue-700"
                          />
                        ) : (
                          <div style={{ width: "15px", height: "15px" }}>
                            <ModalImage
                              showRotate
                              small={
                                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik01IDIxcS0uODI1IDAtMS40MTItLjU4N1QzIDE5VjVxMC0uODI1LjU4OC0xLjQxMlQ1IDNoMTRxLjgyNSAwIDEuNDEzLjU4OFQyMSA1djE0cTAgLjgyNS0uNTg3IDEuNDEzVDE5IDIxem0xLTRoMTJsLTMuNzUtNWwtMyA0TDkgMTN6Ii8+PC9zdmc+"
                              }
                              color="white"
                              large={monthly.reportUrl}
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {!!!monthly.reportUrl && (
                      <X className="w-4 h-4 text-slate-300" />
                    )}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-4 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/admin/informes-mensuales/${monthly.id}`}>
                        <DropdownMenuItem>
                          <Pencil className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
