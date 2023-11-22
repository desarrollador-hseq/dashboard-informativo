"use client";
import React from "react";
import { Report } from "@prisma/client";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { ReportsKpi } from "./reports-kpi";
import { ReportsDelivered } from "./reports-delivered";
import { ShowTableModal } from "../modals/show-table";
import { CollaboratorDataTable } from "@/app/admin/colaboradores/_components/collaborator-datatable";
import { reportColumns } from "@/app/admin/informes/_components/reports-datatable-column";
import { ReportsDataTable } from "@/app/admin/informes/_components/reports-datatable";


interface ReportsChartReportsProps {
  reports: Report[];
}

export const ReportsChartReports = ({
  reports,
}: ReportsChartReportsProps) => {
  const { date } = useDashboard();

  const filteredReports =
    !date || (date?.from === undefined && date?.to === undefined)
      ? reports
      : reports.filter((reports) => {
          const startDate = new Date(reports.deliveryDate);
          return (
            (!date.from || startDate >= date.from) &&
            (!date.to || startDate <= date.to)
          );
        });
  return (
    <div className="w-full flex flex-col justify-center p-2">
       <div className="w-full grid grid-cols-3 h-16 place-content-center">
        <div />
        <h2 className="text-3xl font-bold text-center">Informes</h2>
        <div className="place-content-center flex justify-end">
          <ShowTableModal
            title="Informes"
            children={
              <ReportsDataTable
                columns={reportColumns}
                data={filteredReports}
              />
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <ReportsKpi reports={filteredReports} />
        </div>

        <div>
          <ReportsDelivered reports={filteredReports} />
        </div>
      </div>
    </div>
  );
};
