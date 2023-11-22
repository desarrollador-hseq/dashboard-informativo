"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";
import { Collaborator, Inspection } from "@prisma/client";
import { Card, CardHeader } from "@/components/ui/card";
import { InspectionsExecutedCity } from "./Inspections-executed-city";
import { InspectionsCity } from "./inspections-city";
import { InspectionsKpi } from "./inspections-kpi";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { InspectionsExecuted } from "./inspections-executed";
import { ShowTableModal } from "../modals/show-table";
import { InspectionsDataTable } from "@/app/admin/inspecciones/_components/inspections-datatable";
import { InspectionColumns } from "@/app/admin/inspecciones/_components/inspections-datatable-column";

interface CollaboratorsReportsProps {
  inspections: Inspection[];
}

export const InspectionsReports = ({
  inspections,
}: CollaboratorsReportsProps) => {
  const { date } = useDashboard();

  const filteredInspections =
    !date || (date?.from === undefined && date?.to === undefined)
      ? inspections
      : inspections.filter((inspection) => {
          const startDate = new Date(inspection.date);
          return (
            (!date.from || startDate >= date.from) &&
            (!date.to || startDate <= date.to)
          );
        });
  return (
    <div className="w-full flex flex-col justify-center p-2">
      <div className="w-full grid grid-cols-3 h-16 place-content-center">
        <div />
        <h2 className="text-3xl font-bold text-center">Inspecciones</h2>
        <div className="place-content-center flex justify-end">
          <ShowTableModal
            title="Inspecciones"
            children={
              <InspectionsDataTable
                columns={InspectionColumns}
                data={filteredInspections}
              />
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <InspectionsKpi inspections={filteredInspections} />
        </div>

        <div>
          <InspectionsExecuted inspections={filteredInspections} />
        </div>

        <div>
          <InspectionsCity inspections={filteredInspections} />
        </div>

        <div>
          <InspectionsExecutedCity inspections={filteredInspections} />
        </div>
      </div>
    </div>
  );
};
