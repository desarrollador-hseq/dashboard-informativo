"use client"
import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import { Logo } from "@/components/logo";
import { AdminSidebar } from "./admin-sidebar";

import { IconBadge } from "@/components/ui/icon-badge";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";


export const AdminNavbar = () => {
  const pathname = usePathname();
 

  return (
    <div className="relative p-1 border-b min-h-[55px] max-h-[70px] text-white w-full bg-red-800 shadow-sm flex items-center">
      <div className="mx-auto w-full max-w-[1500px] mt-1">
        <div className="mx-3 flex items-center justify-between">
          <div className="p-2 flex gap-1">
            <AdminSidebar />
            <Logo goRoot />
          </div>

          <div className="hidden md:flex ">
            <Link  href="/admin/colaboradores" className={cn("w-fit p-2",  pathname?.startsWith(`/admin/colaboradores`) && " rounded-sm bg-red-900" )}>
              Colaboradores
            </Link>
            <Link href="/admin/inspecciones" className={cn("w-fit p-2",  pathname?.startsWith(`/admin/inspecciones`) && " rounded-sm bg-red-900" )}>
              Inspecciones
            </Link>
            <Link href="/admin/informes" className={cn("w-fit p-2",  pathname?.startsWith(`/admin/informes`) && " rounded-sm bg-red-900" )}>
              Informes
            </Link>
            <Link href="/admin/" className="ml-6 w-fit h-fit p-2 bg-secondary hover:bg-red-600 rounded-sm flex items-center">
              <Settings className="w-5 h-5" /> 
            </Link>
          </div>
          <Link href="/logout" className="w-fit h-full flex items-center">
            <Button variant="ghost" className="bg-slate-500 gap-2">
              Salir
              <LogOut className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
