"use client"
import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { LogoGrupoHseq } from "@/components/logo-grupo-hseq";
import { AdminSidebar } from "./admin-sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";



export const AdminNavbar = () => {
  const pathname = usePathname();
 

  return (
    <div className="relative p-1 border-b min-h-[55px] max-h-[70px] text-white w-full bg-primary shadow-sm flex items-center">
      <div className="mx-auto w-full max-w-[1500px] mt-1">
        <div className="mx-3 flex items-center justify-between">
          <div className="p-2 flex gap-1">
            <AdminSidebar />
            <LogoGrupoHseq goRoot className="flex" />
            {/* <LogoClaro goRoot className="flex" /> */}
          </div>

          <div className="hidden md:flex gap-2">
            <Link  href="/admin/colaboradores" className={cn("w-fit p-2 rounded-sm hover:bg-secondary/30",  pathname?.startsWith(`/admin/colaboradores`) && "bg-secondary" )}>
              Colaboradores
            </Link>
            <Link href="/admin/inspecciones" className={cn("w-fit p-2 rounded-sm hover:bg-secondary/30",  pathname?.startsWith(`/admin/inspecciones`) && "bg-secondary" )}>
              Inspecciones
            </Link>
            <Link href="/admin/informes" className={cn("w-fit p-2 rounded-sm hover:bg-secondary/30",  pathname?.startsWith(`/admin/informes`) && "bg-secondary" )}>
              Informes
            </Link>
            <Link href="/admin/" className="ml-6 w-fit h-fit p-2  bg-inherit hover:bg-accent rounded-full flex items-center">
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
