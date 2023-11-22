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

  return (
    <div>
      {collaborator ? (
        <AddCollaboratorForm collaborator={collaborator} />
      ) : (
        <AddCollaboratorForm />
      )}
    </div>
  );
};

export default CreateCollaborator;
