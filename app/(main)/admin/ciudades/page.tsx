import Link from "next/link";
import { getServerSession } from "next-auth";
import { PlusCircle } from "lucide-react";
import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { CitiesDataTable } from "./_components/cities-datatable";
import { citiesColumns } from "./_components/cities-datatable-columns";
import { RegionalDataTable } from "./_components/regional-datatable";
import { regionalColumns } from "./_components/regional-datatable-columns";

const InspectionsPage = async () => {
  const session = await getServerSession(authOptions);

  const cities = await db.city.findMany({
    where: {
      active: true,
    },
    include: {
      regional: true,
    },
    orderBy: {
      realName: "asc",
    },
  });

  const regional = await db.regional.findMany({
    where: {
      active: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="max-w-[1500px] mx-auto p-1">
      <div className="grid lg:grid-cols-3 gap-3">
        <div className="col-span-2">
          <div className="flex justify-between gap-y-1">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">Listado de ciudades</h1>
              <span className="text-sm text-slate-500 font-light">
                Listado completo de ciudades registradas hasta la fecha
              </span>
            </div>

            {session && session.user.role === "ADMIN" && (
              <Link href="/admin/ciudades/crear">
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Registrar ciudad
                </Button>
              </Link>
            )}
          </div>
          <CitiesDataTable columns={citiesColumns} data={cities} />
        </div>

        {/* Regionales */}
        <div className="bg-slate-100/50 border border-primary p-2 col-span-2 lg:col-span-1">
          <div className="flex justify-between gap-y-1">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">Listado de regionales</h1>
              <span className="text-sm text-slate-500 font-light">
                Listado completo de regionales registradas.
              </span>
            </div>

            {session && session.user.role === "ADMIN" && (
              <Link href="/admin/regionales/crear">
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Registrar regional
                </Button>
              </Link>
            )}
          </div>
          <RegionalDataTable columns={regionalColumns} data={regional} />
        </div>
      </div>
    </div>
  );
};

export default InspectionsPage;
