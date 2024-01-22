"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { DownloadTableExcel } from "react-export-table-to-excel";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
import { FileDown, Loader2 } from "lucide-react";
import { format } from "date-fns";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CollaboratorDataTable<TData, TValue>({
  data,
  columns: columnsAll,
}: DataTableProps<TData, TValue>) {
  const { data: session } = useSession();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [itemFilter, setItemFilter] = useState("fullname");
  const [pageLoaded, setPageLoaded] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  let columns = columnsAll
    .filter((column) => {
      return !(
        session &&
        session?.user.role !== "ADMIN" &&
        column.id === "actions"
      );
    })
    .filter((column) => {
      return !(
        session &&
        session?.user.role !== "ADMIN" &&
        column.id === "percentage"
      );
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

  const exportColumns = columns
    .filter((column) => !column?.id?.includes("actions"))
    .map((column: any) => ({
      title: column?.header({ column }).props.children,
      data: column?.accessorKey,
    }));

  const filteredData = data.map((row: any) => {
    const filteredRow: any = {};
    exportColumns.forEach((column) => {
      filteredRow[column.data] = row[column.data];
    });
    return filteredRow;
  });

  const handleFilterItem = (e: string) => {
    table.getColumn(itemFilter)?.setFilterValue("");
    setItemFilter(e);
  };

  return (
    <div>
      <table ref={tableRef} style={{ display: "none" }}>
        <thead>
          <tr>
            {exportColumns.map((item) => (
              <th key={item.data}>{item.title[0]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {exportColumns.map((column) => (
                <td key={column.data}>
                  {column.data === "city"
                    ? row[column.data]?.realName || "Desconocida"
                    : row[column.data]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {!pageLoaded ? (
        <div className="w-full min-h-screen flex justify-center items-start">
          <Loader2 className="w-7 h-7 animate-spin" />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between py-4">
            <div className="flex gap-2 w-full">
              <Input
                placeholder={`Buscar`}
                value={
                  (table.getColumn(itemFilter)?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event: any) =>
                  table
                    .getColumn(itemFilter)
                    ?.setFilterValue(event.target.value)
                }
                className="w-full min-w-[300px] max-w-[500px] bg-white "
              />

              <Select
                value={itemFilter}
                onValueChange={(e) => handleFilterItem(e)}
              >
                <SelectTrigger className="w-fit gap-2">
                  <SelectValue placeholder="Filtrar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="fullname">Nombres</SelectItem>
                    <SelectItem value="numDoc">N° documento</SelectItem>
                    <SelectItem value="city">Ciudad</SelectItem>
                    <SelectItem value="percentage">Evaluacion</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-secondary hover:bg-secondary">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className=" hover:bg-secondary"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="text-white">
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
          {table.getRowModel().rows.length > 0 && (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div>
                <DownloadTableExcel
                  filename={`Colaboradores ${format(
                    new Date(),
                    "dd/MM/yyyy-HH:mm:ss"
                  )}`}
                  sheet="colaboradores"
                  currentTableRef={tableRef.current}
                >
                  <Button className="bg-slate-200 rounded-full hover:text-white">
                    <FileDown className="w-6 h-6 text-secondary hover:text-white" />
                  </Button>
                </DownloadTableExcel>
              </div>

              <div className="flex gap-2">
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
          )}
        </div>
      )}
    </div>
  );
}
