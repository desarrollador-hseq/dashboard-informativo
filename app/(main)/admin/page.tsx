import { db } from "@/lib/db";
import { FormationThresholdField } from "./_components/parameters/formation-threshold-field";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AdminPage = async () => {
  const formationParameters = await db.formationParameters.findFirst();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-y-2 mt-2">
        <h1 className="text-2xl font-medium">Parametros generales</h1>
      </CardHeader>
      <CardContent>
        <FormationThresholdField formationParameters={formationParameters} />
      </CardContent>
    </Card>
  );
};

export default AdminPage;
