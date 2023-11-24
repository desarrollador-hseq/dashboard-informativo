import { db } from "@/lib/db";
import { InspectionsDataTable } from "./_components/inspections-datatable";
import { InspectionColumns } from "./_components/inspections-datatable-column";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const InspectionsPage = async () => {
  const session = await getServerSession(authOptions);

  const collaborators = await db.inspection.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="max-w-[1500px] mx-auto p-1">
      <div className="flex justify-between gap-y-1">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Listado de inspecciones</h1>
          <span className="text-sm text-slate-500 font-light">
            Listado completo de todos las inspecciones registradas hasta la
            fecha
          </span>
        </div>

        {session && session.user.role === "ADMIN" && (
          <Link href="/admin/inspecciones/crear">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Registrar Inspección
            </Button>
          </Link>
        )}
      </div>
      <InspectionsDataTable
        columns={InspectionColumns}
        data={collaborators}
      />
    </div>
  );
};

export default InspectionsPage;
