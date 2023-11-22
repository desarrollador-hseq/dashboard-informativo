import { db } from "@/lib/db";
import { InspectionsDataTable } from "./_components/inspections-datatable";
import { InspectionColumns } from "./_components/inspections-datatable-column";

const InspectionsPage = async () => {
  const collaborators = await db.inspection.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="max-w-[1500px] mx-auto p-1">
      <InspectionsDataTable
        columns={InspectionColumns}
        data={collaborators}
      />
    </div>
  );
};

export default InspectionsPage;
