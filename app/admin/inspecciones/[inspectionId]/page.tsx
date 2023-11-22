import React from "react";
import { db } from "@/lib/db";
import { AddInspectionForm } from "./_components/add-inspection-form";

const CreateInspection = async ({
  params,
}: {
  params: { inspectionId: string };
}) => {
  const inspection = await db.inspection.findUnique({
    where: {
      id: params.inspectionId,
    },
  });

  if (!inspection) {
    params.inspectionId = "crear";
  }

  return (
    <div>
      {inspection ? (
        <AddInspectionForm inspection={inspection} />
      ) : (
        <AddInspectionForm />
      )}
    </div>
  );
};

export default CreateInspection;
