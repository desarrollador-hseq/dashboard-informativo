
import React from "react";
import { db } from "@/lib/db";
import { CollaboratorDataTable } from "./_components/collaborator-datatable";
import { collaboratorColumns } from "./_components/collaborator-datatable-column";

const CollaboratorPage = async () => {
  const collaborators = await db.collaborator.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="max-w-[1500px] mx-auto p-1">
      <CollaboratorDataTable
        columns={collaboratorColumns}
        data={collaborators}
      />
    </div>
  );
};

export default CollaboratorPage;
