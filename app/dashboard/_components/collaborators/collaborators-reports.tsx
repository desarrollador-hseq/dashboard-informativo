"use client";

import { City, Collaborator } from "@prisma/client";
import { CollaboratorFormed } from "./collaborators-formed";
import { CollaboratorsCity } from "./collaborators-city";
import { CollaboratorsKpi } from "./collaborators-kpi";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { ShowTableModal } from "../modals/show-table";
import { CollaboratorDataTable } from "@/app/admin/colaboradores/_components/collaborator-datatable";
import { collaboratorColumns } from "@/app/admin/colaboradores/_components/collaborator-datatable-column";
import { Fade } from "react-awesome-reveal";

interface CollaboratorWithFormated extends Collaborator {
  city: City | null;
}

interface CollaboratorsReportsProps {
  collaborators: CollaboratorWithFormated[];
  threshold: number;
}

export const CollaboratorsReports = ({
  collaborators,
  threshold,
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
    <div
      className="w-full flex flex-col justify-center mb-6 "
      id="collaborator"
    >
      <div className="w-full grid grid-rows-3 grid-cols-1 md:grid-rows-1 md:grid-cols-3 my-1 h-max md:my-3  place-content-center px-3 ">
        <div />
        <h2 className="text-3xl font-bold text-center">Colaboradores</h2>
        <div className="place-content-center flex justify-center md:justify-end">
          <ShowTableModal title="Colaboradores">
            <CollaboratorDataTable
              columns={collaboratorColumns}
              data={filteredCollaborators}
            />
          </ShowTableModal>
        </div>
      </div>

      {/* <Separator className="mb-4 bg-primary" /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-2 mb-3 lg:grid-rows-2 ">
        <Fade delay={200} cascade triggerOnce>
          <CollaboratorsKpi
            threshold={threshold}
            collaborators={filteredCollaborators}
          />
        </Fade>
        {/* <div>
          <PercentagePie  collaborators={filteredCollaborators} />
        </div> */}
        <Fade delay={400} cascade triggerOnce>
          <CollaboratorFormed
            threshold={threshold}
            collaborators={filteredCollaborators}
          />
        </Fade>
        <div className="lg:col-span-2">
          <Fade delay={600} cascade triggerOnce>
            <CollaboratorsCity collaborators={filteredCollaborators} />
          </Fade>
        </div>
      </div>
    </div>
  );
};
