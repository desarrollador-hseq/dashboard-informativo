import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CollaboratorsReports } from "./_components/collaborators/collaborators-reports";
import { db } from "@/lib/db";
import { InspectionsReports } from "./_components/inspections/inspections-reports";
import { Separator } from "@/components/ui/separator";
import { DateFilter } from "./_components/date-filter";
import { ReportsChartReports } from "./_components/reports/reports-chart-reports";
import { Dashboardtitle } from "./_components/dashboard-title";
import { Loader2 } from "lucide-react";

const DashboardPage = async () => {
  const collaborators = await db.collaborator.findMany();
  const getFormationThreshold = async () => {
    try {
      const formationThreshold = await db.formationParameters.findFirst();
      return formationThreshold?.threshold;
    } catch (error) {
      console.error("Error al obtener el umbral de formación:", error);
      throw error;
    } finally {
      await db.$disconnect();
    }
  };
  const thresholdValue = await getFormationThreshold();
  const threshold = thresholdValue ? thresholdValue : 80;
  const inspections = await db.inspection.findMany();
  const report = await db.report.findMany();

  return (
    <div className="w-full">
      <Card className="relative w-full max-w-[1500px] m-auto overflow-hidden bg-slate-50 border-2 border-primary">
        <CardHeader className="p-0 ">
          <Dashboardtitle />
        </CardHeader>

        {/* <CollaboratorsCard /> */}
        <CardContent className="w-full grid grid-cols-1 p-2">
          {collaborators ? (
            <CollaboratorsReports
              threshold={threshold}
              collaborators={collaborators}
            />
          ) : (
            <div className="h-full w-full">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
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
