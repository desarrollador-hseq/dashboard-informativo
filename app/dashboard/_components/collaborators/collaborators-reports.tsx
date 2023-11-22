"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";
import { Collaborator } from "@prisma/client";
import { Card, CardHeader } from "@/components/ui/card";
import { PercentagePie } from "./percentage-pie";
import { CollaboratorFormed } from "./collaborators-formed";
import { CollaboratorsCity } from "./collaborators-city";
import { CollaboratorsKpi } from "./collaborators-kpi";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { ShowTableModal } from "../modals/show-table";
import { CollaboratorDataTable } from "@/app/admin/colaboradores/_components/collaborator-datatable";
import { collaboratorColumns } from "@/app/admin/colaboradores/_components/collaborator-datatable-column";

interface CollaboratorsReportsProps {
  collaborators: Collaborator[];
}

export const CollaboratorsReports = ({
  collaborators,
}: CollaboratorsReportsProps) => {
  const { date } = useDashboard();

  const filteredCollaborators =
    !date || (date?.from === undefined && date?.to === undefined)
      ? collaborators
      : collaborators.filter((collaborator) => {
          const startDate = new Date(collaborator.startDate);
          return (
            (!date.from || startDate >= date.from) &&
            (!date.to || startDate <= date.to)
          );
        });
  return (
    <div className="w-full flex flex-col justify-center p-2 mb-6">
      <div className="w-full grid grid-cols-3 h-16 place-content-center">
        <div />
        <h2 className="text-3xl font-bold text-center">Colaboradores</h2>
        <div className="place-content-center flex justify-end">
          <ShowTableModal title="Colaboradores">
            <CollaboratorDataTable
              columns={collaboratorColumns}
              data={filteredCollaborators}
            />
          </ShowTableModal>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <CollaboratorsKpi collaborators={filteredCollaborators} />
        </div>
        <div>
          <PercentagePie collaborators={filteredCollaborators} />
        </div>
        <div>
          <CollaboratorFormed collaborators={filteredCollaborators} />
        </div>
        <div>
          <CollaboratorsCity collaborators={filteredCollaborators} />
        </div>
      </div>
    </div>
  );
};
