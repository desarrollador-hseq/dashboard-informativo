import { db } from "@/lib/db";
import { ReportsDataTable } from "./_components/reports-datatable";
import { ReportColumns } from "./_components/reports-datatable-column";

const InspectionsPage = async () => {
  const reports = await db.report.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="max-w-[1500px] mx-auto p-1">
      <ReportsDataTable
        columns={ReportColumns}
        data={reports}
      />
    </div>
  );
};

export default InspectionsPage;
