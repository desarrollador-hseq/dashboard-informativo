import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { AdminSidebar } from "./admin-sidebar";

import { IconBadge } from "@/components/ui/icon-badge";
import { buttonVariants } from "@/components/ui/button";

export const AdminNavbar = () => {
  return (
    <div className="relative p-1 border-b min-h-[55px] max-h-[70px] text-white w-full bg-red-800 shadow-sm flex items-center">
      <div className="mx-auto w-full max-w-[1500px] mt-1">
        <div className="mx-3 flex items-center justify-between">
          <div className="p-2 flex gap-1">
            <AdminSidebar />
            <Logo goRoot />
          </div>

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
          <Link href="/logout" className="w-fit h-full flex gap-2 items-center">
            <IconBadge variant="danger" icon={LogOut} className="h-4 w-4" />
            Salir
          </Link>
        </div>
      </div>
    </div>
  );
};
