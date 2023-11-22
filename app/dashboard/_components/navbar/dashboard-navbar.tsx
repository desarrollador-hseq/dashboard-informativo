import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { DashboardSidebar } from "./dashboard-sidebar";
import { IconBadge } from "@/components/ui/icon-badge";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";

export const DashboardNavbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative p-1 border-b min-h-[55px] max-h-[70px] text-white w-full bg-red-900 shadow-sm flex items-center">
      <div className="mx-auto w-full max-w-[1500px] mt-1">
        <div className="mx-3 flex items-center justify-between">
          <div className="p-2 flex gap-1">
            <DashboardSidebar />
            <Logo goRoot />
          </div>

          {session && session.user.role === "ADMIN" && (
            <div className="flex">
              <Link href="/admin/colaboradores" className="w-fit p-2">
                Colaboradores
              </Link>
              <Link href="/admin/inspecciones" className="w-fit p-2">
                Inspecciones
              </Link>
              <Link href="/admin/informes" className="w-fit p-2">
                Informes
              </Link>
            </div>
          )}

          <Link href="/logout" className="w-fit h-full flex items-center">
            <Button variant="ghost" className="border border-white gap-2">
              Salir
              <LogOut className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
