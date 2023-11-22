"use client";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CollaboratorDataTable<TData, TValue>({
  columns: columnsAll,
  data,
}: DataTableProps<TData, TValue>) {
  const { data: session } = useSession();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [itemFilter, setItemFilter] = useState("name");

  const columns = columnsAll.filter((column) => {
    return !(session && session?.user.role !== "ADMIN" && column.id === "actions");
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleFilterItem = (e: string) => {
    table.getColumn(itemFilter)?.setFilterValue("");
    setItemFilter(e);
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-2">
          <Input
            placeholder={`Buscar`}
            value={
              (table.getColumn(itemFilter)?.getFilterValue() as string) ?? ""
            }
            onChange={(event: any) =>
              table.getColumn(itemFilter)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <Select value={itemFilter} onValueChange={(e) => handleFilterItem(e)}>
            <SelectTrigger className="w-[230px]">
              <SelectValue placeholder="Filtrar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="name">Nombres</SelectItem>
                <SelectItem value="lastname">Apellidos</SelectItem>
                <SelectItem value="numDoc">N° documento</SelectItem>
                <SelectItem value="city">Ciudad</SelectItem>
                <SelectItem value="isFormed">formacion</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {session && session.user.role === "ADMIN" && (
          <Link href="/admin/colaboradores/crear">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Agregar colaborador
            </Button>
          </Link>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
