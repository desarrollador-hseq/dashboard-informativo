import ReactEcharts from "echarts-for-react";
import { notFound } from "next/navigation";
// import { CollaboratorsCard } from "./_components/collaborators-card";
import { useResizeDetector } from "react-resize-detector";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CollaboratorsReports } from "./_components/collaborators/collaborators-reports";
import { db } from "@/lib/db";
import { InspectionsReports } from "./_components/inspections/inspections-reports";
import { Separator } from "@/components/ui/separator";
import { DateFilter } from "./_components/date-filter";
import { ReportsChartReports } from "./_components/reports/reports-chart-reports";

const DashboardPage = async () => {
  const collaborators = await db.collaborator.findMany();
  const inspections = await db.inspection.findMany();
  const report = await db.report.findMany();

  return (
    <div className="w-full">
      <Card className="relative w-full max-w-[1500px] m-auto overflow-hidden">
        <CardHeader className=" w-full top-0 h-fit bg-red-800  flex md:flex-row  items-center justify-between">
          <h2 className=" text-3xl font-bold text-white self-center">
            Dashboard
          </h2>
          <DateFilter />
        </CardHeader>

        {/* <CollaboratorsCard /> */}
        <CardContent className="w-full grid grid-cols-1 p-2">
          {collaborators && (
            <CollaboratorsReports collaborators={collaborators} />
          )}
          <Separator className="h-1.5 bg-primary" />
          {inspections && <InspectionsReports inspections={inspections} />}

          <Separator className="h-1.5 bg-primary" />
          {report && <ReportsChartReports reports={report} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
