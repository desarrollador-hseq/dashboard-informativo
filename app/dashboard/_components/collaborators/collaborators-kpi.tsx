
import React from "react";
import { Collaborator } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CollaboratorsReportsProps {
  collaborators: Collaborator[];
  threshold: number;
}

export const CollaboratorsKpi = ({
  collaborators,
  threshold
}: CollaboratorsReportsProps) => {
  

  const countFormedCollaborators = () => {
    return collaborators.reduce((count, collaborator) => {
      if (collaborator.percentage >= threshold ) {
        return count + 1;
      }
      return count;
    }, 0);
  };
  const formedCount = countFormedCollaborators();
  let PercentageFormed;

  if (collaborators.length > 0) {
    PercentageFormed = (formedCount / collaborators.length) * 100;
  } else {
    PercentageFormed = 0;
  }

  return (
    <>
      <Card className="h-full">
        <CardHeader></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          {/* =============== 1 =============== */}
          <Card className={`${collaborators.length > 0 ? "bg-primary" : "bg-zinc-400"} rounded-lg text-white`}>
            <CardHeader className="flex justify-center font-semibold ">
              <h4 className="text-center">Total colaboradores</h4>
            </CardHeader>
            <CardContent className="flex justify-center">
              <p className="text-4xl font-bold">
                {collaborators.length}
              </p>
            </CardContent>
          </Card>
          {/* =============== 2 =============== */}
          <Card className={`${collaborators.length > 0 ? "bg-primary" : "bg-zinc-400"} rounded-lg text-white`}>
            <CardHeader className="flex justify-center font-semibold ">
              <h4 className="text-center">Total colaboradores formados</h4>
            </CardHeader>
            <CardContent className="flex justify-center">
              <p className="text-4xl font-bold">{formedCount}</p>
            </CardContent>
          </Card>
          {/* =============== 3 =============== */}
          <Card className={`${collaborators.length > 0 ? "bg-primary" : "bg-zinc-400"} rounded-lg text-white`}>
            <CardHeader className="flex justify-center font-semibold ">
              <h4 className="text-center">Porcentaje de formacion</h4>
            </CardHeader>
            <CardContent className="flex justify-center">
              <p className="text-4xl font-bold">
                {PercentageFormed.toFixed(0)}%
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
};
