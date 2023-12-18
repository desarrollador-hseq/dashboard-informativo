import React from "react";
import { db } from "@/lib/db";
import { AddCollaboratorForm } from "./_components/add-collaborator-form";

const CreateCollaborator = async ({
  params,
}: {
  params: { collaboratorId: string };
}) => {
  const collaborator = await db.collaborator.findUnique({
    where: {
      id: params.collaboratorId,
    },
  });

  if (!collaborator) {
    params.collaboratorId = "crear";
  }

  const cities = await db.city.findMany({});

  return (
    <div className="h-fit">
      {collaborator ? (
        <AddCollaboratorForm collaborator={collaborator} cities={cities} />
      ) : (
        <AddCollaboratorForm cities={cities} />
      )}
    </div>
  );
};

export default CreateCollaborator;
