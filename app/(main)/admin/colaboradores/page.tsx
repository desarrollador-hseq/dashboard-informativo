import React from "react";
import { db } from "@/lib/db";
import { CollaboratorDataTable } from "./_components/collaborator-datatable";
import { collaboratorColumns } from "./_components/collaborator-datatable-column";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const CollaboratorPage = async () => {
  const session = await getServerSession(authOptions);
  const collaborators = await db.collaborator.findMany({
    where: {
      active: true,
    },
    include: {
      city: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return (
    <Card className="max-w-[1500px] h-fit mx-auto p-1 rounded-sm">
      <CardHeader className="flex flex-row justify-between gap-y-1">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Listado de colaboradores</h1>
          <span className="text-sm text-slate-500 font-light">
            Listado completo de todos lo colaboradores registrados hasta la
            fecha
          </span>
        </div>

        {session && session.user.role === "ADMIN" && (
          <Link href="/admin/colaboradores/crear">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Agregar colaborador
            </Button>
          </Link>
        )}
      </CardHeader>
      <CardContent>
        <CollaboratorDataTable
          columns={collaboratorColumns}
          data={collaborators}
        />
      </CardContent>
    </Card>
  );
};

export default CollaboratorPage;
